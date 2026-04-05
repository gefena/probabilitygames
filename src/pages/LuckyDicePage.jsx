import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import diceQuestions from '../quizzes/luckyDice'
import GameSuggestions from '../components/GameSuggestions'

// Theoretical probability of a sum with n standard dice
function sumProbabilities(numDice) {
  const sides = 6
  const min = numDice
  const max = numDice * sides
  const total = Math.pow(sides, numDice)
  const counts = {}
  for (let s = min; s <= max; s++) counts[s] = 0

  function count(dice, sum) {
    if (dice === 0) { counts[sum] = (counts[sum] || 0) + 1; return }
    for (let f = 1; f <= sides; f++) count(dice - 1, sum + f)
  }
  count(numDice, 0)

  const result = {}
  for (let s = min; s <= max; s++) result[s] = counts[s] / total
  return result
}

// Probability distribution for 1 custom die (groups duplicate face values)
function customFaceProbabilities(faces) {
  const counts = {}
  for (const f of faces) counts[f] = (counts[f] || 0) + 1
  const result = {}
  for (const [v, c] of Object.entries(counts)) result[Number(v)] = c / faces.length
  return result
}

const DEFAULT_CUSTOM_FACES = [1, 2, 3, 4, 5, 6]
const MULTIPLIERS_DICE = [1, 2, 3]

// Die face SVG
function DieFace({ value, rolling }) {
  const dots = {
    1: [[50, 50]],
    2: [[25, 25], [75, 75]],
    3: [[25, 25], [50, 50], [75, 75]],
    4: [[25, 25], [75, 25], [25, 75], [75, 75]],
    5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
    6: [[25, 20], [75, 20], [25, 50], [75, 50], [25, 80], [75, 80]],
  }[value] || []

  return (
    <motion.div
      animate={rolling ? { rotate: [0, 15, -15, 10, -10, 0], scale: [1, 1.1, 0.95, 1.05, 1] } : {}}
      transition={{ duration: 0.55 }}
      className="w-24 h-24 bg-white rounded-2xl shadow-lg border-4 border-violet-200 relative shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/60"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {dots.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={8} fill="#7C3AED" />
        ))}
      </svg>
    </motion.div>
  )
}

// Custom die face display (shows a number)
function CustomDieFace({ value, rolling }) {
  return (
    <motion.div
      animate={rolling ? { rotate: [0, 15, -15, 10, -10, 0], scale: [1, 1.1, 0.95, 1.05, 1] } : {}}
      transition={{ duration: 0.55 }}
      className="w-24 h-24 bg-white rounded-2xl shadow-lg border-4 border-violet-200 flex items-center justify-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/60"
    >
      <span className="text-3xl font-extrabold text-violet-700">{value}</span>
    </motion.div>
  )
}

export default function LuckyDicePage() {
  const { t } = useTranslation()
  const [numDice, setNumDice] = useState(1) // 1 | 2 | 3 | 'custom'
  const [values, setValues] = useState([1])
  const [rolling, setRolling] = useState(false)
  const [prediction, setPrediction] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [history, setHistory] = useState({})
  const [totalRolls, setTotalRolls] = useState(0)
  const [customFaces, setCustomFaces] = useState(DEFAULT_CUSTOM_FACES)

  const isCustom = numDice === 'custom'

  function changeDiceCount(n) {
    setNumDice(n)
    setValues(Array(n === 'custom' ? 1 : n).fill(n === 'custom' ? customFaces[0] : 1))
    setHistory({})
    setTotalRolls(0)
    setFeedback(null)
    setPrediction('')
  }

  function updateCustomFace(index, val) {
    const n = Math.max(1, Math.min(99, parseInt(val) || 1))
    setCustomFaces(prev => {
      const next = [...prev]
      next[index] = n
      return next
    })
    setHistory({})
    setTotalRolls(0)
    setFeedback(null)
    setPrediction('')
  }

  function resetCustomFaces() {
    setCustomFaces([...DEFAULT_CUSTOM_FACES])
    setValues([DEFAULT_CUSTOM_FACES[0]])
    setHistory({})
    setTotalRolls(0)
    setFeedback(null)
    setPrediction('')
  }

  const roll = useCallback(() => {
    if (rolling || !prediction) return
    setRolling(true)
    setTimeout(() => {
      let rolled, key, probText

      if (isCustom) {
        // Roll 1 custom die
        const faceIdx = Math.floor(Math.random() * customFaces.length)
        const faceValue = customFaces[faceIdx]
        rolled = [faceValue]
        key = faceValue
        const probs = customFaceProbabilities(customFaces)
        const pred = parseInt(prediction)
        const p = probs[pred] || 0
        probText = `${(p * 100).toFixed(1)}%`
      } else {
        rolled = Array.from({ length: numDice }, () => Math.floor(Math.random() * 6) + 1)
        const sum = rolled.reduce((a, b) => a + b, 0)
        key = numDice === 1 ? rolled[0] : sum
        const pred = parseInt(prediction)
        if (numDice === 1) {
          probText = '1/6 ≈ 16.7%'
        } else {
          const probs = sumProbabilities(numDice)
          const p = probs[pred] || 0
          probText = `${(p * 100).toFixed(1)}%`
        }
      }

      setValues(rolled)
      const pred = parseInt(prediction)
      setHistory(h => ({ ...h, [key]: (h[key] || 0) + 1 }))
      setTotalRolls(r => r + 1)
      setFeedback({ correct: pred === key, key, probText, pred })
      setPrediction('')
      setRolling(false)
    }, 600)
  }, [rolling, prediction, numDice, isCustom, customFaces])

  function reset() {
    setValues(Array(isCustom ? 1 : numDice).fill(isCustom ? customFaces[0] : 1))
    setHistory({})
    setTotalRolls(0)
    setFeedback(null)
    setPrediction('')
  }

  // Build chart data
  let chartData = []
  if (isCustom) {
    const probs = customFaceProbabilities(customFaces)
    const sortedKeys = Object.keys(probs).map(Number).sort((a, b) => a - b)
    chartData = sortedKeys.map(v => ({
      name: `${v}`,
      actual: history[v] || 0,
      expected: totalRolls * probs[v],
    }))
  } else if (numDice === 1) {
    chartData = [1, 2, 3, 4, 5, 6].map(f => ({
      name: `${f}`,
      actual: history[f] || 0,
      expected: totalRolls / 6,
    }))
  } else {
    const min = numDice, max = numDice * 6
    const probs = sumProbabilities(numDice)
    for (let s = min; s <= max; s++) {
      chartData.push({ name: `${s}`, actual: history[s] || 0, expected: totalRolls * probs[s] })
    }
  }

  // Prediction options
  let predOptions = []
  if (isCustom) {
    // Unique values sorted
    predOptions = [...new Set(customFaces)].sort((a, b) => a - b)
  } else {
    const predMin = numDice === 1 ? 1 : numDice
    const predMax = numDice * 6
    for (let i = predMin; i <= predMax; i++) predOptions.push(i)
  }

  const predictLabel = isCustom
    ? t('dice.custom.predict')
    : numDice === 1 ? t('dice.predict1') : numDice === 2 ? t('dice.predict2') : t('dice.predict3')

  return (
    <GamePageLayout title={t('common.games.dice')} emoji="🎲">
      <p className="text-gray-500 mb-6 text-sm">{t('dice.instructions')}</p>

      {/* Dice count selector */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <span className="font-semibold text-gray-600">{t('dice.diceCount')}:</span>
        <div className="flex rounded-xl overflow-hidden border border-violet-200">
          {[1, 2, 3].map(n => (
            <button
              key={n}
              onClick={() => changeDiceCount(n)}
              className={`px-5 py-2 font-bold transition-colors ${numDice === n ? 'bg-violet-600 text-white' : 'bg-white text-violet-600 hover:bg-violet-50'}`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => changeDiceCount('custom')}
            className={`px-5 py-2 font-bold transition-colors ${isCustom ? 'bg-violet-600 text-white' : 'bg-white text-violet-600 hover:bg-violet-50'}`}
          >
            {t('dice.custom.label')}
          </button>
        </div>
      </div>

      {/* Custom die face editor */}
      {isCustom && (
        <div className="bg-white rounded-3xl p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mb-6 border border-slate-200/60">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-gray-700 text-sm">{t('dice.custom.facesTitle')}</h3>
            <button
              onClick={resetCustomFaces}
              className="text-xs font-bold text-violet-600 hover:text-violet-800 underline"
            >
              {t('dice.custom.reset')}
            </button>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {customFaces.map((face, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <label className="text-xs text-gray-400 font-semibold">
                  {t('dice.custom.face', { n: i + 1 })}
                </label>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={face}
                  onChange={e => updateCustomFace(i, e.target.value)}
                  className="w-full text-center border-2 border-violet-200 rounded-lg py-1 font-bold text-violet-700 focus:outline-none focus:border-violet-500 text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dice display */}
      <div className="flex gap-3 justify-center mb-6 flex-wrap">
        {values.map((v, i) =>
          isCustom
            ? <CustomDieFace key={i} value={v} rolling={rolling} />
            : <DieFace key={i} value={v} rolling={rolling} />
        )}
      </div>

      {/* Prediction + Roll */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        <select
          value={prediction}
          onChange={e => setPrediction(e.target.value)}
          className="px-4 py-2 rounded-xl border-2 border-violet-200 text-violet-700 font-semibold bg-white focus:outline-none focus:border-violet-500 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/60"
        >
          <option value="">{predictLabel}</option>
          {predOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <button
          onClick={roll}
          disabled={rolling || !prediction}
          className="px-8 py-3 bg-orange-400 text-white font-extrabold text-lg rounded-2xl shadow-md hover:bg-orange-500 active:scale-95 transition-all disabled:opacity-50"
        >
          {t('dice.roll')}
        </button>
        <button onClick={reset} className="px-5 py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200">
          {t('dice.reset')}
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`mb-6 rounded-2xl p-4 text-center font-bold text-lg ${feedback.correct ? 'bg-green-100 text-green-700' : 'bg-pink-50 text-pink-700'}`}
        >
          {feedback.correct ? `🎉 ${t('dice.correct')}` : `😅 ${t('dice.incorrect')}`}
          {' '}{t('dice.chance')} {feedback.pred} {t('dice.is')} {feedback.probText}
        </motion.div>
      )}

      {/* Explainer — content driven by numDice */}
      {numDice === 1 && (
        <ExplainerPanel
          accentColor="border-orange-400"
          title={t('explainer.dice1.title')}
          body={t('explainer.dice1.body')}
          example={t('explainer.dice1.example')}
          visual={
            <div className="flex flex-wrap gap-3 justify-center py-1">
              {['⚀','⚁','⚂','⚃','⚄','⚅'].map((face, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-3xl">{face}</span>
                  <span className="text-xs font-bold text-gray-500">1/6</span>
                </div>
              ))}
            </div>
          }
        />
      )}
      {numDice === 2 && (
        <ExplainerPanel
          accentColor="border-orange-400"
          title={t('explainer.dice2.title')}
          body={t('explainer.dice2.body')}
          example={t('explainer.dice2.example')}
          visual={
            <div className="flex gap-4 justify-center py-1">
              {[{sum:6,ways:5},{sum:7,ways:6},{sum:8,ways:5}].map(({sum,ways}) => (
                <div key={sum} className={`flex flex-col items-center px-4 py-2 rounded-xl ${sum === 7 ? 'bg-orange-100 border-2 border-orange-400' : 'bg-gray-50'}`}>
                  <span className="text-xl font-extrabold text-gray-800">{sum}</span>
                  <span className="text-xs text-gray-500">{ways} ways</span>
                </div>
              ))}
            </div>
          }
        />
      )}
      {numDice === 3 && (
        <ExplainerPanel
          accentColor="border-orange-400"
          title={t('explainer.dice3.title')}
          body={t('explainer.dice3.body')}
          example={t('explainer.dice3.example')}
          visual={
            <div className="text-center text-2xl tracking-widest py-1 text-gray-500 font-mono">
              ▁▂▄▇█▇▄▂▁
            </div>
          }
          furtherReading={t('explainer.dice3.furtherReading')}
        />
      )}

      <QuizPanel questions={diceQuestions} accentColor="border-orange-400" />

      {/* Stats + Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/60">
          <p className="font-extrabold text-gray-700">{t('dice.totalRolls')}: <span className="text-orange-500">{totalRolls}</span></p>
        </div>
        <div className="bg-white rounded-3xl p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/60">
          <p className="font-bold text-gray-600 mb-3 text-sm">
            {isCustom ? t('dice.custom.facesTitle') : numDice === 1 ? t('dice.faceChart') : t('dice.sumChart')}
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="actual" fill="#F97316" radius={[4, 4, 0, 0]} name={t('dice.actual')} />
              <Bar dataKey="expected" fill="#C4B5FD" radius={[4, 4, 0, 0]} name={t('dice.expected')} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
          <GameSuggestions gameId="dice" />
    </GamePageLayout>
  )
}
