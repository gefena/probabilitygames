import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import coinFlipQuestions from '../quizzes/coinFlip'
import { usePersonalBest } from '../hooks/usePersonalBest'
import PersonalBestBadge from '../components/PersonalBestBadge'
import GameSuggestions from '../components/GameSuggestions'

const MULTIPLIERS = [1, 10, 100]

function flipMany(n) {
  let h = 0
  for (let i = 0; i < n; i++) if (Math.random() < 0.5) h++
  return { heads: h, tails: n - h }
}

function getCurrentStreak(history) {
  if (history.length === 0) return { type: null, length: 0 }
  const last = history[history.length - 1]
  let len = 0
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i] === last) len++
    else break
  }
  return { type: last, length: len }
}

export default function CoinFlipPage() {
  const { t } = useTranslation()
  const historyEndRef = useRef(null)
  const cancelledRef = useRef(false)

  // mode
  const [mode, setMode] = useState('lab') // 'lab' | 'streak'

  // lab state
  const [heads, setHeads] = useState(0)
  const [tails, setTails] = useState(0)
  const [lastResult, setLastResult] = useState(null)
  const [flipping, setFlipping] = useState(false)
  const [mult, setMult] = useState(1)
  const [animKey, setAnimKey] = useState(0)

  // streak state
  const { best: streakPb, setBestIfHigher: setStreakPb, isNew: isStreakPbNew } = usePersonalBest('coin-flip-streak')
  const [flipHistory, setFlipHistory] = useState([])
  const [prediction, setPrediction] = useState(null) // null | 'continues' | 'breaks'
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null) // null | 'correct' | 'wrong'
  const [streakLengths, setStreakLengths] = useState({})

  useEffect(() => {
    if (mode === 'streak') {
      historyEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [flipHistory, mode])

  const total = heads + tails
  const headsPercent = total > 0 ? ((heads / total) * 100).toFixed(1) : '0.0'
  const currentStreak = getCurrentStreak(flipHistory)

  const switchMode = (newMode) => {
    if (newMode === mode) return
    cancelledRef.current = true
    setMode(newMode)
    setFlipping(false)
    if (newMode === 'streak') {
      setFlipHistory([])
      setPrediction(null)
      setScore(0)
      setFeedback(null)
      setStreakLengths({})
    } else {
      setHeads(0); setTails(0); setLastResult(null); setAnimKey(0)
    }
  }

  // ── Lab flip ──────────────────────────────────────────────
  const labFlip = useCallback(() => {
    if (flipping) return
    if (mult === 1) {
      cancelledRef.current = false
      setFlipping(true)
      setAnimKey(k => k + 1)
      setTimeout(() => {
        if (cancelledRef.current) return
        const result = Math.random() < 0.5 ? 'heads' : 'tails'
        setLastResult(result)
        if (result === 'heads') setHeads(h => h + 1)
        else setTails(t => t + 1)
        setFlipping(false)
      }, 600)
    } else {
      const { heads: h, tails: ta } = flipMany(mult)
      setHeads(prev => prev + h)
      setTails(prev => prev + ta)
      setLastResult(null)
    }
  }, [flipping, mult])

  const resetLab = () => { setHeads(0); setTails(0); setLastResult(null); setAnimKey(0) }

  // ── Streak flip ───────────────────────────────────────────
  const streakFlip = useCallback(() => {
    if (flipping) return
    // Require prediction if there is an existing streak to predict about
    if (flipHistory.length > 0 && prediction === null) return

    const prevHistory = flipHistory
    const prevPrediction = prediction

    cancelledRef.current = false
    setFlipping(true)
    setAnimKey(k => k + 1)

    setTimeout(() => {
      if (cancelledRef.current) return
      const result = Math.random() < 0.5 ? 'H' : 'T'
      const newHistory = [...prevHistory, result].slice(-100)

      // Record ended streak
      const prevStreak = getCurrentStreak(prevHistory)
      if (prevStreak.length > 0 && result !== prevStreak.type) {
        setStreakLengths(sl => ({
          ...sl,
          [prevStreak.length]: (sl[prevStreak.length] || 0) + 1,
        }))
      }

      setFlipHistory(newHistory)

      // Evaluate prediction (only if there was a streak to predict)
      if (prevHistory.length > 0 && prevPrediction !== null) {
        const streakContinues = result === prevStreak.type
        const correct =
          (prevPrediction === 'continues' && streakContinues) ||
          (prevPrediction === 'breaks' && !streakContinues)

        setFeedback(correct ? 'correct' : 'wrong')
        if (correct) { setScore(s => { const next = s + 1; setStreakPb(next); return next }) }
      }

      setFlipping(false)

      setTimeout(() => {
        if (cancelledRef.current) return
        setFeedback(null)
        setPrediction(null)
      }, 1200)
    }, 600)
  }, [flipping, flipHistory, prediction])

  const chartData = [
    { name: t('coin.heads'), value: heads, fill: '#7C3AED' },
    { name: t('coin.tails'), value: tails, fill: '#EC4899' },
  ]

  const streakChartData = Object.entries(streakLengths)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([length, count]) => ({ length: Number(length), count }))

  const flipDisabledInStreak = flipping || (flipHistory.length > 0 && prediction === null)

  return (
    <GamePageLayout title={t('common.games.coin-flip')} emoji="🪙">

      {/* Mode toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex rounded-xl overflow-hidden border border-violet-200">
          {(['lab', 'streak']).map(m => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`px-5 py-2 font-bold text-sm transition-colors ${mode === m ? 'bg-violet-600 text-white' : 'bg-white text-violet-600 hover:bg-violet-50'}`}
            >
              {m === 'lab' ? t('coin.streak.modeLab') : t('coin.streak.modeStreak')}
            </button>
          ))}
        </div>
      </div>

      {mode === 'lab' && (
        <>
          <p className="text-gray-500 mb-6 text-sm">{t('coin.instructions')}</p>

          {/* Coin */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="perspective-500">
              <AnimatePresence mode="wait">
                <motion.div
                  key={animKey}
                  animate={flipping ? { rotateY: [0, 360, 720, 1080] } : {}}
                  transition={{ duration: 0.55, ease: 'easeInOut' }}
                  className="w-36 h-36 rounded-full flex items-center justify-center text-6xl shadow-xl select-none"
                  style={{
                    background: lastResult === 'tails'
                      ? 'linear-gradient(135deg,#EC4899,#F97316)'
                      : 'linear-gradient(135deg,#7C3AED,#3B82F6)',
                  }}
                >
                  {lastResult === 'tails' ? '🌿' : '👑'}
                </motion.div>
              </AnimatePresence>
            </div>

            {lastResult && (
              <motion.p
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-2xl font-extrabold text-violet-700"
              >
                {t(`coin.result_${lastResult}`)}
              </motion.p>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 px-2">
            <div className="flex rounded-xl overflow-hidden border border-violet-200">
              {MULTIPLIERS.map(m => (
                <button
                  key={m}
                  onClick={() => setMult(m)}
                  className={`px-4 py-2 font-bold text-sm transition-colors ${mult === m ? 'bg-violet-600 text-white' : 'bg-white text-violet-600 hover:bg-violet-50'}`}
                >
                  ×{m}
                </button>
              ))}
            </div>
            <button
              onClick={labFlip}
              disabled={flipping}
              className="px-8 py-3 bg-violet-600 text-white font-extrabold text-lg rounded-2xl shadow-md hover:bg-violet-700 active:scale-95 transition-all disabled:opacity-50"
            >
              {t('coin.flip')}
            </button>
            <button
              onClick={resetLab}
              className="px-5 py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
            >
              {t('coin.reset')}
            </button>
          </div>

          {/* Explainer */}
          <ExplainerPanel
            accentColor="border-violet-400"
            title={t('explainer.coin.title')}
            body={t('explainer.coin.body')}
            example={
              total === 0
                ? t('explainer.coin.exampleZero')
                : t('explainer.coin.exampleLive', { n: total, pct: headsPercent })
            }
            visual={
              <div className="relative h-6 rounded-full overflow-hidden bg-gray-100">
                <div
                  className="absolute inset-y-0 start-0 bg-violet-500 transition-all duration-300"
                  style={{ width: total === 0 ? '50%' : `${headsPercent}%` }}
                />
                <div
                  className="absolute inset-y-0 end-0 bg-pink-400 transition-all duration-300"
                  style={{ width: total === 0 ? '50%' : `${(100 - parseFloat(headsPercent)).toFixed(1)}%` }}
                />
                <div className="absolute inset-y-0 start-1/2 w-px bg-white opacity-80 border-s border-dashed border-gray-400" />
                <div className="absolute inset-0 flex justify-between items-center px-2 text-white text-xs font-bold pointer-events-none">
                  <span>{t('coin.heads')}</span>
                  <span>{t('coin.tails')}</span>
                </div>
              </div>
            }
            furtherReading={t('explainer.coin.furtherReading')}
          />

          <QuizPanel questions={coinFlipQuestions} accentColor="border-violet-400" />

          {/* Stats + Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/60">
              <h3 className="font-extrabold text-gray-700 mb-4 text-lg">{t('coin.totalFlips')}: <span className="text-violet-600">{total}</span></h3>
              <div className="space-y-2">
                {[
                  { label: t('coin.headsCount'), val: heads, color: 'text-violet-600' },
                  { label: t('coin.tailsCount'), val: tails, color: 'text-pink-500' },
                  { label: t('coin.headsPercent'), val: `${headsPercent}%`, color: 'text-violet-700' },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">{row.label}</span>
                    <span className={`font-extrabold text-lg ${row.color}`}>{row.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/60">
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <ReferenceLine y={total / 2} stroke="#9CA3AF" strokeDasharray="4 2" label={{ value: '50%', position: 'right', fontSize: 11 }} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {mode === 'streak' && (
        <div className="flex flex-col gap-6">

          {/* Current streak */}
          <div className="bg-white rounded-3xl p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-center border border-slate-200/60">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {t('coin.streak.currentStreak')}
            </p>
            {currentStreak.length > 0 ? (
              <motion.p
                key={`${currentStreak.type}-${currentStreak.length}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl font-extrabold text-violet-700"
              >
                🔥 {currentStreak.type === 'H' ? t('coin.heads') : t('coin.tails')} × {currentStreak.length}
              </motion.p>
            ) : (
              <p className="text-gray-400 font-medium">{t('coin.streak.noStreak')}</p>
            )}
          </div>

          {/* Flip history */}
          <div className="bg-white rounded-3xl p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/60">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {t('coin.streak.history')}
            </p>
            <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto rounded-lg bg-gray-50 p-2 min-h-10">
              {flipHistory.length === 0 ? (
                <span className="text-gray-300 text-sm self-center ps-1">{t('coin.streak.historyEmpty')}</span>
              ) : (
                flipHistory.map((f, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm flex-shrink-0 ${f === 'H' ? 'bg-violet-500' : 'bg-pink-400'}`}
                  />
                ))
              )}
              <div ref={historyEndRef} />
            </div>
            <div className="flex gap-4 mt-2 text-xs text-gray-400">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-violet-500 inline-block" /> {t('coin.heads')}</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-pink-400 inline-block" /> {t('coin.tails')}</span>
            </div>
          </div>

          {/* Prediction + Flip */}
          <div className="bg-white rounded-3xl p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col gap-4 items-center border border-slate-200/60">
            {flipHistory.length > 0 && (
              <div className="w-full">
                <p className="text-sm font-semibold text-gray-500 text-center mb-3">
                  {t('coin.streak.predictionPrompt')}
                </p>
                <div className="flex gap-3 justify-center">
                  {['continues', 'breaks'].map(p => (
                    <button
                      key={p}
                      onClick={() => !flipping && setPrediction(p)}
                      disabled={prediction !== null || flipping}
                      className={`px-5 py-2 rounded-xl font-bold text-sm transition-colors border-2 ${
                        prediction === p
                          ? 'bg-violet-600 border-violet-600 text-white'
                          : 'bg-white border-violet-200 text-violet-700 hover:bg-violet-50'
                      } disabled:opacity-50`}
                    >
                      {p === 'continues' ? t('coin.streak.continues') : t('coin.streak.breaks')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={streakFlip}
              disabled={flipDisabledInStreak}
              className="px-10 py-3 bg-violet-600 text-white font-extrabold text-lg rounded-2xl shadow-md hover:bg-violet-700 active:scale-95 transition-all disabled:opacity-50"
            >
              {flipHistory.length === 0 ? t('coin.streak.flipToStart') : t('coin.flip')}
            </button>

            {/* Coin animation */}
            <div className="perspective-500">
              <motion.div
                key={animKey}
                animate={flipping ? { rotateY: [0, 360, 720, 1080] } : {}}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-md select-none"
                style={{
                  background: flipHistory.length > 0 && flipHistory[flipHistory.length - 1] === 'T'
                    ? 'linear-gradient(135deg,#EC4899,#F97316)'
                    : 'linear-gradient(135deg,#7C3AED,#3B82F6)',
                }}
              >
                {flipHistory.length > 0 && flipHistory[flipHistory.length - 1] === 'T' ? '🌿' : '👑'}
              </motion.div>
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.p
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className={`text-xl font-extrabold ${feedback === 'correct' ? 'text-emerald-600' : 'text-red-500'}`}
                >
                  {feedback === 'correct' ? t('coin.streak.correct') : t('coin.streak.wrong')}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Score */}
            <div className="text-center flex flex-col items-center gap-1">
              <div>
                <span className="text-gray-500 font-semibold">{t('coin.streak.score')}: </span>
                <span className="text-2xl font-extrabold text-violet-700">{score}</span>
              </div>
              <PersonalBestBadge best={streakPb} isNew={isStreakPbNew} />
            </div>
          </div>

          {/* Streak length histogram */}
          <div className="bg-white rounded-3xl p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/60">
            <h3 className="font-extrabold text-gray-700 mb-4">{t('coin.streak.histogramTitle')}</h3>
            {streakChartData.length === 0 ? (
              <p className="text-gray-300 text-sm text-center py-8">{t('coin.streak.histogramEmpty')}</p>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={streakChartData} margin={{ top: 0, right: 8, left: -16, bottom: 0 }}>
                  <XAxis dataKey="length" label={{ value: t('coin.streak.histogramX'), position: 'insideBottom', offset: -2, fontSize: 11 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip
                    formatter={(val) => [val, t('coin.streak.histogramY')]}
                    labelFormatter={(l) => `${t('coin.streak.histogramX')}: ${l}`}
                  />
                  <Bar dataKey="count" fill="#7C3AED" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

        </div>
      )}
          <GameSuggestions gameId="coin-flip" />
    </GamePageLayout>
  )
}
