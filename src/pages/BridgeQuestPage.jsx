import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import bridgeQuestQuestions from '../quizzes/bridgeQuest'

// ─── Constants ────────────────────────────────────────────────────────────────

const MIN_BRIDGE_PCT = 30
const MAX_BRIDGE_PCT = 95
const PATH_COUNT = 3
const BRIDGE_COUNTS = [2, 3, 3, 4]
const PATH_LETTERS = ['A', 'B', 'C']
const TOTAL_RACES = 3

// ─── Path generation ──────────────────────────────────────────────────────────

function randomPath() {
  const n = BRIDGE_COUNTS[Math.floor(Math.random() * BRIDGE_COUNTS.length)]
  const bridges = Array.from({ length: n }, () =>
    Math.round(MIN_BRIDGE_PCT + Math.random() * (MAX_BRIDGE_PCT - MIN_BRIDGE_PCT))
  )
  const survival = bridges.reduce((p, b) => p * b / 100, 1)
  return { bridges, survival }
}

function randomRace() {
  return Array.from({ length: PATH_COUNT }, randomPath)
}

// ─── Bot logic ────────────────────────────────────────────────────────────────

function greedyBotPick(paths) {
  return paths.reduce((best, path, i) => {
    const worstBridge = Math.min(...path.bridges)
    return worstBridge > best.worstBridge ? { index: i, worstBridge } : best
  }, { index: 0, worstBridge: -1 }).index
}

// ─── Scoring ──────────────────────────────────────────────────────────────────

function racePoint(playerSurvived, botSurvived) {
  if (playerSurvived && !botSurvived) return { player: 1, bot: 0 }
  if (!playerSurvived && botSurvived) return { player: 0, bot: 1 }
  return { player: 0, bot: 0 }
}

// ─── Delay helper ─────────────────────────────────────────────────────────────

function delay(ms) {
  return new Promise(r => setTimeout(r, ms))
}

// ─── Bridge pill component ────────────────────────────────────────────────────

function BridgePill({ pct, result }) {
  const base = 'px-2 py-1 rounded-lg text-xs font-bold border-2 transition-all'
  if (result === 'safe')    return <span className={`${base} bg-green-100 border-green-400 text-green-700`}>🟢 {pct}%</span>
  if (result === 'fell')    return <span className={`${base} bg-red-100 border-red-400 text-red-700`}>🔴 {pct}%</span>
  if (result === 'pending') return <span className={`${base} bg-yellow-50 border-yellow-300 text-yellow-700 animate-pulse`}>⏳ {pct}%</span>
  return <span className={`${base} bg-slate-100 border-slate-300 text-slate-600`}>🌉 {pct}%</span>
}

// ─── Path row component ───────────────────────────────────────────────────────

function PathRow({
  path, index, letter, preview, chosen, botChosen,
  playerResults, botResults, phase, onTap, onConfirm,
  t,
}) {
  const isPreviewed = preview === index
  const isChosen    = chosen === index
  const isBotPath   = botChosen === index
  const survivalN   = Math.round(path.survival * 100)

  const isPickingPhase = phase === 'picking'
  const showPlayerResults = (phase === 'crossing' || phase === 'botCross' || phase === 'result') && isChosen
  const showBotResults    = (phase === 'botCross' || phase === 'result') && isBotPath

  const borderClass = isChosen
    ? 'border-violet-500 bg-violet-50'
    : isBotPath && phase !== 'picking'
      ? 'border-orange-400 bg-orange-50'
      : isPreviewed
        ? 'border-blue-400 bg-blue-50'
        : 'border-slate-200 bg-white hover:border-slate-300'

  return (
    <div
      className={`rounded-2xl border-2 p-3 transition-all ${borderClass} ${isPickingPhase && !chosen ? 'cursor-pointer' : ''}`}
      onClick={() => isPickingPhase && !chosen && onTap(index)}
    >
      <div className="flex items-center gap-2 flex-wrap">
        {/* Label */}
        <span className="font-extrabold text-slate-700 text-sm min-w-[60px]">
          {t('bridgeQuest.pathLabel', { letter })}
        </span>

        {/* Bridge pills */}
        <div className="flex gap-1 flex-wrap">
          {path.bridges.map((pct, bi) => {
            const playerResult = showPlayerResults ? (playerResults[bi] ?? null) : null
            const botResult    = showBotResults && !showPlayerResults ? (botResults[bi] ?? null) : null
            const result = playerResult ?? botResult
            return <BridgePill key={bi} pct={pct} result={result} />
          })}
        </div>

        {/* Tags */}
        {isChosen && <span className="text-xs font-bold text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full">👤 {t('bridgeQuest.you')}</span>}
        {isBotPath && phase !== 'picking' && <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">🤖 Bot</span>}

        {/* Tap hint */}
        {isPickingPhase && !chosen && !isPreviewed && (
          <span className="text-xs text-slate-400 ms-auto">{t('bridgeQuest.tapToPreview')}</span>
        )}
      </div>

      {/* Preview panel */}
      {isPreviewed && isPickingPhase && !chosen && (
        <div className="mt-3 pt-3 border-t border-blue-200">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-blue-700 font-bold text-sm">
                {t('bridgeQuest.survival', { n: survivalN })}
              </p>
              {/* Dot bar: 100 dots, survivalN green */}
              <div className="flex flex-wrap gap-[2px] mt-1 max-w-[200px]">
                {Array.from({ length: 100 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-[6px] h-[6px] rounded-full ${i < survivalN ? 'bg-green-400' : 'bg-red-200'}`}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={e => { e.stopPropagation(); onConfirm(index) }}
              className="bg-violet-600 text-white font-bold text-sm px-4 py-2 rounded-xl hover:bg-violet-700 transition-colors shrink-0"
            >
              {t('bridgeQuest.choosePath')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function BridgeQuestPage() {
  const { t } = useTranslation()
  const isMountedRef = useRef(true)

  const [race,          setRace]          = useState(() => randomRace())
  const [phase,         setPhase]         = useState('picking')  // picking | crossing | botCross | result | tournament
  const [preview,       setPreview]       = useState(null)
  const [chosen,        setChosen]        = useState(null)
  const [botChosen,     setBotChosen]     = useState(null)
  const [playerResults, setPlayerResults] = useState([])   // Array of 'pending'|'safe'|'fell'|null
  const [botResults,    setBotResults]    = useState([])
  const [playerSurvived, setPlayerSurvived] = useState(null)
  const [botSurvived,    setBotSurvived]    = useState(null)
  const [scores,        setScores]        = useState({ player: 0, bot: 0 })
  const [raceIndex,     setRaceIndex]     = useState(0)    // 0-based, 0..2

  useEffect(() => {
    isMountedRef.current = true
    return () => { isMountedRef.current = false }
  }, [])

  // ── Tap / confirm ─────────────────────────────────────────────────────────

  function handleTap(index) {
    if (phase !== 'picking' || chosen !== null) return
    if (preview === index) {
      handleConfirm(index)  // second tap on same path = confirm
    } else {
      setPreview(index)
    }
  }

  async function handleConfirm(index) {
    if (phase !== 'picking' || chosen !== null) return
    const bot = greedyBotPick(race)
    setChosen(index)
    setBotChosen(bot)
    setPreview(null)
    setPhase('crossing')

    // Player crossing
    const pBridges = race[index].bridges
    const pResults = new Array(pBridges.length).fill(null)
    if (isMountedRef.current) setPlayerResults([...pResults])

    let pSurvived = true
    for (let i = 0; i < pBridges.length; i++) {
      await delay(700)
      if (!isMountedRef.current) return
      pResults[i] = 'pending'
      setPlayerResults([...pResults])

      await delay(300)
      if (!isMountedRef.current) return
      const survived = Math.random() * 100 < pBridges[i]
      pResults[i] = survived ? 'safe' : 'fell'
      setPlayerResults([...pResults])

      if (!survived) { pSurvived = false; break }
      await delay(400)
    }
    if (!isMountedRef.current) return
    setPlayerSurvived(pSurvived)

    await delay(500)
    if (!isMountedRef.current) return
    setPhase('botCross')

    // Bot crossing
    const bBridges = race[bot].bridges
    const bResults = new Array(bBridges.length).fill(null)
    if (isMountedRef.current) setBotResults([...bResults])

    let bSurvived = true
    for (let i = 0; i < bBridges.length; i++) {
      await delay(700)
      if (!isMountedRef.current) return
      bResults[i] = 'pending'
      setBotResults([...bResults])

      await delay(300)
      if (!isMountedRef.current) return
      const survived = Math.random() * 100 < bBridges[i]
      bResults[i] = survived ? 'safe' : 'fell'
      setBotResults([...bResults])

      if (!survived) { bSurvived = false; break }
      await delay(400)
    }
    if (!isMountedRef.current) return
    setBotSurvived(bSurvived)

    // Score
    const point = racePoint(pSurvived, bSurvived)
    const newScores = { player: scores.player + point.player, bot: scores.bot + point.bot }
    setScores(newScores)

    await delay(400)
    if (!isMountedRef.current) return
    setPhase(raceIndex >= TOTAL_RACES - 1 ? 'tournament' : 'result')
  }

  // ── Next race ─────────────────────────────────────────────────────────────

  function nextRace() {
    const next = raceIndex + 1
    setRaceIndex(next)
    setRace(randomRace())
    setPhase('picking')
    setPreview(null)
    setChosen(null)
    setBotChosen(null)
    setPlayerResults([])
    setBotResults([])
    setPlayerSurvived(null)
    setBotSurvived(null)
  }

  // ── Play Again ────────────────────────────────────────────────────────────

  function playAgain() {
    setRaceIndex(0)
    setRace(randomRace())
    setPhase('picking')
    setPreview(null)
    setChosen(null)
    setBotChosen(null)
    setPlayerResults([])
    setBotResults([])
    setPlayerSurvived(null)
    setBotSurvived(null)
    setScores({ player: 0, bot: 0 })
  }

  // ── Derived ───────────────────────────────────────────────────────────────

  const currentRaceLabel = t('bridgeQuest.raceN', { n: raceIndex + 1 })

  let tournamentMsg = null
  if (phase === 'tournament') {
    if (scores.player > scores.bot) tournamentMsg = t('bridgeQuest.winTournament')
    else if (scores.bot > scores.player) tournamentMsg = t('bridgeQuest.loseTournament')
    else tournamentMsg = t('bridgeQuest.drawTournament')
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <GamePageLayout title={t('common.games.bridge-quest')} emoji={t('bridgeQuest.emoji')}>
      <p className="text-center text-gray-500 text-sm mb-1">{t('bridgeQuest.subtitle')}</p>
      <p className="text-center text-gray-400 text-xs mb-4">{t('bridgeQuest.howToPlay')}</p>

      {/* Race header */}
      {phase !== 'tournament' && (
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="font-bold text-violet-600 text-sm">{currentRaceLabel}</span>
          <span className="text-sm text-slate-600 font-bold">
            {t('bridgeQuest.score', { p: scores.player, b: scores.bot })}
          </span>
        </div>
      )}

      {/* Path rows — always visible so player can review results on tournament screen */}
      <div className="flex flex-col gap-3 mb-6">
          {race.map((path, i) => (
            <PathRow
              key={i}
              path={path}
              index={i}
              letter={PATH_LETTERS[i]}
              preview={preview}
              chosen={chosen}
              botChosen={botChosen}
              playerResults={chosen === i ? playerResults : []}
              botResults={botChosen === i ? botResults : []}
              phase={phase}
              onTap={handleTap}
              onConfirm={handleConfirm}
              t={t}
            />
          ))}
      </div>

      {/* Bot reveal */}
      {botChosen !== null && phase !== 'picking' && phase !== 'tournament' && (
        <div className="text-center text-sm text-orange-600 font-semibold mb-3">
          🤖 {t('bridgeQuest.botChoice', { letter: PATH_LETTERS[botChosen] })} — {t('bridgeQuest.botReason')}
        </div>
      )}

      {/* Crossing status */}
      {phase === 'crossing' && (
        <div className="text-center text-violet-600 font-bold animate-pulse mb-3">
          👤 {t('bridgeQuest.crossing')}
        </div>
      )}
      {phase === 'botCross' && (
        <div className="text-center text-orange-500 font-bold animate-pulse mb-3">
          🤖 {t('bridgeQuest.crossing')}
        </div>
      )}

      {/* Race result */}
      {(phase === 'result' || phase === 'tournament') && playerSurvived !== null && botSurvived !== null && (
        <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] p-4 mb-4 text-center space-y-2 border border-slate-200/60">
          <div className="flex justify-center gap-6 text-sm">
            <span className={`font-bold ${playerSurvived ? 'text-green-600' : 'text-red-500'}`}>
              👤 {playerSurvived ? t('bridgeQuest.survived') : t('bridgeQuest.didNotSurvive')}
            </span>
            <span className={`font-bold ${botSurvived ? 'text-green-600' : 'text-red-500'}`}>
              🤖 {botSurvived ? t('bridgeQuest.botSurvived') : t('bridgeQuest.botFell')}
            </span>
          </div>
          <p className="font-extrabold text-slate-700 text-base">
            {playerSurvived && !botSurvived ? t('bridgeQuest.pointYou')
              : !playerSurvived && botSurvived ? t('bridgeQuest.pointBot')
              : t('bridgeQuest.tie')}
          </p>
          <p className="text-slate-500 text-sm font-bold">
            {t('bridgeQuest.score', { p: scores.player, b: scores.bot })}
          </p>
          {phase === 'result' && (
            <button
              onClick={nextRace}
              className="bg-violet-600 text-white font-bold px-6 py-2 rounded-xl hover:bg-violet-700 transition-colors mt-1"
            >
              {t('bridgeQuest.nextRace')}
            </button>
          )}
        </div>
      )}

      {/* Tournament result */}
      {phase === 'tournament' && (
        <div className="bg-white rounded-3xl shadow-lg p-6 text-center space-y-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/60">
          <p className="text-3xl font-extrabold text-slate-800">{tournamentMsg}</p>
          <p className="text-slate-500 font-bold text-lg">
            {t('bridgeQuest.score', { p: scores.player, b: scores.bot })}
          </p>
          <button
            onClick={playAgain}
            className="bg-violet-600 text-white font-extrabold px-8 py-3 rounded-2xl hover:bg-violet-700 transition-colors text-lg"
          >
            {t('bridgeQuest.playAgain')}
          </button>
        </div>
      )}

      {/* Explainer */}
      <ExplainerPanel
        accentColor="border-blue-400"
        title={t('bridgeQuest.explainer.title')}
        body={t('bridgeQuest.explainer.body')}
        example={t('bridgeQuest.explainer.example')}
        callout={t('bridgeQuest.explainer.callout')}
        furtherReading={t('bridgeQuest.explainer.furtherReading')}
      />

      {/* Quiz */}
      <QuizPanel questions={bridgeQuestQuestions} accentColor="border-blue-400" />
    </GamePageLayout>
  )
}
