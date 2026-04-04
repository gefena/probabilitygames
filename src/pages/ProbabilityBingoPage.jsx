import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import probabilityBingoQuestions from '../quizzes/probabilityBingo'

// ── Pip layouts ────────────────────────────────────────────────────────────────
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

// ── Grid constants & pure functions ───────────────────────────────────────────
const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],             // diagonals
]

const WAYS = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1] // for sums 2–12

function balancedRandomCard() {
  const grid = Array(9).fill(null)
  const hot = [5, 6, 7, 8, 9]
  for (let row = 0; row < 3; row++) {
    const col = Math.floor(Math.random() * 3)
    grid[row * 3 + col] = hot[Math.floor(Math.random() * hot.length)]
  }
  for (let i = 0; i < 9; i++) {
    if (grid[i] === null) {
      grid[i] = Math.floor(Math.random() * 11) + 2
    }
  }
  return grid
}

function makeLarryGrid() {
  return Array.from({ length: 9 }, () => Math.floor(Math.random() * 11) + 2)
}

function makePeteGrid() {
  return [6, 7, 8, 4, 5, 3, 9, 9, 4]
}

function crossMatching(crossed, grid, sum) {
  return crossed.map((c, i) => c || grid[i] === sum)
}

function checkBingo(crossed) {
  return LINES.some(line => line.every(i => crossed[i]))
}

function hotLines(crossed) {
  return LINES.filter(line => line.filter(i => !crossed[i]).length === 1)
}

function getHotSquares(crossed) {
  const hot = hotLines(crossed)
  const squares = new Set()
  hot.forEach(line => line.forEach(i => { if (!crossed[i]) squares.add(i) }))
  return squares
}

function getWinningLine(crossed) {
  return LINES.find(line => line.every(i => crossed[i])) || null
}

// ── Simulator ─────────────────────────────────────────────────────────────────
function simulateBingoGame(playerG, larryG, peteG) {
  const crossed = {
    player: Array(9).fill(false),
    larry: Array(9).fill(false),
    pete: Array(9).fill(false),
  }
  while (true) {
    const sum = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1
    for (const key of ['player', 'larry', 'pete']) {
      const g = key === 'player' ? playerG : key === 'larry' ? larryG : peteG
      crossed[key] = crossed[key].map((c, i) => c || g[i] === sum)
    }
    for (const key of ['player', 'larry', 'pete']) {
      if (checkBingo(crossed[key])) return key
    }
  }
}

function runSimulation(n, playerGrid) {
  const wins = { player: 0, larry: 0, pete: 0 }
  const pg = makePeteGrid()
  for (let i = 0; i < n; i++) {
    wins[simulateBingoGame(playerGrid, makeLarryGrid(), pg)]++
  }
  return wins
}

// ── BingoGrid component ────────────────────────────────────────────────────────
function BingoGrid({ grid, crossed, hotSquares, winLine, editIndex, onSquareTap, size = 'md' }) {
  const cellBase = size === 'sm'
    ? 'w-10 h-10 text-sm rounded-lg'
    : 'w-16 h-16 text-lg rounded-xl'

  return (
    <div className="grid grid-cols-3 gap-1.5">
      {grid.map((num, i) => {
        const isCrossed = crossed[i]
        const isHot = hotSquares && hotSquares.has(i)
        const isWinSquare = winLine && winLine.includes(i)
        const isEditing = editIndex === i

        let cellClass = `${cellBase} flex items-center justify-center font-bold border-2 transition-all select-none`
        if (isWinSquare) {
          cellClass += ' bg-yellow-300 border-yellow-500 text-yellow-900'
        } else if (isCrossed) {
          cellClass += ' bg-gray-200 border-gray-300 text-gray-400 line-through'
        } else if (isHot) {
          cellClass += ' bg-amber-100 border-amber-400 text-amber-800 ring-2 ring-amber-400'
        } else if (isEditing) {
          cellClass += ' bg-violet-100 border-violet-500 text-violet-800 ring-2 ring-violet-400'
        } else if (onSquareTap) {
          cellClass += ' bg-white border-gray-300 text-gray-800 cursor-pointer hover:border-violet-400 hover:bg-violet-50'
        } else {
          cellClass += ' bg-white border-gray-200 text-gray-800'
        }

        return (
          <button
            key={i}
            className={cellClass}
            onClick={() => onSquareTap && onSquareTap(i)}
            disabled={!onSquareTap}
          >
            {isCrossed ? '✕' : num}
          </button>
        )
      })}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
const EMPTY_CROSSED = Array(9).fill(false)

export default function ProbabilityBingoPage() {
  const { t } = useTranslation()

  const [phase, setPhase] = useState('placing')
  const [playerGrid, setPlayerGrid] = useState(() => balancedRandomCard())
  const [larryGrid, setLarryGrid] = useState(() => makeLarryGrid())
  const [peteGrid] = useState(() => makePeteGrid())

  const [playerCrossed, setPlayerCrossed] = useState(EMPTY_CROSSED)
  const [larryCrossed, setLarryCrossed] = useState(EMPTY_CROSSED)
  const [peteCrossed, setPeteCrossed] = useState(EMPTY_CROSSED)

  const [isRolling, setIsRolling] = useState(false)
  const [lastRoll, setLastRoll] = useState(null)
  const [winner, setWinner] = useState(null)
  const [gamesPlayed, setGamesPlayed] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  const lastPlayerGridRef = useRef(playerGrid)

  const [simResults, setSimResults] = useState(null)
  const [simN, setSimN] = useState(null)

  // ── Derived ──────────────────────────────────────────────────────────────────
  const hotSquares = phase === 'rolling' ? getHotSquares(playerCrossed) : new Set()
  const winningLinePlayer = winner ? getWinningLine(playerCrossed) : null
  const winningLineLarry  = winner ? getWinningLine(larryCrossed) : null
  const winningLinePete   = winner ? getWinningLine(peteCrossed) : null

  // ── Edit mode ────────────────────────────────────────────────────────────────
  function handleSquareTap(i) {
    if (!editMode) return
    setEditIndex(i)
  }

  function handlePickNumber(num) {
    if (editIndex === null) return
    const newGrid = [...playerGrid]
    newGrid[editIndex] = num
    setPlayerGrid(newGrid)
    setEditIndex(null)
  }

  // ── Roll mechanic ────────────────────────────────────────────────────────────
  function startGame() {
    setEditMode(false)
    setEditIndex(null)
    lastPlayerGridRef.current = playerGrid
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
      const newPlayerCrossed = crossMatching(playerCrossed, playerGrid, sum)
      const newLarryCrossed  = crossMatching(larryCrossed, larryGrid, sum)
      const newPeteCrossed   = crossMatching(peteCrossed, peteGrid, sum)
      setPlayerCrossed(newPlayerCrossed)
      setLarryCrossed(newLarryCrossed)
      setPeteCrossed(newPeteCrossed)

      const playerBingo = checkBingo(newPlayerCrossed)
      const larryBingo  = checkBingo(newLarryCrossed)
      const peteBingo   = checkBingo(newPeteCrossed)

      if (playerBingo || larryBingo || peteBingo) {
        let w
        if (playerBingo && larryBingo) w = 'tie-larry'
        else if (playerBingo && peteBingo) w = 'tie-pete'
        else if (playerBingo) w = 'player'
        else if (larryBingo) w = 'larry'
        else w = 'pete'
        setWinner(w)
        setPhase('finished')
        setGamesPlayed(g => g + 1)
      }
      setIsRolling(false)
    }, 400)
  }

  // ── Play Again ───────────────────────────────────────────────────────────────
  function playAgain() {
    const newCard = balancedRandomCard()
    setPlayerGrid(newCard)
    setLarryGrid(makeLarryGrid())
    setPlayerCrossed(EMPTY_CROSSED)
    setLarryCrossed(EMPTY_CROSSED)
    setPeteCrossed(EMPTY_CROSSED)
    setLastRoll(null)
    setWinner(null)
    setEditMode(false)
    setEditIndex(null)
    setPhase('placing')
  }

  // ── Simulator ─────────────────────────────────────────────────────────────────
  function handleSimulate(n) {
    const results = runSimulation(n, lastPlayerGridRef.current)
    setSimN(n)
    setSimResults(results)
  }

  // ── Winner display helpers ────────────────────────────────────────────────────
  function winnerMessage() {
    if (!winner) return ''
    if (winner === 'player') return t('probabilityBingo.win')
    if (winner === 'tie-larry') return t('probabilityBingo.tie', { name: t('probabilityBingo.larry') })
    if (winner === 'tie-pete')  return t('probabilityBingo.tie', { name: t('probabilityBingo.pete') })
    const name = winner === 'larry' ? t('probabilityBingo.larry') : t('probabilityBingo.pete')
    return t('probabilityBingo.lose', { name })
  }

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <GamePageLayout title={t('common.games.probability-bingo')} emoji="🎱">
      <p className="text-gray-600 mb-2">{t('probabilityBingo.subtitle')}</p>
      <p className="text-sm text-gray-500 mb-6">{t('probabilityBingo.howToPlay')}</p>

      {/* ── Three grids ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {/* Player grid */}
        <div className="flex flex-col items-center gap-2">
          <div className="font-bold text-violet-700">{t('probabilityBingo.player')}</div>
          {phase === 'rolling' && hotSquares.size > 0 && (
            <div className="text-amber-600 text-xs font-semibold">{t('probabilityBingo.nearBingo')}</div>
          )}
          <BingoGrid
            grid={playerGrid}
            crossed={playerCrossed}
            hotSquares={phase === 'rolling' ? hotSquares : new Set()}
            winLine={phase === 'finished' ? winningLinePlayer : null}
            editIndex={editMode ? editIndex : null}
            onSquareTap={editMode && phase === 'placing' ? handleSquareTap : null}
          />
          {phase === 'placing' && (
            <div className="flex gap-2 mt-1">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-3 py-1 text-sm rounded-lg bg-violet-100 text-violet-700 hover:bg-violet-200 font-semibold"
                >
                  {t('probabilityBingo.editBtn')}
                </button>
              ) : (
                <button
                  onClick={() => { setEditMode(false); setEditIndex(null) }}
                  className="px-3 py-1 text-sm rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 font-semibold"
                >
                  {t('probabilityBingo.doneBtn')}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Larry grid */}
        <div className="flex flex-col items-center gap-2">
          <div className="font-bold text-blue-600">{t('probabilityBingo.larry')}</div>
          <div className="text-xs text-gray-400">{t('probabilityBingo.larryHint')}</div>
          <BingoGrid
            grid={larryGrid}
            crossed={larryCrossed}
            winLine={phase === 'finished' ? winningLineLarry : null}
            size="sm"
          />
        </div>

        {/* Pete grid */}
        <div className="flex flex-col items-center gap-2">
          <div className="font-bold text-rose-600">{t('probabilityBingo.pete')}</div>
          <div className="text-xs text-gray-400">{t('probabilityBingo.peteHint')}</div>
          <BingoGrid
            grid={peteGrid}
            crossed={peteCrossed}
            winLine={phase === 'finished' ? winningLinePete : null}
            size="sm"
          />
        </div>
      </div>

      {/* ── Number picker ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {editMode && editIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl p-4 shadow-lg border border-violet-200 mb-4"
          >
            <div className="text-sm font-semibold text-gray-600 mb-3">{t('probabilityBingo.pickNumber')}</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => {
                const ways = WAYS[num - 2]
                const barWidth = Math.round((ways / 6) * 100)
                return (
                  <button
                    key={num}
                    onClick={() => handlePickNumber(num)}
                    className="flex flex-col items-center w-10 rounded-lg hover:bg-violet-50 border border-gray-200 hover:border-violet-400 p-1 transition-colors"
                  >
                    <span className="font-bold text-gray-800 text-sm">{num}</span>
                    <div className="w-full h-1.5 bg-gray-100 rounded mt-1">
                      <div
                        className="h-full bg-violet-400 rounded"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Start / Roll button ───────────────────────────────────────────────── */}
      {phase === 'placing' && (
        <div className="flex justify-center mb-6">
          <button
            onClick={startGame}
            className="px-8 py-3 bg-violet-600 text-white font-bold rounded-2xl text-lg hover:bg-violet-700 active:scale-95 transition-all"
          >
            {t('probabilityBingo.rollBtn')}
          </button>
        </div>
      )}

      {/* ── Dice area ─────────────────────────────────────────────────────────── */}
      {phase === 'rolling' && (
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex gap-4">
            <DieFace value={lastRoll?.a ?? null} shaking={isRolling} />
            <DieFace value={lastRoll?.b ?? null} shaking={isRolling} />
          </div>
          {lastRoll && (
            <div className="text-lg font-bold text-gray-700">
              {t('probabilityBingo.rollResult', { a: lastRoll.a, b: lastRoll.b, sum: lastRoll.sum })}
            </div>
          )}
          <button
            onClick={doRoll}
            disabled={isRolling}
            className="px-8 py-3 bg-violet-600 text-white font-bold rounded-2xl text-lg hover:bg-violet-700 active:scale-95 transition-all disabled:opacity-50"
          >
            {t('probabilityBingo.rollBtn')}
          </button>
        </div>
      )}

      {/* ── Finished phase ────────────────────────────────────────────────────── */}
      {phase === 'finished' && (
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="text-3xl font-extrabold text-violet-700">{t('probabilityBingo.bingo')}</div>
          <div className={`text-lg font-bold ${winner === 'player' ? 'text-emerald-600' : 'text-rose-600'}`}>
            {winnerMessage()}
          </div>
          <button
            onClick={playAgain}
            className="px-8 py-3 bg-violet-600 text-white font-bold rounded-2xl text-lg hover:bg-violet-700 active:scale-95 transition-all"
          >
            {t('probabilityBingo.playAgain')}
          </button>
        </div>
      )}

      {/* ── Simulator ─────────────────────────────────────────────────────────── */}
      <div className={`mt-8 rounded-3xl p-5 border ${gamesPlayed < 1 ? 'opacity-50 pointer-events-none' : ''} bg-white shadow-sm`}>
        <h3 className="font-extrabold text-gray-800 text-base mb-1">{t('probabilityBingo.simulator.title')}</h3>
        {gamesPlayed < 1 ? (
          <p className="text-sm text-gray-500">{t('probabilityBingo.simulator.lockedHint')}</p>
        ) : (
          <>
            <p className="text-xs text-gray-400 mb-3">{t('probabilityBingo.simulator.larryNote')}</p>
            <div className="flex gap-2 mb-4">
              {[100, 500, 1000].map(n => (
                <button
                  key={n}
                  onClick={() => handleSimulate(n)}
                  className="px-3 py-1.5 bg-violet-100 text-violet-700 font-semibold rounded-lg text-sm hover:bg-violet-200"
                >
                  {t(`probabilityBingo.simulator.sim${n}`)}
                </button>
              ))}
            </div>
            {simResults && (
              <>
                <p className="text-xs text-gray-500 mb-2">
                  {t('probabilityBingo.simulator.resultsLabel', { n: simN })}
                </p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart
                    data={[
                      { name: t('probabilityBingo.player'), wins: Math.round((simResults.player / simN) * 100), key: 'player' },
                      { name: t('probabilityBingo.larry'),  wins: Math.round((simResults.larry / simN) * 100),  key: 'larry' },
                      { name: t('probabilityBingo.pete'),   wins: Math.round((simResults.pete / simN) * 100),   key: 'pete' },
                    ]}
                    margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                  >
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} unit="%" domain={[0, 100]} />
                    <Tooltip formatter={v => `${v}%`} />
                    <Bar dataKey="wins" radius={[6, 6, 0, 0]}>
                      {['player', 'larry', 'pete'].map(key => (
                        <Cell
                          key={key}
                          fill={key === 'player' ? '#7c3aed' : key === 'pete' ? '#e11d48' : '#60a5fa'}
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

      {/* ── Explainer + Quiz ──────────────────────────────────────────────────── */}
      <ExplainerPanel
        accentColor="border-violet-600"
        title={t('probabilityBingo.explainer.title')}
        body={t('probabilityBingo.explainer.body')}
        example={t('probabilityBingo.explainer.example')}
        callout={t('probabilityBingo.explainer.callout')}
        furtherReading={t('probabilityBingo.explainer.furtherReading')}
      />

      <QuizPanel questions={probabilityBingoQuestions} />
    </GamePageLayout>
  )
}
