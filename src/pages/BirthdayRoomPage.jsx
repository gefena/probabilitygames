import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot,
} from 'recharts'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import birthdayRoomQuestions from '../quizzes/birthdayRoom'

const AVATAR_COLORS = [
  '#7C3AED', '#EC4899', '#F97316', '#10B981', '#3B82F6',
  '#F59E0B', '#EF4444', '#06B6D4', '#8B5CF6', '#14B8A6',
  '#D97706', '#6366F1', '#0EA5E9', '#84CC16', '#E11D48',
]
const MATCH_COLOR = '#F59E0B'  // amber highlight for matched avatars
const MAX_DISPLAY = 40
const MAX_PEOPLE = 60

function calcProbability(n) {
  if (n <= 1) return 0
  let p = 1
  for (let i = 0; i < n; i++) p *= (365 - i) / 365
  return Math.max(0, 1 - p)
}

export default function BirthdayRoomPage() {
  const { t } = useTranslation()
  const idRef = useRef(0)

  const [people, setPeople] = useState([])
  const [matchPairs, setMatchPairs] = useState([])   // array of [idA, idB]
  const [simResult, setSimResult] = useState(null)   // { matches, total }

  // Derived
  const matchedIds = useMemo(
    () => new Set(matchPairs.flatMap(([a, b]) => [a, b])),
    [matchPairs]
  )
  const currentProb = calcProbability(people.length)
  const currentProbPct = (currentProb * 100).toFixed(1)
  const displayPeople = people.slice(0, MAX_DISPLAY)

  // Pre-compute probability curve for n=1..60
  const probCurve = useMemo(
    () => Array.from({ length: MAX_PEOPLE }, (_, i) => ({
      n: i + 1,
      prob: parseFloat((calcProbability(i + 1) * 100).toFixed(1)),
    })),
    []
  )

  function addPerson() {
    if (people.length >= MAX_PEOPLE) return
    const birthday = Math.floor(Math.random() * 365) + 1
    const id = ++idRef.current
    const color = AVATAR_COLORS[id % AVATAR_COLORS.length]
    const newPerson = { id, birthday, color }

    // Find collision with existing people
    const existing = people.filter(p => p.birthday === birthday)
    const newPairs = existing.map(e => [e.id, id])

    setPeople(prev => [...prev, newPerson])
    if (newPairs.length > 0) {
      setMatchPairs(prev => [...prev, ...newPairs])
    }
  }

  function clearRoom() {
    setPeople([])
    setMatchPairs([])
    setSimResult(null)
    idRef.current = 0
  }

  function runSimulation() {
    const n = people.length
    if (n < 2) return
    let matchCount = 0
    for (let trial = 0; trial < 1000; trial++) {
      const bdays = new Set()
      let found = false
      for (let i = 0; i < n; i++) {
        const bd = Math.floor(Math.random() * 365) + 1
        if (bdays.has(bd)) { found = true; break }
        bdays.add(bd)
      }
      if (found) matchCount++
    }
    setSimResult({ matches: matchCount, total: 1000 })
  }

  // Meter bar color
  const meterColor = currentProb < 0.5 ? '#10B981' : currentProb < 0.8 ? '#F97316' : '#EF4444'

  const showMilestone = people.length === 23

  return (
    <GamePageLayout title={t('common.games.birthday-room')} emoji="🎂">
      <p className="text-gray-500 mb-2 text-sm">{t('birthdayRoom.subtitle')}</p>
      <p className="text-center text-sm text-violet-600 font-medium mb-6 max-w-xl mx-auto">{t('birthdayRoom.howToPlay')}</p>

      {/* ── Room ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        {/* Avatar grid */}
        <div className="flex flex-wrap gap-2 min-h-16 mb-5">
          <AnimatePresence>
            {displayPeople.map(p => {
              const isMatched = matchedIds.has(p.id)
              return (
                <motion.div
                  key={p.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isMatched
                    ? { scale: [1, 1.25, 1], opacity: 1 }
                    : { scale: 1, opacity: 1 }
                  }
                  transition={isMatched
                    ? { duration: 0.45, repeat: Infinity, repeatDelay: 2 }
                    : { duration: 0.25 }
                  }
                  exit={{ scale: 0, opacity: 0 }}
                  className="w-11 h-11 rounded-full flex items-center justify-center font-extrabold text-white shadow-sm select-none relative flex-shrink-0"
                  style={{
                    background: isMatched ? MATCH_COLOR : p.color,
                    boxShadow: isMatched ? `0 0 0 3px white, 0 0 0 5px ${MATCH_COLOR}` : undefined,
                  }}
                >
                  <span style={{ fontSize: p.birthday > 99 ? 8 : 10 }}>{p.birthday}</span>
                </motion.div>
              )
            })}
          </AnimatePresence>
          {people.length > MAX_DISPLAY && (
            <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs flex-shrink-0">
              {t('birthdayRoom.moreAvatars', { n: people.length - MAX_DISPLAY })}
            </div>
          )}
          {people.length === 0 && (
            <p className="text-gray-300 text-sm self-center">{t('birthdayRoom.noMatch')}</p>
          )}
        </div>

        {/* Match banner */}
        <AnimatePresence>
          {matchPairs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 bg-amber-50 border-2 border-amber-300 rounded-2xl px-4 py-3 text-center font-extrabold text-amber-700"
            >
              {matchPairs.length === 1
                ? t('birthdayRoom.matchBanner')
                : t('birthdayRoom.matchBannerMultiple', { n: matchPairs.length })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Milestone at 23 */}
        <AnimatePresence>
          {showMilestone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mb-4 bg-rose-50 border-2 border-rose-300 rounded-2xl px-4 py-3 text-center font-bold text-rose-700 text-sm"
            >
              🎯 {t('birthdayRoom.milestone23')}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={addPerson}
            disabled={people.length >= MAX_PEOPLE}
            className="px-6 py-2.5 bg-rose-500 text-white font-extrabold rounded-2xl shadow-sm hover:bg-rose-600 active:scale-95 transition-all disabled:opacity-40"
          >
            {t('birthdayRoom.addPerson')}
          </button>
          <button
            onClick={clearRoom}
            className="px-5 py-2.5 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors"
          >
            {t('birthdayRoom.clearRoom')}
          </button>
          <span className="text-gray-400 text-sm font-semibold">
            {t('birthdayRoom.roomSize')}: <strong className="text-rose-600">{people.length}</strong> / {MAX_PEOPLE}
          </span>
        </div>
      </div>

      {/* ── Probability Meter ──────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="font-extrabold text-gray-700">{t('birthdayRoom.matchProbability')}</h3>
          <span className="text-3xl font-extrabold tabular-nums" style={{ color: meterColor }}>
            {currentProbPct}%
          </span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            animate={{ width: `${currentProbPct}%` }}
            transition={{ duration: 0.4 }}
            style={{ background: meterColor }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1 font-semibold">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* ── Probability Curve ──────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <h3 className="font-extrabold text-gray-700 mb-4">{t('birthdayRoom.curveTitle')}</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={probCurve} margin={{ top: 8, right: 16, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="n"
              tick={{ fontSize: 11 }}
              label={{ value: t('birthdayRoom.people'), position: 'insideBottomRight', offset: -4, fontSize: 11 }}
            />
            <YAxis
              domain={[0, 100]}
              tickFormatter={v => `${v}%`}
              tick={{ fontSize: 11 }}
            />
            <Tooltip formatter={v => [`${v}%`, t('birthdayRoom.tooltipSeries')]} labelFormatter={l => `${l} ${t('birthdayRoom.people')}`} />
            <Line
              type="monotone"
              dataKey="prob"
              stroke="#F43F5E"
              dot={false}
              strokeWidth={2.5}
            />
            {people.length >= 1 && (
              <ReferenceDot
                x={people.length}
                y={parseFloat(currentProbPct)}
                r={7}
                fill="#F43F5E"
                stroke="white"
                strokeWidth={2}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ── Simulation ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <h3 className="font-extrabold text-gray-700 mb-3">{t('birthdayRoom.simTitle')}</h3>
        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={runSimulation}
            disabled={people.length < 2}
            className="px-6 py-2.5 bg-rose-500 text-white font-bold rounded-2xl hover:bg-rose-600 active:scale-95 transition-all disabled:opacity-40"
          >
            {t('birthdayRoom.simulate')}
          </button>
          {people.length < 2 && (
            <span className="text-gray-400 text-sm">{t('birthdayRoom.simEmpty')}</span>
          )}
        </div>
        <AnimatePresence>
          {simResult && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm font-semibold text-gray-700 bg-rose-50 rounded-2xl px-4 py-3"
            >
              {t('birthdayRoom.simResult', {
                matches: simResult.matches,
                simPct: ((simResult.matches / simResult.total) * 100).toFixed(1),
                theoryPct: currentProbPct,
              })}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── Explainer ──────────────────────────────────────────────────── */}
      <ExplainerPanel
        accentColor="border-rose-400"
        title={t('birthdayRoom.explainer.title')}
        body={t('birthdayRoom.explainer.body')}
        example={t('birthdayRoom.explainer.example')}
        callout={t('birthdayRoom.explainer.callout')}
      />

      {/* ── Quiz ───────────────────────────────────────────────────────── */}
      <QuizPanel questions={birthdayRoomQuestions} accentColor="border-rose-400" />
    </GamePageLayout>
  )
}
