import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import higherOrLowerQuestions from '../quizzes/higherOrLower'
import { usePersonalBest } from '../hooks/usePersonalBest'
import PersonalBestBadge from '../components/PersonalBestBadge'
import GameSuggestions from '../components/GameSuggestions'

// ── Pip layouts ───────────────────────────────────────────────────────────────
const PIP_LAYOUTS = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
}

function DieFace({ value, shaking, size = 'lg' }) {
  const pips = PIP_LAYOUTS[value] ?? []
  const sizeClass = size === 'lg' ? 'w-20 h-20' : 'w-14 h-14'
  const pipSize = size === 'lg' ? 'w-3.5 h-3.5' : 'w-2.5 h-2.5'
  return (
    <motion.div
      animate={shaking ? { x: [0, -6, 6, -5, 5, 0] } : { x: 0 }}
      transition={{ duration: 0.35 }}
      className={`${sizeClass} rounded-2xl border-4 border-gray-300 bg-white shadow-lg relative select-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/60`}
    >
      <div className="absolute inset-0 p-2 grid grid-cols-3 grid-rows-3 gap-0">
        {Array.from({ length: 9 }, (_, idx) => {
          const row = Math.floor(idx / 3)
          const col = idx % 3
          const hasPip = pips.some(([r, c]) => r === row && c === col)
          return (
            <div key={idx} className="flex items-center justify-center">
              {hasPip && <div className={`${pipSize} rounded-full bg-gray-800`} />}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

// ── Probability math ──────────────────────────────────────────────────────────
function singleOdds(f) {
  return {
    higher: (6 - f) / 6,
    equal: 1 / 6,
    lower: (f - 1) / 6,
  }
}

// Two-dice sum distribution: P(sum=k) for k=2..12
const TWO_DICE_DIST = (() => {
  const dist = {}
  for (let d1 = 1; d1 <= 6; d1++) {
    for (let d2 = 1; d2 <= 6; d2++) {
      const s = d1 + d2
      dist[s] = (dist[s] || 0) + 1 / 36
    }
  }
  return dist
})()

function twoOdds(sum) {
  let higher = 0, lower = 0, equal = 0
  for (let s = 2; s <= 12; s++) {
    if (s > sum) higher += TWO_DICE_DIST[s]
    else if (s < sum) lower += TWO_DICE_DIST[s]
    else equal = TWO_DICE_DIST[s]
  }
  return { higher, lower, equal }
}

function rollD6() { return Math.floor(Math.random() * 6) + 1 }
function toFrac36(prob) {
  const n = Math.round(prob * 36)
  return `${n}/36`
}
function toFrac6(prob) {
  const n = Math.round(prob * 6)
  return `${n}/6`
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HigherOrLowerPage() {
  const { t } = useTranslation()

  const [phase, setPhase] = useState('idle')            // idle | guessing | result
  const [gameMode, setGameMode] = useState('single')    // single | double
  const [dice, setDice] = useState([rollD6()])          // [face] or [d1, d2]
  const [streak, setStreak] = useState(0)
  const { best, setBestIfHigher, isNew: isBestNew } = usePersonalBest('higher-or-lower')
  const [outcome, setOutcome] = useState(null)          // 'correct' | 'wrong' | 'push'
  const [showLevelUp, setShowLevelUp] = useState(false)

  // Double-or-nothing state
  const [betPicking, setBetPicking] = useState(false)
  const [betValue, setBetValue] = useState(null)

  const currentValue = dice.reduce((a, b) => a + b, 0)
  const isDouble = gameMode === 'double'

  const p = isDouble ? twoOdds(currentValue) : singleOdds(currentValue)
  const isGuessing = phase !== 'idle'

  function handleGuess(direction) {
    if (phase !== 'idle' || betPicking) return
    setPhase('guessing')
    setTimeout(() => {
      const newDice = isDouble ? [rollD6(), rollD6()] : [rollD6()]
      const newValue = newDice.reduce((a, b) => a + b, 0)
      const actual = newValue > currentValue ? 'higher' : newValue < currentValue ? 'lower' : 'equal'
      const isPush = actual === 'equal'
      const isCorrect = !isPush && actual === direction

      setDice(newDice)
      setOutcome(isPush ? 'push' : isCorrect ? 'correct' : 'wrong')
      setPhase('result')

      let nextStreak = streak
      if (isCorrect) {
        nextStreak = streak + 1
        setStreak(nextStreak)
        setBestIfHigher(nextStreak)
        // Level up to double at streak 5 (only once per session)
        if (nextStreak === 5 && gameMode === 'single') {
          setShowLevelUp(true)
          setTimeout(() => {
            setShowLevelUp(false)
            setGameMode('double')
          }, 2200)
        }
      } else if (!isPush) {
        setStreak(0)
      }

      setTimeout(() => {
        setOutcome(null)
        setPhase('idle')
      }, 1500)
    }, 350)
  }

  function handleBetGuess() {
    if (phase !== 'idle' || betValue === null) return
    setPhase('guessing')
    setBetPicking(false)
    setTimeout(() => {
      const newDice = isDouble ? [rollD6(), rollD6()] : [rollD6()]
      const newValue = newDice.reduce((a, b) => a + b, 0)
      const isHit = newValue === betValue

      setDice(newDice)
      setOutcome(isHit ? 'correct' : 'wrong')
      setPhase('result')

      if (isHit) {
        const doubled = streak * 2
        setStreak(doubled)
        setBestIfHigher(doubled)
        setOutcome('bet-win')
      } else {
        setStreak(0)
        setOutcome('bet-lose')
      }
      setBetValue(null)

      setTimeout(() => {
        setOutcome(null)
        setPhase('idle')
      }, 2000)
    }, 350)
  }

  const outcomeColors = {
    correct: 'bg-green-100 text-green-700',
    wrong: 'bg-red-100 text-red-700',
    push: 'bg-amber-100 text-amber-700',
    'bet-win': 'bg-emerald-100 text-emerald-700',
    'bet-lose': 'bg-red-100 text-red-700',
  }
  const outcomeMsg = {
    correct: t('higherOrLower.correct'),
    wrong: t('higherOrLower.wrong'),
    push: t('higherOrLower.push'),
    'bet-win': t('higherOrLower.bet.win'),
    'bet-lose': t('higherOrLower.bet.lose'),
  }

  // Bet range
  const betRange = isDouble
    ? Array.from({ length: 11 }, (_, i) => i + 2)
    : [1, 2, 3, 4, 5, 6]

  // Exact-match probability for selected bet value
  const betProb = betValue !== null
    ? (isDouble ? TWO_DICE_DIST[betValue] : 1 / 6)
    : null

  return (
    <GamePageLayout title={t('common.games.higher-or-lower')} emoji={t('higherOrLower.emoji')}>
      <p className="text-gray-500 mb-2 text-sm">{t('higherOrLower.subtitle')}</p>
      <p className="text-center text-sm text-indigo-600 font-medium mb-6 max-w-xl mx-auto">
        {isDouble ? t('higherOrLower.twoMode.subtitle') : t('higherOrLower.howToPlay')}
      </p>

      {/* ── Level Up banner ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-indigo-600 text-white text-2xl font-extrabold px-10 py-6 rounded-3xl shadow-2xl text-center">
              {t('higherOrLower.levelUp')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Streak banner ────────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="flex justify-center gap-6 bg-gray-50 rounded-2xl py-3 px-6 max-w-xs w-full">
          <span className="font-extrabold text-indigo-600">{t('higherOrLower.streak', { n: streak })}</span>
          <span className="text-gray-300">│</span>
          <span className="font-extrabold text-gray-500">{t('higherOrLower.best', { n: best })}</span>
        </div>
        <PersonalBestBadge best={best} isNew={isBestNew} />
      </div>

      {/* ── Dice display ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex gap-4 justify-center">
          {dice.map((face, i) => (
            <DieFace key={i} value={face} shaking={phase === 'guessing'} size={isDouble ? 'md' : 'lg'} />
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2 font-medium">
          {isDouble
            ? t('higherOrLower.twoMode.currentSum', { n: currentValue })
            : t('higherOrLower.currentRoll', { n: currentValue })}
        </p>
      </div>

      {/* ── Odds panel ───────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mb-6 max-w-sm mx-auto border border-slate-200/60">
        {isDouble ? (
          // Two-dice histogram
          <>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 text-center">
              {t('higherOrLower.oddsHigher')} / {t('higherOrLower.oddsEqual')} / {t('higherOrLower.oddsLower')}
            </p>
            <div className="flex items-end gap-0.5 h-16 mb-1">
              {Array.from({ length: 11 }, (_, i) => i + 2).map(s => {
                const prob = TWO_DICE_DIST[s]
                const heightPct = Math.round((prob / (6/36)) * 100)
                const isHigher = s > currentValue
                const isLower = s < currentValue
                const isEqual = s === currentValue
                const barColor = isHigher ? 'bg-indigo-400' : isLower ? 'bg-rose-400' : 'bg-amber-400'
                return (
                  <div key={s} className="flex-1 flex flex-col items-center gap-0.5">
                    <div className="w-full flex flex-col justify-end" style={{ height: '48px' }}>
                      <div
                        className={`w-full rounded-t-sm transition-all ${barColor} ${isEqual ? 'opacity-100' : 'opacity-70'}`}
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className={`text-[9px] font-bold ${isEqual ? 'text-amber-600' : 'text-gray-400'}`}>{s}</span>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between text-xs mt-2">
              <span className="text-indigo-500 font-semibold">{t('higherOrLower.twoMode.oddsHigher')}: {Math.round(p.higher * 100)}%</span>
              <span className="text-amber-500 font-semibold">{t('higherOrLower.twoMode.oddsEqual')}: {Math.round(p.equal * 100)}%</span>
              <span className="text-rose-500 font-semibold">{t('higherOrLower.twoMode.oddsLower')}: {Math.round(p.lower * 100)}%</span>
            </div>
          </>
        ) : (
          // Single die bar segments
          [
            { label: t('higherOrLower.oddsHigher'), prob: p.higher, num: 6 - currentValue, color: 'bg-indigo-500' },
            { label: t('higherOrLower.oddsEqual'),  prob: p.equal,  num: 1,                color: 'bg-gray-400' },
            { label: t('higherOrLower.oddsLower'),  prob: p.lower,  num: currentValue - 1, color: 'bg-rose-400' },
          ].map(({ label, prob, num, color }) => (
            <div key={label} className="flex items-center gap-3 mb-2 last:mb-0">
              <span className="w-20 text-xs font-semibold text-gray-600 flex-shrink-0">{label}</span>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${color}`}
                  style={{ width: `${Math.round(prob * 100)}%` }}
                />
              </div>
              <span className="w-20 text-xs text-gray-500 flex-shrink-0 text-right">
                {num}/6 = {Math.round(prob * 100)}%
              </span>
            </div>
          ))
        )}
      </div>

      {/* ── Result feedback ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {phase === 'result' && outcome && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`rounded-2xl p-4 mb-6 text-center max-w-sm mx-auto ${outcomeColors[outcome]}`}
          >
            <p className="font-extrabold text-lg">{outcomeMsg[outcome]}</p>
            {outcome === 'push' && (
              <p className="text-sm mt-1 font-medium">{t('higherOrLower.pushHint')}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Double-or-nothing picker ─────────────────────────────────────────── */}
      <AnimatePresence>
        {betPicking && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mb-6 max-w-sm mx-auto border border-indigo-200"
          >
            <p className="text-sm font-semibold text-gray-600 mb-3 text-center">{t('higherOrLower.bet.prompt')}</p>
            <div className="flex flex-wrap gap-2 justify-center mb-3">
              {betRange.map(v => {
                return (
                  <button
                    key={v}
                    onClick={() => setBetValue(v)}
                    className={`w-12 py-2 rounded-xl font-bold text-sm transition-all border-2 ${
                      betValue === v
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-indigo-300'
                    }`}
                  >
                    {v}
                  </button>
                )
              })}
            </div>
            {betValue !== null && (
              <p className="text-center text-xs text-gray-500 mb-3">
                {t('higherOrLower.bet.chance', {
                  frac: isDouble ? toFrac36(betProb) : toFrac6(betProb)
                })}
              </p>
            )}
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleBetGuess}
                disabled={betValue === null}
                className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl disabled:opacity-40 hover:bg-indigo-700 transition-colors"
              >
                {t('higherOrLower.bet.button')}
              </button>
              <button
                onClick={() => { setBetPicking(false); setBetValue(null) }}
                className="px-6 py-2 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                {t('higherOrLower.bet.cancel')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Guess buttons ─────────────────────────────────────────────────────── */}
      {!betPicking && (
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleGuess('higher')}
              disabled={isGuessing || currentValue === (isDouble ? 12 : 6)}
              className="px-8 py-3 bg-indigo-600 text-white font-extrabold text-lg rounded-2xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-40"
            >
              {t('higherOrLower.higherBtn')}
            </button>
            <button
              onClick={() => handleGuess('lower')}
              disabled={isGuessing || currentValue === (isDouble ? 2 : 1)}
              className="px-8 py-3 bg-rose-500 text-white font-extrabold text-lg rounded-2xl shadow-md hover:bg-rose-600 active:scale-95 transition-all disabled:opacity-40"
            >
              {t('higherOrLower.lowerBtn')}
            </button>
          </div>
          {/* Double-or-nothing button */}
          {streak >= 3 && phase === 'idle' && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setBetPicking(true)}
              className="px-6 py-2 bg-amber-500 text-white font-bold rounded-2xl text-sm shadow-sm hover:bg-amber-600 active:scale-95 transition-all"
            >
              🎯 {t('higherOrLower.bet.button')}
            </motion.button>
          )}
        </div>
      )}

      {/* ── Explainer + Quiz ──────────────────────────────────────────────────── */}
      <ExplainerPanel
        accentColor="border-indigo-600"
        title={t('higherOrLower.explainer.title')}
        body={t('higherOrLower.explainer.body')}
        example={t('higherOrLower.explainer.example')}
        callout={t('higherOrLower.explainer.callout')}
        furtherReading={t('higherOrLower.explainer.furtherReading')}
      />
      {isDouble && (
        <ExplainerPanel
          accentColor="border-indigo-400"
          title={t('higherOrLower.explainer.sumTitle')}
          body={t('higherOrLower.explainer.sumBody')}
        />
      )}

      <QuizPanel questions={higherOrLowerQuestions} accentColor="border-indigo-600" />
      <GameSuggestions gameId="higher-or-lower" />
    </GamePageLayout>
  )
}
