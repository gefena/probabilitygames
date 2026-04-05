import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import hackThePasswordQuestions from '../quizzes/hackThePassword'
import GameSuggestions from '../components/GameSuggestions'

const LENGTHS = [1, 2, 3, 4, 5]

const ALPHABETS = {
  easy: '0123456789',
  medium: 'abcdefghijklmnopqrstuvwxyz0123456789',
  hard: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
}

function generateSecret(length, alphabet) {
  return Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)])
}

function formatBig(n) {
  if (n >= 1e15) return n.toExponential(2)
  return n.toLocaleString()
}

function comparisonKey(n) {
  if (n >= 1e18) return 'comparisonAtoms'
  if (n >= 1e11) return 'comparisonStars'
  if (n >= 1e9) return 'comparisonGrain'
  return null
}

export default function HackThePasswordPage() {
  const { t } = useTranslation()

  const [length, setLength] = useState(1)
  const [difficulty, setDifficulty] = useState('easy')
  const alphabet = ALPHABETS[difficulty]

  const [secret, setSecret] = useState(() => generateSecret(1, ALPHABETS.easy))
  const [solved, setSolved] = useState(() => Array(1).fill(false))
  const [revealed, setRevealed] = useState(() => Array(1).fill(null))
  const [selected, setSelected] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [history, setHistory] = useState([])
  const [won, setWon] = useState(false)
  const [gaveUp, setGaveUp] = useState(false)

  function startGame(len, diff) {
    const alpha = ALPHABETS[diff]
    const s = generateSecret(len, alpha)
    setLength(len)
    setDifficulty(diff)
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

  function guessChar(ch) {
    if (selected === null || solved[selected] || won || gaveUp) return
    const hit = ch === secret[selected]
    const newAttempts = attempts + 1
    setAttempts(newAttempts)
    setHistory(prev => [{ pos: selected, ch, hit }, ...prev].slice(0, 10))

    if (hit) {
      const newSolved = [...solved]
      newSolved[selected] = true
      const newRevealed = [...revealed]
      newRevealed[selected] = ch
      setSolved(newSolved)
      setRevealed(newRevealed)
      setSelected(null)
      if (newSolved.every(Boolean)) setWon(true)
    }
  }

  function handleGiveUp() {
    setRevealed([...secret])
    setGaveUp(true)
    setSelected(null)
    setTimeout(() => startGame(length, difficulty), 2500)
  }

  function handleNewGame() {
    startGame(length, difficulty)
  }

  const unsolvedCount = solved.filter(v => !v).length
  const alphabetSize = alphabet.length
  const remaining = useMemo(() => Math.pow(alphabetSize, unsolvedCount), [alphabetSize, unsolvedCount])
  const total = useMemo(() => Math.pow(alphabetSize, length), [alphabetSize, length])
  const cmpKey = comparisonKey(total)

  const DIFF_KEYS = ['easy', 'medium', 'hard']
  const DIFF_COLORS = { easy: '#10B981', medium: '#F97316', hard: '#EF4444' }

  return (
    <GamePageLayout title={t('common.games.hack-the-password')} emoji={t('hackPassword.emoji')}>
      <p className="text-gray-500 mb-2 text-sm text-center">{t('hackPassword.subtitle')}</p>
      <p className="text-center text-sm text-violet-600 font-medium mb-6 max-w-xl mx-auto">{t('hackPassword.howToPlay')}</p>

      {/* Controls: length + difficulty */}
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        {/* Length */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{t('hackPassword.lengthLabel')}:</span>
          {LENGTHS.map(l => (
            <button
              key={l}
              onClick={() => startGame(l, difficulty)}
              className={`w-9 h-9 rounded-xl font-extrabold text-sm transition-all ${
                length === l
                  ? 'bg-rose-600 text-white shadow-md scale-110'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Difficulty */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{t('hackPassword.difficultyLabel')}:</span>
          {DIFF_KEYS.map(d => (
            <button
              key={d}
              onClick={() => startGame(length, d)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                difficulty === d ? 'text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={difficulty === d ? { background: DIFF_COLORS[d] } : {}}
            >
              {t(`hackPassword.diff${d.charAt(0).toUpperCase() + d.slice(1)}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Position slots */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {Array.from({ length }, (_, i) => {
          const isSolved = solved[i]
          const isSelected = selected === i
          const revealedChar = revealed[i]
          return (
            <motion.button
              key={i}
              onClick={() => selectPosition(i)}
              whileHover={!isSolved && !won && !gaveUp ? { scale: 1.08 } : {}}
              whileTap={!isSolved && !won && !gaveUp ? { scale: 0.95 } : {}}
              className={`w-14 h-16 rounded-2xl font-extrabold text-2xl shadow-sm border-2 transition-all flex flex-col items-center justify-center gap-0.5
                ${isSolved ? 'bg-emerald-50 border-emerald-400 text-emerald-700 cursor-default' : ''}
                ${isSelected && !isSolved ? 'bg-rose-50 border-rose-500 text-rose-700 scale-105' : ''}
                ${!isSolved && !isSelected ? 'bg-white border-gray-200 text-gray-300 hover:border-rose-300 cursor-pointer' : ''}
              `}
            >
              <span className="font-mono">{revealedChar !== null ? revealedChar : '?'}</span>
              <span className="text-[9px] font-semibold text-gray-400 leading-none">{t('hackPassword.positionLabel', { n: i + 1 })}</span>
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
            <p className="text-2xl font-black text-emerald-600 mb-1">{t('hackPassword.win')}</p>
            <p className="text-sm text-gray-500">{t('hackPassword.winMessage', { n: attempts })}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      {!won && !gaveUp && (
        <p className="text-center text-xs text-gray-400 mb-3">
          {selected === null ? t('hackPassword.positionHint') : t('hackPassword.selectCharHint')}
        </p>
      )}

      {/* Character picker grid */}
      {!won && !gaveUp && (
        <div className="flex flex-wrap justify-center gap-1.5 mb-2 max-w-sm mx-auto">
          {alphabet.split('').map(ch => (
            <motion.button
              key={ch}
              onClick={() => guessChar(ch)}
              disabled={selected === null}
              whileHover={selected !== null ? { scale: 1.15 } : {}}
              whileTap={selected !== null ? { scale: 0.85 } : {}}
              className={`w-9 h-9 rounded-lg font-bold text-sm font-mono transition-all
                ${selected !== null
                  ? 'bg-rose-600 text-white hover:bg-rose-700 cursor-pointer shadow-sm'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }
              `}
            >
              {ch}
            </motion.button>
          ))}
        </div>
      )}

      {/* Disambiguation hint for hard mode */}
      {!won && !gaveUp && difficulty === 'hard' && (
        <p className="text-center text-[10px] text-gray-400 mb-6 max-w-xs mx-auto leading-tight italic">
          {t('hackPassword.hardModeHint')}
        </p>
      )}

      {/* Probability + total combinations */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-4 text-center max-w-sm mx-auto">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{t('hackPassword.probabilityLabel')}</p>
        <p className="text-2xl font-black text-rose-700 tabular-nums">
          {t('hackPassword.probabilityValue', { n: formatBig(remaining) })}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {t('hackPassword.combinationsLabel')}: {formatBig(total)}
        </p>
        {cmpKey && (
          <p className="text-xs text-amber-600 font-semibold mt-1">{t(`hackPassword.${cmpKey}`)}</p>
        )}
      </div>

      {/* Stats + controls */}
      <div className="flex justify-center items-center gap-4 mb-4 text-sm flex-wrap">
        <span className="text-gray-500">
          <span className="font-bold text-gray-700">{attempts}</span> {t('hackPassword.attemptsLabel')}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={handleNewGame}
          className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-sm shadow"
        >
          {t('hackPassword.newGame')}
        </motion.button>
        {!won && !gaveUp && (
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={handleGiveUp}
            className="px-4 py-2 rounded-xl bg-gray-200 text-gray-600 font-bold text-sm shadow"
          >
            {t('hackPassword.giveUp')}
          </motion.button>
        )}
      </div>

      {/* Give-up reveal */}
      {gaveUp && (
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center text-sm text-gray-500 mb-4"
        >
          {t('hackPassword.revealLabel')} <span className="font-black text-rose-600 text-lg tracking-widest font-mono">{secret.join('')}</span>
        </motion.p>
      )}

      {/* Guess history */}
      {history.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {history.map((h, i) => (
            <div
              key={i}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold font-mono border ${
                h.hit ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-600'
              }`}
            >
              <span className="text-gray-400 not-mono">#{h.pos + 1}</span>
              <span>{h.ch}</span>
              <span>{h.hit ? '✓' : '✗'}</span>
            </div>
          ))}
        </div>
      )}

      <ExplainerPanel
        title={t('hackPassword.explainer.title')}
        body={t('hackPassword.explainer.body')}
        example={t('hackPassword.explainer.example')}
        callout={t('hackPassword.explainer.callout')}
        furtherReading={t('hackPassword.explainer.furtherReading')}
        accentColor="border-rose-400"
      />

      <QuizPanel questions={hackThePasswordQuestions} accentColor="border-rose-400" />
          <GameSuggestions gameId="hack-the-password" />
    </GamePageLayout>
  )
}
