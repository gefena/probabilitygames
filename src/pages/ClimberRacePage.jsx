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

// ─── SVG pie helpers ──────────────────────────────────────────────────────────

function buildArcs(pcts) {
  const cx = 120, cy = 120, r = 110
  let startAngle = -Math.PI / 2
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

function midAngleToDeg(midAngle) {
  return (midAngle + Math.PI / 2) * (180 / Math.PI)
}

// ─── Spinner SVG ──────────────────────────────────────────────────────────────

function SpinnerSVG({ pcts, bet, wheelDeg, isSpinning }) {
  const arcs = buildArcs(pcts)
  const cx = 120, cy = 120

  return (
    <div className="relative">
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
        <circle cx={cx} cy={cy} r={8} fill="white" stroke="#e2e8f0" strokeWidth={2} />
      </svg>
    </div>
  )
}

// ─── Mountain SVG ─────────────────────────────────────────────────────────────

const PEAK     = { x: 120, y: 10  }
const USER_BASE = { x: 20,  y: 190 }
const BOT_BASE  = { x: 220, y: 190 }

function edgePos(step, base) {
  const t = step / 6
  return {
    x: base.x + (PEAK.x - base.x) * t,
    y: base.y + (PEAK.y - base.y) * t,
  }
}

function MountainSVG({ positions, youLabel, botLabel }) {
  const userPos = edgePos(positions.user, USER_BASE)
  const botPos  = edgePos(positions.bot,  BOT_BASE)

  return (
    <svg viewBox="0 0 240 210" className="w-full max-w-[300px] mx-auto block">
      {/* Mountain fill */}
      <polygon
        points={`${PEAK.x},${PEAK.y} ${USER_BASE.x},${USER_BASE.y} ${BOT_BASE.x},${BOT_BASE.y}`}
        fill="#f1f5f9"
        stroke="#94a3b8"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* Step markers — left edge (user, steps 1-5) */}
      {[1, 2, 3, 4, 5].map(step => {
        const pos = edgePos(step, USER_BASE)
        const reached = positions.user >= step
        return (
          <circle
            key={`u${step}`}
            cx={pos.x} cy={pos.y} r={4.5}
            fill={reached ? '#7c3aed' : '#e2e8f0'}
            stroke={reached ? '#5b21b6' : '#cbd5e1'}
            strokeWidth={1.5}
          />
        )
      })}

      {/* Step markers — right edge (bot, steps 1-5) */}
      {[1, 2, 3, 4, 5].map(step => {
        const pos = edgePos(step, BOT_BASE)
        const reached = positions.bot >= step
        return (
          <circle
            key={`b${step}`}
            cx={pos.x} cy={pos.y} r={4.5}
            fill={reached ? '#0284c7' : '#e2e8f0'}
            stroke={reached ? '#0369a1' : '#cbd5e1'}
            strokeWidth={1.5}
          />
        )
      })}

      {/* Star at peak */}
      <text x={PEAK.x} y={PEAK.y - 8} textAnchor="middle" dominantBaseline="auto" fontSize="16">⭐</text>

      {/* Bot climber */}
      <text x={botPos.x} y={botPos.y} textAnchor="middle" dominantBaseline="middle" fontSize="20">🤖</text>

      {/* User climber */}
      <text x={userPos.x} y={userPos.y} textAnchor="middle" dominantBaseline="middle" fontSize="20">🧗</text>

      {/* Base labels */}
      <text x={USER_BASE.x} y={USER_BASE.y + 14} textAnchor="middle" fontSize="9" fill="#64748b">{youLabel}</text>
      <text x={BOT_BASE.x}  y={BOT_BASE.y  + 14} textAnchor="middle" fontSize="9" fill="#64748b">{botLabel}</text>
    </svg>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ClimberRacePage() {
  const { t } = useTranslation()

  const [bet, setBet]                           = useState([])
  const [spinner, setSpinner]                   = useState(() => randomSpinner())
  const [positions, setPositions]               = useState({ user: 0, bot: 0 })
  const [isSpinning, setIsSpinning]             = useState(false)
  const [pendingNextRound, setPendingNextRound]  = useState(false)
  const [raceWinner, setRaceWinner]             = useState(null)  // 'user' | 'bot'
  const [lastSpin, setLastSpin]                 = useState(null)
  const [history, setHistory]                   = useState([])
  const [wheelDeg, setWheelDeg]                 = useState(0)
  const lastWheelRef                            = useRef(0)

  // Bot picks the color with the highest spinner percentage (derived, not state)
  const botBet = COLORS[spinner.indexOf(Math.max(...spinner))]

  // ── Bet selection ──────────────────────────────────────────────────────────

  function toggleBet(key) {
    if (raceWinner || isSpinning || pendingNextRound) return
    setBet(prev => {
      if (prev.includes(key)) return prev.filter(k => k !== key)
      if (prev.length >= 2) return prev
      return [...prev, key]
    })
  }

  // ── Spin ───────────────────────────────────────────────────────────────────

  function doSpin() {
    if (isSpinning || raceWinner) return

    // Capture derived values before async delay
    const currentBet    = bet
    const currentBotBet = botBet
    const currentPos    = positions

    setIsSpinning(true)

    const arcs     = buildArcs(spinner)
    const spinColor = weightedPick(spinner)
    const winArc   = arcs.find(a => a.key === spinColor)
    const targetDeg = midAngleToDeg(winArc.midAngle)

    const base       = lastWheelRef.current
    const normalised = ((base % 360) + 360) % 360
    const finalDeg   = base + (360 * 3) + ((targetDeg - normalised + 360) % 360)
    lastWheelRef.current = finalDeg
    setWheelDeg(finalDeg)

    setTimeout(() => {
      const userWon = currentBet.length > 0 ? currentBet.includes(spinColor) : null
      const botWon  = currentBotBet === spinColor

      const userMoved = userWon === null ? 0 : (userWon ? 1 : -1)
      const botMoved  = botWon ? 1 : -1

      const newUserPos = Math.min(6, Math.max(0, currentPos.user + userMoved))
      const newBotPos  = Math.min(6, Math.max(0, currentPos.bot  + botMoved))

      setPositions({ user: newUserPos, bot: newBotPos })
      setLastSpin({ spinColor, userWon, botWon, userMoved, botMoved })

      const userAtPeak = newUserPos >= 6
      const botAtPeak  = newBotPos  >= 6

      if (userAtPeak || botAtPeak) {
        const winner = userAtPeak ? 'user' : 'bot'
        setRaceWinner(winner)
        setHistory(h => [...h.slice(-4), { winner, userWon }])
      } else {
        setPendingNextRound(true)
      }
      setIsSpinning(false)
    }, 2700)
  }

  // ── Next round ─────────────────────────────────────────────────────────────

  function startNextRound() {
    setBet([])
    setSpinner(randomSpinner())
    setLastSpin(null)
    setPendingNextRound(false)
    setWheelDeg(0)
    lastWheelRef.current = 0
  }

  // ── Play Again ─────────────────────────────────────────────────────────────

  function playAgain() {
    setBet([])
    setSpinner(randomSpinner())
    setPositions({ user: 0, bot: 0 })
    setIsSpinning(false)
    setRaceWinner(null)
    setLastSpin(null)
    setPendingNextRound(false)
    setWheelDeg(0)
    lastWheelRef.current = 0
  }

  // ── Derived ────────────────────────────────────────────────────────────────

  const betPct = bet.reduce((sum, key) => sum + spinner[COLORS.indexOf(key)], 0)
  const betLabel = bet.length === 0
    ? t('climberRace.noBet')
    : bet.length === 1
      ? t(`climberRace.${bet[0]}`)
      : t('climberRace.betOr', { a: t(`climberRace.${bet[0]}`), b: t(`climberRace.${bet[1]}`) })

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <GamePageLayout title={t('common.games.climber-race')} emoji={t('climberRace.emoji')}>
      <p className="text-center text-gray-500 text-sm mb-1">{t('climberRace.subtitle')}</p>
      <p className="text-center text-gray-400 text-xs mb-4">{t('climberRace.howToPlay')}</p>

      {/* Scoreboard */}
      <div className="text-center font-bold text-slate-600 text-sm mb-6 bg-slate-100 rounded-xl px-4 py-2 border border-slate-200/60">
        {t('climberRace.scoreboard', { user: positions.user, bot: positions.bot })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

        {/* Left: Spinner + controls */}
        <div className="flex flex-col items-center gap-4">
          <h3 className="font-bold text-slate-700 text-sm">{t('climberRace.spinnerThisTurn')}</h3>
          <SpinnerSVG pcts={spinner} bet={bet} wheelDeg={wheelDeg} isSpinning={isSpinning} />

          {/* User bet info */}
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

          {/* Bot bet (shown after user places a bet) */}
          {bet.length > 0 && (
            <div className="text-center bg-sky-50 rounded-2xl px-4 py-2 text-sm w-full border border-sky-100">
              <p className="text-sky-700 font-semibold">
                {t('climberRace.botBetLabel', {
                  emoji: CLIMBER_COLORS[botBet].emoji,
                  color: t(`climberRace.${botBet}`),
                })}
              </p>
            </div>
          )}

          {bet.length === 0 && !pendingNextRound && (
            <p className="text-gray-400 text-sm italic">{t('climberRace.noBet')}</p>
          )}

          {/* Spin / Next Round button */}
          {!raceWinner && (
            pendingNextRound ? (
              <button
                onClick={startNextRound}
                className="bg-emerald-600 text-white font-extrabold text-lg px-8 py-3 rounded-2xl shadow hover:bg-emerald-700 active:scale-95 transition-all"
              >
                {t('climberRace.nextRound')}
              </button>
            ) : (
              <button
                onClick={doSpin}
                disabled={isSpinning}
                className="bg-violet-600 text-white font-extrabold text-lg px-8 py-3 rounded-2xl shadow hover:bg-violet-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('climberRace.spinBtn')}
              </button>
            )
          )}

          {/* Spin result messages */}
          {lastSpin && !raceWinner && (
            <div className="text-center text-sm space-y-1 bg-white rounded-2xl px-4 py-3 border border-slate-100 w-full">
              <p className="font-semibold text-slate-600">
                {t('climberRace.spinLanded', { name: t(`climberRace.${lastSpin.spinColor}`) })}
              </p>
              {lastSpin.userMoved === 1 && (
                <p className="text-green-600 font-bold">{t('climberRace.userClimbUp')}</p>
              )}
              {lastSpin.userMoved === -1 && (
                <p className="text-red-500">{t('climberRace.userClimbDown')}</p>
              )}
              {lastSpin.userMoved === 0 && (
                <p className="text-gray-400 text-xs">{t('climberRace.noBetResult', { name: t(`climberRace.${lastSpin.spinColor}`) })}</p>
              )}
              {lastSpin.botMoved === 1 ? (
                <p className="text-sky-600 font-semibold">{t('climberRace.botClimbUp')}</p>
              ) : (
                <p className="text-orange-500">{t('climberRace.botClimbDown')}</p>
              )}
            </div>
          )}
        </div>

        {/* Right: Bet buttons + Mountain */}
        <div className="flex flex-col items-center gap-4">

          {/* Bet selection */}
          <h3 className="font-bold text-slate-700 text-sm">{t('climberRace.pickBet')}</h3>
          <div className="flex gap-2 flex-wrap justify-center">
            {COLORS.map(key => {
              const c = CLIMBER_COLORS[key]
              const inBet = bet.includes(key)
              const pct = spinner[COLORS.indexOf(key)]
              return (
                <button
                  key={key}
                  onClick={() => toggleBet(key)}
                  disabled={!!raceWinner || isSpinning || pendingNextRound}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                    inBet
                      ? `${c.border} bg-white shadow scale-105`
                      : 'border-transparent bg-white/60 hover:bg-white'
                  } disabled:cursor-default`}
                >
                  <span>{c.emoji}</span>
                  <span className={c.text}>{t(`climberRace.${key}`)}</span>
                  <span className="text-xs text-slate-400">{pct}%</span>
                  {inBet && <span className="text-[10px] text-slate-500 font-normal">✓</span>}
                </button>
              )
            })}
          </div>

          <MountainSVG
            positions={positions}
            youLabel={t('climberRace.youLabel')}
            botLabel={t('climberRace.botLabel')}
          />

          {/* Race result */}
          {raceWinner && (
            <div className="text-center bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] p-4 w-full border border-slate-200/60">
              <p className="text-xl font-extrabold mb-3">
                {raceWinner === 'user' ? t('climberRace.userWins') : t('climberRace.botWins')}
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
            {history.map((entry, i) => (
              <div
                key={i}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold text-white ${
                  entry.winner === 'user' ? 'bg-violet-600' : 'bg-sky-600'
                }`}
              >
                <span>{entry.winner === 'user' ? '🧗' : '🤖'}</span>
                <span>{entry.winner === 'user' ? t('climberRace.youLabel') : t('climberRace.botLabel')}</span>
                <span className="opacity-80">
                  {entry.userWon === null ? '—' : entry.userWon ? t('climberRace.historyWon') : t('climberRace.historyLost')}
                </span>
              </div>
            ))}
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

      <QuizPanel questions={climberRaceQuestions} accentColor="border-violet-400" />
      <GameSuggestions gameId="climber-race" />
    </GamePageLayout>
  )
}
