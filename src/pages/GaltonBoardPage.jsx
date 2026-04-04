import { useState, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import galtonBoardQuestions from '../quizzes/galtonBoard'

const ROWS = 8
const NUM_BINS = ROWS + 1

function pascalRow(n) {
  const row = [1]
  for (let i = 1; i <= n; i++) row.push((row[i - 1] * (n - i + 1)) / i)
  return row
}

const PASCAL = pascalRow(ROWS)
const PASCAL_SUM = PASCAL.reduce((s, v) => s + v, 0)

function dropBalls(n, counts) {
  const next = [...counts]
  for (let i = 0; i < n; i++) {
    let bin = 0
    for (let r = 0; r < ROWS; r++) {
      if (Math.random() < 0.5) bin++
    }
    next[bin]++
  }
  return next
}

const BIN_COLORS = [
  '#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95',
  '#4C1D95', '#5B21B6', '#6D28D9', '#7C3AED', '#8B5CF6',
]

export default function GaltonBoardPage() {
  const { t } = useTranslation()
  const [counts, setCounts] = useState(Array(NUM_BINS).fill(0))
  const [total, setTotal] = useState(0)
  const droppingRef = useRef(false)

  const dropN = useCallback((n) => {
    if (droppingRef.current) return
    droppingRef.current = true

    const BATCH = Math.min(n, 50)
    let remaining = n

    function tick() {
      if (remaining <= 0) {
        droppingRef.current = false
        return
      }
      const thisBatch = Math.min(BATCH, remaining)
      remaining -= thisBatch
      setCounts(prev => dropBalls(thisBatch, prev))
      setTotal(prev => prev + thisBatch)
      if (remaining > 0) {
        setTimeout(tick, remaining > 200 ? 16 : 60)
      } else {
        droppingRef.current = false
      }
    }
    tick()
  }, [])

  function reset() {
    droppingRef.current = false
    setCounts(Array(NUM_BINS).fill(0))
    setTotal(0)
  }

  const maxCount = Math.max(...counts, 1)
  const chartData = counts.map((c, i) => ({
    bin: i,
    count: c,
    expected: Math.round((PASCAL[i] / PASCAL_SUM) * total),
  }))

  return (
    <GamePageLayout
      title={t('common.games.galton-board')}
      emoji="🟣"
    >
      {/* Subtitle */}
      <p className="text-center text-sm text-gray-500 mb-2 max-w-xl mx-auto">
        {t('galtonBoard.subtitle')}
      </p>
      <p className="text-center text-sm text-violet-600 font-medium mb-6 max-w-xl mx-auto">{t('galtonBoard.howToPlay')}</p>

      {/* Peg board visualization */}
      <div className="flex justify-center mb-6">
        <svg width="320" height="200" viewBox="0 0 320 200" className="overflow-visible">
          {Array.from({ length: ROWS }, (_, row) =>
            Array.from({ length: row + 2 }, (_, col) => {
              const x = 160 - (row + 1) * 18 + col * 36
              const y = 24 + row * 22
              return (
                <circle key={`${row}-${col}`} cx={x} cy={y} r={4}
                  fill="#7C3AED" opacity={0.7} />
              )
            })
          )}
          {/* Bin dividers */}
          {Array.from({ length: NUM_BINS + 1 }, (_, i) => {
            const x = 160 - NUM_BINS * 14 + i * 28
            return (
              <line key={i} x1={x} y1={190} x2={x} y2={210}
                stroke="#6D28D9" strokeWidth={2} />
            )
          })}
        </svg>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {[1, 10, 100, 1000].map(n => (
          <motion.button
            key={n}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dropN(n)}
            className="px-4 py-2 rounded-xl bg-violet-600 text-white font-bold text-sm shadow hover:bg-violet-700 transition-colors"
          >
            {t(`galtonBoard.drop${n}`)}
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 font-bold text-sm shadow hover:bg-gray-300 transition-colors"
        >
          {t('galtonBoard.reset')}
        </motion.button>
      </div>

      {/* Stats */}
      <p className="text-center text-sm text-gray-500 mb-4">
        {t('galtonBoard.ballsDropped')}: <span className="font-bold text-violet-700">{total.toLocaleString()}</span>
      </p>

      {/* Histogram */}
      {total > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {t('galtonBoard.histogramTitle')}
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <XAxis dataKey="bin" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip
                formatter={(val, name) => [val, name === 'count' ? t('galtonBoard.count') : '']}
                labelFormatter={(l) => `${t('galtonBoard.bin')} ${l}`}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={BIN_COLORS[i % BIN_COLORS.length]}
                    fillOpacity={0.4 + 0.6 * (counts[i] / maxCount)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      <ExplainerPanel
        title={t('galtonBoard.explainer.title')}
        body={t('galtonBoard.explainer.body')}
        example={t('galtonBoard.explainer.example')}
        callout={t('galtonBoard.explainer.callout')}
        furtherReading={t('galtonBoard.explainer.furtherReading')}
        accentColor="border-violet-400"
      />

      <QuizPanel questions={galtonBoardQuestions} accentColor="border-violet-400" />
    </GamePageLayout>
  )
}
