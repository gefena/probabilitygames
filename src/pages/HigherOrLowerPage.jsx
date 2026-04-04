import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import higherOrLowerQuestions from '../quizzes/higherOrLower'
import { usePersonalBest } from '../hooks/usePersonalBest'
import PersonalBestBadge from '../components/PersonalBestBadge'

// ── Pip layouts ───────────────────────────────────────────────────────────────
const PIP_LAYOUTS = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
}

function DieFace({ value, shaking }) {
  const pips = PIP_LAYOUTS[value] ?? []
  return (
    <motion.div
      animate={shaking ? { x: [0, -6, 6, -5, 5, 0] } : { x: 0 }}
      transition={{ duration: 0.35 }}
      className="w-20 h-20 rounded-2xl border-4 border-gray-300 bg-white shadow-lg relative select-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/60"
    >
      <div className="absolute inset-0 p-2 grid grid-cols-3 grid-rows-3 gap-0">
        {Array.from({ length: 9 }, (_, idx) => {
          const row = Math.floor(idx / 3)
          const col = idx % 3
          const hasPip = pips.some(([r, c]) => r === row && c === col)
          return (
            <div key={idx} className="flex items-center justify-center">
              {hasPip && <div className="w-3.5 h-3.5 rounded-full bg-gray-800" />}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

// ── Probability ───────────────────────────────────────────────────────────────
function odds(f) {
  return {
    higher: (6 - f) / 6,
    equal: 1 / 6,
    lower: (f - 1) / 6,
  }
}

function frac(numerator) {
  return `${numerator}/6`
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HigherOrLowerPage() {
  const { t } = useTranslation()

  const [phase, setPhase] = useState('idle')            // idle | guessing | result
  const [currentFace, setCurrentFace] = useState(() => Math.floor(Math.random() * 6) + 1)
  const [streak, setStreak] = useState(0)
  const { best, setBestIfHigher, isNew: isBestNew } = usePersonalBest('higher-or-lower')
  const [outcome, setOutcome] = useState(null)          // 'correct' | 'wrong' | 'push'

  function handleGuess(direction) {
    if (phase !== 'idle') return
    setPhase('guessing')
    setTimeout(() => {
      const nextFace = Math.floor(Math.random() * 6) + 1
      const actual = nextFace > currentFace ? 'higher' : nextFace < currentFace ? 'lower' : 'equal'
      const isPush = actual === 'equal'
      const isCorrect = !isPush && actual === direction

      setCurrentFace(nextFace)
      setOutcome(isPush ? 'push' : isCorrect ? 'correct' : 'wrong')
      setPhase('result')

      if (isCorrect) {
        const next = streak + 1
        setStreak(next)
        setBestIfHigher(next)
      } else if (!isPush) {
        setStreak(0)
      }

      setTimeout(() => {
        setOutcome(null)
        setPhase('idle')
      }, 1500)
    }, 350)
  }

  const p = odds(currentFace)
  const isGuessing = phase !== 'idle'

  const outcomeColors = {
    correct: 'bg-green-100 text-green-700',
    wrong: 'bg-red-100 text-red-700',
    push: 'bg-amber-100 text-amber-700',
  }

  return (
    <GamePageLayout title={t('common.games.higher-or-lower')} emoji={t('higherOrLower.emoji')}>
      <p className="text-gray-500 mb-2 text-sm">{t('higherOrLower.subtitle')}</p>
      <p className="text-center text-sm text-indigo-600 font-medium mb-6 max-w-xl mx-auto">
        {t('higherOrLower.howToPlay')}
      </p>

      {/* ── Streak banner ────────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="flex justify-center gap-6 bg-gray-50 rounded-2xl py-3 px-6 max-w-xs w-full">
          <span className="font-extrabold text-indigo-600">{t('higherOrLower.streak', { n: streak })}</span>
          <span className="text-gray-300">│</span>
          <span className="font-extrabold text-gray-500">{t('higherOrLower.best', { n: best })}</span>
        </div>
        <PersonalBestBadge best={best} isNew={isBestNew} />
      </div>

      {/* ── Die ──────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center mb-6">
        <DieFace value={currentFace} shaking={phase === 'guessing'} />
        <p className="text-sm text-gray-500 mt-2 font-medium">
          {t('higherOrLower.currentRoll', { n: currentFace })}
        </p>
      </div>

      {/* ── Odds panel ───────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mb-6 max-w-sm mx-auto border border-slate-200/60">
        {[
          { label: t('higherOrLower.oddsHigher'), prob: p.higher, num: 6 - currentFace, color: 'bg-indigo-500' },
          { label: t('higherOrLower.oddsEqual'),  prob: p.equal,  num: 1,               color: 'bg-gray-400' },
          { label: t('higherOrLower.oddsLower'),  prob: p.lower,  num: currentFace - 1, color: 'bg-rose-400' },
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
              {frac(num)} = {Math.round(prob * 100)}%
            </span>
          </div>
        ))}
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
            <p className="font-extrabold text-lg">
              {outcome === 'correct' ? t('higherOrLower.correct')
                : outcome === 'wrong' ? t('higherOrLower.wrong')
                : t('higherOrLower.push')}
            </p>
            {outcome === 'push' && (
              <p className="text-sm mt-1 font-medium">{t('higherOrLower.pushHint')}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Guess buttons ─────────────────────────────────────────────────────── */}
      <div className="flex gap-4 justify-center mb-8">
        <button
          onClick={() => handleGuess('higher')}
          disabled={isGuessing || currentFace === 6}
          className="px-8 py-3 bg-indigo-600 text-white font-extrabold text-lg rounded-2xl shadow-md hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-40"
        >
          {t('higherOrLower.higherBtn')}
        </button>
        <button
          onClick={() => handleGuess('lower')}
          disabled={isGuessing || currentFace === 1}
          className="px-8 py-3 bg-rose-500 text-white font-extrabold text-lg rounded-2xl shadow-md hover:bg-rose-600 active:scale-95 transition-all disabled:opacity-40"
        >
          {t('higherOrLower.lowerBtn')}
        </button>
      </div>

      {/* ── Explainer + Quiz ──────────────────────────────────────────────────── */}
      <ExplainerPanel
        accentColor="border-indigo-600"
        title={t('higherOrLower.explainer.title')}
        body={t('higherOrLower.explainer.body')}
        example={t('higherOrLower.explainer.example')}
        callout={t('higherOrLower.explainer.callout')}
        furtherReading={t('higherOrLower.explainer.furtherReading')}
      />

      <QuizPanel questions={higherOrLowerQuestions} accentColor="border-indigo-600" />
    </GamePageLayout>
  )
}
