import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import he from './he.json'

const savedLang = localStorage.getItem('lang')

function getInitialLang() {
  // Check URL params (standard search and within hash)
  const urlParams = new URLSearchParams(window.location.search)
  let urlLang = urlParams.get('lng')

  if (!urlLang && window.location.hash.includes('?')) {
    const hashQuery = window.location.hash.split('?')[1]
    urlLang = new URLSearchParams(hashQuery).get('lng')
  }

  if (urlLang === 'he' || urlLang === 'en') {
    localStorage.setItem('lang', urlLang)
    return urlLang
  }

  return savedLang || 'en'
}

const initialLang = getInitialLang()

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    he: { translation: he },
  },
  lng: initialLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
