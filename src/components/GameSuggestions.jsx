import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import gameConnections from '../data/gameConnections'

export default function GameSuggestions({ gameId }) {
  const { t } = useTranslation()
  const suggestions = gameConnections[gameId]
  if (!suggestions || suggestions.length === 0) return null

  return (
    <div className="mt-6">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        {t('suggestions.sectionTitle')}
      </p>
      <div className="flex flex-col gap-3">
        {suggestions.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-slate-200/80 shadow-[0_1px_6px_-1px_rgba(0,0,0,0.06)] hover:border-violet-300 hover:shadow-[0_2px_12px_-2px_rgba(124,58,237,0.15)] transition-all active:scale-[0.98]"
          >
            <span className="text-2xl shrink-0">{s.emoji}</span>
            <div className="min-w-0">
              <p className="font-bold text-slate-800 text-sm leading-tight">{t(s.titleKey)}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">{t(s.reasonKey)}</p>
            </div>
            <span className="ms-auto text-slate-300 shrink-0">›</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
