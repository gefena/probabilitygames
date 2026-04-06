import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import AppLayout from './components/AppLayout'
import HomePage from './pages/HomePage'
import CoinFlipPage from './pages/CoinFlipPage'
import LuckyDicePage from './pages/LuckyDicePage'
import CandyJarPage from './pages/CandyJarPage'
import MagicSpinnerPage from './pages/MagicSpinnerPage'
import CardDrawPage from './pages/CardDrawPage'
import HouseAlwaysWinsPage from './pages/HouseAlwaysWinsPage'
import BirthdayRoomPage from './pages/BirthdayRoomPage'
import MysteryMachinePage from './pages/MysteryMachinePage'
import PrizeMachinePage from './pages/PrizeMachinePage'
import LuckyComboPage from './pages/LuckyComboPage'
import GaltonBoardPage from './pages/GaltonBoardPage'
import RandomWalkPage from './pages/RandomWalkPage'
import MonteCarloPiPage from './pages/MonteCarloPiPage'
import MontyHallPage from './pages/MontyHallPage'
import GreedyPigPage from './pages/GreedyPigPage'
import RollAndRacePage from './pages/RollAndRacePage'
import RemoveOnePage from './pages/RemoveOnePage'
import HigherOrLowerPage from './pages/HigherOrLowerPage'
import ProbabilityBingoPage from './pages/ProbabilityBingoPage'
import PizzaBuilderPage from './pages/PizzaBuilderPage'
import ClimberRacePage from './pages/ClimberRacePage'
import BridgeQuestPage from './pages/BridgeQuestPage'
import DiceDetectivePage from './pages/DiceDetectivePage'
import GuessThePhonePage from './pages/GuessThePhonePage'
import HackThePasswordPage from './pages/HackThePasswordPage'
import PatternLockHackerPage from './pages/PatternLockHackerPage'

function NotFoundPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
      <div className="text-7xl">🎲</div>
      <h1 className="text-2xl font-extrabold text-violet-800">{t('notFound.title')}</h1>
      <p className="text-gray-500">{t('notFound.message')}</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-white rounded-full shadow-sm border border-slate-200 text-violet-600 font-semibold hover:shadow-md transition-shadow text-sm"
      >
        {t('notFound.backHome')}
      </button>
    </div>
  )
}

const PAGE_TITLES = {
  '/': null,
  '/coin-flip': 'common.games.coin-flip',
  '/dice': 'common.games.dice',
  '/candy-jar': 'common.games.candy-jar',
  '/spinner': 'common.games.spinner',
  '/card-draw': 'common.games.card-draw',
  '/house-always-wins': 'common.games.house-always-wins',
  '/birthday-room': 'common.games.birthday-room',
  '/mystery-machine': 'common.games.mystery-machine',
  '/prize-machine': 'common.games.prize-machine',
  '/lucky-combo': 'common.games.lucky-combo',
  '/galton-board': 'common.games.galton-board',
  '/random-walk': 'common.games.random-walk',
  '/monte-carlo-pi': 'common.games.monte-carlo-pi',
  '/monty-hall': 'common.games.monty-hall',
  '/greedy-pig': 'common.games.greedy-pig',
  '/higher-or-lower': 'common.games.higher-or-lower',
  '/roll-and-race': 'common.games.roll-and-race',
  '/remove-one': 'common.games.remove-one',
  '/probability-bingo': 'common.games.probability-bingo',
  '/pizza-builder': 'common.games.pizza-builder',
  '/climber-race': 'common.games.climber-race',
  '/bridge-quest': 'common.games.bridge-quest',
  '/dice-detective': 'common.games.dice-detective',
  '/guess-the-phone': 'common.games.guess-the-phone',
  '/hack-the-password': 'common.games.hack-the-password',
  '/pattern-lock-hacker': 'common.games.pattern-lock-hacker',
}

export default function App() {
  const { t, i18n } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const siteTitle = t('site.title')
    const pageKey = PAGE_TITLES[location.pathname]
    if (pageKey) {
      document.title = `${t(pageKey)} - ${siteTitle}`
    } else {
      document.title = siteTitle
    }
  }, [location.pathname, i18n.language, t])

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/coin-flip" element={<CoinFlipPage />} />
        <Route path="/dice" element={<LuckyDicePage />} />
        <Route path="/candy-jar" element={<CandyJarPage />} />
        <Route path="/spinner" element={<MagicSpinnerPage />} />
        <Route path="/card-draw" element={<CardDrawPage />} />
        <Route path="/house-always-wins" element={<HouseAlwaysWinsPage />} />
        <Route path="/birthday-room" element={<BirthdayRoomPage />} />
        <Route path="/mystery-machine" element={<MysteryMachinePage />} />
        <Route path="/prize-machine" element={<PrizeMachinePage />} />
        <Route path="/lucky-combo" element={<LuckyComboPage />} />
        <Route path="/galton-board" element={<GaltonBoardPage />} />
        <Route path="/random-walk" element={<RandomWalkPage />} />
        <Route path="/monte-carlo-pi" element={<MonteCarloPiPage />} />
        <Route path="/monty-hall" element={<MontyHallPage />} />
        <Route path="/greedy-pig" element={<GreedyPigPage />} />
        <Route path="/higher-or-lower" element={<HigherOrLowerPage />} />
        <Route path="/roll-and-race" element={<RollAndRacePage />} />
        <Route path="/remove-one" element={<RemoveOnePage />} />
        <Route path="/probability-bingo" element={<ProbabilityBingoPage />} />
        <Route path="/pizza-builder" element={<PizzaBuilderPage />} />
        <Route path="/climber-race" element={<ClimberRacePage />} />
        <Route path="/bridge-quest" element={<BridgeQuestPage />} />
        <Route path="/dice-detective" element={<DiceDetectivePage />} />
        <Route path="/guess-the-phone" element={<GuessThePhonePage />} />
        <Route path="/hack-the-password" element={<HackThePasswordPage />} />
        <Route path="/pattern-lock-hacker" element={<PatternLockHackerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
