import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'

export default function AppLayout() {
  const { t, i18n } = useTranslation()
  const location = useLocation()

  function setLang(lang) {
    i18n.changeLanguage(lang)
    localStorage.setItem('lang', lang)
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-lg sm:text-2xl font-extrabold text-violet-700 tracking-tight">
            🎲 <span className="hidden sm:inline">{t('site.title')}</span>
            <span className="sm:hidden">{t('site.title')}</span>
          </span>
          <div className="flex rounded-xl overflow-hidden border border-violet-200">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-2 text-lg transition-colors ${i18n.language === 'en' ? 'bg-violet-600 text-white' : 'bg-white text-violet-600 hover:bg-violet-50'}`}
            >
              🇬🇧
            </button>
            <button
              onClick={() => setLang('he')}
              className={`px-3 py-2 text-lg transition-colors ${i18n.language === 'he' ? 'bg-violet-600 text-white' : 'bg-white text-violet-600 hover:bg-violet-50'}`}
            >
              🇮🇱
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <AnimatePresence mode="sync">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
