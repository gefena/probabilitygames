import { Routes, Route } from 'react-router-dom'
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

export default function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])

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
      </Route>
    </Routes>
  )
}
