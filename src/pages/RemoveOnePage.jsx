import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import removeOneQuestions from '../quizzes/removeOne'

// ── Pip layouts ───────────────────────────────────────────────────────────────
const PIP_LAYOUTS = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
}

function DieFace({ value, shaking }) {
  const pips = value ? PIP_LAYOUTS[value] : []
  return (
    <motion.div
      animate={shaking ? { x: [0, -5, 5, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-14 h-14 rounded-xl border-4 border-gray-300 bg-white shadow relative select-none"
    >
      {value ? (
        <div className="absolute inset-0 p-1.5 grid grid-cols-3 grid-rows-3 gap-0">
          {Array.from({ length: 9 }, (_, idx) => {
            const row = Math.floor(idx / 3)
            const col = idx % 3
            const hasPip = pips.some(([r, c]) => r === row && c === col)
            return (
              <div key={idx} className="flex items-center justify-center">
                {hasPip && <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-300 text-2xl">🎲</div>
      )}
    </motion.div>
  )
}

// ── Bot strategies ────────────────────────────────────────────────────────────
const SUMS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const TOTAL_TOKENS = 18
const SIM_SIZES = [100, 500, 1000]

function larryTokens() {
  return { 2: 1, 3: 1, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 1, 12: 1 }
}

function maxTokens() {
  return { 2: 0, 3: 1, 4: 1, 5: 2, 6: 3, 7: 4, 8: 3, 9: 2, 10: 1, 11: 1, 12: 0 }
}

function initPlayerTokens() {
  return Object.fromEntries(SUMS.map(s => [s, 0]))
}

function totalTokens(tokens) {
  return Object.values(tokens).reduce((a, b) => a + b, 0)
}

function removeOneToken(tokens, sum) {
  if (!tokens[sum]) return tokens
  return { ...tokens, [sum]: tokens[sum] - 1 }
}

// ── Simulation ────────────────────────────────────────────────────────────────
function simulateGame(initYou, initLarry, initMax) {
  const boards = {
    you: { ...initYou },
    larry: { ...initLarry },
    max: { ...initMax },
  }
  while (true) {
    const sum = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1
    for (const key of ['you', 'larry', 'max']) {
      if (boards[key][sum] > 0) boards[key][sum]--
    }
    const winners = []
    for (const key of ['you', 'larry', 'max']) {
      if (Object.values(boards[key]).every(v => v === 0)) {
        winners.push(key)
      }
    }
    if (winners.length > 0) return winners
  }
}

function runSimulation(n, yourTokens) {
  const wins = { you: 0, larry: 0, max: 0 }
  const ly = larryTokens()
  const mx = maxTokens()
  for (let i = 0; i < n; i++) {
    const winners = simulateGame(yourTokens, ly, mx)
    const share = 1 / winners.length
    for (const w of winners) {
      wins[w] += share
    }
  }
  return wins
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function RemoveOnePage() {
  const { t } = useTranslation()

  const [phase, setPhase] = useState('placing')        // placing | rolling | finished
  const [playerTokens, setPlayerTokens] = useState(initPlayerTokens())
  const [larryBoard, setLarryBoard] = useState(larryTokens())
  const [maxBoard, setMaxBoard] = useState(maxTokens())
  const [isRolling, setIsRolling] = useState(false)
  const [highlightRow, setHighlightRow] = useState(null)
  const [lastRoll, setLastRoll] = useState(null)
  const [winner, setWinner] = useState(null)           // 'player'|'larry'|'max'|'tie-larry'|'tie-max'
  const [gamesPlayed, setGamesPlayed] = useState(0)
  const [simResults, setSimResults] = useState(null)
  const [initBoards, setInitBoards] = useState(null)

  const lastPlacementRef = useRef(null)

  function adjustToken(sum, delta) {
    if (phase !== 'placing') return
    setPlayerTokens(prev => {
      const curr = prev[sum]
      const newVal = curr + delta
      if (newVal < 0) return prev
      const prevTotal = Object.values(prev).reduce((a, b) => a + b, 0)
      if (delta > 0 && prevTotal >= TOTAL_TOKENS) return prev
      return { ...prev, [sum]: newVal }
    })
  }

  function startRolling() {
    if (totalTokens(playerTokens) !== TOTAL_TOKENS) return
    lastPlacementRef.current = { ...playerTokens }
    setInitBoards({
      player: { ...playerTokens },
      larry: larryTokens(),
      max: maxTokens(),
    })
    setLarryBoard(larryTokens())
    setMaxBoard(maxTokens())
    setPhase('rolling')
  }

  function doRoll() {
    if (isRolling || phase !== 'rolling') return
    const a = Math.floor(Math.random() * 6) + 1
    const b = Math.floor(Math.random() * 6) + 1
    const sum = a + b
    setIsRolling(true)
    setLastRoll({ a, b, sum })
    setTimeout(() => {
      setHighlightRow(sum)
      setTimeout(() => {
        setHighlightRow(null)
        const newPlayer = removeOneToken(playerTokens, sum)
        const newLarry = removeOneToken(larryBoard, sum)
        const newMax = removeOneToken(maxBoard, sum)
        setPlayerTokens(newPlayer)
        setLarryBoard(newLarry)
        setMaxBoard(newMax)
        const playerDone = totalTokens(newPlayer) === 0
        const larryDone = totalTokens(newLarry) === 0
        const maxDone = totalTokens(newMax) === 0
        if (playerDone || larryDone || maxDone) {
          let w
          if (playerDone && (larryDone || maxDone)) {
            w = larryDone ? 'tie-larry' : 'tie-max'
          } else if (playerDone) {
            w = 'player'
          } else if (larryDone) {
            w = 'larry'
          } else {
            w = 'max'
          }
          setWinner(w)
          setPhase('finished')
          setGamesPlayed(g => g + 1)
        }
        setIsRolling(false)
      }, 400)
    }, 350)
  }

  function playAgain() {
    setPhase('placing')
    setPlayerTokens(initPlayerTokens())
    setLarryBoard(larryTokens())
    setMaxBoard(maxTokens())
    setIsRolling(false)
    setHighlightRow(null)
    setLastRoll(null)
    setWinner(null)
    setInitBoards(null)
  }

  function runSim(n) {
    const yourTokens = lastPlacementRef.current ?? larryTokens()
    const results = runSimulation(n, yourTokens)
    setSimResults({ n, wins: results })
  }

  const placed = totalTokens(playerTokens)

  const simChartData = simResults
    ? [
        { name: t('removeOne.yourBoard'), key: 'you', value: Math.round((simResults.wins.you / simResults.n) * 100) },
        { name: t('removeOne.larry'), key: 'larry', value: Math.round((simResults.wins.larry / simResults.n) * 100) },
        { name: t('removeOne.max'), key: 'max', value: Math.round((simResults.wins.max / simResults.n) * 100) },
      ]
    : []

  const isWin = winner === 'player' || winner === 'tie-larry' || winner === 'tie-max'

  return (
    <GamePageLayout title={t('removeOne.title')} emoji={t('removeOne.emoji')}>
      <p className="text-gray-500 mb-2 text-sm">{t('removeOne.subtitle')}</p>
      <p className="text-center text-sm text-emerald-700 font-medium mb-6 max-w-xl mx-auto">
        {t('removeOne.howToPlay')}
      </p>

      {/* ── PLACEMENT PHASE ────────────────────────────────────────────────── */}
      {phase === 'placing' && (
        <div className="mb-6">
          {/* Token total banner */}
          <div className={`text-center font-bold mb-4 py-2 px-4 rounded-xl text-sm transition-colors ${placed === TOTAL_TOKENS ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
            {placed === TOTAL_TOKENS
              ? t('removeOne.tokensReady')
              : t('removeOne.tokensLabel', { n: placed })}
          </div>

          {/* Player placement rows */}
          <div className="bg-white rounded-3xl p-4 shadow-sm mb-4">
            {SUMS.map(s => (
              <div key={s} className="flex items-center gap-2 mb-2">
                <span className="w-5 text-right text-xs font-extrabold text-gray-500 flex-shrink-0">{s}</span>
                <button
                  onClick={() => adjustToken(s, -1)}
                  disabled={playerTokens[s] === 0}
                  className="w-7 h-7 rounded-lg bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 disabled:opacity-30 flex-shrink-0 transition-colors"
                >
                  −
                </button>
                <div className="flex-1 flex gap-0.5 flex-wrap min-h-[14px]">
                  {Array.from({ length: playerTokens[s] }, (_, i) => (
                    <div key={i} className="w-3 h-3 rounded-full bg-emerald-600" />
                  ))}
                </div>
                <button
                  onClick={() => adjustToken(s, 1)}
                  disabled={placed >= TOTAL_TOKENS}
                  className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 disabled:opacity-30 flex-shrink-0 transition-colors"
                >
                  +
                </button>
                <span className="w-4 text-right text-xs text-gray-400 flex-shrink-0">{playerTokens[s]}</span>
              </div>
            ))}
          </div>

          {/* Bot boards preview (read-only) */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: t('removeOne.larry'), hint: t('removeOne.larryHint'), tokens: larryTokens() },
              { label: t('removeOne.max'), hint: t('removeOne.maxHint'), tokens: maxTokens() },
            ].map(({ label, hint, tokens }) => (
              <div key={label} className="bg-white rounded-2xl p-3 shadow-sm">
                <p className="font-extrabold text-gray-700 text-xs mb-0.5">{label}</p>
                <p className="text-gray-400 text-xs mb-2 italic">{hint}</p>
                {SUMS.map(s => (
                  <div key={s} className="flex items-center gap-1 mb-1">
                    <span className="w-4 text-right text-xs text-gray-400 flex-shrink-0">{s}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: tokens[s] }, (_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-gray-300" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Roll button */}
          <div className="flex justify-center">
            <button
              onClick={startRolling}
              disabled={placed !== TOTAL_TOKENS}
              className="px-10 py-3 bg-emerald-600 text-white font-extrabold text-lg rounded-2xl shadow-md hover:bg-emerald-700 active:scale-95 transition-all disabled:opacity-40"
            >
              {t('removeOne.rollBtn')}
            </button>
          </div>
        </div>
      )}

      {/* ── THREE-COLUMN BOARD (rolling / finished) ────────────────────────── */}
      {(phase === 'rolling' || phase === 'finished') && initBoards && (
        <div className="mb-6 bg-white rounded-3xl p-4 shadow-sm overflow-x-auto">
          <div className="min-w-[300px]">
            {/* Headers */}
            <div className="grid grid-cols-[1.5rem_1fr_1fr_1fr] gap-1 mb-2">
              <div />
              <div className="text-center text-xs font-extrabold text-emerald-700">{t('removeOne.yourBoard')}</div>
              <div className="text-center text-xs font-bold text-gray-400">{t('removeOne.larry')}</div>
              <div className="text-center text-xs font-bold text-blue-500">{t('removeOne.max')}</div>
            </div>
            {/* Rows */}
            {SUMS.map(s => (
              <motion.div
                key={s}
                animate={highlightRow === s ? { backgroundColor: '#fef08a' } : { backgroundColor: '#ffffff' }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-[1.5rem_1fr_1fr_1fr] gap-1 mb-1 rounded-lg px-1 py-0.5"
              >
                <span className="text-xs font-bold text-gray-400 text-right self-center">{s}</span>
                {/* Player dots */}
                <div className="flex gap-0.5 flex-wrap justify-center items-center min-h-[10px]">
                  {Array.from({ length: initBoards.player[s] }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${i < playerTokens[s] ? 'bg-emerald-600' : 'border border-gray-200'}`}
                    />
                  ))}
                </div>
                {/* Larry dots */}
                <div className="flex gap-0.5 flex-wrap justify-center items-center min-h-[10px]">
                  {Array.from({ length: initBoards.larry[s] }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${i < larryBoard[s] ? 'bg-gray-400' : 'border border-gray-200'}`}
                    />
                  ))}
                </div>
                {/* Max dots */}
                <div className="flex gap-0.5 flex-wrap justify-center items-center min-h-[10px]">
                  {Array.from({ length: initBoards.max[s] }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${i < maxBoard[s] ? 'bg-blue-500' : 'border border-gray-200'}`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── DICE DISPLAY ───────────────────────────────────────────────────── */}
      {(phase === 'rolling' || phase === 'finished') && (
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="flex items-center gap-3">
            <DieFace value={lastRoll?.a ?? null} shaking={isRolling} />
            <span className="text-xl font-extrabold text-gray-400">+</span>
            <DieFace value={lastRoll?.b ?? null} shaking={isRolling} />
            {lastRoll && (
              <span className="text-base font-extrabold text-gray-700 ms-1">= {lastRoll.sum}</span>
            )}
          </div>
          {lastRoll && (
            <p className="text-xs text-gray-500 font-medium">
              {t('removeOne.rollResult', { a: lastRoll.a, b: lastRoll.b, sum: lastRoll.sum })}
            </p>
          )}
        </div>
      )}

      {/* ── ROLL BUTTON (rolling phase) ────────────────────────────────────── */}
      {phase === 'rolling' && (
        <div className="flex justify-center mb-6">
          <button
            onClick={doRoll}
            disabled={isRolling}
            className="px-10 py-3 bg-emerald-600 text-white font-extrabold text-lg rounded-2xl shadow-md hover:bg-emerald-700 active:scale-95 transition-all disabled:opacity-40"
          >
            {t('removeOne.rollBtn')}
          </button>
        </div>
      )}

      {/* ── WIN / LOSE / TIE PANEL ─────────────────────────────────────────── */}
      <AnimatePresence>
        {phase === 'finished' && winner !== null && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`mb-6 rounded-2xl p-5 text-center ${isWin ? 'bg-green-100' : 'bg-red-50'}`}
          >
            <p className={`text-xl font-extrabold mb-3 ${isWin ? 'text-green-700' : 'text-red-700'}`}>
              {winner === 'player'
                ? t('removeOne.win')
                : winner === 'tie-larry'
                  ? t('removeOne.tie', { name: t('removeOne.larry') })
                  : winner === 'tie-max'
                    ? t('removeOne.tie', { name: t('removeOne.max') })
                    : winner === 'larry'
                      ? t('removeOne.lose', { name: t('removeOne.larry') })
                      : t('removeOne.lose', { name: t('removeOne.max') })}
            </p>
            <button
              onClick={playAgain}
              className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors"
            >
              {t('removeOne.playAgain')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── EXPLAINER ──────────────────────────────────────────────────────── */}
      <ExplainerPanel
        accentColor="border-emerald-600"
        title={t('removeOne.explainer.title')}
        body={t('removeOne.explainer.body')}
        example={t('removeOne.explainer.example')}
        callout={t('removeOne.explainer.callout')}
        furtherReading={t('removeOne.explainer.furtherReading')}
      />

      <QuizPanel questions={removeOneQuestions} accentColor="border-emerald-600" />

      {/* ── SIMULATOR ──────────────────────────────────────────────────────── */}
      <div className={`bg-white rounded-3xl p-5 shadow-sm mt-6 transition-opacity ${gamesPlayed < 1 ? 'opacity-50 pointer-events-none' : ''}`}>
        <h3 className="font-extrabold text-gray-700 mb-1">{t('removeOne.simulator.title')}</h3>
        {gamesPlayed < 1 ? (
          <p className="text-sm text-gray-400">{t('removeOne.simulator.lockedHint')}</p>
        ) : (
          <>
            <div className="flex gap-2 flex-wrap mb-4">
              {SIM_SIZES.map(n => (
                <button
                  key={n}
                  onClick={() => runSim(n)}
                  className="px-4 py-2 bg-emerald-100 text-emerald-700 font-bold rounded-xl text-sm hover:bg-emerald-200 transition-colors"
                >
                  {t(`removeOne.simulator.sim${n}`)}
                </button>
              ))}
            </div>
            {simResults && (
              <>
                <p className="text-xs text-gray-500 mb-3">
                  {t('removeOne.simulator.resultsLabel', { n: simResults.n })}
                </p>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={simChartData}>
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis unit="%" allowDecimals={false} />
                    <Tooltip formatter={(v) => [`${v}%`, t('removeOne.simulator.winRateLabel')]} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {simChartData.map(entry => (
                        <Cell
                          key={entry.key}
                          fill={entry.key === 'you' ? '#059669' : '#9ca3af'}
                          opacity={entry.key === 'you' ? 1 : 0.6}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </>
            )}
          </>
        )}
      </div>
    </GamePageLayout>
  )
}
