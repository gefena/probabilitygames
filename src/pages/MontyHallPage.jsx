import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import montyHallQuestions from '../quizzes/montyHall'
import GameSuggestions from '../components/GameSuggestions'

// Phase constants
const PHASE_PICK = 'pick'
const PHASE_REVEAL = 'reveal'
const PHASE_RESULT = 'result'

function pickCarDoor() {
  return Math.floor(Math.random() * 3)
}

function hostReveal(picked, car) {
  const options = [0, 1, 2].filter(d => d !== picked && d !== car)
  return options[Math.floor(Math.random() * options.length)]
}

function otherDoor(picked, revealed) {
  return [0, 1, 2].find(d => d !== picked && d !== revealed)
}

function DoorIcon({ state, onClick, index, t }) {
  // state: 'closed' | 'goat' | 'car' | 'selected'
  const label = t('montyHall.door', { n: index + 1 })
  const isOpen = state === 'goat' || state === 'car'
  const content = state === 'car' ? '🚗' : state === 'goat' ? '🐐' : '❓'

  return (
    <motion.button
      onClick={onClick}
      disabled={isOpen || !onClick}
      whileHover={onClick && !isOpen ? { scale: 1.05, y: -4 } : {}}
      whileTap={onClick && !isOpen ? { scale: 0.96 } : {}}
      className={`flex flex-col items-center justify-center rounded-2xl p-5 w-24 h-32 shadow-lg border-2 font-bold transition-all
        ${state === 'selected' ? 'border-amber-400 bg-amber-50' : ''}
        ${state === 'closed' ? 'border-gray-300 bg-white cursor-pointer hover:border-amber-300' : ''}
        ${state === 'goat' ? 'border-gray-200 bg-gray-50 cursor-default' : ''}
        ${state === 'car' ? 'border-emerald-400 bg-emerald-50 cursor-default' : ''}
      `}
    >
      <span className="text-3xl mb-1">{content}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </motion.button>
  )
}

function runSimulation(n) {
  let switchWins = 0, stayWins = 0
  for (let i = 0; i < n; i++) {
    const car = pickCarDoor()
    const picked = Math.floor(Math.random() * 3)
    const revealed = hostReveal(picked, car)
    const switched = otherDoor(picked, revealed)
    if (switched === car) switchWins++
    if (picked === car) stayWins++
  }
  return { switchWins, stayWins, switchLosses: n - switchWins, stayLosses: n - stayWins, total: n }
}

export default function MontyHallPage() {
  const { t } = useTranslation()

  // Game state
  const [phase, setPhase] = useState(PHASE_PICK)
  const [carDoor, setCarDoor] = useState(null)
  const [pickedDoor, setPickedDoor] = useState(null)
  const [revealedDoor, setRevealedDoor] = useState(null)
  const [lastResult, setLastResult] = useState(null) // 'win' | 'lose'

  // Manual stats
  const [switchWins, setSwitchWins] = useState(0)
  const [switchLosses, setSwitchLosses] = useState(0)
  const [stayWins, setStayWins] = useState(0)
  const [stayLosses, setStayLosses] = useState(0)
  const [manualGames, setManualGames] = useState(0)

  // Simulation
  const [simResults, setSimResults] = useState(null)

  function getDoorState(i) {
    if (phase === PHASE_PICK) return 'closed'
    if (phase === PHASE_REVEAL) {
      if (i === revealedDoor) return 'goat'
      if (i === pickedDoor) return 'selected'
      return 'closed'
    }
    // PHASE_RESULT
    if (i === carDoor) return 'car'
    return 'goat'
  }

  function handlePick(i) {
    if (phase !== PHASE_PICK) return
    const car = pickCarDoor()
    const revealed = hostReveal(i, car)
    setCarDoor(car)
    setPickedDoor(i)
    setRevealedDoor(revealed)
    setPhase(PHASE_REVEAL)
  }

  function handleDecision(strategy) {
    const finalDoor = strategy === 'switch'
      ? otherDoor(pickedDoor, revealedDoor)
      : pickedDoor
    const won = finalDoor === carDoor

    setLastResult(won ? 'win' : 'lose')
    setPhase(PHASE_RESULT)
    setManualGames(g => g + 1)

    if (strategy === 'switch') {
      if (won) setSwitchWins(v => v + 1)
      else setSwitchLosses(v => v + 1)
    } else {
      if (won) setStayWins(v => v + 1)
      else setStayLosses(v => v + 1)
    }
  }

  function playAgain() {
    setPhase(PHASE_PICK)
    setCarDoor(null)
    setPickedDoor(null)
    setRevealedDoor(null)
    setLastResult(null)
  }

  function simulate(n) {
    const results = runSimulation(n)
    setSimResults(results)
  }

  const simulatorUnlocked = manualGames >= 1

  const simChartData = simResults ? [
    { name: t('montyHall.switchRate'), wins: simResults.switchWins, fill: '#10b981' },
    { name: t('montyHall.stayRate'), wins: simResults.stayWins, fill: '#f43f5e' },
  ] : []

  return (
    <GamePageLayout title={t('common.games.monty-hall')} emoji="🚪">
      <p className="text-center text-sm text-gray-500 mb-2 max-w-xl mx-auto">
        {t('montyHall.subtitle')}
      </p>
      <p className="text-center text-sm text-violet-600 font-medium mb-6 max-w-xl mx-auto">{t('montyHall.howToPlay')}</p>

      {/* Doors */}
      <div className="flex justify-center gap-4 mb-4">
        {[0, 1, 2].map(i => (
          <DoorIcon
            key={i}
            index={i}
            state={getDoorState(i)}
            onClick={phase === PHASE_PICK ? () => handlePick(i) : null}
            t={t}
          />
        ))}
      </div>

      {/* Phase messages */}
      <AnimatePresence mode="wait">
        {phase === PHASE_PICK && (
          <motion.p key="pick" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center text-gray-600 font-semibold mb-4">
            {t('montyHall.pickPrompt')}
          </motion.p>
        )}
        {phase === PHASE_REVEAL && (
          <motion.div key="reveal" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} className="text-center mb-4">
            <p className="text-gray-600 font-semibold mb-3">
              {t('montyHall.hostReveal', { n: revealedDoor + 1 })}
            </p>
            <p className="text-gray-500 font-medium mb-3">{t('montyHall.switchPrompt')}</p>
            <div className="flex justify-center gap-3">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => handleDecision('switch')}
                className="px-6 py-2 bg-amber-500 text-white font-bold rounded-xl shadow">
                {t('montyHall.switchBtn')}
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => handleDecision('stay')}
                className="px-6 py-2 bg-slate-500 text-white font-bold rounded-xl shadow">
                {t('montyHall.stayBtn')}
              </motion.button>
            </div>
          </motion.div>
        )}
        {phase === PHASE_RESULT && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }} className="text-center mb-4">
            <p className={`text-2xl font-black mb-2 ${lastResult === 'win' ? 'text-emerald-600' : 'text-rose-600'}`}>
              {lastResult === 'win' ? t('montyHall.win') : t('montyHall.lose')}
            </p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={playAgain}
              className="px-5 py-2 bg-violet-600 text-white font-bold rounded-xl shadow text-sm">
              {t('montyHall.playAgain')}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual stats */}
      {manualGames > 0 && (
        <div className="bg-gray-50 rounded-2xl p-4 mb-6 max-w-md mx-auto">
          <p className="text-sm font-bold text-gray-600 mb-3 text-center">{t('montyHall.stats')}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-emerald-50 rounded-xl p-2 text-center">
              <p className="text-xs text-gray-400">{t('montyHall.switchWins')}</p>
              <p className="font-black text-emerald-700 text-lg">{switchWins}</p>
            </div>
            <div className="bg-rose-50 rounded-xl p-2 text-center">
              <p className="text-xs text-gray-400">{t('montyHall.switchLosses')}</p>
              <p className="font-black text-rose-700 text-lg">{switchLosses}</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-2 text-center">
              <p className="text-xs text-gray-400">{t('montyHall.stayWins')}</p>
              <p className="font-black text-emerald-700 text-lg">{stayWins}</p>
            </div>
            <div className="bg-rose-50 rounded-xl p-2 text-center">
              <p className="text-xs text-gray-400">{t('montyHall.stayLosses')}</p>
              <p className="font-black text-rose-700 text-lg">{stayLosses}</p>
            </div>
          </div>
        </div>
      )}

      {/* Batch simulator */}
      <div className={`border-2 rounded-3xl p-5 mb-6 ${simulatorUnlocked ? 'border-gray-200 bg-white' : 'border-dashed border-gray-200 bg-gray-50 opacity-60'}`}>
        <h3 className="font-bold text-gray-700 text-sm mb-3 text-center">
          {t('montyHall.simulatorTitle')}
        </h3>
        {!simulatorUnlocked && (
          <p className="text-center text-xs text-gray-400 mb-3">{t('montyHall.lockedHint')}</p>
        )}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {[100, 1000, 10000].map(n => (
            <motion.button
              key={n}
              disabled={!simulatorUnlocked}
              whileHover={simulatorUnlocked ? { scale: 1.05 } : {}}
              whileTap={simulatorUnlocked ? { scale: 0.95 } : {}}
              onClick={() => simulate(n)}
              className="px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-sm shadow disabled:cursor-not-allowed"
            >
              {n === 100 ? t('montyHall.simulate100') : n === 1000 ? t('montyHall.simulate1000') : t('montyHall.simulate10000')}
            </motion.button>
          ))}
        </div>

        {simResults && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-center text-xs text-gray-400 mb-2">{t('montyHall.simResults')} — {t('montyHall.gamesEach', { n: simResults.total.toLocaleString() })}</p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={simChartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(val) => [val, t('montyHall.wins')]} />
                <Bar dataKey="wins" radius={[6, 6, 0, 0]}>
                  {simChartData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 text-sm mt-2">
              <div className="text-center">
                <p className="text-xs text-gray-400">{t('montyHall.switchRate')}</p>
                <p className="font-black text-emerald-600">
                  {((simResults.switchWins / simResults.total) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">{t('montyHall.stayRate')}</p>
                <p className="font-black text-rose-600">
                  {((simResults.stayWins / simResults.total) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <ExplainerPanel
        title={t('montyHall.explainer.title')}
        body={t('montyHall.explainer.body')}
        example={t('montyHall.explainer.example')}
        callout={t('montyHall.explainer.callout')}
        furtherReading={t('montyHall.explainer.furtherReading')}
        accentColor="border-amber-400"
      />

      <QuizPanel questions={montyHallQuestions} accentColor="border-amber-400" />
          <GameSuggestions gameId="monty-hall" />
    </GamePageLayout>
  )
}
