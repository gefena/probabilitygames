import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import GamePageLayout from '../components/GamePageLayout'
import QuizPanel from '../components/QuizPanel'
import diceDetectiveQuestions from '../quizzes/diceDetective'

// ── Constants ─────────────────────────────────────────────────────────────────
const SHAPES = ['triangle', 'square', 'circle']
const TOTAL_ROUNDS = 5
// Template per round index (0-based)
const TEMPLATES = ['ONE_DIE', 'BOTH_SAME', 'ONE_DIE', 'AT_LEAST_ONE', 'EXACTLY_ONE']

// ── Dice generation ───────────────────────────────────────────────────────────
function randomDie() {
  const distributions = [[2, 2], [2, 1, 1], [3, 1]]
  const dist = distributions[Math.floor(Math.random() * distributions.length)]
  const shuffled = [...SHAPES].sort(() => Math.random() - 0.5)
  const faces = []
  dist.forEach((count, i) => {
    for (let j = 0; j < count; j++) faces.push(shuffled[i])
  })
  return faces.sort(() => Math.random() - 0.5)
}

function countShape(die, shape) {
  return die.filter(f => f === shape).length
}

function computeAnswer(template, shape, dieA, dieB, whichDie) {
  const cA = shape ? countShape(dieA, shape) : 0
  const cB = shape ? countShape(dieB, shape) : 0
  if (template === 'ONE_DIE')       return whichDie === 'A' ? cA * 4 : 4 * cB
  if (template === 'BOTH_SAME')     return cA * cB
  if (template === 'AT_LEAST_ONE')  return 16 - (4 - cA) * (4 - cB)
  if (template === 'EXACTLY_ONE')   return cA * (4 - cB) + (4 - cA) * cB
  if (template === 'DIFFERENT_SHAPES') {
    const same = SHAPES.reduce((s, sh) => s + countShape(dieA, sh) * countShape(dieB, sh), 0)
    return 16 - same
  }
  return 0
}

function tryTemplate(template, dieA, dieB) {
  if (template === 'ONE_DIE') {
    const whichDie = Math.random() < 0.5 ? 'A' : 'B'
    const die = whichDie === 'A' ? dieA : dieB
    const unique = [...new Set(die)]
    const shape = unique[Math.floor(Math.random() * unique.length)]
    const answer = computeAnswer('ONE_DIE', shape, dieA, dieB, whichDie)
    return { template, shape, whichDie, answer }
  }
  if (template === 'BOTH_SAME') {
    const common = SHAPES.filter(s => countShape(dieA, s) > 0 && countShape(dieB, s) > 0)
    if (!common.length) return null
    const shape = common[Math.floor(Math.random() * common.length)]
    return { template, shape, answer: computeAnswer('BOTH_SAME', shape, dieA, dieB) }
  }
  if (template === 'AT_LEAST_ONE') {
    const all = [...new Set([...dieA, ...dieB])]
    const shape = all[Math.floor(Math.random() * all.length)]
    return { template, shape, answer: computeAnswer('AT_LEAST_ONE', shape, dieA, dieB) }
  }
  if (template === 'EXACTLY_ONE') {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
    return { template, shape, answer: computeAnswer('EXACTLY_ONE', shape, dieA, dieB) }
  }
  if (template === 'DIFFERENT_SHAPES') {
    return { template, shape: null, answer: computeAnswer('DIFFERENT_SHAPES', null, dieA, dieB) }
  }
  return null
}

const FALLBACKS = [
  { dieA: ['triangle','triangle','square','circle'], dieB: ['triangle','square','square','circle'], template: 'ONE_DIE',        shape: 'triangle', whichDie: 'A', answer: 8  },
  { dieA: ['triangle','triangle','square','circle'], dieB: ['triangle','square','square','circle'], template: 'BOTH_SAME',      shape: 'triangle',               answer: 2  },
  { dieA: ['triangle','square','square','circle'],   dieB: ['triangle','triangle','square','circle'], template: 'ONE_DIE',     shape: 'square',   whichDie: 'B', answer: 4  },
  { dieA: ['triangle','triangle','square','circle'], dieB: ['triangle','square','square','circle'], template: 'AT_LEAST_ONE',  shape: 'triangle',               answer: 10 },
  { dieA: ['triangle','triangle','square','circle'], dieB: ['triangle','square','square','circle'], template: 'EXACTLY_ONE',   shape: 'circle',                 answer: 6  },
]

function generateRound(roundIndex) {
  const primaryTemplate = TEMPLATES[roundIndex]
  for (let attempt = 0; attempt < 100; attempt++) {
    const dieA = randomDie()
    const dieB = randomDie()
    let result = tryTemplate(primaryTemplate, dieA, dieB)
    // Round 5: fall back to DIFFERENT_SHAPES if EXACTLY_ONE is trivial
    if (roundIndex === 4 && result && (result.answer <= 0 || result.answer >= 16)) {
      result = tryTemplate('DIFFERENT_SHAPES', dieA, dieB)
    }
    if (result && result.answer >= 1 && result.answer <= 15) {
      return { dieA, dieB, ...result }
    }
  }
  return FALLBACKS[roundIndex]
}

function freshRounds() {
  return Array.from({ length: TOTAL_ROUNDS }, (_, i) => generateRound(i))
}

// ── Sample space helpers ──────────────────────────────────────────────────────
function matchingCells(template, shape, dieA, dieB, whichDie) {
  const result = new Set()
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const sA = dieA[r], sB = dieB[c]
      let ok = false
      if      (template === 'ONE_DIE')          ok = whichDie === 'A' ? sA === shape : sB === shape
      else if (template === 'BOTH_SAME')        ok = sA === shape && sB === shape
      else if (template === 'AT_LEAST_ONE')     ok = sA === shape || sB === shape
      else if (template === 'EXACTLY_ONE')      ok = (sA === shape) !== (sB === shape)
      else if (template === 'DIFFERENT_SHAPES') ok = sA !== sB
      if (ok) result.add(r * 4 + c)
    }
  }
  return result
}

// ── i18n helpers ──────────────────────────────────────────────────────────────
function buildQuestion(round, t) {
  const { template, shape, whichDie } = round
  const shapeName = shape ? t(`diceDetective.shape.${shape}`) : ''
  if (template === 'ONE_DIE') {
    const color = t(whichDie === 'A' ? 'diceDetective.colorA' : 'diceDetective.colorB')
    return t('diceDetective.q.oneDie', { shape: shapeName, color })
  }
  if (template === 'BOTH_SAME')        return t('diceDetective.q.bothSame',        { shape: shapeName })
  if (template === 'AT_LEAST_ONE')     return t('diceDetective.q.atLeastOne',      { shape: shapeName })
  if (template === 'EXACTLY_ONE')      return t('diceDetective.q.exactlyOne',      { shape: shapeName })
  if (template === 'DIFFERENT_SHAPES') return t('diceDetective.q.differentShapes')
  return ''
}

function buildExplanation(round, t) {
  const { template, shape, dieA, dieB, whichDie, answer } = round
  const cA = shape ? countShape(dieA, shape) : 0
  const cB = shape ? countShape(dieB, shape) : 0
  const shapeName = shape ? t(`diceDetective.shape.${shape}`) : ''
  if (template === 'ONE_DIE') {
    const color = t(whichDie === 'A' ? 'diceDetective.colorA' : 'diceDetective.colorB')
    return t('diceDetective.explain.oneDie', { color, shape: shapeName, cX: whichDie === 'A' ? cA : cB, answer })
  }
  if (template === 'BOTH_SAME')     return t('diceDetective.explain.bothSame',   { cA, cB, answer })
  if (template === 'AT_LEAST_ONE')  return t('diceDetective.explain.atLeastOne', { missA: 4 - cA, missB: 4 - cB, shape: shapeName, answer })
  if (template === 'EXACTLY_ONE')   return t('diceDetective.explain.exactlyOne', { cA, nb: 4 - cB, na: 4 - cA, cB, answer })
  if (template === 'DIFFERENT_SHAPES') return t('diceDetective.explain.differentShapes', { same: 16 - answer, answer })
  return ''
}

// ── Shape SVG ─────────────────────────────────────────────────────────────────
function ShapeSVG({ shape, size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      {shape === 'triangle' && <polygon points="12,3 22,21 2,21" />}
      {shape === 'square'   && <rect x="3" y="3" width="18" height="18" />}
      {shape === 'circle'   && <circle cx="12" cy="12" r="9" />}
    </svg>
  )
}

// ── Outcome Grid ──────────────────────────────────────────────────────────────
const CELL_STATUS_CLASS = {
  correct: 'bg-emerald-100 ring-2 ring-emerald-400',
  wrong:   'bg-red-100 ring-2 ring-red-400',
  missed:  'bg-amber-100 ring-2 ring-amber-400',
  neutral: 'bg-white',
}

function OutcomeGrid({ dieA, dieB, tapMode, selected, onToggle, cellStatuses, revealed }) {
  const items = []

  // Top-left corner
  items.push(<div key="corner" />)

  // Die B column headers
  dieB.forEach((shape, ci) => {
    items.push(
      <div key={`bh-${ci}`} className="flex items-center justify-center h-8 rounded-lg bg-blue-100">
        <ShapeSVG shape={shape} size={18} color="#3B82F6" />
      </div>
    )
  })

  // Rows: die A face header + 4 cells
  dieA.forEach((shapeA, ri) => {
    // Row header
    items.push(
      <div key={`ah-${ri}`} className="flex items-center justify-center w-8 rounded-lg bg-rose-100">
        <ShapeSVG shape={shapeA} size={18} color="#F43F5E" />
      </div>
    )

    // Cells
    dieB.forEach((shapeB, ci) => {
      const idx = ri * 4 + ci
      const status = revealed ? (cellStatuses[idx] || 'neutral') : 'neutral'
      const isSelected = tapMode && !revealed && selected.has(idx)
      const extraClass = isSelected
        ? 'ring-2 ring-violet-500 bg-violet-50'
        : (CELL_STATUS_CLASS[status] || CELL_STATUS_CLASS.neutral)

      const inner = (
        <>
          <ShapeSVG shape={shapeA} size={13} color="#F43F5E" />
          <div className="w-5 border-t border-gray-300" />
          <ShapeSVG shape={shapeB} size={13} color="#3B82F6" />
        </>
      )

      if (tapMode && !revealed) {
        items.push(
          <button
            key={`cell-${idx}`}
            onClick={() => onToggle(idx)}
            className={`flex flex-col items-center justify-center gap-0.5 h-14 rounded-lg border border-gray-200 transition-all active:scale-95 ${extraClass}`}
          >
            {inner}
          </button>
        )
      } else {
        items.push(
          <div
            key={`cell-${idx}`}
            className={`flex flex-col items-center justify-center gap-0.5 h-14 rounded-lg border border-gray-200 transition-colors ${extraClass}`}
          >
            {inner}
          </div>
        )
      }
    })
  })

  return (
    <div className="overflow-x-auto">
      <div
        className="inline-grid gap-1 min-w-0"
        style={{ gridTemplateColumns: '2rem repeat(4, 3.5rem)' }}
      >
        {items}
      </div>
    </div>
  )
}

// ── Die display ───────────────────────────────────────────────────────────────
function DieFaces({ shapes, color, label, delayBase }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold w-24 shrink-0" style={{ color }}>{label}</span>
      <div className="flex gap-1">
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: delayBase + i * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
            className="w-9 h-9 rounded-lg border-2 flex items-center justify-center"
            style={{ borderColor: color, background: color + '18' }}
          >
            <ShapeSVG shape={shape} size={18} color={color} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DiceDetectivePage() {
  const { t } = useTranslation()

  const [rounds, setRounds]                   = useState(freshRounds)
  const [roundIndex, setRoundIndex]           = useState(0)
  const [phase, setPhase]                     = useState('active')   // 'active' | 'revealed'
  const [selected, setSelected]               = useState(new Set())
  const [typed, setTyped]                     = useState('')
  const [cellStatuses, setCellStatuses]       = useState({})
  const [firstAttemptCorrect, setCorrects]    = useState([])
  const [showEndScreen, setShowEndScreen]     = useState(false)
  const [shakeInput, setShakeInput]           = useState(false)
  const [wrongAnswer, setWrongAnswer]         = useState(null)

  const round    = rounds[roundIndex]
  const isTapMode = roundIndex < 2
  const isLastRound = roundIndex === TOTAL_ROUNDS - 1

  const matching = useMemo(
    () => matchingCells(round.template, round.shape, round.dieA, round.dieB, round.whichDie),
    [round]
  )

  // ── Tap mode ────────────────────────────────────────────────────────────────
  function toggleCell(idx) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      return next
    })
  }

  function handleTapSubmit() {
    const statuses = {}
    for (let i = 0; i < 16; i++) {
      const isMatch = matching.has(i)
      const isSel   = selected.has(i)
      if      (isMatch && isSel)   statuses[i] = 'correct'
      else if (!isMatch && isSel)  statuses[i] = 'wrong'
      else if (isMatch && !isSel)  statuses[i] = 'missed'
      else                         statuses[i] = 'neutral'
    }
    const isCorrect = selected.size === matching.size && [...matching].every(i => selected.has(i))
    setCellStatuses(statuses)
    setCorrects(prev => [...prev, isCorrect])
    setPhase('revealed')
  }

  // ── Count mode ──────────────────────────────────────────────────────────────
  function handleCountSubmit() {
    const val = parseInt(typed, 10)
    const isCorrect = val === round.answer
    const statuses = {}
    for (let i = 0; i < 16; i++) {
      statuses[i] = matching.has(i) ? 'correct' : 'neutral'
    }
    setCellStatuses(statuses)
    setCorrects(prev => [...prev, isCorrect])
    if (!isCorrect) {
      // Shake first, then reveal — delay so the input is still visible during shake
      setWrongAnswer(round.answer)
      setShakeInput(true)
      setTimeout(() => {
        setShakeInput(false)
        setPhase('revealed')
      }, 500)
    } else {
      setPhase('revealed')
    }
  }

  // ── Navigation ──────────────────────────────────────────────────────────────
  function handleNext() {
    if (isLastRound) {
      setShowEndScreen(true)
    } else {
      setRoundIndex(ri => ri + 1)
      setPhase('active')
      setSelected(new Set())
      setTyped('')
      setCellStatuses({})
      setWrongAnswer(null)
    }
  }

  function handlePlayAgain() {
    setRounds(freshRounds())
    setRoundIndex(0)
    setPhase('active')
    setSelected(new Set())
    setTyped('')
    setCellStatuses({})
    setCorrects([])
    setShowEndScreen(false)
    setWrongAnswer(null)
  }

  // ── Derived ─────────────────────────────────────────────────────────────────
  const score = firstAttemptCorrect.filter(Boolean).length
  const lastWasCorrect = firstAttemptCorrect[firstAttemptCorrect.length - 1] === true

  const missedCount = phase === 'revealed'
    ? Object.values(cellStatuses).filter(s => s === 'missed').length
    : 0

  // ── End screen ──────────────────────────────────────────────────────────────
  if (showEndScreen) {
    const msg = score === TOTAL_ROUNDS
      ? t('diceDetective.results.perfect')
      : score >= 3
        ? t('diceDetective.results.good')
        : t('diceDetective.results.keep')

    return (
      <GamePageLayout title={t('diceDetective.title')} emoji="🔍">
        <div className="flex flex-col items-center gap-6 py-10 text-center">
          <h2 className="text-2xl font-extrabold text-gray-800">{t('diceDetective.results.title')}</h2>
          <p className="text-5xl font-extrabold text-violet-600">
            {score} <span className="text-3xl text-gray-400">/ {TOTAL_ROUNDS}</span>
          </p>
          <p className="text-gray-500 text-sm">{t('diceDetective.results.score', { n: score, total: TOTAL_ROUNDS })}</p>
          <p className="text-xl font-bold text-gray-700">{msg}</p>
          <button
            onClick={handlePlayAgain}
            className="px-8 py-3 bg-violet-600 text-white font-bold rounded-2xl shadow-sm active:scale-95 transition-all"
          >
            {t('diceDetective.results.again')}
          </button>
        </div>
        <QuizPanel questions={diceDetectiveQuestions} accentColor="border-violet-400" />
      </GamePageLayout>
    )
  }

  // ── Game ─────────────────────────────────────────────────────────────────────
  const canSubmitTap   = isTapMode && phase === 'active' && selected.size > 0
  const canSubmitCount = !isTapMode && phase === 'active' && typed.length > 0

  return (
    <GamePageLayout title={t('diceDetective.title')} emoji="🔍">
      <p className="text-gray-500 mb-1 text-sm">{t('diceDetective.subtitle')}</p>
      <p className="text-center text-sm text-violet-600 font-medium mb-5">{t('diceDetective.howToPlay')}</p>

      {/* Round counter */}
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider text-center mb-4">
        {t('diceDetective.round', { n: roundIndex + 1, total: TOTAL_ROUNDS })}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={roundIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-5"
        >
          {/* Dice display */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3">
            <DieFaces
              shapes={round.dieA}
              color="#F43F5E"
              label={t('diceDetective.dieA')}
              delayBase={0}
            />
            <DieFaces
              shapes={round.dieB}
              color="#3B82F6"
              label={t('diceDetective.dieB')}
              delayBase={0.5}
            />
          </div>

          {/* Question */}
          <div className="bg-violet-50 border border-violet-200 rounded-2xl px-4 py-3">
            <p className="font-bold text-violet-800 text-base leading-snug">
              {buildQuestion(round, t)}
            </p>
          </div>

          {/* Instruction */}
          <p className="text-sm text-gray-500 font-medium text-center">
            {isTapMode ? t('diceDetective.tapInstruction') : t('diceDetective.countInstruction')}
          </p>

          {/* Grid */}
          <div className="flex justify-center">
            <OutcomeGrid
              dieA={round.dieA}
              dieB={round.dieB}
              tapMode={isTapMode}
              selected={selected}
              onToggle={toggleCell}
              cellStatuses={cellStatuses}
              revealed={phase === 'revealed'}
            />
          </div>

          {/* Tap mode controls */}
          {isTapMode && phase === 'active' && (
            <button
              onClick={handleTapSubmit}
              disabled={!canSubmitTap}
              className="w-full py-3 rounded-2xl font-bold text-white bg-violet-600 disabled:opacity-40 active:scale-95 transition-all"
            >
              {t('diceDetective.submit')}
            </button>
          )}

          {/* Count mode controls */}
          {!isTapMode && phase === 'active' && (
            <div className="flex gap-3">
              <motion.input
                type="number"
                min="0"
                max="16"
                value={typed}
                onChange={e => setTyped(e.target.value.replace(/[^0-9]/g, ''))}
                animate={shakeInput ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex-1 rounded-2xl border-2 border-gray-200 px-4 py-3 text-2xl font-extrabold text-center text-violet-700 focus:outline-none focus:border-violet-400"
                placeholder="?"
              />
              <button
                onClick={handleCountSubmit}
                disabled={!canSubmitCount}
                className="px-8 py-3 rounded-2xl font-bold text-white bg-violet-600 disabled:opacity-40 active:scale-95 transition-all"
              >
                {t('diceDetective.submit')}
              </button>
            </div>
          )}

          {/* Revealed feedback */}
          {phase === 'revealed' && (
            <div className="flex flex-col gap-3">
              {/* Result message */}
              {isTapMode ? (
                lastWasCorrect ? (
                  <p className="text-center font-extrabold text-emerald-600 text-lg">{t('diceDetective.correct')}</p>
                ) : (
                  <div className="text-center">
                    <p className="font-extrabold text-rose-600 text-lg">{t('diceDetective.wrong', { n: round.answer })}</p>
                    {missedCount > 0 && (
                      <p className="text-sm text-amber-600 mt-0.5">
                        {t(missedCount === 1 ? 'diceDetective.missed' : 'diceDetective.missed_plural', { n: missedCount })}
                      </p>
                    )}
                  </div>
                )
              ) : (
                lastWasCorrect ? (
                  <p className="text-center font-extrabold text-emerald-600 text-lg">{t('diceDetective.correct')}</p>
                ) : (
                  <p className="text-center font-extrabold text-rose-600 text-lg">
                    {t('diceDetective.wrong', { n: wrongAnswer })}
                  </p>
                )
              )}

              {/* Explanation */}
              <p className="text-center text-sm text-gray-500 bg-gray-50 rounded-xl px-3 py-2 font-mono">
                {buildExplanation(round, t)}
              </p>

              {/* Next button */}
              <button
                onClick={handleNext}
                className="w-full py-3 rounded-2xl font-bold text-white bg-violet-600 active:scale-95 transition-all"
              >
                {isLastRound ? t('diceDetective.finish') : t('diceDetective.next')}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8">
        <QuizPanel questions={diceDetectiveQuestions} accentColor="border-violet-400" />
      </div>
    </GamePageLayout>
  )
}
