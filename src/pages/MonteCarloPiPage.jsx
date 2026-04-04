import { useState, useRef, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import monteCarloPiQuestions from '../quizzes/monteCarloPi'

const CANVAS_SIZE = 300
const R = CANVAS_SIZE / 2

const SPEEDS = { slow: 20, fast: 200, instant: 10000 }
const TICK_MS = { slow: 100, fast: 30, instant: 0 }

function isInside(x, y) {
  const cx = x - R
  const cy = y - R
  return cx * cx + cy * cy <= R * R
}

function piAccuracyClass(estimate) {
  const diff = Math.abs(estimate - Math.PI)
  if (diff < 0.01) return 'text-emerald-600'
  if (diff < 0.1) return 'text-amber-500'
  return 'text-rose-600'
}

export default function MonteCarloPiPage() {
  const { t } = useTranslation()
  const canvasRef = useRef(null)
  const [inside, setInside] = useState(0)
  const [totalDarts, setTotalDarts] = useState(0)
  const [running, setRunning] = useState(false)
  const [speed, setSpeed] = useState('slow')
  const runningRef = useRef(false)
  const insideRef = useRef(0)
  const totalRef = useRef(0)

  const drawDot = useCallback((x, y, hit) => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.beginPath()
    ctx.arc(x, y, 1.5, 0, Math.PI * 2)
    ctx.fillStyle = hit ? '#10b981' : '#f43f5e'
    ctx.globalAlpha = 0.7
    ctx.fill()
    ctx.globalAlpha = 1
  }, [])

  const initCanvas = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    // Background
    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    // Square border
    ctx.strokeStyle = '#cbd5e1'
    ctx.lineWidth = 1
    ctx.strokeRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    // Circle
    ctx.beginPath()
    ctx.arc(R, R, R, 0, Math.PI * 2)
    ctx.strokeStyle = '#7c3aed'
    ctx.lineWidth = 2
    ctx.stroke()
  }, [])

  useEffect(() => { initCanvas() }, [initCanvas])

  const dropDarts = useCallback((n) => {
    let newInside = 0
    const points = []
    let added = 0
    for (let i = 0; i < n; i++) {
      if (!runningRef.current || totalRef.current + added >= 100000) break
      const x = Math.random() * CANVAS_SIZE
      const y = Math.random() * CANVAS_SIZE
      const hit = isInside(x, y)
      if (hit) newInside++
      points.push({ x, y, hit })
      added++
    }
    points.forEach(p => drawDot(p.x, p.y, p.hit))
    insideRef.current += newInside
    totalRef.current += added
    setInside(insideRef.current)
    setTotalDarts(totalRef.current)
    return totalRef.current >= 100000
  }, [drawDot])

  useEffect(() => {
    if (!running) return
    const batchSize = SPEEDS[speed]
    const interval = TICK_MS[speed]

    if (interval === 0) {
      function runChunk() {
        if (!runningRef.current) return
        const reachedLimit = dropDarts(batchSize)
        if (reachedLimit) {
          runningRef.current = false
          setRunning(false)
        } else {
          setTimeout(runChunk, 0)
        }
      }
      runChunk()
    } else {
      const id = setInterval(() => {
        if (!runningRef.current) { clearInterval(id); return }
        const reachedLimit = dropDarts(batchSize)
        if (reachedLimit) {
          clearInterval(id)
          runningRef.current = false
          setRunning(false)
        }
      }, interval)
      return () => clearInterval(id)
    }
  }, [running, speed, dropDarts])

  function handleStart() {
    runningRef.current = true
    setRunning(true)
  }

  function handlePause() {
    runningRef.current = false
    setRunning(false)
  }

  function handleReset() {
    runningRef.current = false
    setRunning(false)
    insideRef.current = 0
    totalRef.current = 0
    setInside(0)
    setTotalDarts(0)
    initCanvas()
  }

  const estimate = totalDarts > 0 ? (4 * inside) / totalDarts : null
  const ratio = totalDarts > 0 ? (inside / totalDarts).toFixed(4) : '—'

  return (
    <GamePageLayout title={t('monteCarloPi.title')} emoji="🎯">
      <p className="text-center text-sm text-gray-500 mb-2 max-w-xl mx-auto">
        {t('monteCarloPi.subtitle')}
      </p>
      <p className="text-center text-sm text-violet-600 font-medium mb-6 max-w-xl mx-auto">{t('monteCarloPi.howToPlay')}</p>

      {/* Canvas */}
      <div className="flex justify-center mb-4">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="rounded-2xl shadow-md border border-gray-200"
        />
      </div>

      {/* π display */}
      {estimate !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-4"
        >
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            {t('monteCarloPi.estimate')}
          </p>
          <p className={`text-4xl font-black font-mono ${piAccuracyClass(estimate)}`}>
            {estimate.toFixed(5)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            π = {Math.PI.toFixed(5)}
          </p>
        </motion.div>
      )}

      {/* Stats */}
      <div className="flex justify-center gap-6 mb-4 text-sm flex-wrap">
        {[
          { label: t('monteCarloPi.total'), value: totalDarts.toLocaleString() },
          { label: t('monteCarloPi.inside'), value: inside.toLocaleString(), color: 'text-emerald-600' },
          { label: t('monteCarloPi.outside'), value: (totalDarts - inside).toLocaleString(), color: 'text-rose-500' },
          { label: t('monteCarloPi.ratio'), value: ratio },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center">
            <p className="text-gray-400 text-xs uppercase tracking-wide">{label}</p>
            <p className={`font-bold text-base ${color ?? 'text-violet-700'}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Speed selector */}
      <div className="flex justify-center gap-2 mb-3">
        {['slow', 'fast', 'instant'].map(s => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
              speed === s
                ? 'bg-rose-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t(`monteCarloPi.${s}`)}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={handleStart} disabled={running}
          className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-sm shadow disabled:opacity-40"
        >
          {t('monteCarloPi.start')}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={handlePause} disabled={!running}
          className="px-4 py-2 rounded-xl bg-rose-200 text-rose-800 font-bold text-sm shadow disabled:opacity-40"
        >
          {t('monteCarloPi.pause')}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 font-bold text-sm shadow"
        >
          {t('monteCarloPi.reset')}
        </motion.button>
      </div>

      <ExplainerPanel
        title={t('monteCarloPi.explainer.title')}
        body={t('monteCarloPi.explainer.body')}
        example={t('monteCarloPi.explainer.example')}
        callout={t('monteCarloPi.explainer.callout')}
        furtherReading={t('monteCarloPi.explainer.furtherReading')}
        accentColor="border-rose-400"
      />

      <QuizPanel questions={monteCarloPiQuestions} accentColor="border-rose-400" />
    </GamePageLayout>
  )
}
