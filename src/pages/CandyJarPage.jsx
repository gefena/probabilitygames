import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import candyJarQuestions from '../quizzes/candyJar'
import GameSuggestions from '../components/GameSuggestions'

const DEFAULT_COLORS = [
  { id: 'red',   bg: '#EF4444', label_key: 'candy.colors.red',   count: 5 },
  { id: 'blue',  bg: '#3B82F6', label_key: 'candy.colors.blue',  count: 3 },
  { id: 'green', bg: '#10B981', label_key: 'candy.colors.green', count: 2 },
]

const MULTIPLIERS = [1, 10, 100]

function weightedRandom(colors) {
  const total = colors.reduce((s, c) => s + c.count, 0)
  if (total === 0) return null
  let r = Math.random() * total
  for (const c of colors) {
    r -= c.count
    if (r <= 0) return c.id
  }
  return colors[colors.length - 1].id
}

function drawManyNoRefill(n, initColors) {
  let cols = initColors.map(c => ({ ...c }))
  const results = {}
  let drawn = 0
  for (let i = 0; i < n; i++) {
    const t = cols.reduce((s, c) => s + c.count, 0)
    if (t === 0) break
    const id = weightedRandom(cols)
    if (!id) break
    results[id] = (results[id] || 0) + 1
    cols = cols.map(c => c.id === id ? { ...c, count: c.count - 1 } : c)
    drawn++
  }
  return { results, drawn, finalColors: cols }
}

function drawMany(n, colors) {
  const results = {}
  for (let i = 0; i < n; i++) {
    const id = weightedRandom(colors)
    if (id) results[id] = (results[id] || 0) + 1
  }
  return results
}

export default function CandyJarPage() {
  const { t } = useTranslation()
  const [colors, setColors] = useState(DEFAULT_COLORS)
  const [savedColors, setSavedColors] = useState(DEFAULT_COLORS) // snapshot for noRefill reset
  const [noRefill, setNoRefill] = useState(false)
  const [history, setHistory] = useState({})
  const [totalDraws, setTotalDraws] = useState(0)
  const [lastDraw, setLastDraw] = useState(null)
  const [mult, setMult] = useState(1)

  const total = colors.reduce((s, c) => s + c.count, 0)
  const jarEmpty = noRefill && total === 0

  function toggleNoRefill() {
    const next = !noRefill
    setNoRefill(next)
    if (next) {
      // Turning ON: snapshot current colors, reset draws
      setSavedColors(colors.map(c => ({ ...c })))
      setHistory({})
      setTotalDraws(0)
      setLastDraw(null)
    } else {
      // Turning OFF: restore colors from snapshot, reset draws
      setColors(savedColors.map(c => ({ ...c })))
      setHistory({})
      setTotalDraws(0)
      setLastDraw(null)
    }
  }

  function adjust(id, delta) {
    if (noRefill) return // locked while in no-refill mode
    setColors(prev => prev.map(c => {
      if (c.id !== id) return c
      const next = c.count + delta
      if (next < 0) return c
      if (total + delta < 1) return c
      return { ...c, count: next }
    }))
  }

  const draw = useCallback(() => {
    if (jarEmpty) return
    if (total === 0) return

    if (noRefill) {
      if (mult === 1) {
        const id = weightedRandom(colors)
        if (!id) return
        setLastDraw(id)
        setHistory(h => ({ ...h, [id]: (h[id] || 0) + 1 }))
        setTotalDraws(d => d + 1)
        setColors(prev => prev.map(c => c.id === id ? { ...c, count: c.count - 1 } : c))
      } else {
        const { results, drawn, finalColors } = drawManyNoRefill(mult, colors)
        setColors(finalColors)
        setLastDraw(null)
        setHistory(h => {
          const next = { ...h }
          for (const [id, cnt] of Object.entries(results)) next[id] = (next[id] || 0) + cnt
          return next
        })
        setTotalDraws(d => d + drawn)
      }
    } else {
      if (mult === 1) {
        const id = weightedRandom(colors)
        setLastDraw(id)
        setHistory(h => ({ ...h, [id]: (h[id] || 0) + 1 }))
        setTotalDraws(d => d + 1)
      } else {
        const results = drawMany(mult, colors)
        setLastDraw(null)
        setHistory(h => {
          const next = { ...h }
          for (const [id, cnt] of Object.entries(results)) next[id] = (next[id] || 0) + cnt
          return next
        })
        setTotalDraws(d => d + mult)
      }
    }
  }, [jarEmpty, total, noRefill, mult, colors])

  function resetDraws() {
    setHistory({})
    setTotalDraws(0)
    setLastDraw(null)
    if (noRefill) {
      // Restore to last configured composition
      setColors(savedColors.map(c => ({ ...c })))
    }
  }

  const dotSize = total <= 20 ? 18 : total <= 40 ? 12 : 8
  const candies = colors.flatMap(c => Array(c.count).fill(c))

  const savedTotal = savedColors.reduce((s, c) => s + c.count, 0)
  const chartColors = noRefill ? savedColors : colors
  const chartTotal = noRefill ? savedTotal : total

  const chartData = chartColors.map(c => ({
    name: t(c.label_key),
    actual: history[c.id] || 0,
    expected: totalDraws > 0 ? (c.count / chartTotal) * totalDraws : 0,
    fill: c.bg,
  }))

  return (
    <GamePageLayout title={t('common.games.candy-jar')} emoji="🍬">
      <p className="text-gray-500 mb-6 text-sm">{t('candy.instructions')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Jar */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center border border-slate-200/60">
          <div className="relative w-44 h-52 mb-4">
            <svg viewBox="0 0 176 208" className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              <rect x="16" y="32" width="144" height="160" rx="24" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="3" />
              <rect x="24" y="14" width="128" height="28" rx="10" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="2" />
              <rect x="28" y="44" width="14" height="80" rx="7" fill="white" opacity="0.5" />
            </svg>
            <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-1 px-6 pt-10 pb-4" style={{ zIndex: 1 }}>
              <AnimatePresence>
                {candies.map((c, i) => (
                  <motion.div
                    key={`${c.id}-${i}`}
                    layout
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="rounded-full"
                    style={{ width: dotSize, height: dotSize, background: c.bg, flexShrink: 0 }}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {lastDraw && (
            <motion.div
              key={lastDraw + totalDraws}
              initial={{ y: -20, scale: 0.5, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              className="w-10 h-10 rounded-full shadow-lg mb-2"
              style={{ background: (noRefill ? savedColors : colors).find(c => c.id === lastDraw)?.bg }}
            />
          )}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/60">
          <h3 className="font-extrabold text-gray-700 mb-4">{t('candy.probability')}</h3>
          <div className="space-y-3 mb-4">
            {(noRefill ? savedColors : colors).map(c => {
              const displayTotal = noRefill ? savedTotal : total
              const prob = displayTotal > 0 ? c.count / displayTotal : 0
              const pct = (prob * 100).toFixed(0)
              return (
                <div key={c.id}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 rounded-full" style={{ background: c.bg }} />
                    <span className="font-semibold text-gray-700">{t(c.label_key)}</span>
                    <span className="ms-auto font-bold text-gray-500 text-sm">{c.count}/{displayTotal} = {pct}%</span>
                  </div>
                  {!noRefill && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => adjust(c.id, -1)}
                        disabled={c.count === 0 || total <= 1}
                        className="w-7 h-7 rounded-lg bg-gray-100 font-bold text-gray-600 hover:bg-gray-200 disabled:opacity-30"
                      >−</button>
                      <span className="font-bold w-6 text-center">{c.count}</span>
                      <button
                        onClick={() => adjust(c.id, 1)}
                        disabled={c.count >= 20}
                        className="w-7 h-7 rounded-lg bg-gray-100 font-bold text-gray-600 hover:bg-gray-200 disabled:opacity-30"
                      >+</button>
                    </div>
                  )}
                  {noRefill && (
                    <div className="flex items-center gap-2">
                      <div className="h-2 rounded-full bg-gray-100 flex-1 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{ width: `${savedTotal > 0 ? (c.count / savedTotal) * 100 : 0}%`, background: c.bg }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-500">{colors.find(rc => rc.id === c.id)?.count ?? 0} left</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Draw controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
        <div className="flex rounded-xl overflow-hidden border border-pink-200">
          {MULTIPLIERS.map(m => (
            <button
              key={m}
              onClick={() => setMult(m)}
              className={`px-4 py-2 font-bold text-sm transition-colors ${mult === m ? 'bg-pink-500 text-white' : 'bg-white text-pink-600 hover:bg-pink-50'}`}
            >
              ×{m}
            </button>
          ))}
        </div>
        <button
          onClick={draw}
          disabled={jarEmpty}
          className="px-8 py-3 bg-pink-500 text-white font-extrabold text-lg rounded-2xl shadow-md hover:bg-pink-600 active:scale-95 transition-all disabled:opacity-50"
        >
          {t('candy.draw')}
        </button>
        <button onClick={resetDraws} className="px-5 py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200">
          {t('candy.reset')}
        </button>
        {/* No Refill toggle */}
        <button
          onClick={toggleNoRefill}
          className={`px-4 py-3 font-bold text-sm rounded-2xl border-2 transition-colors ${noRefill ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white border-amber-300 text-amber-600 hover:bg-amber-50'}`}
        >
          {t('candy.noRefill.toggle')}
        </button>
      </div>

      {/* Jar empty message */}
      <AnimatePresence>
        {jarEmpty && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-amber-600 font-bold mb-4"
          >
            {t('candy.noRefill.empty')}
          </motion.p>
        )}
      </AnimatePresence>

      <p className="text-center text-gray-500 text-sm mb-6">{t('candy.totalDraws')}: <strong className="text-pink-600">{totalDraws}</strong></p>

      {/* Explainer */}
      {(() => {
        const dispColors = noRefill ? savedColors : colors
        const dispTotal = noRefill ? savedTotal : total
        const spotlight = [...dispColors].sort((a, b) => b.count - a.count)[0]
        const spotlightPct = dispTotal > 0 ? Math.round((spotlight.count / dispTotal) * 100) : 0
        const [r, b, g] = [dispColors[0], dispColors[1], dispColors[2]]
        return (
          <ExplainerPanel
            accentColor="border-pink-400"
            title={t('explainer.candy.title')}
            body={t('explainer.candy.body')}
            example={t('explainer.candy.example', {
              r: r.count, rLabel: t(r.label_key),
              b: b.count, bLabel: t(b.label_key),
              g: g.count, gLabel: t(g.label_key),
              total: dispTotal,
              spotlightLabel: t(spotlight.label_key),
              spotlightCount: spotlight.count,
              pct: spotlightPct,
            })}
            visual={
              <div className="flex rounded-xl overflow-hidden h-7">
                {dispColors.map(c => {
                  const pct = dispTotal > 0 ? (c.count / dispTotal) * 100 : 33.33
                  return (
                    <div
                      key={c.id}
                      className="flex items-center justify-center text-white text-xs font-bold transition-all duration-300"
                      style={{ width: `${pct}%`, background: c.bg, minWidth: pct > 5 ? undefined : 0 }}
                    >
                      {pct >= 10 ? `${Math.round(pct)}%` : ''}
                    </div>
                  )
                })}
              </div>
            }
            furtherReading={t('explainer.candy.furtherReading')}
          />
        )
      })()}

      <QuizPanel questions={candyJarQuestions} accentColor="border-pink-400" />

      {/* Chart */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/60">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="actual" name={t('candy.actual')} radius={[6, 6, 0, 0]} fill="#EC4899" />
            <Bar dataKey="expected" name={t('candy.expected')} radius={[6, 6, 0, 0]} fill="#C4B5FD" />
          </BarChart>
        </ResponsiveContainer>
      </div>
          <GameSuggestions gameId="candy-jar" />
    </GamePageLayout>
  )
}
