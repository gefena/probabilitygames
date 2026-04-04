import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import luckyComboQuestions from '../quizzes/luckyCombo'

const COLORS_A = ['#7C3AED', '#EC4899', '#F97316', '#10B981']
const COLORS_B = ['#3B82F6', '#F59E0B', '#EF4444', '#06B6D4']

let nextIdA = 3
let nextIdB = 3

function weightedSample(outcomes) {
  const total = outcomes.reduce((s, o) => s + o.weight, 0)
  let r = Math.random() * total
  for (const o of outcomes) {
    r -= o.weight
    if (r <= 0) return o
  }
  return outcomes[outcomes.length - 1]
}

function calcP(outcomes) {
  const total = outcomes.reduce((s, o) => s + o.weight, 0)
  if (total === 0) return 0
  const successWeight = outcomes.filter(o => o.success).reduce((s, o) => s + o.weight, 0)
  return successWeight / total
}

function fmtPct(p) {
  return (p * 100).toFixed(1) + '%'
}

function EventEditor({ outcomes, setOutcomes, colors, label, disabled }) {
  const { t } = useTranslation()

  function setSuccess(id) {
    setOutcomes(prev => prev.map(o => ({ ...o, success: o.id === id })))
  }

  function updateOutcome(id, field, raw) {
    const value = field === 'label' ? raw : Math.max(1, Number(raw))
    setOutcomes(prev => prev.map(o => {
      if (o.id !== id) return o
      if (field === 'label') return { ...o, label: value, labelKey: null }
      return { ...o, [field]: value }
    }))
  }

  function addOutcome() {
    if (outcomes.length >= 4) return
    const id = label === 'A' ? `a${++nextIdA}` : `b${++nextIdB}`
    setOutcomes(prev => [...prev, { id, label: `?`, weight: 1, success: false, labelKey: null }])
  }

  function removeOutcome(id) {
    if (outcomes.length <= 2) return
    setOutcomes(prev => {
      const filtered = prev.filter(o => o.id !== id)
      if (!filtered.some(o => o.success)) filtered[0].success = true
      return filtered
    })
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-4 flex-1 min-w-0">
      <h4 className="font-extrabold text-gray-700 mb-3">{t(`luckyCombo.event${label}`)}</h4>
      <div className="space-y-2 mb-3">
        {outcomes.map((o, i) => (
          <div key={o.id} className="flex items-center gap-2">
            <input
              type="text"
              value={o.labelKey ? t(o.labelKey) : o.label}
              disabled={disabled}
              onChange={e => updateOutcome(o.id, 'label', e.target.value)}
              className="flex-1 min-w-0 border border-gray-200 rounded-lg px-2 py-1 text-xs disabled:bg-white"
              style={{ borderColor: o.success ? colors[i] : undefined }}
            />
            <input
              type="number"
              value={o.weight}
              disabled={disabled}
              min={1}
              onChange={e => updateOutcome(o.id, 'weight', e.target.value)}
              className="w-12 border border-gray-200 rounded-lg px-2 py-1 text-xs text-end disabled:bg-white"
            />
            <button
              onClick={() => setSuccess(o.id)}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold transition-all ${
                o.success
                  ? 'bg-yellow-400 text-white scale-110'
                  : 'bg-gray-200 text-gray-400 hover:bg-yellow-100'
              }`}
              title={t('luckyCombo.success')}
            >
              ⭐
            </button>
            <button
              onClick={() => removeOutcome(o.id)}
              disabled={outcomes.length <= 2}
              className="text-gray-300 hover:text-red-400 font-bold text-xs disabled:opacity-0"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addOutcome}
        disabled={disabled || outcomes.length >= 4}
        className="text-xs font-bold text-teal-600 hover:text-teal-700 disabled:opacity-40"
      >
        {t('luckyCombo.addOutcome')}
      </button>
    </div>
  )
}

// SVG tree diagram — Event A branches at level 1, Event B branches at level 2
function TreeDiagram({ outcomesA, outcomesB, combinator }) {
  const width = 340
  const height = Math.max(200, outcomesA.length * outcomesB.length * 36 + 40)
  const rootX = 30
  const rootY = height / 2
  const midX = 130
  const leafX = 250

  // Build leaf positions
  const rows = []
  let y = 30
  for (const a of outcomesA) {
    for (const b of outcomesB) {
      rows.push({ a, b, y })
      y += 36
    }
  }

  // Group rows by A outcome
  const aGroups = outcomesA.map(a => ({
    a,
    rows: rows.filter(r => r.a.id === a.id),
  }))

  function isWin(a, b) {
    if (combinator === 'AND') return a.success && b.success
    return a.success || b.success
  }

  const midY = (group) => {
    const ys = group.rows.map(r => r.y)
    return (Math.min(...ys) + Math.max(...ys)) / 2
  }

  const totalA = outcomesA.reduce((s, o) => s + o.weight, 0)
  const totalB = outcomesB.reduce((s, o) => s + o.weight, 0)

  function frac(weight, total) {
    if (weight === 0) return '0'
    const g = gcd(weight, total)
    return `${weight / g}/${total / g}`
  }

  function gcd(a, b) { return b === 0 ? a : gcd(b, a % b) }

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: width }}>
      {/* Root dot */}
      <circle cx={rootX} cy={rootY} r={6} fill="#6366F1" />

      {aGroups.map(({ a, rows: aRows }) => {
        const aY = midY({ rows: aRows })
        const aColor = a.success ? '#7C3AED' : '#9CA3AF'
        return (
          <g key={a.id}>
            {/* Root → A-node line */}
            <line x1={rootX} y1={rootY} x2={midX} y2={aY} stroke={aColor} strokeWidth={1.5} opacity={0.7} />
            {/* Fraction label on A branch */}
            <text x={(rootX + midX) / 2} y={aY - 6} textAnchor="middle" fontSize={9} fill={aColor} fontWeight="bold">
              {frac(a.weight, totalA)}
            </text>
            {/* A node */}
            <circle cx={midX} cy={aY} r={5} fill={aColor} />
            <text x={midX} y={aY + 16} textAnchor="middle" fontSize={9} fill={aColor} fontWeight="bold">{a.label}</text>

            {aRows.map(({ b, y: leafY }) => {
              const win = isWin(a, b)
              const bColor = b.success ? '#3B82F6' : '#9CA3AF'
              const lineColor = win ? '#10B981' : '#D1D5DB'
              return (
                <g key={b.id}>
                  {/* A-node → leaf */}
                  <line x1={midX} y1={aY} x2={leafX} y2={leafY} stroke={lineColor} strokeWidth={win ? 2 : 1} />
                  {/* Fraction label on B branch */}
                  <text x={(midX + leafX) / 2} y={leafY - 5} textAnchor="middle" fontSize={9} fill={bColor} fontWeight="bold">
                    {frac(b.weight, totalB)}
                  </text>
                  {/* Leaf */}
                  <circle cx={leafX} cy={leafY} r={4} fill={win ? '#10B981' : '#E5E7EB'} stroke={win ? '#10B981' : '#D1D5DB'} strokeWidth={1} />
                  <text x={leafX + 8} y={leafY + 4} fontSize={9} fill={win ? '#10B981' : '#9CA3AF'} fontWeight={win ? 'bold' : 'normal'}>
                    {b.label} {win ? '✓' : ''}
                  </text>
                </g>
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}

export default function LuckyComboPage() {
  const { t } = useTranslation()

  const [outcomesA, setOutcomesA] = useState(() => [
    { id: 'a1', label: '', labelKey: 'luckyCombo.defaultA1', weight: 1, success: true  },
    { id: 'a2', label: '', labelKey: 'luckyCombo.defaultA2', weight: 1, success: false },
  ])
  const [outcomesB, setOutcomesB] = useState(() => [
    { id: 'b1', label: '', labelKey: 'luckyCombo.defaultB1', weight: 1, success: true  },
    { id: 'b2', label: '', labelKey: 'luckyCombo.defaultB2', weight: 5, success: false },
  ])
  const [combinator, setCombinator] = useState('AND')
  const [history, setHistory] = useState([])
  const [trials, setTrials] = useState(0)

  const pA = useMemo(() => calcP(outcomesA), [outcomesA])
  const pB = useMemo(() => calcP(outcomesB), [outcomesB])
  const pCombined = useMemo(() => {
    if (combinator === 'AND') return pA * pB
    return pA + pB - pA * pB
  }, [pA, pB, combinator])

  const wins = useMemo(() => history.filter(Boolean).length, [history])
  const observedFreq = trials > 0 ? (wins / trials * 100).toFixed(1) : null

  function runTrials(n) {
    const results = []
    for (let i = 0; i < n; i++) {
      const a = weightedSample(outcomesA)
      const b = weightedSample(outcomesB)
      const win = combinator === 'AND' ? (a.success && b.success) : (a.success || b.success)
      results.push(win)
    }
    setHistory(prev => [...prev, ...results])
    setTrials(t => t + n)
  }

  function reset() {
    setHistory([])
    setTrials(0)
  }

  // Formula string
  const formulaKey = combinator === 'AND' ? 'luckyCombo.formulaAnd' : 'luckyCombo.formulaOr'
  const formulaArgs = combinator === 'AND'
    ? { pA: fmtPct(pA), pB: fmtPct(pB), result: fmtPct(pCombined) }
    : { pA: fmtPct(pA), pB: fmtPct(pB), pAB: fmtPct(pA * pB), result: fmtPct(pCombined) }

  return (
    <GamePageLayout title={t('luckyCombo.title')} emoji="🔗">
      <p className="text-gray-500 mb-2 text-sm">{t('luckyCombo.subtitle')}</p>
      <p className="text-center text-sm text-violet-600 font-medium mb-6 max-w-xl mx-auto">{t('luckyCombo.howToPlay')}</p>

      {/* ── Event Editors ────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <div className="flex gap-4 flex-wrap mb-4">
          <EventEditor
            outcomes={outcomesA}
            setOutcomes={setOutcomesA}
            colors={COLORS_A}
            label="A"
          />

          {/* AND / OR toggle */}
          <div className="flex flex-col items-center justify-center gap-2 py-4">
            <button
              onClick={() => setCombinator('AND')}
              className={`px-4 py-1.5 rounded-xl font-extrabold text-sm transition-all ${
                combinator === 'AND' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-500 hover:bg-teal-50'
              }`}
            >
              {t('luckyCombo.and')}
            </button>
            <button
              onClick={() => setCombinator('OR')}
              className={`px-4 py-1.5 rounded-xl font-extrabold text-sm transition-all ${
                combinator === 'OR' ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-500 hover:bg-teal-50'
              }`}
            >
              {t('luckyCombo.or')}
            </button>
          </div>

          <EventEditor
            outcomes={outcomesB}
            setOutcomes={setOutcomesB}
            colors={COLORS_B}
            label="B"
          />
        </div>
      </div>

      {/* ── Combined Probability ─────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <h3 className="font-extrabold text-gray-700 mb-3">{t('luckyCombo.combined')}</h3>
        <p className="text-sm font-mono text-gray-600 bg-gray-50 rounded-xl px-4 py-2 mb-4">
          {t(formulaKey, formulaArgs)}
        </p>
        <div className="text-center">
          <span className="text-5xl font-extrabold text-teal-600 tabular-nums">
            {fmtPct(pCombined)}
          </span>
        </div>
      </div>

      {/* ── Tree Diagram ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <h3 className="font-extrabold text-gray-700 mb-4">{t('luckyCombo.treeTitle')}</h3>
        <div className="flex justify-center overflow-x-auto">
          <TreeDiagram outcomesA={outcomesA} outcomesB={outcomesB} combinator={combinator} />
        </div>
      </div>

      {/* ── Trial Simulation ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <h3 className="font-extrabold text-gray-700 mb-4">{t('luckyCombo.trialTitle')}</h3>
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            onClick={() => runTrials(1)}
            className="px-5 py-2.5 bg-teal-500 text-white font-extrabold rounded-2xl shadow-sm hover:bg-teal-600 active:scale-95 transition-all"
          >
            {t('luckyCombo.trial1')}
          </button>
          <button
            onClick={() => runTrials(100)}
            className="px-5 py-2.5 bg-teal-100 text-teal-700 font-extrabold rounded-2xl hover:bg-teal-200 active:scale-95 transition-all"
          >
            {t('luckyCombo.trial100')}
          </button>
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
          >
            {t('luckyCombo.reset')}
          </button>
        </div>

        {trials > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-teal-50 rounded-2xl px-4 py-3"
          >
            <p className="text-sm font-semibold text-teal-800">
              {t('luckyCombo.observed')}: <strong className="text-teal-600">{observedFreq}%</strong>
              {' '}({wins}/{trials} {t('luckyCombo.trials')})
            </p>
            <p className="text-sm text-teal-600 mt-0.5">
              {t('luckyCombo.theory')}: <strong>{fmtPct(pCombined)}</strong>
            </p>

            {/* Recent history squares */}
            <div className="flex flex-wrap gap-1 mt-3 max-h-20 overflow-hidden">
              {history.slice(-100).map((win, i) => (
                <span
                  key={i}
                  className={`w-4 h-4 rounded-sm text-center text-xs font-bold leading-4 ${
                    win ? 'bg-teal-400 text-white' : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {win ? t('luckyCombo.historyWin') : t('luckyCombo.historyLose')}
                </span>
              ))}
            </div>
          </motion.div>
        ) : (
          <p className="text-gray-400 text-sm">{t('luckyCombo.noTrials')}</p>
        )}
      </div>

      {/* ── Explainer ────────────────────────────────────────────────────── */}
      <ExplainerPanel
        accentColor="border-teal-400"
        title={t('luckyCombo.explainer.title')}
        body={t('luckyCombo.explainer.body')}
        example={t('luckyCombo.explainer.example')}
        callout={t('luckyCombo.explainer.callout')}
      />

      {/* ── Quiz ─────────────────────────────────────────────────────────── */}
      <QuizPanel questions={luckyComboQuestions} accentColor="border-teal-400" />
    </GamePageLayout>
  )
}
