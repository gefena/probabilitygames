import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import guessThePhoneQuestions from '../quizzes/guessThePhone'

const LENGTHS = [1, 2, 3, 4, 5]

function generateSecret(length) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10))
}

function formatBig(n) {
  return n.toLocaleString()
}

export default function GuessThePhonePage() {
  const { t } = useTranslation()

  const [length, setLength] = useState(1)
  const lengthRef = useRef(1)
  const restartTimerRef = useRef(null)

  const [secret, setSecret] = useState(() => generateSecret(1))
  const [solved, setSolved] = useState(() => Array(1).fill(false))
  const [revealed, setRevealed] = useState(() => Array(1).fill(null)) // null | digit
  const [selected, setSelected] = useState(null) // position index
  const [attempts, setAttempts] = useState(0)
  const [history, setHistory] = useState([]) // { pos, digit, hit }
  const [won, setWon] = useState(false)
  const [gaveUp, setGaveUp] = useState(false)

  function startGame(len) {
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current)
      restartTimerRef.current = null
    }
    const s = generateSecret(len)
    setLength(len)
    lengthRef.current = len
    setSecret(s)
    setSolved(Array(len).fill(false))
    setRevealed(Array(len).fill(null))
    setSelected(null)
    setAttempts(0)
    setHistory([])
    setWon(false)
    setGaveUp(false)
  }

  function selectPosition(i) {
    if (solved[i] || won || gaveUp) return
    setSelected(i)
  }

  function guessDigit(digit) {
    if (selected === null || solved[selected] || won || gaveUp) return
    const hit = digit === secret[selected]
    const newAttempts = attempts + 1
    setAttempts(newAttempts)
    setHistory(prev => [{ pos: selected, digit, hit }, ...prev].slice(0, 10))

    if (hit) {
      const newSolved = [...solved]
      newSolved[selected] = true
      const newRevealed = [...revealed]
      newRevealed[selected] = digit
      setSolved(newSolved)
      setRevealed(newRevealed)
      setSelected(null)
      if (newSolved.every(Boolean)) {
        setWon(true)
      }
    }
  }

  function handleGiveUp() {
    setRevealed([...secret])
    setGaveUp(true)
    setSelected(null)
    if (restartTimerRef.current) clearTimeout(restartTimerRef.current)
    restartTimerRef.current = setTimeout(() => {
      startGame(lengthRef.current)
    }, 2000)
  }

  function handleNewGame() {
    startGame(length)
  }

  const unsolvedCount = solved.filter(v => !v).length
  const remainingCombinations = Math.pow(10, unsolvedCount)

  return (
    <GamePageLayout title={t('common.games.guess-the-phone')} emoji={t('guessPhone.emoji')}>
      <p className="text-gray-500 mb-2 text-sm text-center">{t('guessPhone.subtitle')}</p>
      <p className="text-center text-sm text-violet-600 font-medium mb-6 max-w-xl mx-auto">{t('guessPhone.howToPlay')}</p>

      {/* Length selector */}
      <div className="flex justify-center gap-2 mb-6">
        <span className="text-xs text-gray-400 self-center me-1 font-semibold uppercase tracking-wide">{t('guessPhone.lengthLabel')}:</span>
        {LENGTHS.map(l => (
          <button
            key={l}
            onClick={() => startGame(l)}
            className={`w-9 h-9 rounded-xl font-extrabold text-sm transition-all ${
              length === l
                ? 'bg-violet-600 text-white shadow-md scale-110'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Position slots */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {Array.from({ length }, (_, i) => {
          const isSolved = solved[i]
          const isSelected = selected === i
          const revealedDigit = revealed[i]
          return (
            <motion.button
              key={i}
              onClick={() => selectPosition(i)}
              whileHover={!isSolved && !won && !gaveUp ? { scale: 1.08 } : {}}
              whileTap={!isSolved && !won && !gaveUp ? { scale: 0.95 } : {}}
              className={`w-14 h-16 rounded-2xl font-extrabold text-2xl shadow-sm border-2 transition-all flex flex-col items-center justify-center gap-0.5
                ${isSolved ? 'bg-emerald-50 border-emerald-400 text-emerald-700 cursor-default' : ''}
                ${isSelected && !isSolved ? 'bg-violet-50 border-violet-500 text-violet-700 scale-105' : ''}
                ${!isSolved && !isSelected ? 'bg-white border-gray-200 text-gray-300 hover:border-violet-300 cursor-pointer' : ''}
              `}
            >
              <span>{revealedDigit !== null ? revealedDigit : '?'}</span>
              <span className="text-[9px] font-semibold text-gray-400 leading-none">{t('guessPhone.positionLabel', { n: i + 1 })}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Win state */}
      <AnimatePresence>
        {won && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mb-6"
          >
            <p className="text-2xl font-black text-emerald-600 mb-1">{t('guessPhone.win')}</p>
            <p className="text-sm text-gray-500">{t('guessPhone.winMessage', { n: attempts })}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      {!won && !gaveUp && (
        <p className="text-center text-xs text-gray-400 mb-4">
          {selected === null ? t('guessPhone.positionHint') : t('guessPhone.selectDigitHint')}
        </p>
      )}

      {/* Digit picker */}
      {!won && !gaveUp && (
        <div className="flex justify-center gap-2 flex-wrap mb-6">
          {[0,1,2,3,4,5,6,7,8,9].map(d => (
            <motion.button
              key={d}
              onClick={() => guessDigit(d)}
              disabled={selected === null}
              whileHover={selected !== null ? { scale: 1.1 } : {}}
              whileTap={selected !== null ? { scale: 0.9 } : {}}
              className={`w-11 h-11 rounded-xl font-extrabold text-lg transition-all shadow-sm
                ${selected !== null
                  ? 'bg-violet-600 text-white hover:bg-violet-700 cursor-pointer'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }
              `}
            >
              {d}
            </motion.button>
          ))}
        </div>
      )}

      {/* Probability display */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-4 text-center max-w-sm mx-auto">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{t('guessPhone.probabilityLabel')}</p>
        <p className="text-2xl font-black text-violet-700 tabular-nums">
          {t('guessPhone.probabilityValue', { n: formatBig(remainingCombinations) })}
        </p>
        <p className="text-xs text-gray-400 mt-1">10<sup>{unsolvedCount}</sup> = {formatBig(remainingCombinations)}</p>
      </div>

      {/* Stats + controls */}
      <div className="flex justify-center items-center gap-4 mb-4 text-sm flex-wrap">
        <span className="text-gray-500">
          <span className="font-bold text-gray-700">{attempts}</span> {t('guessPhone.attemptsLabel')}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={handleNewGame}
          className="px-4 py-2 rounded-xl bg-violet-600 text-white font-bold text-sm shadow"
        >
          {t('guessPhone.newGame')}
        </motion.button>
        {!won && !gaveUp && (
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={handleGiveUp}
            className="px-4 py-2 rounded-xl bg-gray-200 text-gray-600 font-bold text-sm shadow"
          >
            {t('guessPhone.giveUp')}
          </motion.button>
        )}
      </div>

      {/* Give-up reveal */}
      {gaveUp && (
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center text-sm text-gray-500 mb-4"
        >
          {t('guessPhone.revealLabel')} <span className="font-black text-rose-600 text-lg tracking-widest">{secret.join('')}</span>
        </motion.p>
      )}

      {/* Guess history */}
      {history.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {history.map((h, i) => (
            <div
              key={i}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold border ${
                h.hit ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-600'
              }`}
            >
              <span className="text-gray-400">#{h.pos + 1}</span>
              <span>{h.digit}</span>
              <span>{h.hit ? '✓' : '✗'}</span>
            </div>
          ))}
        </div>
      )}

      <ExplainerPanel
        title={t('guessPhone.explainer.title')}
        body={t('guessPhone.explainer.body')}
        example={t('guessPhone.explainer.example')}
        callout={t('guessPhone.explainer.callout')}
        furtherReading={t('guessPhone.explainer.furtherReading')}
        accentColor="border-violet-400"
      />

      <QuizPanel questions={guessThePhoneQuestions} accentColor="border-violet-400" />
    </GamePageLayout>
  )
}
