import { useState, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import spinnerQuestions from '../quizzes/magicSpinner'
import GameSuggestions from '../components/GameSuggestions'

const PALETTE = ['#7C3AED', '#EC4899', '#F97316', '#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#06B6D4']

const DEFAULT_SLICES = [
  { id: 1, label: 'A', weight: 1, color: PALETTE[0] },
  { id: 2, label: 'B', weight: 1, color: PALETTE[1] },
  { id: 3, label: 'C', weight: 1, color: PALETTE[2] },
  { id: 4, label: 'D', weight: 1, color: PALETTE[3] },
]

let nextId = 5

function buildArcs(slices) {
  const total = slices.reduce((s, sl) => s + sl.weight, 0)
  const cx = 120, cy = 120, r = 110
  let start = -Math.PI / 2
  return slices.map(sl => {
    const frac = sl.weight / total
    const angle = frac * 2 * Math.PI
    const end = start + angle
    const x1 = cx + r * Math.cos(start)
    const y1 = cy + r * Math.sin(start)
    const x2 = cx + r * Math.cos(end)
    const y2 = cy + r * Math.sin(end)
    const large = angle > Math.PI ? 1 : 0
    const mid = start + angle / 2
    const lx = cx + (r * 0.65) * Math.cos(mid)
    const ly = cy + (r * 0.65) * Math.sin(mid)
    const path = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`
    const result = { ...sl, path, lx, ly, pct: Math.round(frac * 100) }
    start = end
    return result
  })
}

// SVG probability tree for two-rounds mode (≤ 4 slices)
function TreeDiagram({ slices, total, round1Result, round2Result }) {
  const { t } = useTranslation()
  const W = 480, H = 270
  const ROOT = { x: W / 2, y: 18 }
  const spacing = W / (slices.length + 1)

  const l1Nodes = slices.map((sl, i) => ({
    ...sl,
    x: spacing * (i + 1),
    y: 105,
    prob: sl.weight / total,
  }))

  const l2Nodes = slices.map((sl, i) => ({
    ...sl,
    x: spacing * (i + 1),
    y: 205,
    prob: sl.weight / total,
  }))

  const r1Winner = round1Result ? l1Nodes.find(n => n.id === round1Result.id) : null
  const r2Winner = round2Result ? l2Nodes.find(n => n.id === round2Result.id) : null

  const combinedProb = r1Winner && r2Winner
    ? (r1Winner.prob * r2Winner.prob * 100).toFixed(1)
    : null

  const frac = (w) => {
    const g = gcd(w, total)
    return `${w / g}/${total / g}`
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 270 }}>
      {/* Root → L1 lines */}
      {l1Nodes.map(n => {
        const isR1Winner = r1Winner && n.id === r1Winner.id
        const dimL1 = round1Result && !isR1Winner
        const mx = (ROOT.x + n.x) / 2
        const my = (ROOT.y + n.y) / 2
        return (
          <g key={`l1line-${n.id}`} opacity={dimL1 ? 0.2 : 1}>
            <line
              x1={ROOT.x} y1={ROOT.y + 8}
              x2={n.x} y2={n.y - 14}
              stroke={isR1Winner ? n.color : '#9CA3AF'}
              strokeWidth={isR1Winner ? 2.5 : 1.5}
            />
            <text x={mx + 6} y={my - 2} fontSize={9} fill={isR1Winner ? n.color : '#9CA3AF'} fontWeight="bold">
              {frac(n.weight)}
            </text>
          </g>
        )
      })}

      {/* Root node */}
      <circle cx={ROOT.x} cy={ROOT.y} r={8} fill="#6B7280" />
      <text x={ROOT.x} y={ROOT.y - 11} textAnchor="middle" fontSize={9} fill="#6B7280">{t('spinner.treeStart')}</text>

      {/* L1 nodes */}
      {l1Nodes.map(n => {
        const isR1Winner = r1Winner && n.id === r1Winner.id
        const dimL1 = round1Result && !isR1Winner
        return (
          <g key={`l1node-${n.id}`} opacity={dimL1 ? 0.2 : 1}>
            <circle
              cx={n.x} cy={n.y} r={20}
              fill={n.color}
              stroke={isR1Winner ? 'white' : 'transparent'}
              strokeWidth={isR1Winner ? 3 : 0}
            />
            <text x={n.x} y={n.y - 4} textAnchor="middle" fill="white" fontWeight="bold" fontSize={12}>{n.label}</text>
            <text x={n.x} y={n.y + 9} textAnchor="middle" fill="white" fontSize={9}>{Math.round(n.prob * 100)}%</text>
          </g>
        )
      })}

      {/* R1 winner → L2 lines */}
      {r1Winner && l2Nodes.map(n => {
        const isR2Winner = r2Winner && n.id === r2Winner.id
        const dimL2 = round2Result && !isR2Winner
        const mx = (r1Winner.x + n.x) / 2
        const my = (r1Winner.y + n.y) / 2
        return (
          <g key={`l2line-${n.id}`} opacity={dimL2 ? 0.2 : 1}>
            <line
              x1={r1Winner.x} y1={r1Winner.y + 20}
              x2={n.x} y2={n.y - 14}
              stroke={isR2Winner ? n.color : '#9CA3AF'}
              strokeWidth={isR2Winner ? 2.5 : 1.5}
            />
            <text x={mx + 6} y={my - 2} fontSize={9} fill={isR2Winner ? n.color : '#9CA3AF'} fontWeight="bold">
              {frac(n.weight)}
            </text>
          </g>
        )
      })}

      {/* L2 nodes */}
      {r1Winner && l2Nodes.map(n => {
        const isR2Winner = r2Winner && n.id === r2Winner.id
        const dimL2 = round2Result && !isR2Winner
        return (
          <g key={`l2node-${n.id}`} opacity={dimL2 ? 0.2 : 1}>
            <circle
              cx={n.x} cy={n.y} r={18}
              fill={n.color}
              stroke={isR2Winner ? 'white' : 'transparent'}
              strokeWidth={isR2Winner ? 3 : 0}
            />
            <text x={n.x} y={n.y - 4} textAnchor="middle" fill="white" fontWeight="bold" fontSize={11}>{n.label}</text>
            <text x={n.x} y={n.y + 8} textAnchor="middle" fill="white" fontSize={9}>{Math.round(n.prob * 100)}%</text>
          </g>
        )
      })}

      {/* Combined probability label */}
      {combinedProb && (
        <text x={W / 2} y={H - 6} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#1F2937">
          {`${r1Winner.label}→${r2Winner.label}: ${Math.round(r1Winner.prob * 100)}% × ${Math.round(r2Winner.prob * 100)}% = ${combinedProb}%`}
        </text>
      )}
    </svg>
  )
}

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b) }

export default function MagicSpinnerPage() {
  const { t } = useTranslation()
  const [slices, setSlices] = useState(DEFAULT_SLICES)
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [history, setHistory] = useState({})
  const [totalSpins, setTotalSpins] = useState(0)
  const spinRef = useRef(rotation)
  spinRef.current = rotation

  // Two-rounds state
  const [twoRounds, setTwoRounds] = useState(false)
  const [round, setRound] = useState(1)           // 1 | 2
  const [round1Result, setRound1Result] = useState(null)  // slice | null
  const [round2Result, setRound2Result] = useState(null)  // slice | null

  const total = slices.reduce((s, sl) => s + sl.weight, 0)
  const arcs = buildArcs(slices)

  const tournamentDone = twoRounds && round1Result && round2Result

  function toggleTwoRounds() {
    const next = !twoRounds
    setTwoRounds(next)
    if (next) resetTournament()
  }

  function resetTournament() {
    setRound(1)
    setRound1Result(null)
    setRound2Result(null)
  }

  function adjustWeight(id, delta) {
    setSlices(prev => prev.map(sl => {
      if (sl.id !== id) return sl
      const next = sl.weight + delta
      if (next < 1) return sl
      return { ...sl, weight: next }
    }))
    // Reset tournament when slices change
    if (twoRounds) resetTournament()
  }

  function addSlice() {
    if (slices.length >= 8) return
    const label = String.fromCharCode(65 + slices.length)
    const color = PALETTE[slices.length % PALETTE.length]
    setSlices(prev => [...prev, { id: nextId++, label, weight: 1, color }])
    if (twoRounds) resetTournament()
  }

  function removeSlice(id) {
    if (slices.length <= 2) return
    setSlices(prev => prev.filter(sl => sl.id !== id))
    if (twoRounds) resetTournament()
  }

  function pickWinner(currentSlices, currentTotal) {
    let r = Math.random() * currentTotal
    let winner = currentSlices[currentSlices.length - 1]
    for (const sl of currentSlices) {
      r -= sl.weight
      if (r <= 0) { winner = sl; break }
    }
    return winner
  }

  function computeRotation(winner, currentSlices, currentTotal) {
    const winnerIdx = currentSlices.findIndex(s => s.id === winner.id)
    const winStart = currentSlices.slice(0, winnerIdx).reduce((s, sl) => s + sl.weight / currentTotal, 0)
    const winEnd = winStart + winner.weight / currentTotal
    const winMid = (winStart + winEnd) / 2
    const winAngleDeg = winMid * 360
    const extra = 360 * 5
    const targetDeg = extra + (360 - winAngleDeg)
    return Math.ceil(spinRef.current / 360) * 360 + targetDeg
  }

  const spin = useCallback(() => {
    if (spinning) return
    if (twoRounds && tournamentDone) return

    setSpinning(true)

    const winner = pickWinner(slices, total)
    const newRot = computeRotation(winner, slices, total)
    setRotation(newRot)

    setTimeout(() => {
      setHistory(h => ({ ...h, [winner.id]: (h[winner.id] || 0) + 1 }))
      setTotalSpins(s => s + 1)

      if (twoRounds) {
        if (round === 1) {
          setRound1Result(winner)
          setRound(2)
        } else {
          setRound2Result(winner)
        }
      }

      setSpinning(false)
    }, 3200)
  }, [spinning, slices, total, twoRounds, round, tournamentDone])

  function resetSpins() {
    setHistory({})
    setTotalSpins(0)
    if (twoRounds) resetTournament()
  }

  const chartData = slices.map(sl => ({
    name: sl.label,
    actual: history[sl.id] || 0,
    expected: totalSpins > 0 ? (sl.weight / total) * totalSpins : 0,
    fill: sl.color,
  }))

  const spinButtonLabel = twoRounds
    ? (tournamentDone
        ? t('spinner.twoRounds.nextTournament')
        : round === 1
          ? t('spinner.spin')
          : t('spinner.twoRounds.spinRound2'))
    : t('spinner.spin')

  const twoRoundsSummary = twoRounds && slices.length > 4 && round1Result && round2Result
    ? t('spinner.twoRounds.summary', {
        r1: round1Result.label,
        r2: round2Result.label,
        prob: (round1Result.weight / total * round2Result.weight / total * 100).toFixed(1),
      })
    : null

  return (
    <GamePageLayout title={t('common.games.spinner')} emoji="🎡">
      <p className="text-gray-500 mb-6 text-sm">{t('spinner.instructions')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Spinner SVG */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col items-center border border-slate-200/60">
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10 text-3xl">▼</div>
            <svg
              viewBox="0 0 240 240"
              className="w-48 h-48 sm:w-60 sm:h-60"
              style={{ transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 3s cubic-bezier(0.2,0.8,0.4,1)' : 'none' }}
            >
              {arcs.map(arc => (
                <g key={arc.id}>
                  <path d={arc.path} fill={arc.color} stroke="white" strokeWidth="2" />
                  <text x={arc.lx} y={arc.ly} textAnchor="middle" dominantBaseline="middle"
                    fill="white" fontWeight="bold" fontSize="14">{arc.label}</text>
                  <text x={arc.lx} y={arc.ly + 16} textAnchor="middle" dominantBaseline="middle"
                    fill="white" fontSize="11">{arc.pct}%</text>
                </g>
              ))}
              <circle cx="120" cy="120" r="10" fill="white" stroke="#E5E7EB" strokeWidth="2" />
            </svg>
          </div>

          {/* Round indicator */}
          {twoRounds && !tournamentDone && (
            <p className="mt-3 text-sm font-bold text-emerald-700">
              {round === 1 ? t('spinner.twoRounds.round1') : t('spinner.twoRounds.round2')}
              {round1Result && ` — ${t('spinner.twoRounds.round1')}: ${round1Result.label}`}
            </p>
          )}

          <div className="flex gap-3 mt-4">
            <button
              onClick={tournamentDone ? resetTournament : spin}
              disabled={spinning}
              className="px-8 py-3 bg-emerald-500 text-white font-extrabold text-lg rounded-2xl shadow-md hover:bg-emerald-600 active:scale-95 transition-all disabled:opacity-50"
            >
              {spinButtonLabel}
            </button>
            <button onClick={resetSpins} className="px-5 py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200">
              {t('spinner.reset')}
            </button>
          </div>

          {/* Two rounds toggle */}
          <button
            onClick={toggleTwoRounds}
            className={`mt-3 px-4 py-2 font-bold text-sm rounded-2xl border-2 transition-colors ${twoRounds ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-emerald-300 text-emerald-700 hover:bg-emerald-50'}`}
          >
            {t('spinner.twoRounds.toggle')}
          </button>

          <p className="mt-2 text-gray-500 text-sm">{t('spinner.totalSpins')}: <strong className="text-emerald-600">{totalSpins}</strong></p>
        </div>

        {/* Slice controls */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/60">
          <div className="space-y-3 mb-4">
            {slices.map(sl => (
              <div key={sl.id} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: sl.color }} />
                <span className="font-bold w-6">{sl.label}</span>
                <button onClick={() => adjustWeight(sl.id, -1)} disabled={sl.weight <= 1}
                  className="w-7 h-7 rounded-lg bg-gray-100 font-bold hover:bg-gray-200 disabled:opacity-30">−</button>
                <span className="font-bold w-6 text-center">{sl.weight}</span>
                <button onClick={() => adjustWeight(sl.id, 1)}
                  className="w-7 h-7 rounded-lg bg-gray-100 font-bold hover:bg-gray-200">+</button>
                <span className="text-gray-400 text-xs ms-auto">{Math.round(sl.weight / total * 100)}%</span>
                {slices.length > 2 && (
                  <button onClick={() => removeSlice(sl.id)}
                    className="text-red-400 text-xs hover:text-red-600 font-semibold">{t('spinner.remove')}</button>
                )}
              </div>
            ))}
          </div>
          {slices.length < 8 && (
            <button onClick={addSlice}
              className="w-full py-2 rounded-xl border-2 border-dashed border-emerald-300 text-emerald-600 font-bold hover:bg-emerald-50 transition-colors text-sm">
              + {t('spinner.addSection')}
            </button>
          )}
        </div>
      </div>

      {/* Two-rounds tree / summary */}
      {twoRounds && (
        <div className="bg-white rounded-3xl p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mb-6 border border-slate-200/60">
          <h3 className="font-extrabold text-gray-700 mb-3 text-sm">
            {t('spinner.twoRounds.toggle')} — {t('spinner.twoRounds.combined')}
          </h3>
          {slices.length <= 4 ? (
            <TreeDiagram
              slices={slices}
              total={total}
              round1Result={round1Result}
              round2Result={round2Result}
            />
          ) : (
            twoRoundsSummary ? (
              <p className="text-gray-700 font-semibold text-sm">{twoRoundsSummary}</p>
            ) : (
              <p className="text-gray-400 text-sm">
                {round === 1 ? t('spinner.twoRounds.round1') : t('spinner.twoRounds.round2')} —{' '}
                {round === 1 ? t('spinner.spin') : `${t('spinner.twoRounds.round1')}: ${round1Result?.label}`}
              </p>
            )
          )}
        </div>
      )}

      {/* Explainer */}
      <ExplainerPanel
        accentColor="border-emerald-400"
        title={t('explainer.spinner.title')}
        body={t('explainer.spinner.body')}
        example={
          <span>
            {slices.map((sl, i) => (
              <span key={sl.id}>
                <span className="font-bold" style={{ color: sl.color }}>{sl.label}</span>
                {' = '}{sl.weight}/{total}{' = '}{Math.round(sl.weight / total * 100)}%
                {i < slices.length - 1 ? '  ·  ' : ''}
              </span>
            ))}
          </span>
        }
        callout={t('explainer.spinner.callout')}
      />

      <QuizPanel questions={spinnerQuestions} accentColor="border-emerald-400" />

      {/* Results chart */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/60">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="actual" name={t('spinner.actual')} fill="#10B981" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expected" name={t('spinner.expected')} fill="#C4B5FD" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
          <GameSuggestions gameId="spinner" />
    </GamePageLayout>
  )
}
