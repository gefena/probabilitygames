import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import mysteryMachineQuestions from '../quizzes/mysteryMachine'

const DIFFICULTY_CONFIG = {
  easy:   { numOutcomes: 2, budget: 100, minWeight: 2 },
  medium: { numOutcomes: 3, budget: 60,  minWeight: 1 },
  hard:   { numOutcomes: 4, budget: 40,  minWeight: 1 },
}

const OUTCOME_COLORS = ['#7C3AED', '#EC4899', '#F97316', '#10B981']
const OUTCOME_LABELS = ['A', 'B', 'C', 'D']

function generateMachine(difficulty) {
  const { numOutcomes, budget, minWeight } = DIFFICULTY_CONFIG[difficulty]
  let weights = Array.from({ length: numOutcomes }, () =>
    Math.floor(Math.random() * 9) + minWeight
  )
  // For easy, ensure no outcome < 20% by re-rolling until satisfied
  if (difficulty === 'easy') {
    const total = weights.reduce((s, w) => s + w, 0)
    while (weights.some(w => w / total < 0.2)) {
      weights = Array.from({ length: numOutcomes }, () =>
        Math.floor(Math.random() * 9) + minWeight
      )
    }
  }
  const total = weights.reduce((s, w) => s + w, 0)
  const outcomes = weights.map((w, i) => ({
    label: OUTCOME_LABELS[i],
    trueWeight: w,
    trueProb: w / total,
    color: OUTCOME_COLORS[i],
  }))
  const tally = Object.fromEntries(outcomes.map(o => [o.label, 0]))
  return { outcomes, budget, tally }
}

function sampleOutcome(outcomes) {
  const total = outcomes.reduce((s, o) => s + o.trueWeight, 0)
  let r = Math.random() * total
  for (const o of outcomes) {
    r -= o.trueWeight
    if (r <= 0) return o.label
  }
  return outcomes[outcomes.length - 1].label
}

export default function MysteryMachinePage() {
  const { t } = useTranslation()

  const [difficulty, setDifficulty] = useState(null)
  const [outcomes, setOutcomes] = useState([])
  const [budget, setBudget] = useState(0)
  const [tally, setTally] = useState({})
  const [phase, setPhase] = useState('playing')   // 'playing' | 'revealed'
  const [sliders, setSliders] = useState({})       // label → number (0–100)
  const [score, setScore] = useState(null)

  const totalObserved = useMemo(
    () => Object.values(tally).reduce((s, v) => s + v, 0),
    [tally]
  )
  const sliderTotal = useMemo(
    () => Object.values(sliders).reduce((s, v) => s + v, 0),
    [sliders]
  )

  function startGame(diff) {
    const { outcomes: o, budget: b, tally: tal } = generateMachine(diff)
    setDifficulty(diff)
    setOutcomes(o)
    setBudget(b)
    setTally(tal)
    setPhase('playing')
    setSliders(Object.fromEntries(o.map(out => [out.label, Math.floor(100 / o.length)])))
    setScore(null)
  }

  function produce(times = 1) {
    if (budget <= 0) return
    const actual = Math.min(times, budget)
    const newTally = { ...tally }
    for (let i = 0; i < actual; i++) {
      const label = sampleOutcome(outcomes)
      newTally[label] = (newTally[label] || 0) + 1
    }
    setTally(newTally)
    setBudget(b => b - actual)
  }

  function setSlider(label, value) {
    setSliders(prev => ({ ...prev, [label]: value }))
  }

  function submit() {
    if (sliderTotal !== 100) return
    // Score = 100 − average absolute error
    let totalError = 0
    for (const o of outcomes) {
      const guess = sliders[o.label] ?? 0
      const truth = Math.round(o.trueProb * 100)
      totalError += Math.abs(guess - truth)
    }
    const avgError = totalError / outcomes.length
    setScore(Math.max(0, Math.round(100 - avgError)))
    setPhase('revealed')
  }

  function scoreFeedback(s) {
    if (s >= 95) return t('mysteryMachine.perfect')
    if (s >= 80) return t('mysteryMachine.great')
    if (s >= 60) return t('mysteryMachine.good')
    return t('mysteryMachine.tryAgain')
  }

  function rowColor(diff) {
    if (diff < 5) return 'bg-emerald-50 text-emerald-700'
    if (diff <= 15) return 'bg-yellow-50 text-yellow-700'
    return 'bg-red-50 text-red-700'
  }

  const maxTallyCount = Math.max(1, ...Object.values(tally))

  return (
    <GamePageLayout title={t('mysteryMachine.title')} emoji="🔍">
      <p className="text-gray-500 mb-2 text-sm">{t('mysteryMachine.subtitle')}</p>
      <p className="text-center text-sm text-violet-600 font-medium mb-6 max-w-xl mx-auto">{t('mysteryMachine.howToPlay')}</p>

      {/* ── Difficulty Selector ──────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <h3 className="font-extrabold text-gray-700 mb-4">{t('mysteryMachine.difficulty')}</h3>
        <div className="flex gap-3 flex-wrap">
          {['easy', 'medium', 'hard'].map(d => (
            <button
              key={d}
              onClick={() => startGame(d)}
              className={`px-6 py-2.5 rounded-2xl font-extrabold transition-all shadow-sm ${
                difficulty === d
                  ? 'bg-indigo-600 text-white scale-105'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 active:scale-95'
              }`}
            >
              {t(`mysteryMachine.${d}`)}
            </button>
          ))}
        </div>
      </div>

      {difficulty && (
        <>
          {/* ── Tally Bars ──────────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="font-extrabold text-gray-700">{t('mysteryMachine.tallyTitle')}</h3>
              <span className="text-sm text-gray-500 font-semibold">
                {t('mysteryMachine.tallyTotal')}: <strong className="text-indigo-600">{totalObserved}</strong>
              </span>
            </div>

            {/* Count bars */}
            <div className="space-y-3 mb-6">
              {outcomes.map(o => {
                const count = tally[o.label] || 0
                const pct = totalObserved > 0 ? (count / totalObserved * 100).toFixed(1) : '0.0'
                const barWidth = totalObserved > 0 ? (count / maxTallyCount * 100) : 0
                return (
                  <div key={o.label}>
                    <div className="flex justify-between text-sm font-bold mb-1">
                      <span style={{ color: o.color }}>{t('mysteryMachine.outcome', { label: o.label })}</span>
                      <span className="text-gray-600 tabular-nums">{count} ({pct}%)</span>
                    </div>
                    <div className="h-5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        animate={{ width: `${barWidth}%` }}
                        transition={{ duration: 0.3 }}
                        style={{ background: o.color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={() => produce(1)}
                disabled={budget <= 0 || phase === 'revealed'}
                className="px-6 py-2.5 bg-indigo-600 text-white font-extrabold rounded-2xl shadow-sm hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-40"
              >
                {t('mysteryMachine.produce')}
              </button>
              <button
                onClick={() => produce(10)}
                disabled={budget <= 0 || phase === 'revealed'}
                className="px-4 py-2.5 bg-indigo-100 text-indigo-700 font-extrabold rounded-2xl hover:bg-indigo-200 active:scale-95 transition-all disabled:opacity-40"
              >
                {t('mysteryMachine.produce10')}
              </button>
              <div className="ms-auto text-sm font-semibold text-gray-500">
                {t('mysteryMachine.budget')}:{' '}
                <strong className={budget <= 10 ? 'text-red-600' : 'text-indigo-600'}>{budget}</strong>
              </div>
            </div>

            <AnimatePresence>
              {budget <= 10 && budget > 0 && phase === 'playing' && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 text-sm font-bold text-red-600 bg-red-50 rounded-xl px-3 py-2"
                >
                  {t('mysteryMachine.lowBudget', { n: budget })}
                </motion.p>
              )}
              {budget === 0 && phase === 'playing' && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-sm font-bold text-orange-600 bg-orange-50 rounded-xl px-3 py-2"
                >
                  {t('mysteryMachine.budgetEmpty')}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* ── Estimate Sliders ─────────────────────────────────────────── */}
          {phase === 'playing' && (
            <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-extrabold text-gray-700">{t('mysteryMachine.guessTitle')}</h3>
                <span className={`text-sm font-bold ${sliderTotal === 100 ? 'text-emerald-600' : 'text-orange-500'}`}>
                  {t('mysteryMachine.guessTotal')}: {sliderTotal}%
                </span>
              </div>

              <div className="space-y-5 mb-5">
                {outcomes.map(o => (
                  <div key={o.label}>
                    <div className="flex justify-between text-sm font-bold mb-1">
                      <span style={{ color: o.color }}>{t('mysteryMachine.outcome', { label: o.label })}</span>
                      <span className="text-gray-700 tabular-nums">{sliders[o.label] ?? 0}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={sliders[o.label] ?? 0}
                      onChange={e => setSlider(o.label, Number(e.target.value))}
                      className="w-full accent-indigo-600"
                      style={{ accentColor: o.color }}
                    />
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {sliderTotal !== 100 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-bold text-orange-600 mb-3"
                  >
                    {t('mysteryMachine.guessMustBe100')}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                onClick={submit}
                disabled={sliderTotal !== 100}
                className="w-full py-3 bg-indigo-600 text-white font-extrabold rounded-2xl shadow-sm hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-40"
              >
                {t('mysteryMachine.submit')}
              </button>
            </div>
          )}

          {/* ── Reveal ──────────────────────────────────────────────────── */}
          <AnimatePresence>
            {phase === 'revealed' && score !== null && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 shadow-sm mb-6"
              >
                {/* Score */}
                <div className="text-center mb-6">
                  <p className="text-gray-500 text-sm mb-1">{t('mysteryMachine.scoreTitle')}</p>
                  <p className="text-6xl font-extrabold text-indigo-600 tabular-nums">{score}</p>
                  <p className="text-lg font-bold text-gray-700 mt-1">{scoreFeedback(score)}</p>
                </div>

                {/* Comparison table */}
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm text-center">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-2 px-3 text-start font-extrabold text-gray-600">{t('mysteryMachine.tableOutput')}</th>
                        <th className="py-2 px-3 font-extrabold text-gray-600">{t('mysteryMachine.yourGuess')}</th>
                        <th className="py-2 px-3 font-extrabold text-gray-600">{t('mysteryMachine.trueValue')}</th>
                        <th className="py-2 px-3 font-extrabold text-gray-600">{t('mysteryMachine.difference')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {outcomes.map(o => {
                        const guess = sliders[o.label] ?? 0
                        const truth = Math.round(o.trueProb * 100)
                        const diff = Math.abs(guess - truth)
                        return (
                          <tr key={o.label} className={`rounded-xl ${rowColor(diff)}`}>
                            <td className="py-2 px-3 text-start font-extrabold" style={{ color: o.color }}>
                              {t('mysteryMachine.outcome', { label: o.label })}
                            </td>
                            <td className="py-2 px-3 font-bold tabular-nums">{guess}%</td>
                            <td className="py-2 px-3 font-bold tabular-nums">{truth}%</td>
                            <td className="py-2 px-3 font-bold tabular-nums">{diff}pp</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                <button
                  onClick={() => startGame(difficulty)}
                  className="w-full py-3 bg-indigo-600 text-white font-extrabold rounded-2xl shadow-sm hover:bg-indigo-700 active:scale-95 transition-all"
                >
                  {t('mysteryMachine.playAgain')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* ── Explainer ────────────────────────────────────────────────────── */}
      <ExplainerPanel
        accentColor="border-indigo-400"
        title={t('mysteryMachine.explainer.title')}
        body={t('mysteryMachine.explainer.body')}
        example={t('mysteryMachine.explainer.example')}
        callout={t('mysteryMachine.explainer.callout')}
        furtherReading={t('mysteryMachine.explainer.furtherReading')}
      />

      {/* ── Quiz ─────────────────────────────────────────────────────────── */}
      <QuizPanel questions={mysteryMachineQuestions} accentColor="border-indigo-400" />
    </GamePageLayout>
  )
}
