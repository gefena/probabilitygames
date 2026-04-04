import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function PersonalBestBadge({ best, isNew }) {
  const { t } = useTranslation()
  if (best === 0 && !isNew) return null

  return (
    <span className="inline-flex items-center gap-1.5">
      <motion.span
        key={best}
        animate={isNew ? { scale: [1, 1.25, 1], opacity: [1, 1, 1] } : {}}
        transition={{ duration: 0.4 }}
        className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border transition-colors ${
          isNew
            ? 'bg-amber-100 border-amber-400 text-amber-700 shadow-[0_0_8px_2px_rgba(251,191,36,0.4)]'
            : 'bg-slate-100 border-slate-300 text-slate-500'
        }`}
      >
        <span>⭐</span>
        <span>{t('personalBest.label', { n: best })}</span>
      </motion.span>
      <AnimatePresence>
        {isNew && (
          <motion.span
            key="new-record"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.3 }}
            className="text-xs font-bold text-amber-600"
          >
            {t('personalBest.newRecord')}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
