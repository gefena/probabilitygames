import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import cardDrawQuestions from '../quizzes/cardDraw'

const SUITS = ['hearts', 'diamonds', 'clubs', 'spades']
const SUIT_SYMBOLS = { hearts: '♥', diamonds: '♦', clubs: '♣', spades: '♠' }
const SUIT_COLORS = { hearts: '#EF4444', diamonds: '#EF4444', clubs: '#1F2937', spades: '#1F2937' }
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

function buildDeck() {
  const deck = []
  for (const suit of SUITS) for (const rank of RANKS) deck.push({ suit, rank, id: `${rank}-${suit}` })
  return deck
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function PlayingCard({ card, faceUp = true, small = false }) {
  const color = card ? SUIT_COLORS[card.suit] : '#1F2937'
  const symbol = card ? SUIT_SYMBOLS[card.suit] : ''
  const size = small ? 'w-10 h-14 text-xs' : 'w-20 h-28 text-base'
  return (
    <div className={`${size} rounded-xl border-2 flex flex-col items-center justify-center font-extrabold select-none shadow-md`}
      style={{ background: faceUp ? 'white' : 'linear-gradient(135deg,#7C3AED,#3B82F6)', borderColor: faceUp ? '#E5E7EB' : 'transparent', color }}>
      {faceUp && card ? (
        <>
          <span>{card.rank}</span>
          <span style={{ fontSize: small ? 14 : 24 }}>{symbol}</span>
        </>
      ) : (
        <span style={{ color: 'white', fontSize: small ? 14 : 22 }}>🎴</span>
      )}
    </div>
  )
}

export default function CardDrawPage() {
  const { t } = useTranslation()
  const [deck, setDeck] = useState(() => shuffle(buildDeck()))
  const [drawn, setDrawn] = useState([])
  const [selectedRank, setSelectedRank] = useState('A')
  const [explanation, setExplanation] = useState(null)
  const [animKey, setAnimKey] = useState(0)
  // For the explainer before/after comparison
  const [explainerData, setExplainerData] = useState(null)

  const remaining = deck.length
  const isEmpty = remaining === 0

  const draw = useCallback(() => {
    if (isEmpty) return
    const [card, ...rest] = deck

    // Capture suit count BEFORE removing the card
    const prevCount = deck.length
    const prevSuitCount = deck.filter(c => c.suit === card.suit).length
    const prevProb = prevCount > 0 ? ((prevSuitCount / prevCount) * 100).toFixed(1) : '0.0'

    setDeck(rest)
    setDrawn(d => [card, ...d])
    setAnimKey(k => k + 1)

    // Existing explanation bubble
    const newRemaining = rest.length
    const suitCountAfter = rest.filter(c => c.suit === card.suit).length
    const prob = newRemaining > 0 ? ((suitCountAfter / newRemaining) * 100).toFixed(1) : '0.0'
    setExplanation({ card, suitCount: suitCountAfter, prob, newRemaining })

    // Explainer panel before/after data
    const newProb = parseFloat(prob)
    const oldProb = parseFloat(prevProb)
    const direction = newProb < oldProb ? 'down' : newProb > oldProb ? 'up' : 'same'
    setExplainerData({
      card,
      suit: card.suit,
      prevCount,
      prevSuitCount,
      prevProb,
      newCount: newRemaining,
      newSuitCount: suitCountAfter,
      newProb: prob,
      direction,
    })
  }, [deck, isEmpty])

  function reset() {
    setDeck(shuffle(buildDeck()))
    setDrawn([])
    setExplanation(null)
    setExplainerData(null)
    setAnimKey(0)
  }

  // Suit probabilities from remaining deck
  const suitProbs = SUITS.map(s => {
    const cnt = deck.filter(c => c.suit === s).length
    return { suit: s, count: cnt, prob: remaining > 0 ? ((cnt / remaining) * 100).toFixed(1) : '0.0' }
  })

  // Rank probability
  const rankCount = deck.filter(c => c.rank === selectedRank).length
  const rankProb = remaining > 0 ? ((rankCount / remaining) * 100).toFixed(1) : '0.0'

  // Direction indicator for explainer
  const directionIndicator = explainerData
    ? explainerData.direction === 'down'
      ? <span className="text-orange-500 font-extrabold text-lg">↓</span>
      : explainerData.direction === 'up'
        ? <span className="text-blue-500 font-extrabold text-lg">↑</span>
        : <span className="text-gray-400 font-extrabold text-lg">→</span>
    : null

  return (
    <GamePageLayout title={t('home.games.cards.title')} emoji="🃏">
      <p className="text-gray-500 mb-6 text-sm">{t('cards.instructions')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Deck + draw */}
        <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col items-center gap-4">
          <div className="relative">
            {[2, 1, 0].map(i => (
              <div key={i} className="absolute" style={{ top: -i * 2, left: i * 2 }}>
                <PlayingCard card={null} faceUp={false} />
              </div>
            ))}
            <div style={{ opacity: isEmpty ? 0.3 : 1 }}>
              <PlayingCard card={null} faceUp={false} />
            </div>
          </div>
          <p className="font-bold text-gray-500 text-sm mt-8">{remaining} {t('cards.remaining')}</p>

          {drawn[0] && (
            <AnimatePresence mode="wait">
              <motion.div
                key={animKey}
                initial={{ x: -40, opacity: 0, rotateY: 90 }}
                animate={{ x: 0, opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.4 }}
              >
                <PlayingCard card={drawn[0]} faceUp />
              </motion.div>
            </AnimatePresence>
          )}

          <div className="flex gap-3">
            <button
              onClick={draw}
              disabled={isEmpty}
              className="px-6 py-3 bg-blue-500 text-white font-extrabold rounded-2xl shadow-md hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50"
            >
              {t('cards.draw')}
            </button>
            <button onClick={reset} className="px-5 py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200">
              {t('cards.reset')}
            </button>
          </div>
          {isEmpty && <p className="text-pink-600 font-bold text-sm text-center">{t('cards.deckEmpty')}</p>}
        </div>

        {/* Probability panels */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm">
            <h3 className="font-extrabold text-gray-700 mb-3">{t('cards.suits')}</h3>
            <div className="grid grid-cols-2 gap-2">
              {suitProbs.map(sp => (
                <div key={sp.suit} className="flex items-center gap-2 text-sm">
                  <span style={{ color: SUIT_COLORS[sp.suit] }} className="text-xl">{SUIT_SYMBOLS[sp.suit]}</span>
                  <span className="text-gray-600">{t(`cards.suits_display.${sp.suit}`)}</span>
                  <span className="ms-auto font-bold text-gray-700">{sp.count}/{remaining} <span className="text-gray-400">({sp.prob}%)</span></span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm">
            <h3 className="font-extrabold text-gray-700 mb-3">{t('cards.rankPanel')}</h3>
            <div className="flex items-center gap-3">
              <select
                value={selectedRank}
                onChange={e => setSelectedRank(e.target.value)}
                className="px-3 py-2 rounded-xl border-2 border-blue-200 text-blue-700 font-semibold bg-white focus:outline-none focus:border-blue-500"
              >
                {RANKS.map(r => <option key={r} value={r}>{t(`cards.ranks.${r}`)}</option>)}
              </select>
              <span className="font-bold text-gray-700">{rankCount}/{remaining}</span>
              <span className="text-blue-600 font-extrabold">{rankProb}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Existing explanation bubble */}
      {explanation && (
        <motion.div
          key={animKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 rounded-2xl p-4 mb-6 text-blue-800 font-semibold text-sm"
        >
          {t('cards.explanation', {
            card: `${explanation.card.rank}${SUIT_SYMBOLS[explanation.card.suit]}`,
            are: explanation.suitCount === 1 ? 'is' : 'are',
            count: explanation.suitCount,
            suit: t(`cards.suits_display.${explanation.card.suit}`),
            remaining: explanation.newRemaining,
            prob: explanation.prob,
          })}
        </motion.div>
      )}

      {/* Explainer panel */}
      <ExplainerPanel
        accentColor="border-blue-400"
        title={t('explainer.cards.title')}
        body={t('explainer.cards.body')}
        example={
          !explainerData
            ? t('explainer.cards.prompt')
            : (
              <div className="space-y-1">
                <div className="text-gray-600">
                  {t('explainer.cards.before', {
                    prevCount: explainerData.prevCount,
                    prevSuitCount: explainerData.prevSuitCount,
                    suit: t(`cards.suits_display.${explainerData.suit}`),
                    prevProb: explainerData.prevProb,
                  })}
                </div>
                <div className="flex items-center gap-2 ps-2">
                  {directionIndicator}
                </div>
                <div className="font-semibold text-gray-800">
                  {t('explainer.cards.after', {
                    card: `${explainerData.card.rank}${SUIT_SYMBOLS[explainerData.suit]}`,
                    newCount: explainerData.newCount,
                    newSuitCount: explainerData.newSuitCount,
                    suit: t(`cards.suits_display.${explainerData.suit}`),
                    newProb: explainerData.newProb,
                  })}
                </div>
              </div>
            )
        }
        callout={t('explainer.cards.callout')}
        furtherReading={t('explainer.cards.furtherReading')}
      />

      <QuizPanel questions={cardDrawQuestions} accentColor="border-blue-400" />

      {/* Drawn history */}
      {drawn.length > 0 && (
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <h3 className="font-extrabold text-gray-700 mb-3">{t('cards.drawnHistory')} ({drawn.length})</h3>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
            {drawn.map((card, i) => (
              <PlayingCard key={i} card={card} faceUp small />
            ))}
          </div>
        </div>
      )}
    </GamePageLayout>
  )
}
