import { useState, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import prizeMachineQuestions from '../quizzes/prizeMachine'

const DEFAULT_PRIZES = [
  { id: 1, label: '🏆 Jackpot',   prob: 1,  payout: 200 },
  { id: 2, label: '🎁 Big Prize',  prob: 9,  payout: 20  },
  { id: 3, label: '🍬 Small Prize',prob: 30, payout: 5   },
  { id: 4, label: '💨 Nothing',    prob: 60, payout: 0   },
]
const DEFAULT_COST  = 10
const DEFAULT_START = 100
const CHART_WINDOW  = 200

let nextId = 5

function weightedSample(prizes, cost) {
  const total = prizes.reduce((s, p) => s + p.prob, 0)
  const remainder = Math.max(0, 100 - total)
  let r = Math.random() * 100
  for (const p of prizes) {
    r -= p.prob
    if (r <= 0) return p.payout - cost
  }
  // No prize (remainder)
  if (remainder > 0) return -cost
  return prizes[prizes.length - 1].payout - cost
}

export default function PrizeMachinePage() {
  const { t } = useTranslation()
  const idRef = useRef(nextId)

  const [prizes, setPrizes]         = useState(DEFAULT_PRIZES)
  const [cost, setCost]             = useState(DEFAULT_COST)
  const [startBalance, setStart]    = useState(DEFAULT_START)
  const [balance, setBalance]       = useState(DEFAULT_START)
  const [plays, setPlays]           = useState(0)
  const [history, setHistory]       = useState([])
  const [locked, setLocked]         = useState(false)

  const probTotal = prizes.reduce((s, p) => s + p.prob, 0)

  const netEV = useMemo(() => {
    const gross = prizes.reduce((s, p) => s + (p.payout * p.prob / 100), 0)
    return gross - cost
  }, [prizes, cost])

  // Chart data: last CHART_WINDOW plays
  const chartData = useMemo(() => {
    const window = history.slice(-CHART_WINDOW)
    const offset = Math.max(0, history.length - CHART_WINDOW)
    return window.map((_, i) => {
      const n = offset + i + 1
      const actualBal = history.slice(0, offset + i + 1).reduce((s, d) => s + d, startBalance)
      return {
        n,
        actual: actualBal,
        ev: parseFloat((startBalance + n * netEV).toFixed(2)),
      }
    })
  }, [history, startBalance, netEV])

  function play(times) {
    if (!locked) setLocked(true)
    const gains = []
    for (let i = 0; i < times; i++) {
      gains.push(weightedSample(prizes, cost))
    }
    const total = gains.reduce((s, g) => s + g, 0)
    setBalance(b => parseFloat((b + total).toFixed(2)))
    setPlays(p => p + times)
    setHistory(prev => [...prev, ...gains])
  }

  function reset() {
    setBalance(startBalance)
    setPlays(0)
    setHistory([])
    setLocked(false)
  }

  function updatePrize(id, field, raw) {
    const value = field === 'label' ? raw : Math.max(0, Number(raw))
    setPrizes(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  function addPrize() {
    if (prizes.length >= 5) return
    const id = ++idRef.current
    setPrizes(prev => [...prev, { id, label: `Prize ${id}`, prob: 0, payout: 0 }])
  }

  function removePrize(id) {
    setPrizes(prev => prev.filter(p => p.id !== id))
  }

  const evColor = netEV > 0 ? '#10B981' : netEV < 0 ? '#EF4444' : '#9CA3AF'

  return (
    <GamePageLayout title={t('prizeMachine.title')} emoji="🎰">
      <p className="text-gray-500 mb-2 text-sm">{t('prizeMachine.subtitle')}</p>
      <p className="text-center text-sm text-violet-600 font-medium mb-6 max-w-xl mx-auto">{t('prizeMachine.howToPlay')}</p>

      {/* ── Prize Table ──────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <h3 className="font-extrabold text-gray-700 mb-4">{t('prizeMachine.prizeTable')}</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm mb-3">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-start py-2 pe-3 font-extrabold text-gray-500">{t('prizeMachine.label')}</th>
                <th className="text-end py-2 px-3 font-extrabold text-gray-500">{t('prizeMachine.prob')}</th>
                <th className="text-end py-2 px-3 font-extrabold text-gray-500">{t('prizeMachine.payout')}</th>
                <th className="py-2 ps-2 w-6"></th>
              </tr>
            </thead>
            <tbody>
              {prizes.map(p => (
                <tr key={p.id} className="border-b border-gray-50">
                  <td className="py-1.5 pe-3">
                    <input
                      type="text"
                      value={p.label}
                      disabled={locked}
                      onChange={e => updatePrize(p.id, 'label', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-2 py-1 text-sm disabled:bg-gray-50"
                    />
                  </td>
                  <td className="py-1.5 px-3">
                    <input
                      type="number"
                      value={p.prob}
                      disabled={locked}
                      min={0}
                      max={100}
                      onChange={e => updatePrize(p.id, 'prob', e.target.value)}
                      className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-sm text-end disabled:bg-gray-50"
                    />
                  </td>
                  <td className="py-1.5 px-3">
                    <input
                      type="number"
                      value={p.payout}
                      disabled={locked}
                      min={0}
                      onChange={e => updatePrize(p.id, 'payout', e.target.value)}
                      className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-sm text-end disabled:bg-gray-50"
                    />
                  </td>
                  <td className="py-1.5 ps-2">
                    <button
                      onClick={() => removePrize(p.id)}
                      disabled={locked || prizes.length <= 1}
                      className="text-gray-300 hover:text-red-400 font-bold disabled:opacity-30"
                    >
                      {t('prizeMachine.remove')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mb-3">
          <button
            onClick={addPrize}
            disabled={locked || prizes.length >= 5}
            className="text-sm font-bold text-amber-600 hover:text-amber-700 disabled:opacity-40"
          >
            {t('prizeMachine.addPrize')}
          </button>
          <span className={`text-sm font-bold ${probTotal > 100 ? 'text-red-600' : 'text-gray-500'}`}>
            {t('prizeMachine.probTotal')}: {probTotal}%
            {probTotal > 100 && <span className="ms-2">{t('prizeMachine.probWarning')}</span>}
          </span>
        </div>

        {probTotal < 100 && (
          <p className="text-xs text-gray-400 mb-3">
            {t('prizeMachine.noPrize')}: {100 - probTotal}%
          </p>
        )}

        {/* Cost / Start Balance */}
        <div className="flex flex-wrap gap-4 border-t border-gray-100 pt-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            {t('prizeMachine.cost')}:
            <input
              type="number"
              value={cost}
              disabled={locked}
              min={1}
              onChange={e => setCost(Math.max(1, Number(e.target.value)))}
              className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-sm text-end disabled:bg-gray-50"
            />
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            {t('prizeMachine.startBalance')}:
            <input
              type="number"
              value={startBalance}
              disabled={locked}
              min={1}
              onChange={e => {
                const v = Math.max(1, Number(e.target.value))
                setStart(v)
                setBalance(v)
              }}
              className="w-20 border border-gray-200 rounded-lg px-2 py-1 text-sm text-end disabled:bg-gray-50"
            />
          </label>
        </div>
      </div>

      {/* ── EV Display ───────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-gray-700">{t('prizeMachine.ev')}</h3>
          <div className="text-end">
            <span className="text-3xl font-extrabold tabular-nums" style={{ color: evColor }}>
              {netEV > 0 ? '+' : ''}{netEV.toFixed(2)}
            </span>
            <span className="text-sm text-gray-400 ms-1">{t('prizeMachine.evPerPlay')}</span>
          </div>
        </div>
      </div>

      {/* ── Play Controls ────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <span className="text-sm text-gray-500 font-semibold">{t('prizeMachine.balance')}: </span>
            <span
              className="text-2xl font-extrabold tabular-nums"
              style={{ color: balance >= startBalance ? '#10B981' : '#EF4444' }}
            >
              {balance.toFixed(0)}
            </span>
            <span className="text-sm text-gray-400 ms-1">{t('prizeMachine.coins')}</span>
          </div>
          <span className="text-sm text-gray-400">{plays} {t('prizeMachine.plays')}</span>
        </div>

        <div className="flex flex-wrap gap-3 mb-3">
          <button
            onClick={() => play(1)}
            disabled={probTotal > 100}
            className="px-5 py-2.5 bg-amber-500 text-white font-extrabold rounded-2xl shadow-sm hover:bg-amber-600 active:scale-95 transition-all disabled:opacity-40"
          >
            {t('prizeMachine.play1')}
          </button>
          <button
            onClick={() => play(10)}
            disabled={probTotal > 100}
            className="px-5 py-2.5 bg-amber-100 text-amber-700 font-extrabold rounded-2xl hover:bg-amber-200 active:scale-95 transition-all disabled:opacity-40"
          >
            {t('prizeMachine.play10')}
          </button>
          <button
            onClick={() => play(100)}
            disabled={probTotal > 100}
            className="px-5 py-2.5 bg-amber-100 text-amber-700 font-extrabold rounded-2xl hover:bg-amber-200 active:scale-95 transition-all disabled:opacity-40"
          >
            {t('prizeMachine.play100')}
          </button>
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
          >
            {t('prizeMachine.reset')}
          </button>
        </div>
      </div>

      {/* ── Balance Chart ────────────────────────────────────────────────── */}
      {plays > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-sm mb-6"
        >
          <h3 className="font-extrabold text-gray-700 mb-4">{t('prizeMachine.chartTitle')}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData} margin={{ top: 8, right: 16, left: -10, bottom: 0 }}>
              <XAxis dataKey="n" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v, name) => [v.toFixed(0), name === 'actual' ? t('prizeMachine.actual') : t('prizeMachine.evTrend')]} />
              <Legend formatter={v => v === 'actual' ? t('prizeMachine.actual') : t('prizeMachine.evTrend')} />
              <Line type="monotone" dataKey="actual" stroke="#F59E0B" dot={false} strokeWidth={2} name="actual" />
              <Line type="monotone" dataKey="ev" stroke="#9CA3AF" dot={false} strokeWidth={1.5} strokeDasharray="4 4" name="ev" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* ── Explainer ────────────────────────────────────────────────────── */}
      <ExplainerPanel
        accentColor="border-amber-400"
        title={t('prizeMachine.explainer.title')}
        body={t('prizeMachine.explainer.body')}
        example={t('prizeMachine.explainer.example')}
        callout={t('prizeMachine.explainer.callout')}
        furtherReading={t('prizeMachine.explainer.furtherReading')}
      />

      {/* ── Quiz ─────────────────────────────────────────────────────────── */}
      <QuizPanel questions={prizeMachineQuestions} accentColor="border-amber-400" />
    </GamePageLayout>
  )
}
