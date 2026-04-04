import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function GamePageLayout({ children, title, emoji }) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <button
        onClick={() => navigate('/')}
        className="mb-4 text-violet-600 font-semibold hover:text-violet-800 transition-colors text-sm"
      >
        {t('common.backHome')}
      </button>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-violet-800 mb-6 flex items-center gap-2">
        <span>{emoji}</span> {title}
      </h1>
      {children}
    </div>
  )
}
