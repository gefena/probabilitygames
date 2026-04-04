import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const ACCENT_FILL = {
  'border-violet-400': '#a78bfa',
  'border-orange-400': '#fb923c',
  'border-pink-400':   '#f472b6',
  'border-emerald-400':'#34d399',
  'border-blue-400':   '#60a5fa',
}

export default function QuizPanel({ questions, accentColor = 'border-violet-400' }) {
  const dotColor = ACCENT_FILL[accentColor] ?? '#a78bfa'
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  const question = questions[currentIndex]

  function handleSelect(optionIndex) {
    if (revealed) return
    setSelected(optionIndex)
    setRevealed(true)
  }

  function handleNext() {
    setCurrentIndex((currentIndex + 1) % questions.length)
    setSelected(null)
    setRevealed(false)
  }

  const selectedOption = selected !== null ? question.options[selected] : null
  const isCorrect = selectedOption?.correct === true

  return (
    <div className={`bg-white rounded-3xl p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/60 border-s-4 ${accentColor} my-6`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-extrabold text-gray-800 text-base">🧠 {t('quiz.title')}</h3>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {questions.map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full border-2 transition-all duration-300"
                style={
                  i === currentIndex
                    ? { background: dotColor, borderColor: dotColor }
                    : { background: 'transparent', borderColor: '#d1d5db' }
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-400 font-semibold tabular-nums">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <p className="font-bold text-gray-800 text-sm mb-4 leading-relaxed">
            {t(question.question)}
          </p>

          <div className="flex flex-col gap-2 mb-4">
            {question.options.map((opt, i) => {
              let style = 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'

              if (revealed) {
                if (opt.correct) {
                  style = 'border-green-400 bg-green-50 text-green-800'
                } else if (i === selected && !opt.correct) {
                  style = 'border-red-300 bg-red-50 text-red-700'
                } else {
                  style = 'border-gray-200 text-gray-400'
                }
              }

              const isShaking = revealed && i === selected && !opt.correct

              return (
                <motion.button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={revealed}
                  animate={isShaking ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className={`text-start px-4 py-2.5 rounded-2xl border-2 text-sm font-medium transition-colors ${style} disabled:cursor-default`}
                >
                  <span className="flex items-center gap-2">
                    {revealed && opt.correct && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="text-green-600 font-extrabold"
                      >
                        ✓
                      </motion.span>
                    )}
                    {revealed && i === selected && !opt.correct && (
                      <span className="text-red-500 font-extrabold">✗</span>
                    )}
                    {t(opt.label)}
                  </span>
                </motion.button>
              )
            })}
          </div>

          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed mb-4 ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'}`}>
                  {isCorrect ? '🎉 ' : '💡 '}{t(question.explanation)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {revealed && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleNext}
              className="px-5 py-2 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-colors text-sm"
            >
              {t('quiz.next')}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
