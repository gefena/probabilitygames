import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import patternLockQuestions from '../quizzes/patternLockHacker'
import GameSuggestions from '../components/GameSuggestions'

// ─── Constants ────────────────────────────────────────────────────────────────

const LENGTHS = [4, 5, 6, 7, 8, 9]

// SVG viewBox 0 0 200 200 — dot positions for 3×3 grid
const DOTS = [
  { x: 30,  y: 30  }, // 0  top-left
  { x: 100, y: 30  }, // 1  top-center
  { x: 170, y: 30  }, // 2  top-right
  { x: 30,  y: 100 }, // 3  mid-left
  { x: 100, y: 100 }, // 4  center
  { x: 170, y: 100 }, // 5  mid-right
  { x: 30,  y: 170 }, // 6  bot-left
  { x: 100, y: 170 }, // 7  bot-center
  { x: 170, y: 170 }, // 8  bot-right
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateSecret(k) {
  const idx = Array.from({ length: 9 }, (_, i) => i)
  for (let i = 0; i < k; i++) {
    const j = i + Math.floor(Math.random() * (9 - i))
    ;[idx[i], idx[j]] = [idx[j], idx[i]]
  }
  return idx.slice(0, k)
}

function perm(n, k) {
  let r = 1
  for (let i = 0; i < k; i++) r *= n - i
  return r
}

function factorial(k) {
  let r = 1
  for (let i = 2; i <= k; i++) r *= i
  return r
}

// ─── Pattern grid SVG ─────────────────────────────────────────────────────────

function PatternGrid({ attempt, secret, smudgeUsed, won, revealed, onDotClick, disabled }) {
  const smudgeSet = smudgeUsed ? new Set(secret) : new Set()
  const lineSeq   = revealed.length > 0 ? revealed : attempt

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[260px] mx-auto block select-none">

      {/* Faint grid lines */}
      {[0, 1, 2].flatMap(row =>
        [0, 1].map(col => {
          const a = DOTS[row * 3 + col], b = DOTS[row * 3 + col + 1]
          return <line key={`h${row}${col}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#334155" strokeWidth={1.5} />
        })
      )}
      {[0, 1, 2].flatMap(col =>
        [0, 1].map(row => {
          const a = DOTS[row * 3 + col], b = DOTS[(row + 1) * 3 + col]
          return <line key={`v${row}${col}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#334155" strokeWidth={1.5} />
        })
      )}

      {/* Drawn pattern lines */}
      {lineSeq.map((dotIdx, i) => {
        if (i === 0) return null
        const a = DOTS[lineSeq[i - 1]], b = DOTS[dotIdx]
        const color = won ? '#4ade80' : revealed.length > 0 ? '#fbbf24' : '#a78bfa'
        return (
          <line key={`pl${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke={color} strokeWidth={3.5} strokeLinecap="round" />
        )
      })}

      {/* Dots */}
      {DOTS.map((pos, idx) => {
        const aIdx = attempt.indexOf(idx)
        const rIdx = revealed.indexOf(idx)
        const smudged = smudgeSet.has(idx) && aIdx < 0 && rIdx < 0

        let fill  = '#475569'
        let ring  = '#64748b'
        let seq   = null

        if (smudged)  { fill = '#92400e'; ring = '#f59e0b' }
        if (aIdx >= 0) { fill = won ? '#15803d' : '#6d28d9'; ring = won ? '#4ade80' : '#a78bfa'; seq = aIdx + 1 }
        if (rIdx >= 0) { fill = '#92400e'; ring = '#fbbf24'; seq = rIdx + 1 }

        return (
          <g key={idx} onClick={() => !disabled && onDotClick(idx)}
            style={{ cursor: disabled ? 'default' : 'pointer' }}>
            {/* Large invisible hit target */}
            <circle cx={pos.x} cy={pos.y} r={24} fill="transparent" />
            {/* Smudge glow ring */}
            {smudged && <circle cx={pos.x} cy={pos.y} r={20} fill="#78350f" opacity={0.5} />}
            {/* Main dot */}
            <circle cx={pos.x} cy={pos.y} r={15} fill={fill} stroke={ring} strokeWidth={2.5} />
            {/* Sequence number */}
            {seq !== null && (
              <text x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontWeight="bold" fill="#f1f5f9">
                {seq}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PatternLockHackerPage() {
  const { t } = useTranslation()

  const [k, setK]                   = useState(4)
  const [secret, setSecret]         = useState(() => generateSecret(4))
  const [attempt, setAttempt]       = useState([])
  const [attempts, setAttempts]     = useState(0)
  const [smudgeUsed, setSmudgeUsed] = useState(false)
  const [won, setWon]               = useState(false)
  const [gaveUp, setGaveUp]         = useState(false)
  const [shake, setShake]           = useState(false)
  const [revealStep, setRevealStep] = useState(0)

  // Animate the give-up reveal step by step
  useEffect(() => {
    if (!gaveUp) return
    if (revealStep >= secret.length) return
    const t = setTimeout(() => setRevealStep(s => s + 1), 500)
    return () => clearTimeout(t)
  }, [gaveUp, revealStep, secret.length])

  const revealed = gaveUp ? secret.slice(0, revealStep) : []

  // ── Actions ────────────────────────────────────────────────────────────────

  function startGame(newK) {
    setK(newK)
    setSecret(generateSecret(newK))
    setAttempt([])
    setAttempts(0)
    setSmudgeUsed(false)
    setWon(false)
    setGaveUp(false)
    setShake(false)
    setRevealStep(0)
  }

  function handleDotClick(idx) {
    if (won || gaveUp || shake) return
    if (attempt.includes(idx)) return
    setAttempt(prev => [...prev, idx])
  }

  function handleClear() {
    if (won || gaveUp) return
    setAttempt([])
  }

  function handleSubmit() {
    if (attempt.length !== k) return
    if (attempt.every((v, i) => v === secret[i])) {
      setWon(true)
    } else {
      setAttempts(a => a + 1)
      setShake(true)
      setTimeout(() => { setShake(false); setAttempt([]) }, 600)
    }
  }

  function handleGiveUp() {
    setGaveUp(true)
    setAttempt([])
    setRevealStep(0)
  }

  // ── Stats ──────────────────────────────────────────────────────────────────

  const total       = perm(9, k)
  const afterSmudge = factorial(k)
  const reduction   = Math.round((1 - afterSmudge / total) * 100)
  const totalFormula   = Array.from({ length: k }, (_, i) => 9 - i).join(' × ')
  const smudgeFormula  = Array.from({ length: k }, (_, i) => k - i).join(' × ')

  const disabled = won || gaveUp || shake

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <GamePageLayout title={t('common.games.pattern-lock-hacker')} emoji={t('patternLock.emoji')}>
      <p className="text-center text-gray-500 text-sm mb-1">{t('patternLock.subtitle')}</p>
      <p className="text-center text-gray-400 text-xs mb-6 max-w-xl mx-auto">{t('patternLock.howToPlay')}</p>

      {/* Length selector */}
      <div className="flex justify-center gap-2 mb-6">
        <span className="text-xs text-gray-400 self-center me-1 font-semibold uppercase tracking-wide">
          {t('patternLock.lengthLabel')}:
        </span>
        {LENGTHS.map(l => (
          <button
            key={l}
            onClick={() => startGame(l)}
            className={`w-9 h-9 rounded-xl font-extrabold text-sm transition-all ${
              k === l
                ? 'bg-violet-600 text-white shadow-md scale-110'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

        {/* Left: phone + grid */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-slate-800 rounded-3xl px-6 pt-4 pb-6 w-full flex flex-col items-center gap-3 shadow-xl">
            {/* Phone notch */}
            <div className="w-14 h-1.5 bg-slate-600 rounded-full" />

            <motion.div
              animate={shake ? { x: [-7, 7, -7, 7, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <PatternGrid
                attempt={attempt}
                secret={secret}
                smudgeUsed={smudgeUsed}
                won={won}
                revealed={revealed}
                onDotClick={handleDotClick}
                disabled={disabled}
              />
            </motion.div>

            {/* Status line inside phone */}
            <p className="text-slate-400 text-xs font-mono tracking-wide">
              {won
                ? `✓ ${t('patternLock.wonTitle')}`
                : gaveUp
                  ? t('patternLock.gaveUpMsg')
                  : t('patternLock.dotsCounter', { n: attempt.length, k })}
            </p>
          </div>

          {/* Action buttons */}
          {!won && !gaveUp && (
            <div className="flex gap-2 flex-wrap justify-center">
              <button
                onClick={handleSubmit}
                disabled={attempt.length !== k}
                className="bg-violet-600 text-white font-bold px-5 py-2 rounded-xl hover:bg-violet-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t('patternLock.submitBtn')}
              </button>
              <button
                onClick={handleClear}
                disabled={attempt.length === 0}
                className="bg-slate-100 text-slate-700 font-bold px-5 py-2 rounded-xl hover:bg-slate-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t('patternLock.clearBtn')}
              </button>
              <button
                onClick={handleGiveUp}
                className="bg-rose-50 text-rose-600 font-bold px-5 py-2 rounded-xl hover:bg-rose-100 transition-colors border border-rose-200"
              >
                {t('patternLock.giveUpBtn')}
              </button>
            </div>
          )}

          {won && (
            <button onClick={() => startGame(k)}
              className="bg-violet-600 text-white font-bold px-6 py-2 rounded-xl hover:bg-violet-700 transition-colors">
              {t('patternLock.playAgain')}
            </button>
          )}
          {gaveUp && (
            <button onClick={() => startGame(k)}
              className="bg-slate-600 text-white font-bold px-6 py-2 rounded-xl hover:bg-slate-700 transition-colors">
              {t('patternLock.tryAgain')}
            </button>
          )}
        </div>

        {/* Right: stats panel */}
        <div className="flex flex-col gap-3">

          {/* Attempts counter */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm px-5 py-4">
            <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-1">
              {t('patternLock.attemptsLabel')}
            </p>
            <p className="text-3xl font-extrabold text-slate-800">{attempts}</p>
            {won && (
              <p className="text-green-600 font-bold text-sm mt-1">
                🎉 {t('patternLock.wonTitle')}
              </p>
            )}
          </div>

          {/* Probability stats */}
          <div className="bg-violet-50 rounded-2xl border border-violet-100 px-5 py-4 space-y-3">
            <div>
              <p className="text-xs text-violet-400 uppercase tracking-wide font-semibold">
                {t('patternLock.possibleLabel')}
              </p>
              <p className="text-2xl font-extrabold text-violet-700">{total.toLocaleString()}</p>
              <p className="text-xs text-violet-400 font-mono mt-0.5">
                {totalFormula} = {total.toLocaleString()}
              </p>
            </div>

            {smudgeUsed ? (
              <div className="border-t border-violet-200 pt-3">
                <p className="text-xs text-amber-500 uppercase tracking-wide font-semibold">
                  {t('patternLock.afterSmudge')}
                </p>
                <p className="text-2xl font-extrabold text-amber-600">{afterSmudge.toLocaleString()}</p>
                <p className="text-xs text-amber-400 font-mono mt-0.5">
                  {smudgeFormula} = {afterSmudge.toLocaleString()}
                </p>
                <p className="text-xs text-amber-600 font-bold mt-1">
                  ↓ {reduction}% {t('patternLock.reductionLabel')}
                </p>
              </div>
            ) : (
              <button
                onClick={() => setSmudgeUsed(true)}
                disabled={won || gaveUp}
                className="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded-xl transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                🔍 {t('patternLock.smudgeBtn')}
              </button>
            )}
          </div>

          {/* Wrong attempt feedback */}
          <AnimatePresence>
            {attempts > 0 && !won && (
              <motion.div
                key="wrong"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 border border-red-100 rounded-2xl px-5 py-3 text-sm text-red-600"
              >
                {t('patternLock.wrongMsg', { n: attempts })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Win summary */}
          <AnimatePresence>
            {won && (
              <motion.div
                key="win"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-2xl px-5 py-4 text-sm"
              >
                <p className="font-bold text-green-700 text-base mb-1">🎉 {t('patternLock.wonTitle')}</p>
                <p className="text-green-600">
                  {t('patternLock.wonSummary', {
                    attempts,
                    total: total.toLocaleString(),
                    smudge: afterSmudge.toLocaleString(),
                  })}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ExplainerPanel
        accentColor="border-violet-400"
        title={t('patternLock.explainer.title')}
        body={t('patternLock.explainer.body')}
        example={t('patternLock.explainer.example')}
        callout={t('patternLock.explainer.callout')}
        furtherReading={t('patternLock.explainer.furtherReading')}
      />

      <QuizPanel questions={patternLockQuestions} accentColor="border-violet-400" />
      <GameSuggestions gameId="pattern-lock-hacker" />
    </GamePageLayout>
  )
}
