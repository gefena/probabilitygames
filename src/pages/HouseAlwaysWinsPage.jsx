import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'

// ── Mini-simulator ────────────────────────────────────────────────────────────
function MiniSimulator({ cost, jackpotProb, payout, ev, playLabel, play10Label, accentColor }) {
  const { t } = useTranslation()
  const STARTING = 100

  const [balance, setBalance] = useState(STARTING)
  const [plays, setPlays] = useState(0)
  const [data, setData] = useState([{ n: 0, actual: STARTING, ev: STARTING }])

  function play(times) {
    let b = balance
    const pts = []
    for (let i = 0; i < times; i++) {
      b -= cost
      if (Math.random() < jackpotProb) b += payout
      const n = plays + i + 1
      pts.push({
        n,
        actual: parseFloat(b.toFixed(1)),
        ev: parseFloat((STARTING + n * ev).toFixed(1)),
      })
    }
    setBalance(b)
    setPlays(p => p + times)
    setData(prev => [...prev, ...pts].slice(-101))
  }

  function reset() {
    setBalance(STARTING)
    setPlays(0)
    setData([{ n: 0, actual: STARTING, ev: STARTING }])
  }

  const balColor = balance >= STARTING ? '#10B981' : balance >= STARTING / 2 ? '#F97316' : '#EF4444'

  return (
    <div className="mt-5 pt-4 border-t border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Balance + controls */}
        <div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
            {t('houseAlwaysWins.balance')}
          </p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-extrabold tabular-nums" style={{ color: balColor }}>
              {Math.round(balance)}
            </span>
            <span className="text-gray-400 font-semibold">🪙</span>
            <span className="text-xs text-gray-400 ms-2">({plays} {t('houseAlwaysWins.plays')})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => play(1)}
              className="px-5 py-2 font-bold text-sm rounded-2xl text-white shadow-sm active:scale-95 transition-all"
              style={{ background: accentColor }}
            >
              {playLabel}
            </button>
            <button
              onClick={() => play(10)}
              className="px-4 py-2 font-bold text-sm rounded-2xl border-2 transition-colors"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              {play10Label}
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 font-bold text-sm rounded-2xl bg-gray-100 text-gray-500 hover:bg-gray-200"
            >
              {t('houseAlwaysWins.reset')}
            </button>
          </div>
        </div>

        {/* Balance chart */}
        <div>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={data} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
              <XAxis dataKey="n" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip
                formatter={(v, name) => [v + ' 🪙', name === 'actual' ? t('houseAlwaysWins.actual') : t('houseAlwaysWins.evTrend')]}
                labelFormatter={l => `#${l}`}
              />
              <Line type="monotone" dataKey="actual" stroke={accentColor} dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="ev" stroke="#9CA3AF" dot={false} strokeWidth={1.5} strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// ── Stat row ──────────────────────────────────────────────────────────────────
function StatRow({ label, value, highlight }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className={`text-sm font-bold ${highlight ? 'text-red-600' : 'text-gray-800'}`}>{value}</span>
    </div>
  )
}

// ── Game card ─────────────────────────────────────────────────────────────────
function GameCard({ emoji, title, subtitle, stats, edge, edgeColor, simplified, simulator, accentBorderClass }) {
  const { t } = useTranslation()
  return (
    <div className={`bg-white rounded-3xl p-6 shadow-sm border-s-4 ${accentBorderClass}`}>
      <div className="flex items-start justify-between mb-4 gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
            <span>{emoji}</span> {title}
          </h2>
          <p className="text-gray-400 text-sm mt-0.5">{subtitle}</p>
        </div>
        <div
          className="px-3 py-1 rounded-full text-white text-sm font-extrabold flex-shrink-0"
          style={{ background: edgeColor }}
        >
          {t('houseAlwaysWins.edgeBadge', { n: edge })}
        </div>
      </div>

      <div className="space-y-0">
        {stats.map((s, i) => (
          <StatRow key={i} label={s.label} value={s.value} highlight={s.highlight} />
        ))}
      </div>

      {simplified && (
        <p className="mt-3 text-xs text-amber-700 font-semibold bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl">
          ⚠ {t('houseAlwaysWins.simplified')}
        </p>
      )}

      {simulator}
    </div>
  )
}

// ── Real Odds accordion row ───────────────────────────────────────────────────
function RealOddsRow({ emoji, title, edge, summary, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-700 last:border-0">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-3 py-3 text-start">
        <span className="text-xl">{emoji}</span>
        <span className="font-bold text-white flex-1">{title}</span>
        <span className="text-xs font-bold text-red-300 bg-red-950 px-2 py-0.5 rounded-full">{edge}</span>
        <span className="text-slate-400 text-sm ms-2">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="pb-4 text-sm text-slate-300 space-y-2">
          <p className="text-slate-400 italic">{summary}</p>
          {children}
        </div>
      )}
    </div>
  )
}

function InsightBlock({ text }) {
  return (
    <p className="bg-slate-700/60 rounded-xl px-3 py-2 text-slate-200 text-sm italic">
      💡 {text}
    </p>
  )
}

// ── Real Odds section ─────────────────────────────────────────────────────────
function RealOddsSection() {
  const { t } = useTranslation()
  return (
    <div className="bg-slate-800/60 rounded-2xl p-5 mt-8">
      <h2 className="font-extrabold text-white text-lg mb-1">{t('houseAlwaysWins.realOdds.title')}</h2>
      <p className="text-slate-400 text-sm mb-4">{t('houseAlwaysWins.realOdds.subtitle')}</p>

      {/* Lottery */}
      <RealOddsRow
        emoji="🎟️"
        title={t('houseAlwaysWins.realOdds.lottery.title')}
        edge={t('houseAlwaysWins.realOdds.lottery.edge')}
        summary={t('houseAlwaysWins.realOdds.lottery.summary')}
      >
        <div className="space-y-3">
          {/* Israeli Lotto */}
          <div>
            <p className="font-semibold text-white mb-1">{t('houseAlwaysWins.realOdds.lottery.il.label')}</p>
            <ul className="space-y-0.5 text-slate-300">
              <li>📊 {t('houseAlwaysWins.realOdds.lottery.il.combos')}</li>
              <li>💰 {t('houseAlwaysWins.realOdds.lottery.il.cost')}</li>
              <li>🏆 {t('houseAlwaysWins.realOdds.lottery.il.prize')}</li>
              <li>📉 {t('houseAlwaysWins.realOdds.lottery.il.loss')}</li>
              <li>⏱ {t('houseAlwaysWins.realOdds.lottery.il.time')}</li>
            </ul>
          </div>
          {/* Powerball */}
          <div>
            <p className="font-semibold text-white mb-1">{t('houseAlwaysWins.realOdds.lottery.pb.label')}</p>
            <ul className="space-y-0.5 text-slate-300">
              <li>📊 {t('houseAlwaysWins.realOdds.lottery.pb.combos')}</li>
              <li>💰 {t('houseAlwaysWins.realOdds.lottery.pb.cost')}</li>
              <li>🏆 {t('houseAlwaysWins.realOdds.lottery.pb.prize')}</li>
              <li>📉 {t('houseAlwaysWins.realOdds.lottery.pb.loss')}</li>
              <li>⏱ {t('houseAlwaysWins.realOdds.lottery.pb.time')}</li>
            </ul>
          </div>
          <InsightBlock text={t('houseAlwaysWins.realOdds.lottery.insight')} />
        </div>
      </RealOddsRow>

      {/* European Roulette */}
      <RealOddsRow
        emoji="🎡"
        title={t('houseAlwaysWins.realOdds.euRoulette.title')}
        edge={t('houseAlwaysWins.realOdds.euRoulette.edge')}
        summary={t('houseAlwaysWins.realOdds.euRoulette.summary')}
      >
        <ol className="list-decimal list-inside space-y-1 text-slate-300 marker:text-slate-500">
          <li>{t('houseAlwaysWins.realOdds.euRoulette.step1')}</li>
          <li>{t('houseAlwaysWins.realOdds.euRoulette.step2')}</li>
          <li>{t('houseAlwaysWins.realOdds.euRoulette.step3')}</li>
        </ol>
        <InsightBlock text={t('houseAlwaysWins.realOdds.euRoulette.insight')} />
      </RealOddsRow>

      {/* American vs European Roulette */}
      <RealOddsRow
        emoji="🟢"
        title={t('houseAlwaysWins.realOdds.amRoulette.title')}
        edge={t('houseAlwaysWins.realOdds.amRoulette.edge')}
        summary={t('houseAlwaysWins.realOdds.amRoulette.summary')}
      >
        <ol className="list-decimal list-inside space-y-1 text-slate-300 marker:text-slate-500">
          <li>{t('houseAlwaysWins.realOdds.amRoulette.step1')}</li>
          <li>{t('houseAlwaysWins.realOdds.amRoulette.step2')}</li>
          <li>{t('houseAlwaysWins.realOdds.amRoulette.step3')}</li>
        </ol>
        <InsightBlock text={t('houseAlwaysWins.realOdds.amRoulette.insight')} />
      </RealOddsRow>

      {/* Slot Machines */}
      <RealOddsRow
        emoji="🎰"
        title={t('houseAlwaysWins.realOdds.slots.title')}
        edge={t('houseAlwaysWins.realOdds.slots.edge')}
        summary={t('houseAlwaysWins.realOdds.slots.summary')}
      >
        <ol className="list-decimal list-inside space-y-1 text-slate-300 marker:text-slate-500">
          <li>{t('houseAlwaysWins.realOdds.slots.step1')}</li>
          <li>{t('houseAlwaysWins.realOdds.slots.step2')}</li>
          <li>{t('houseAlwaysWins.realOdds.slots.step3')}</li>
        </ol>
        <InsightBlock text={t('houseAlwaysWins.realOdds.slots.insight')} />
      </RealOddsRow>

      {/* Blackjack */}
      <RealOddsRow
        emoji="🃏"
        title={t('houseAlwaysWins.realOdds.blackjack.title')}
        edge={t('houseAlwaysWins.realOdds.blackjack.edge')}
        summary={t('houseAlwaysWins.realOdds.blackjack.summary')}
      >
        <ol className="list-decimal list-inside space-y-1 text-slate-300 marker:text-slate-500">
          <li>{t('houseAlwaysWins.realOdds.blackjack.step1')}</li>
          <li>{t('houseAlwaysWins.realOdds.blackjack.step2')}</li>
          <li>{t('houseAlwaysWins.realOdds.blackjack.step3')}</li>
        </ol>
        <InsightBlock text={t('houseAlwaysWins.realOdds.blackjack.insight')} />
      </RealOddsRow>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HouseAlwaysWinsPage() {
  const { t } = useTranslation()

  const comparisonData = [
    { name: t('houseAlwaysWins.lottery.title'), edge: 90,  fill: '#EF4444' },
    { name: t('houseAlwaysWins.slots.title'),   edge: 20,  fill: '#F97316' },
    { name: t('houseAlwaysWins.roulette.title'),edge: 2.7, fill: '#10B981' },
  ]

  return (
    <GamePageLayout title={t('common.games.house-always-wins')} emoji="🏦">
      <p className="text-gray-500 mb-2 text-sm">{t('houseAlwaysWins.subtitle')}</p>
      <p className="text-center text-sm text-violet-600 font-medium mb-6 max-w-xl mx-auto">{t('houseAlwaysWins.howToPlay')}</p>

      {/* Explainer */}
      <ExplainerPanel
        accentColor="border-red-400"
        title={t('houseAlwaysWins.explainer.title')}
        body={t('houseAlwaysWins.explainer.body')}
        example={t('houseAlwaysWins.explainer.example')}
        callout={t('houseAlwaysWins.explainer.callout')}
        furtherReading={t('houseAlwaysWins.explainer.furtherReading')}
      />

      {/* Three game cards */}
      <div className="flex flex-col gap-8">

        {/* Lottery */}
        <GameCard
          emoji="🎟️"
          title={t('houseAlwaysWins.lottery.title')}
          subtitle={t('houseAlwaysWins.lottery.subtitle')}
          edge={90}
          edgeColor="#EF4444"
          accentBorderClass="border-red-400"
          simplified
          stats={[
            { label: t('houseAlwaysWins.lottery.odds'),   value: '1 / 1,000' },
            { label: t('houseAlwaysWins.lottery.payout'), value: '500 🪙' },
            { label: t('houseAlwaysWins.lottery.cost'),   value: '5 🪙' },
            { label: t('houseAlwaysWins.lottery.ev'),     value: '−4.5 🪙 / ' + t('houseAlwaysWins.lottery.perPlay'), highlight: true },
            { label: t('houseAlwaysWins.lottery.edge'),   value: '90%', highlight: true },
          ]}
          simulator={
            <MiniSimulator
              cost={5}
              jackpotProb={1 / 1000}
              payout={500}
              ev={-4.5}
              playLabel={t('houseAlwaysWins.lottery.play')}
              play10Label={t('houseAlwaysWins.lottery.play10')}
              accentColor="#EF4444"
            />
          }
        />

        {/* Slot Machine */}
        <GameCard
          emoji="🎰"
          title={t('houseAlwaysWins.slots.title')}
          subtitle={t('houseAlwaysWins.slots.subtitle')}
          edge={20}
          edgeColor="#F97316"
          accentBorderClass="border-orange-400"
          stats={[
            { label: t('houseAlwaysWins.slots.odds'),   value: '1 / 1,000' },
            { label: t('houseAlwaysWins.slots.payout'), value: '800 🪙' },
            { label: t('houseAlwaysWins.slots.cost'),   value: '1 🪙' },
            { label: t('houseAlwaysWins.slots.ev'),     value: '−0.2 🪙 / ' + t('houseAlwaysWins.slots.perPlay'), highlight: true },
            { label: t('houseAlwaysWins.slots.edge'),   value: '20%', highlight: true },
          ]}
          simulator={
            <MiniSimulator
              cost={1}
              jackpotProb={1 / 1000}
              payout={800}
              ev={-0.2}
              playLabel={t('houseAlwaysWins.slots.play')}
              play10Label={t('houseAlwaysWins.slots.play10')}
              accentColor="#F97316"
            />
          }
        />

        {/* Roulette */}
        <GameCard
          emoji="🎡"
          title={t('houseAlwaysWins.roulette.title')}
          subtitle={t('houseAlwaysWins.roulette.subtitle')}
          edge={2.7}
          edgeColor="#10B981"
          accentBorderClass="border-emerald-400"
          stats={[
            { label: t('houseAlwaysWins.roulette.odds'),   value: '1 / 37' },
            { label: t('houseAlwaysWins.roulette.payout'), value: '35 : 1' },
            { label: t('houseAlwaysWins.roulette.cost'),   value: '1 🪙' },
            { label: t('houseAlwaysWins.roulette.ev'),     value: '−0.027 🪙 / ' + t('houseAlwaysWins.roulette.perPlay'), highlight: true },
            { label: t('houseAlwaysWins.roulette.edge'),   value: '≈ 2.7%', highlight: true },
          ]}
          simulator={
            <MiniSimulator
              cost={1}
              jackpotProb={1 / 37}
              payout={36}
              ev={-1 / 37}
              playLabel={t('houseAlwaysWins.roulette.play')}
              play10Label={t('houseAlwaysWins.roulette.play10')}
              accentColor="#10B981"
            />
          }
        />
      </div>

      {/* House Edge Comparison Chart */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mt-8">
        <h2 className="font-extrabold text-gray-800 mb-1">{t('houseAlwaysWins.comparison.title')}</h2>
        <p className="text-gray-400 text-sm mb-5">{t('houseAlwaysWins.comparison.subtitle')}</p>
        <ResponsiveContainer width="100%" height={130}>
          <BarChart layout="vertical" data={comparisonData} margin={{ top: 0, right: 56, left: 0, bottom: 0 }}>
            <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} />
            <YAxis type="category" dataKey="name" width={76} tick={{ fontSize: 13, fontWeight: 700 }} />
            <Tooltip formatter={v => [`${v}%`, t('houseAlwaysWins.comparison.edgeLabel')]} />
            <Bar dataKey="edge" radius={[0, 6, 6, 0]} label={{ position: 'right', formatter: v => `${v}%`, fontSize: 12, fontWeight: 700 }}>
              {comparisonData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Real World Odds accordion */}
      <RealOddsSection />
    </GamePageLayout>
  )
}
