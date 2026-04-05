import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import climberRaceQuestions from '../quizzes/climberRace'
import GameSuggestions from '../components/GameSuggestions'

// ─── Constants ────────────────────────────────────────────────────────────────

const COLORS = ['sunny', 'blaze', 'storm', 'ivy']
const MIN_PCT = 8

const CLIMBER_COLORS = {
  sunny: { fill: '#facc15', highlight: '#fde047', text: 'text-yellow-500', bg: 'bg-yellow-400', border: 'border-yellow-400', emoji: '🟡' },
  blaze: { fill: '#ef4444', highlight: '#f87171', text: 'text-red-500',    bg: 'bg-red-500',    border: 'border-red-400',    emoji: '🔴' },
  storm: { fill: '#3b82f6', highlight: '#60a5fa', text: 'text-blue-500',   bg: 'bg-blue-500',   border: 'border-blue-400',   emoji: '🔵' },
  ivy:   { fill: '#22c55e', highlight: '#4ade80', text: 'text-green-500',  bg: 'bg-green-500',  border: 'border-green-400',  emoji: '🟢' },
}

// ─── Spinner helpers ───────────────────────────────────────────────────────────

function randomSpinner() {
  const raw = COLORS.map(() => Math.random())
  const total = raw.reduce((a, b) => a + b, 0)
  let pcts = raw.map(w => Math.round((w / total) * 100))
  pcts[0] += 100 - pcts.reduce((a, b) => a + b, 0)
  pcts = pcts.map(p => Math.max(MIN_PCT, p))
  const sum = pcts.reduce((a, b) => a + b, 0)
  pcts = pcts.map(p => Math.round((p / sum) * 100))
  pcts[0] += 100 - pcts.reduce((a, b) => a + b, 0)
  return pcts
}

function weightedPick(pcts) {
  const r = Math.random() * 100
  let cum = 0
  for (let i = 0; i < COLORS.length; i++) {
    cum += pcts[i]
    if (r < cum) return COLORS[i]
  }
  return COLORS[COLORS.length - 1]
}

function toRatioKey(pct) {
  if (pct >= 90) return 'climberRace.ratioAlways'
  if (pct >= 65) return 'climberRace.ratio2in3'
  if (pct >= 45) return 'climberRace.ratio1in2'
  if (pct >= 30) return 'climberRace.ratio1in3'
  if (pct >= 15) return 'climberRace.ratio1in5'
  return 'climberRace.ratioRarely'
}

// ─── SVG pie helpers (adapted from MagicSpinnerPage) ──────────────────────────

function buildArcs(pcts) {
  const cx = 120, cy = 120, r = 110
  let startAngle = -Math.PI / 2  // start at top
  return COLORS.map((key, i) => {
    const frac = pcts[i] / 100
    const angle = frac * 2 * Math.PI
    const endAngle = startAngle + angle
    const x1 = cx + r * Math.cos(startAngle)
    const y1 = cy + r * Math.sin(startAngle)
    const x2 = cx + r * Math.cos(endAngle)
    const y2 = cy + r * Math.sin(endAngle)
    const large = angle > Math.PI ? 1 : 0
    const midAngle = startAngle + angle / 2
    const lx = cx + r * 0.65 * Math.cos(midAngle)
    const ly = cy + r * 0.65 * Math.sin(midAngle)
    const path = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`
    const result = { key, path, lx, ly, pct: pcts[i], startAngle, endAngle, midAngle }
    startAngle = endAngle
    return result
  })
}

// Convert midAngle (radians from -π/2) to degrees for CSS rotation
// The needle points up at 0°; midAngle -π/2 = 0° rotation needed
function midAngleToDeg(midAngle) {
  return (midAngle + Math.PI / 2) * (180 / Math.PI)
}

// ─── Spinner SVG ──────────────────────────────────────────────────────────────

function SpinnerSVG({ pcts, bet, wheelDeg, isSpinning }) {
  const arcs = buildArcs(pcts)
  const cx = 120, cy = 120

  return (
    <div className="relative">
      {/* Fixed pointer at top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10 text-2xl leading-none select-none">▼</div>
      <svg
        viewBox="0 0 240 240"
        className="w-full max-w-[280px] mx-auto block"
        style={{
          transform: `rotate(${wheelDeg}deg)`,
          transition: isSpinning ? 'transform 2.5s cubic-bezier(0.2, 0.8, 0.4, 1)' : 'none',
        }}
      >
        {arcs.map(arc => {
          const inBet = bet.includes(arc.key)
          const c = CLIMBER_COLORS[arc.key]
          return (
            <g key={arc.key}>
              <path
                d={arc.path}
                fill={inBet ? c.highlight : c.fill}
                stroke={inBet ? 'white' : '#ffffff80'}
                strokeWidth={inBet ? 3 : 1.5}
              />
              {inBet && (
                <path
                  d={arc.path}
                  fill="none"
                  stroke="white"
                  strokeWidth={4}
                  strokeDasharray="6 4"
                  opacity={0.6}
                />
              )}
              <text
                x={arc.lx} y={arc.ly}
                textAnchor="middle" dominantBaseline="middle"
                fill="white" fontWeight="bold" fontSize="13"
              >
                {arc.pct}%
              </text>
            </g>
          )
        })}
        {/* Centre dot */}
        <circle cx={cx} cy={cy} r={8} fill="white" stroke="#e2e8f0" strokeWidth={2} />
      </svg>
    </div>
  )
}

// ─── Mountain display ──────────────────────────────────────────────────────────

const STEPS = 6

function ClimberTrack({ colorKey, steps, bet, name, onBetToggle, raceOver }) {
  const c = CLIMBER_COLORS[colorKey]
  const inBet = bet.includes(colorKey)
  return (
    <button
      onClick={() => onBetToggle(colorKey)}
      disabled={raceOver}
      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all border-2 ${
        inBet
          ? `${c.border} bg-white shadow-md scale-105`
          : 'border-transparent bg-white/60 hover:bg-white'
      } ${raceOver ? 'cursor-default' : 'cursor-pointer'}`}
    >
      <span className="text-xl">{c.emoji}</span>
      <span className={`text-xs font-bold ${c.text}`}>{name}</span>
      {/* Step dots — top to bottom = step 6 → 1 */}
      <div className="flex flex-col gap-1 mt-1">
        {Array.from({ length: STEPS }, (_, i) => {
          const step = STEPS - i  // step 6 at top
          const reached = steps >= step
          return (
            <div
              key={step}
              className={`w-4 h-4 rounded-full border-2 transition-all ${
                reached
                  ? `${c.bg} border-transparent`
                  : 'bg-white border-gray-300'
              } ${step === STEPS && reached ? 'ring-2 ring-yellow-300' : ''}`}
            />
          )
        })}
      </div>
      {inBet && (
        <span className="text-[10px] font-bold text-slate-500 mt-1">✓ BET</span>
      )}
    </button>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ClimberRacePage() {
  const { t } = useTranslation()

  const [bet, setBet]               = useState([])
  const [spinner, setSpinner]       = useState(() => randomSpinner())
  const [steps, setSteps]           = useState({ sunny: 0, blaze: 0, storm: 0, ivy: 0 })
  const [isSpinning, setIsSpinning] = useState(false)
  const [raceWinner, setRaceWinner] = useState(null)
  const [lastSpin, setLastSpin]     = useState(null)
  const [history, setHistory]       = useState([])
  const [needleDeg, setNeedleDeg]   = useState(0)
  const lastNeedleRef               = useRef(0)

  // ── Bet selection ──────────────────────────────────────────────────────────

  function toggleBet(key) {
    if (raceWinner) return
    setBet(prev => {
      if (prev.includes(key)) return prev.filter(k => k !== key)
      if (prev.length >= 2) return prev
      return [...prev, key]
    })
  }

  // ── Spin ───────────────────────────────────────────────────────────────────

  function doSpin() {
    if (isSpinning || raceWinner) return
    setIsSpinning(true)

    // Compute winning sector angles for needle landing
    const arcs = buildArcs(spinner)
    const winner = weightedPick(spinner)
    const winArc = arcs.find(a => a.key === winner)
    const targetDeg = midAngleToDeg(winArc.midAngle)

    // Add 3 full rotations on top of whatever the needle is at now
    const base = lastNeedleRef.current
    // Normalise base to [0,360), then add 3 rotations + target
    const normalised = ((base % 360) + 360) % 360
    const finalDeg = base + (360 * 3) + ((targetDeg - normalised + 360) % 360)
    lastNeedleRef.current = finalDeg
    setNeedleDeg(finalDeg)

    setTimeout(() => {
      const newSteps = { ...steps, [winner]: steps[winner] + 1 }
      setSteps(newSteps)
      const betWon = bet.length > 0 ? bet.includes(winner) : null  // null = no bet
      setLastSpin({ winner, betWon })

      if (newSteps[winner] >= STEPS) {
        setRaceWinner(winner)
        setHistory(h => [...h.slice(-4), { raceWinner: winner, betWon }])
      } else {
        setSpinner(randomSpinner())
      }
      setIsSpinning(false)
    }, 2700)
  }

  // ── Play Again ─────────────────────────────────────────────────────────────

  function playAgain() {
    setBet([])
    setSpinner(randomSpinner())
    setSteps({ sunny: 0, blaze: 0, storm: 0, ivy: 0 })
    setIsSpinning(false)
    setRaceWinner(null)
    setLastSpin(null)
    setNeedleDeg(0)
    lastNeedleRef.current = 0
  }

  // ── Derived values ─────────────────────────────────────────────────────────

  const betPct = bet.reduce((sum, key) => sum + spinner[COLORS.indexOf(key)], 0)
  const atStep5 = COLORS.filter(k => steps[k] === 5 && !raceWinner)

  const betLabel = bet.length === 0
    ? t('climberRace.noBet')
    : bet.length === 1
      ? t(`climberRace.${bet[0]}`)
      : t('climberRace.betOr', { a: t(`climberRace.${bet[0]}`), b: t(`climberRace.${bet[1]}`) })

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <GamePageLayout title={t('common.games.climber-race')} emoji={t('climberRace.emoji')}>
      <p className="text-center text-gray-500 text-sm mb-1">{t('climberRace.subtitle')}</p>
      <p className="text-center text-gray-400 text-xs mb-6">{t('climberRace.howToPlay')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

        {/* Left: Spinner */}
        <div className="flex flex-col items-center gap-4">
          <h3 className="font-bold text-slate-700 text-sm">{t('climberRace.spinnerThisTurn')}</h3>
          <SpinnerSVG pcts={spinner} bet={bet} wheelDeg={needleDeg} isSpinning={isSpinning} />

          {/* Bet info */}
          {bet.length > 0 && (
            <div className="text-center bg-violet-50 rounded-2xl px-4 py-2 text-sm w-full">
              <p className="font-bold text-violet-700">
                {t('climberRace.betArc', { pct: betPct })}
              </p>
              <p className="text-violet-500 text-xs">
                {t('climberRace.betRatio', { ratio: t(toRatioKey(betPct)) })}
              </p>
              <p className="text-violet-600 text-xs mt-1">
                {t('climberRace.betWinIf', { bet: betLabel })}
              </p>
            </div>
          )}
          {bet.length === 0 && (
            <p className="text-gray-400 text-sm italic">{t('climberRace.noBet')}</p>
          )}

          {/* Spin button */}
          {!raceWinner && (
            <button
              onClick={doSpin}
              disabled={isSpinning}
              className="bg-violet-600 text-white font-extrabold text-lg px-8 py-3 rounded-2xl shadow hover:bg-violet-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('climberRace.spinBtn')}
            </button>
          )}

          {/* Spin result */}
          {lastSpin && (
            <div className="text-center text-sm">
              {lastSpin.betWon === null ? (
                <span className="text-gray-400">
                  {t('climberRace.noBetResult', { name: t(`climberRace.${lastSpin.winner}`) })}
                </span>
              ) : (
                <>
                  <span className="font-bold text-slate-700">
                    {t('climberRace.spinResult', { name: t(`climberRace.${lastSpin.winner}`) })}
                  </span>
                  {' '}
                  {lastSpin.betWon ? (
                    <span className="text-green-600 font-bold">{t('climberRace.betWon')}</span>
                  ) : (
                    <span className="text-red-500">{t('climberRace.betMissed')}</span>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Right: Mountain */}
        <div className="flex flex-col items-center gap-3">
          <h3 className="font-bold text-slate-700 text-sm">{t('climberRace.mountainTapToBet')}</h3>

          {/* Summit */}
          <div className="text-center text-2xl">🏔️</div>

          {/* Four climber tracks in 2×2 grid — left col: Sunny/Blaze, right col: Storm/Ivy */}
          <div className="grid grid-cols-2 gap-3">
            {['sunny', 'storm', 'blaze', 'ivy'].map(key => (
              <ClimberTrack
                key={key}
                colorKey={key}
                steps={steps[key]}
                bet={bet}
                name={t(`climberRace.${key}`)}
                onBetToggle={toggleBet}
                raceOver={!!raceWinner}
              />
            ))}
          </div>

          {/* Warning */}
          {atStep5.length > 0 && (
            <div className="text-amber-600 font-bold text-sm bg-amber-50 rounded-xl px-4 py-2 text-center">
              {atStep5.map(k => (
                <div key={k}>{t('climberRace.warning', { name: t(`climberRace.${k}`) })}</div>
              ))}
            </div>
          )}

          {/* Race result */}
          {raceWinner && (
            <div className="text-center bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] p-4 w-full border border-slate-200/60">
              <p className="text-xl font-extrabold mb-3">
                {history[history.length - 1]?.betWon === true
                  ? t('climberRace.win', { name: t(`climberRace.${raceWinner}`) })
                  : history[history.length - 1]?.betWon === false
                    ? t('climberRace.lose', { name: t(`climberRace.${raceWinner}`) })
                    : t('climberRace.noBetResult', { name: t(`climberRace.${raceWinner}`) })}
              </p>
              <button
                onClick={playAgain}
                className="bg-violet-600 text-white font-bold px-6 py-2 rounded-xl hover:bg-violet-700 transition-colors"
              >
                {t('climberRace.playAgain')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Race History */}
      {history.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold text-slate-600 text-sm mb-2">{t('climberRace.historyTitle')}</h3>
          <div className="flex flex-wrap gap-2">
            {history.map((entry, i) => {
              const c = CLIMBER_COLORS[entry.raceWinner]
              return (
                <div
                  key={i}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${c.bg} text-white`}
                >
                  <span>{c.emoji} {t(`climberRace.${entry.raceWinner}`)}</span>
                  <span className="opacity-80">
                    {entry.betWon === null ? '—' : entry.betWon ? t('climberRace.historyWon') : t('climberRace.historyLost')}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Explainer */}
      <ExplainerPanel
        accentColor="border-violet-400"
        title={t('climberRace.explainer.title')}
        body={t('climberRace.explainer.body')}
        example={t('climberRace.explainer.example')}
        callout={t('climberRace.explainer.callout')}
        furtherReading={t('climberRace.explainer.furtherReading')}
      />

      {/* Quiz */}
      <QuizPanel questions={climberRaceQuestions} accentColor="border-violet-400" />
          <GameSuggestions gameId="climber-race" />
    </GamePageLayout>
  )
}
