import { useState, useRef, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import randomWalkQuestions from '../quizzes/randomWalk'

const SVG_SIZE = 300
const STEP_SIZE = 6
const CENTER = SVG_SIZE / 2
const MAX_OVERLAYS = 10

const OVERLAY_COLORS = [
  '#818cf8', '#f472b6', '#fb923c', '#34d399',
  '#60a5fa', '#f59e0b', '#a78bfa', '#10b981',
  '#e879f9', '#38bdf8',
]

function clamp(v) {
  return Math.max(10, Math.min(SVG_SIZE - 10, v))
}

export default function RandomWalkPage() {
  const { t } = useTranslation()
  const [path, setPath] = useState([[CENTER, CENTER]])
  const [overlays, setOverlays] = useState([])
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)
  const pathRef = useRef([[CENTER, CENTER]])

  const step = useCallback(() => {
    const dirs = [[0, -STEP_SIZE], [0, STEP_SIZE], [-STEP_SIZE, 0], [STEP_SIZE, 0]]
    const [dx, dy] = dirs[Math.floor(Math.random() * 4)]
    setPath(prev => {
      const last = prev[prev.length - 1]
      const next = [clamp(last[0] + dx), clamp(last[1] + dy)]
      const updated = [...prev, next]
      pathRef.current = updated
      return updated
    })
  }, [])

  function start() {
    if (running) return
    setRunning(true)
    intervalRef.current = setInterval(step, 80)
  }

  function stop() {
    clearInterval(intervalRef.current)
    setRunning(false)
  }

  function newWalk() {
    stop()
    setOverlays(prev => {
      const cur = pathRef.current
      if (cur.length <= 1) return prev
      const next = [...prev, cur]
      return next.length > MAX_OVERLAYS ? next.slice(-MAX_OVERLAYS) : next
    })
    const startPt = [[CENTER, CENTER]]
    setPath(startPt)
    pathRef.current = startPt
  }

  function reset() {
    stop()
    const startPt = [[CENTER, CENTER]]
    setPath(startPt)
    pathRef.current = startPt
    setOverlays([])
  }

  useEffect(() => () => clearInterval(intervalRef.current), [])

  const current = path[path.length - 1]
  const steps = path.length - 1
  const dx = current[0] - CENTER
  const dy = current[1] - CENTER
  const distance = Math.sqrt(dx * dx + dy * dy).toFixed(1)
  const driftRadius = Math.min(Math.sqrt(steps) * STEP_SIZE, CENTER - 5)

  function pointsStr(pts) {
    return pts.map(p => p.join(',')).join(' ')
  }

  return (
    <GamePageLayout title={t('randomWalk.title')} emoji="🚶">
      <p className="text-center text-sm text-gray-500 mb-2 max-w-xl mx-auto">
        {t('randomWalk.subtitle')}
      </p>
      <p className="text-center text-sm text-violet-600 font-medium mb-6 max-w-xl mx-auto">{t('randomWalk.howToPlay')}</p>

      {/* SVG Canvas */}
      <div className="flex justify-center mb-4">
        <svg width={SVG_SIZE} height={SVG_SIZE}
          className="rounded-2xl border border-gray-200 bg-slate-50">
          {/* Grid */}
          <line x1={CENTER} y1={0} x2={CENTER} y2={SVG_SIZE} stroke="#e2e8f0" strokeWidth={1} />
          <line x1={0} y1={CENTER} x2={SVG_SIZE} y2={CENTER} stroke="#e2e8f0" strokeWidth={1} />

          {/* Drift ring */}
          {steps > 0 && (
            <circle cx={CENTER} cy={CENTER} r={driftRadius}
              fill="none" stroke="#f59e0b" strokeWidth={1.5}
              strokeDasharray="4 3" opacity={0.6} />
          )}

          {/* Overlay paths */}
          {overlays.map((pts, oi) => (
            <polyline key={oi}
              points={pointsStr(pts)}
              fill="none"
              stroke={OVERLAY_COLORS[oi % OVERLAY_COLORS.length]}
              strokeWidth={1.5}
              opacity={0.25}
            />
          ))}

          {/* Live path */}
          <polyline
            points={pointsStr(path)}
            fill="none"
            stroke="#7C3AED"
            strokeWidth={2}
            strokeLinejoin="round"
          />

          {/* Current position */}
          <circle cx={current[0]} cy={current[1]} r={5}
            fill="#7C3AED" stroke="white" strokeWidth={2} />

          {/* Origin */}
          <circle cx={CENTER} cy={CENTER} r={3}
            fill="#6b7280" opacity={0.5} />
        </svg>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-8 mb-4 text-sm">
        <div className="text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wide">{t('randomWalk.steps')}</p>
          <p className="font-bold text-violet-700 text-lg">{steps}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wide">{t('randomWalk.distance')}</p>
          <p className="font-bold text-violet-700 text-lg">{distance}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wide">√{t('randomWalk.steps')}</p>
          <p className="font-bold text-amber-600 text-lg">{Math.sqrt(steps).toFixed(1)}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={start} disabled={running}
          className="px-4 py-2 rounded-xl bg-violet-600 text-white font-bold text-sm shadow disabled:opacity-40"
        >
          {t('randomWalk.start')}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={stop} disabled={!running}
          className="px-4 py-2 rounded-xl bg-violet-200 text-violet-800 font-bold text-sm shadow disabled:opacity-40"
        >
          {t('randomWalk.stop')}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={newWalk}
          className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold text-sm shadow"
        >
          {t('randomWalk.newWalk')}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 font-bold text-sm shadow"
        >
          {t('randomWalk.reset')}
        </motion.button>
      </div>

      {overlays.length > 0 && (
        <p className="text-center text-xs text-gray-400 mb-4">
          {t('randomWalk.overlaysLabel')}: {overlays.length}/{MAX_OVERLAYS}
        </p>
      )}

      <ExplainerPanel
        title={t('randomWalk.explainer.title')}
        body={t('randomWalk.explainer.body')}
        example={t('randomWalk.explainer.example')}
        callout={t('randomWalk.explainer.callout')}
        furtherReading={t('randomWalk.explainer.furtherReading')}
        accentColor="border-cyan-400"
      />

      <QuizPanel questions={randomWalkQuestions} accentColor="border-cyan-400" />
    </GamePageLayout>
  )
}
