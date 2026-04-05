/**
 * ExplainerPanel — shared in-game concept explainer card.
 *
 * Props:
 *   title          string      — concept heading
 *   body           string|JSX  — plain-language explanation (1–3 sentences)
 *   example        string|JSX  — worked example (shown in shaded box)
 *   visual         JSX         — optional visual aid (bar, emoji row, table…)
 *   callout        string|JSX  — optional highlighted amber note
 *   furtherReading string|JSX  — optional "Further Reading" appendix with formal name
 *   accentColor    string      — Tailwind border-color class, e.g. "border-violet-500"
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ExplainerPanel({ title, body, example, visual, callout, furtherReading, accentColor = 'border-violet-400' }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={`bg-white rounded-3xl p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/60 border-s-4 ${accentColor} my-6`}>
      <button
        onClick={() => setIsOpen(o => !o)}
        className="w-full flex items-center justify-between text-start"
      >
        <h3 className="font-extrabold text-gray-800 text-lg">💡 {title}</h3>
        <span className="text-gray-400 text-sm ms-3">{isOpen ? '▲' : '▼'}</span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pt-2">
              {body && (
                <p className="text-gray-600 text-base leading-relaxed mb-3">{body}</p>
              )}

              {visual && (
                <div className="mb-3">{visual}</div>
              )}

              {example && (
                <div className="bg-gray-50 rounded-2xl px-4 py-3 text-base text-gray-700 leading-relaxed">
                  {example}
                </div>
              )}

              {callout && (
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-base text-amber-800 leading-relaxed">
                  ⭐ {callout}
                </div>
              )}

              {furtherReading && (
                <div className="mt-3 pt-3 border-t border-dashed border-gray-200 text-xs text-gray-400 leading-relaxed">
                  📚 {furtherReading}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
