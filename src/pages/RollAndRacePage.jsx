import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import rollAndRaceQuestions from '../quizzes/rollAndRace'

// ── Pip layouts (same pattern as GreedyPigPage) ──────────────────────────────
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

// ── Simulation ────────────────────────────────────────────────────────────────
function runSimulation(n, trackLen) {
  const wins = {}
  for (let s = 2; s <= 12; s++) wins[s] = 0
  for (let i = 0; i < n; i++) {
    const pos = {}
    for (let s = 2; s <= 12; s++) pos[s] = 0
    let done = false
    while (!done) {
      const a = Math.floor(Math.random() * 6) + 1
      const b = Math.floor(Math.random() * 6) + 1
      const sum = a + b
      pos[sum]++
      if (pos[sum] >= trackLen) { wins[sum]++; done = true }
    }
  }
  return wins
}

const TRACK_PRESETS = [5, 10, 15]
const SUMS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const SIM_SIZES = [100, 500, 1000]

const INIT_POSITIONS = () => Object.fromEntries(SUMS.map(s => [s, 0]))

export default function RollAndRacePage() {
  const { t } = useTranslation()

  const [phase, setPhase] = useState('picking')       // picking | racing | finished
  const [chosen, setChosen] = useState(null)
  const [positions, setPositions] = useState(INIT_POSITIONS())
  const [trackLength, setTrackLength] = useState(10)
  const [dieA, setDieA] = useState(null)
  const [dieB, setDieB] = useState(null)
  const [shaking, setShaking] = useState(false)
  const [winner, setWinner] = useState(null)
  const [lastRoll, setLastRoll] = useState(null)       // { a, b, sum }
  const [isAuto, setIsAuto] = useState(false)
  const [gamesPlayed, setGamesPlayed] = useState(0)
  const [simResults, setSimResults] = useState(null)
  const autoRef = useRef(false)

  function pickCar(sum) {
    if (phase !== 'picking') return
    setChosen(sum)
    setPhase('racing')
  }

  function resetRace(newTrackLength) {
    autoRef.current = false
    setIsAuto(false)
    const tl = newTrackLength ?? trackLength
    setTrackLength(tl)
    setPhase('picking')
    setChosen(null)
    setPositions(INIT_POSITIONS())
    setDieA(null)
    setDieB(null)
    setShaking(false)
    setWinner(null)
    setLastRoll(null)
  }

  function doRoll() {
    const a = Math.floor(Math.random() * 6) + 1
    const b = Math.floor(Math.random() * 6) + 1
    const sum = a + b
    setShaking(true)
    setDieA(a)
    setDieB(b)
    setLastRoll({ a, b, sum })
    setTimeout(() => {
      setShaking(false)
      setPositions(prev => {
        const newPos = prev[sum] + 1
        const next = { ...prev, [sum]: newPos }
        if (newPos >= trackLength) {
          setWinner(sum)
          setPhase('finished')
          setGamesPlayed(g => g + 1)
          autoRef.current = false
          setIsAuto(false)
        }
        return next
      })
    }, 300)
  }

  function handleRoll() {
    if (phase !== 'racing' || shaking) return
    doRoll()
  }

  function scheduleAutoRoll() {
    if (!autoRef.current) return
    setTimeout(() => {
      if (!autoRef.current) return
      const a = Math.floor(Math.random() * 6) + 1
      const b = Math.floor(Math.random() * 6) + 1
      const sum = a + b
      setDieA(a)
      setDieB(b)
      setLastRoll({ a, b, sum })
      setPositions(prev => {
        const newPos = prev[sum] + 1
        const next = { ...prev, [sum]: newPos }
        if (newPos >= trackLength) {
          setWinner(sum)
          setPhase('finished')
          setGamesPlayed(g => g + 1)
          autoRef.current = false
          setIsAuto(false)
        } else {
          scheduleAutoRoll()
        }
        return next
      })
    }, 80)
  }

  function handleAuto() {
    if (phase !== 'racing') return
    if (isAuto) {
      autoRef.current = false
      setIsAuto(false)
    } else {
      autoRef.current = true
      setIsAuto(true)
      scheduleAutoRoll()
    }
  }

  function runSim(n) {
    const results = runSimulation(n, trackLength)
    setSimResults({ n, wins: results })
  }

  const simChartData = simResults
    ? SUMS.map(s => ({ name: `${s}`, wins: simResults.wins[s] }))
    : []

  const maxWins = simResults ? Math.max(...Object.values(simResults.wins)) : 0

  return (
    <GamePageLayout title={t('rollAndRace.title')} emoji={t('rollAndRace.emoji')}>
      <p className="text-gray-500 mb-2 text-sm">{t('rollAndRace.subtitle')}</p>
      <p className="text-center text-sm text-red-600 font-medium mb-6 max-w-xl mx-auto">
        {t('rollAndRace.howToPlay')}
      </p>

      {/* Track length selector */}
      <div className="flex items-center gap-3 mb-6 flex-wrap justify-center">
        <span className="font-semibold text-gray-600 text-sm">{t('rollAndRace.trackLabel')}:</span>
        <div className="flex rounded-xl overflow-hidden border border-red-200">
          {TRACK_PRESETS.map(n => (
            <button
              key={n}
              onClick={() => resetRace(n)}
              className={`px-4 py-1.5 font-bold text-sm transition-colors ${trackLength === n ? 'bg-red-500 text-white' : 'bg-white text-red-500 hover:bg-red-50'}`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Car picker (picking phase) */}
      <AnimatePresence>
        {phase === 'picking' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 text-center"
          >
            <p className="font-extrabold text-gray-700 mb-3">{t('rollAndRace.pickPrompt')}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {SUMS.map(s => (
                <button
                  key={s}
                  onClick={() => pickCar(s)}
                  className="w-10 h-10 rounded-xl bg-red-500 text-white font-extrabold text-sm hover:bg-red-600 active:scale-95 transition-all shadow"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Race track */}
      {(phase === 'racing' || phase === 'finished') && (
        <div className="bg-white rounded-3xl p-4 shadow-sm mb-6 overflow-x-auto">
          <div className="min-w-[320px]">
            {SUMS.map(s => {
              const isChosen = s === chosen
              const isWinner = s === winner
              const pos = positions[s]
              return (
                <div
                  key={s}
                  className={`flex items-center gap-2 mb-1.5 rounded-xl px-2 py-1 ${isChosen ? 'bg-amber-50 border-2 border-amber-400' : 'border-2 border-transparent'}`}
                >
                  {/* Sum label */}
                  <span className={`w-6 text-right text-xs font-extrabold flex-shrink-0 ${isChosen ? 'text-amber-600' : 'text-gray-500'}`}>
                    {isChosen ? '⭐' : s}
                  </span>
                  {/* Track cells */}
                  <div className="flex gap-0.5 flex-1">
                    {Array.from({ length: trackLength }, (_, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-5 rounded-sm transition-colors duration-150 ${
                          i < pos
                            ? isChosen ? 'bg-amber-400' : 'bg-red-400'
                            : 'bg-gray-100'
                        }`}
                      />
                    ))}
                  </div>
                  {/* Car emoji + finish */}
                  <span className="text-sm flex-shrink-0">
                    {isWinner ? '🏆' : pos >= trackLength ? '🏁' : '🏎️'}
                  </span>
                  <span className="text-xs text-gray-400 flex-shrink-0 w-8 text-right">{pos}/{trackLength}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Dice display */}
      {(phase === 'racing' || phase === 'finished') && (
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="flex items-center gap-3">
            <DieFace value={dieA} shaking={shaking} />
            <span className="text-xl font-extrabold text-gray-400">+</span>
            <DieFace value={dieB} shaking={shaking} />
            {lastRoll && (
              <span className="text-base font-extrabold text-gray-700 ms-1">
                = {lastRoll.sum}
              </span>
            )}
          </div>
          {lastRoll && phase === 'racing' && (
            <p className="text-xs text-gray-500 font-medium">
              {t('rollAndRace.rollResult', { a: lastRoll.a, b: lastRoll.b, sum: lastRoll.sum })}
            </p>
          )}
        </div>
      )}

      {/* Roll / Auto buttons */}
      {phase === 'racing' && (
        <div className="flex gap-3 justify-center mb-6 flex-wrap">
          <button
            onClick={handleRoll}
            disabled={shaking || isAuto}
            className="px-8 py-3 bg-red-500 text-white font-extrabold text-lg rounded-2xl shadow-md hover:bg-red-600 active:scale-95 transition-all disabled:opacity-40"
          >
            {t('rollAndRace.rollBtn')}
          </button>
          <button
            onClick={handleAuto}
            disabled={shaking && !isAuto}
            className={`px-6 py-3 font-extrabold text-sm rounded-2xl shadow-md transition-all ${isAuto ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {isAuto ? t('rollAndRace.stopBtn') : t('rollAndRace.autoBtn')}
          </button>
        </div>
      )}

      {/* Win / Lose panel */}
      <AnimatePresence>
        {phase === 'finished' && winner !== null && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`mb-6 rounded-2xl p-5 text-center ${winner === chosen ? 'bg-green-100' : 'bg-red-50'}`}
          >
            <p className={`text-xl font-extrabold mb-3 ${winner === chosen ? 'text-green-700' : 'text-red-700'}`}>
              {winner === chosen
                ? t('rollAndRace.win', { n: winner })
                : t('rollAndRace.lose', { n: winner })}
            </p>
            <button
              onClick={() => resetRace()}
              className="px-6 py-2 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
            >
              {t('rollAndRace.playAgain')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explainer */}
      <ExplainerPanel
        accentColor="border-red-500"
        title={t('rollAndRace.explainer.title')}
        body={t('rollAndRace.explainer.body')}
        example={t('rollAndRace.explainer.example')}
        callout={t('rollAndRace.explainer.callout')}
        furtherReading={t('rollAndRace.explainer.furtherReading')}
      />

      <QuizPanel questions={rollAndRaceQuestions} accentColor="border-red-500" />

      {/* Simulator */}
      <div className={`bg-white rounded-3xl p-5 shadow-sm mt-6 transition-opacity ${gamesPlayed < 1 ? 'opacity-50 pointer-events-none' : ''}`}>
        <h3 className="font-extrabold text-gray-700 mb-1">{t('rollAndRace.simulator.title')}</h3>
        {gamesPlayed < 1 ? (
          <p className="text-sm text-gray-400">{t('rollAndRace.simulator.lockedHint')}</p>
        ) : (
          <>
            <div className="flex gap-2 flex-wrap mb-4">
              {SIM_SIZES.map(n => (
                <button
                  key={n}
                  onClick={() => runSim(n)}
                  className="px-4 py-2 bg-red-100 text-red-700 font-bold rounded-xl text-sm hover:bg-red-200 transition-colors"
                >
                  {t(`rollAndRace.simulator.sim${n}`)}
                </button>
              ))}
            </div>
            {simResults && (
              <>
                <p className="text-xs text-gray-500 mb-3">
                  {t('rollAndRace.simulator.resultsLabel', { n: simResults.n })}
                </p>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={simChartData}>
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} />
                    <Tooltip formatter={(v) => [v, t('rollAndRace.simulator.winsLabel')]} />
                    <Bar dataKey="wins" radius={[4, 4, 0, 0]} name={t('rollAndRace.simulator.winsLabel')}>
                      {simChartData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill="#EF4444"
                          opacity={entry.wins === maxWins ? 1 : 0.45}
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
