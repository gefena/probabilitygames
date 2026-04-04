import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import greedyPigQuestions from '../quizzes/greedyPig'

// ── Die face pip patterns ─────────────────────────────────────────────────────
const PIP_LAYOUTS = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
}

function DieFace({ value, shaking, bust }) {
  const pips = value ? PIP_LAYOUTS[value] : []
  return (
    <motion.div
      animate={shaking ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.35 }}
      className={`w-20 h-20 rounded-2xl border-4 shadow-lg grid relative select-none
        ${bust ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}`}
    >
      {value && (
        <div className="absolute inset-0 p-2.5 grid grid-cols-3 grid-rows-3 gap-0">
          {Array.from({ length: 9 }, (_, idx) => {
            const row = Math.floor(idx / 3)
            const col = idx % 3
            const hasPip = pips.some(([r, c]) => r === row && c === col)
            return (
              <div key={idx} className="flex items-center justify-center">
                {hasPip && (
                  <div className={`w-3.5 h-3.5 rounded-full ${bust ? 'bg-red-500' : 'bg-gray-800'}`} />
                )}
              </div>
            )
          })}
        </div>
      )}
      {!value && (
        <div className="flex items-center justify-center h-full text-gray-200 text-3xl">🎲</div>
      )}
    </motion.div>
  )
}

// ── Simulator ─────────────────────────────────────────────────────────────────
function runSimulation(n, playerBankAt, target) {
  const botBankAt = Math.round(target * 0.35)
  let playerWins = 0
  for (let i = 0; i < n; i++) {
    let playerScore = 0, botScore = 0
    let playerTurn = true
    while (playerScore < target && botScore < target) {
      if (playerTurn) {
        let turnTotal = 0
        while (true) {
          const roll = Math.ceil(Math.random() * 6)
          if (roll === 1) { turnTotal = 0; break }
          turnTotal += roll
          if (turnTotal >= playerBankAt) { playerScore += turnTotal; break }
        }
        if (playerScore >= target) break
      } else {
        let turnTotal = 0
        while (true) {
          const roll = Math.ceil(Math.random() * 6)
          if (roll === 1) { turnTotal = 0; break }
          turnTotal += roll
          if (turnTotal >= botBankAt) { botScore += turnTotal; break }
        }
        if (botScore >= target) break
      }
      playerTurn = !playerTurn
    }
    if (playerScore >= target) playerWins++
  }
  return playerWins
}

const TARGETS = [30, 50, 75, 100]
const SIM_STRATEGIES = [10, 15, 20, 25, 30]
const SIM_COLORS = ['#818cf8', '#60a5fa', '#34d399', '#f59e0b', '#f472b6']

// ── Page ──────────────────────────────────────────────────────────────────────
export default function GreedyPigPage() {
  const { t } = useTranslation()

  const [target, setTarget] = useState(50)
  const [phase, setPhase] = useState('player_turn')
  // 'player_turn' | 'player_bust' | 'bot_turn_start' | 'bot_rolling' | 'bot_bust' | 'bot_banking' | 'game_over'
  const [playerScore, setPlayerScore] = useState(0)
  const [botScore, setBotScore] = useState(0)
  const [playerTurn, setPlayerTurn] = useState(0)   // current turn accumulator
  const [botTurn, setBotTurn] = useState(0)
  const [dieValue, setDieValue] = useState(null)
  const [shaking, setShaking] = useState(false)
  const [bust, setBust] = useState(false)
  const [winner, setWinner] = useState(null)        // 'player' | 'bot'
  const [botReaction, setBotReaction] = useState('')
  const [gamesPlayed, setGamesPlayed] = useState(0)
  const [simResults, setSimResults] = useState(null)
  const [simN, setSimN] = useState(null)

  const botActiveRef = useRef(false)

  function rollDie() {
    return Math.ceil(Math.random() * 6)
  }

  function animateRoll(value, isBust, callback) {
    setShaking(true)
    setBust(false)
    setTimeout(() => {
      setDieValue(value)
      setShaking(false)
      if (isBust) setBust(true)
      setTimeout(callback, isBust ? 600 : 300)
    }, 350)
  }

  function handleRoll() {
    if (phase !== 'player_turn') return
    const val = rollDie()
    if (val === 1) {
      animateRoll(val, true, () => {
        setPhase('player_bust')
        setPlayerTurn(0)
        setTimeout(() => {
          setBust(false)
          setPhase('bot_turn_start')
          startBotTurn()
        }, 700)
      })
    } else {
      animateRoll(val, false, () => {
        setPlayerTurn(prev => prev + val)
      })
    }
  }

  function handleBank() {
    if (phase !== 'player_turn' || playerTurn === 0) return
    const newScore = playerScore + playerTurn
    setPlayerScore(newScore)
    setPlayerTurn(0)
    setDieValue(null)
    setBust(false)
    if (newScore >= target) {
      setWinner('player')
      setPhase('game_over')
      setGamesPlayed(g => g + 1)
    } else {
      setPhase('bot_turn_start')
      startBotTurn()
    }
  }

  function doBotRoll(currentTurn, threshold) {
    if (!botActiveRef.current) return
    const val = rollDie()
    if (val === 1) {
      animateRoll(val, true, () => {
        if (!botActiveRef.current) return
        setBotReaction(t('greedyPig.botReaction.bust'))
        setBotTurn(0)
        setPhase('bot_bust')
        setTimeout(() => {
          if (!botActiveRef.current) return
          setBust(false)
          setBotReaction('')
          setPhase('player_turn')
        }, 800)
      })
    } else {
      const newTurn = currentTurn + val
      const reaction = val >= 5 ? t('greedyPig.botReaction.lucky') : val <= 2 ? t('greedyPig.botReaction.close') : ''
      animateRoll(val, false, () => {
        if (!botActiveRef.current) return
        setBotTurn(newTurn)
        if (reaction) setBotReaction(reaction)
        if (newTurn >= threshold) {
          setTimeout(() => {
            if (!botActiveRef.current) return
            setBotReaction(t('greedyPig.botReaction.bank'))
            setPhase('bot_banking')
            setBotScore(prev => {
              const newScore = prev + newTurn
              setBotTurn(0)
              setTimeout(() => {
                if (!botActiveRef.current) return
                setBotReaction('')
                if (newScore >= target) {
                  setWinner('bot')
                  setPhase('game_over')
                  setGamesPlayed(g => g + 1)
                } else {
                  setDieValue(null)
                  setPhase('player_turn')
                }
              }, 700)
              return newScore
            })
          }, 500)
        } else {
          setTimeout(() => doBotRoll(newTurn, threshold), 700)
        }
      })
    }
  }

  function startBotTurn() {
    const threshold = Math.round(target * 0.35)
    botActiveRef.current = true
    setBotTurn(0)
    setBotReaction('')
    setTimeout(() => {
      if (!botActiveRef.current) return
      setPhase('bot_rolling')
      doBotRoll(0, threshold)
    }, 600)
  }

  function resetGame(newTarget) {
    botActiveRef.current = false
    const t2 = newTarget ?? target
    setTarget(t2)
    setPhase('player_turn')
    setPlayerScore(0)
    setBotScore(0)
    setPlayerTurn(0)
    setBotTurn(0)
    setDieValue(null)
    setShaking(false)
    setBust(false)
    setWinner(null)
    setBotReaction('')
  }

  function runSim(n) {
    const results = SIM_STRATEGIES.map(s => ({
      strategy: s,
      wins: runSimulation(n, s, target),
      total: n,
    }))
    setSimResults(results)
    setSimN(n)
  }

  const maxWins = simResults ? Math.max(...simResults.map(r => r.wins)) : 0
  const simChartData = simResults ? simResults.map((r, i) => ({
    name: t('greedyPig.simulator.strategyLabel', { n: r.strategy }),
    winPct: parseFloat(((r.wins / r.total) * 100).toFixed(1)),
    fill: SIM_COLORS[i],
    best: r.wins === maxWins,
  })) : []

  const botThreshold = Math.round(target * 0.35)
  const isPlayerTurn = phase === 'player_turn'
  const isBotActive = ['bot_turn_start', 'bot_rolling', 'bot_banking'].includes(phase)

  return (
    <GamePageLayout title={t('greedyPig.title')} emoji={t('greedyPig.emoji')}>
      <p className="text-gray-500 mb-2 text-sm text-center">{t('greedyPig.subtitle')}</p>
      <p className="text-center text-sm text-violet-600 font-medium mb-6 max-w-xl mx-auto">{t('greedyPig.howToPlay')}</p>

      {/* Target selector */}
      <div className="flex justify-center items-center gap-2 mb-6 flex-wrap">
        <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{t('greedyPig.targetLabel')}:</span>
        {TARGETS.map(tgt => (
          <button
            key={tgt}
            onClick={() => resetGame(tgt)}
            className={`px-3 py-1.5 rounded-xl font-extrabold text-sm transition-all ${
              target === tgt
                ? 'bg-amber-500 text-white shadow-md scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tgt}
          </button>
        ))}
      </div>

      {/* Scoreboard */}
      <div className="grid grid-cols-2 gap-4 mb-6 max-w-sm mx-auto">
        <div className={`rounded-2xl p-4 text-center border-2 transition-colors ${isPlayerTurn ? 'border-violet-400 bg-violet-50' : 'border-gray-100 bg-gray-50'}`}>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">{t('greedyPig.yourScore')}</p>
          <p className="text-4xl font-black text-violet-700 tabular-nums">{playerScore}</p>
          <div className="mt-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-violet-500 rounded-full transition-all" style={{ width: `${Math.min(100, (playerScore / target) * 100)}%` }} />
          </div>
        </div>
        <div className={`rounded-2xl p-4 text-center border-2 transition-colors ${isBotActive ? 'border-amber-400 bg-amber-50' : 'border-gray-100 bg-gray-50'}`}>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">{t('greedyPig.botScore')}</p>
          <p className="text-4xl font-black text-amber-600 tabular-nums">{botScore}</p>
          <div className="mt-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${Math.min(100, (botScore / target) * 100)}%` }} />
          </div>
        </div>
      </div>

      {/* Game over */}
      <AnimatePresence>
        {phase === 'game_over' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mb-6"
          >
            <p className={`text-3xl font-black mb-2 ${winner === 'player' ? 'text-emerald-600' : 'text-rose-600'}`}>
              {winner === 'player' ? t('greedyPig.win') : t('greedyPig.lose')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => resetGame()}
              className="px-6 py-2 rounded-xl bg-violet-600 text-white font-bold text-sm shadow"
            >
              {t('greedyPig.playAgain')}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active game area */}
      {phase !== 'game_over' && (
        <>
          {/* Turn label */}
          <p className="text-center text-sm font-bold text-gray-500 mb-3">
            {isPlayerTurn ? t('greedyPig.playerTurn') : isBotActive ? t('greedyPig.botTurn') : ''}
            {phase === 'bot_turn_start' && ` — ${t('greedyPig.botThinking')}`}
          </p>

          {/* Bot reaction */}
          <AnimatePresence>
            {botReaction && (
              <motion.p
                key={botReaction}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-sm font-bold text-amber-600 mb-2"
              >
                {botReaction}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Die */}
          <div className="flex justify-center mb-4">
            <DieFace value={dieValue} shaking={shaking} bust={bust} />
          </div>

          {/* Turn totals */}
          <div className="flex justify-center gap-8 mb-5">
            <div className="text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wide">{t('greedyPig.yourScore')}</p>
              <p className={`text-2xl font-black tabular-nums ${isPlayerTurn ? 'text-violet-600' : 'text-gray-300'}`}>
                +{playerTurn}
              </p>
              {isPlayerTurn && playerTurn > 0 && (
                <p className="text-[10px] text-rose-400 font-semibold">{t('greedyPig.turnTotalHint')}</p>
              )}
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wide">{t('greedyPig.botScore')}</p>
              <p className={`text-2xl font-black tabular-nums ${isBotActive ? 'text-amber-500' : 'text-gray-300'}`}>
                +{botTurn}
              </p>
            </div>
          </div>

          {/* Bust flash */}
          <AnimatePresence>
            {(phase === 'player_bust' || phase === 'bot_bust') && (
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.1 }}
                exit={{ opacity: 0 }}
                className="text-center text-2xl font-black text-rose-600 mb-3"
              >
                {t('greedyPig.bust')}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Player controls */}
          <div className="flex justify-center gap-3 mb-2">
            <motion.button
              whileHover={isPlayerTurn ? { scale: 1.05 } : {}}
              whileTap={isPlayerTurn ? { scale: 0.95 } : {}}
              onClick={handleRoll}
              disabled={!isPlayerTurn}
              className="px-6 py-3 rounded-2xl bg-violet-600 text-white font-extrabold text-base shadow disabled:opacity-30 transition-all"
            >
              {t('greedyPig.rollBtn')}
            </motion.button>
            <motion.button
              whileHover={isPlayerTurn && playerTurn > 0 ? { scale: 1.05 } : {}}
              whileTap={isPlayerTurn && playerTurn > 0 ? { scale: 0.95 } : {}}
              onClick={handleBank}
              disabled={!isPlayerTurn || playerTurn === 0}
              className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-extrabold text-base shadow disabled:opacity-30 transition-all"
            >
              {t('greedyPig.bankBtn')}
            </motion.button>
          </div>
          <p className="text-center text-xs text-gray-400 mb-6">
            {t('greedyPig.botScore')}: banks at {botThreshold} pts
          </p>
        </>
      )}

      {/* Simulator */}
      <div className={`border-2 rounded-3xl p-5 mb-6 ${gamesPlayed >= 1 ? 'border-gray-200 bg-white' : 'border-dashed border-gray-200 bg-gray-50 opacity-60'}`}>
        <h3 className="font-bold text-gray-700 text-sm mb-1 text-center">{t('greedyPig.simulator.title')}</h3>
        {gamesPlayed < 1 && (
          <p className="text-center text-xs text-gray-400 mb-3">{t('greedyPig.simulator.lockedHint')}</p>
        )}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {[100, 1000, 10000].map(n => (
            <motion.button
              key={n}
              disabled={gamesPlayed < 1}
              whileHover={gamesPlayed >= 1 ? { scale: 1.05 } : {}}
              whileTap={gamesPlayed >= 1 ? { scale: 0.95 } : {}}
              onClick={() => runSim(n)}
              className="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-sm shadow disabled:cursor-not-allowed"
            >
              {t(`greedyPig.simulator.simulate${n === 100 ? '100' : n === 1000 ? '1000' : '10000'}`)}
            </motion.button>
          ))}
        </div>

        {simResults && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-center text-xs text-gray-400 mb-2">
              {t('greedyPig.simulator.resultsLabel')} — {simN?.toLocaleString()} games each
            </p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={simChartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tickFormatter={v => `${v}%`} tick={{ fontSize: 10 }} domain={[0, 100]} />
                <Tooltip formatter={v => [`${v}%`, t('greedyPig.simulator.winRateLabel')]} />
                <Bar dataKey="winPct" radius={[6, 6, 0, 0]}>
                  {simChartData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} opacity={entry.best ? 1 : 0.55} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center text-xs text-amber-600 font-semibold mt-1">
              ★ Best: bank at {simResults.find(r => r.wins === maxWins)?.strategy} pts
              ({((maxWins / simN) * 100).toFixed(1)}% win rate)
            </p>
          </motion.div>
        )}
      </div>

      <ExplainerPanel
        title={t('greedyPig.explainer.title')}
        body={t('greedyPig.explainer.body')}
        example={t('greedyPig.explainer.example')}
        callout={t('greedyPig.explainer.callout')}
        furtherReading={t('greedyPig.explainer.furtherReading')}
        accentColor="border-amber-400"
      />

      <QuizPanel questions={greedyPigQuestions} accentColor="border-amber-400" />
    </GamePageLayout>
  )
}
