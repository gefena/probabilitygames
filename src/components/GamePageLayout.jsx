import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const GAME_ACCENTS = {
  '/coin-flip':         'from-violet-400',
  '/dice':              'from-orange-400',
  '/candy-jar':         'from-pink-500',
  '/spinner':           'from-emerald-500',
  '/higher-or-lower':   'from-indigo-600',
  '/card-draw':         'from-blue-500',
  '/roll-and-race':     'from-orange-500',
  '/dice-detective':    'from-violet-600',
  '/pizza-builder':     'from-orange-500',
  '/remove-one':        'from-emerald-600',
  '/probability-bingo': 'from-violet-600',
  '/climber-race':      'from-violet-500',
  '/bridge-quest':      'from-blue-500',
  '/greedy-pig':        'from-orange-500',
  '/lucky-combo':       'from-teal-500',
  '/house-always-wins': 'from-red-500',
  '/prize-machine':     'from-amber-500',
  '/guess-the-phone':   'from-violet-600',
  '/hack-the-password': 'from-rose-600',
  '/pattern-lock-hacker': 'from-slate-600',
  '/galton-board':      'from-violet-600',
  '/random-walk':       'from-cyan-500',
  '/monte-carlo-pi':    'from-rose-500',
  '/birthday-room':     'from-pink-500',
  '/monty-hall':        'from-amber-500',
  '/mystery-machine':   'from-indigo-500',
}

export default function GamePageLayout({ children, title, emoji }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  const accent = GAME_ACCENTS[location.pathname] ?? 'from-violet-400'

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className={`h-0.5 bg-gradient-to-r ${accent} to-transparent -mx-4 mb-4 rounded-full`} />
      <button
        onClick={() => navigate('/')}
        className="mb-4 py-3 px-4 bg-white rounded-full shadow-sm border border-slate-200 text-violet-600 font-semibold hover:shadow-md transition-shadow text-sm"
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
