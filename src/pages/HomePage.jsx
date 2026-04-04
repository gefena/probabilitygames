import { useTranslation } from 'react-i18next'
import GameCard from '../components/GameCard'

const TIERS = [
  {
    key: 'startHere',
    titleKey: 'home.tiers.startHere.title',
    taglineKey: 'home.tiers.startHere.tagline',
    accent: 'text-violet-600',
    games: [
      { to: '/coin-flip',       emoji: '🪙', color: 'bg-violet-500', titleKey: 'home.games.coinFlip.title',      descKey: 'home.games.coinFlip.desc'      },
      { to: '/dice',            emoji: '🎲', color: 'bg-orange-400', titleKey: 'home.games.dice.title',          descKey: 'home.games.dice.desc'          },
      { to: '/candy-jar',       emoji: '🍬', color: 'bg-pink-500',   titleKey: 'home.games.candy.title',         descKey: 'home.games.candy.desc'         },
      { to: '/spinner',         emoji: '🎡', color: 'bg-emerald-500',titleKey: 'home.games.spinner.title',       descKey: 'home.games.spinner.desc'       },
      { to: '/higher-or-lower', emoji: '🎲', color: 'bg-indigo-600', titleKey: 'home.games.higherOrLower.title', descKey: 'home.games.higherOrLower.desc' },
      { to: '/card-draw',       emoji: '🃏', color: 'bg-blue-500',   titleKey: 'home.games.cards.title',         descKey: 'home.games.cards.desc'         },
    ],
  },
  {
    key: 'goDeeper',
    titleKey: 'home.tiers.goDeeper.title',
    taglineKey: 'home.tiers.goDeeper.tagline',
    accent: 'text-orange-500',
    games: [
      { to: '/roll-and-race',     emoji: '🏎️', color: 'bg-red-500',      titleKey: 'home.games.rollAndRace.title',      descKey: 'home.games.rollAndRace.desc'      },
      { to: '/dice-detective',    emoji: '🔍', color: 'bg-violet-600',  titleKey: 'home.games.diceDetective.title',    descKey: 'home.games.diceDetective.desc'    },
      { to: '/pizza-builder',     emoji: '🍕', color: 'bg-orange-500',  titleKey: 'home.games.pizzaBuilder.title',     descKey: 'home.games.pizzaBuilder.desc'     },
      { to: '/remove-one',        emoji: '🎯', color: 'bg-emerald-600', titleKey: 'home.games.removeOne.title',        descKey: 'home.games.removeOne.desc'        },
      { to: '/probability-bingo', emoji: '🎱', color: 'bg-violet-600',  titleKey: 'home.games.probabilityBingo.title', descKey: 'home.games.probabilityBingo.desc' },
      { to: '/climber-race',      emoji: '🧗', color: 'bg-violet-500',  titleKey: 'home.games.climberRace.title',      descKey: 'home.games.climberRace.desc'      },
      { to: '/bridge-quest',      emoji: '🌉', color: 'bg-blue-500',    titleKey: 'home.games.bridgeQuest.title',      descKey: 'home.games.bridgeQuest.desc'      },
      { to: '/greedy-pig',        emoji: '🐷', color: 'bg-orange-500',  titleKey: 'greedyPig.title',                   descKey: 'home.greedyPig.desc'               },
      { to: '/lucky-combo',       emoji: '🔗', color: 'bg-teal-500',    titleKey: 'luckyCombo.title',                  descKey: 'home.luckyCombo.desc'              },
      { to: '/house-always-wins', emoji: '🏦', color: 'bg-red-500',      titleKey: 'houseAlwaysWins.title',             descKey: 'home.houseAlwaysWins.desc'         },
      { to: '/prize-machine',     emoji: '🎰', color: 'bg-amber-500',   titleKey: 'prizeMachine.title',                descKey: 'home.prizeMachine.desc'            },
    ],
  },
  {
    key: 'crackTheCode',
    titleKey: 'home.crackTheCode.title',
    taglineKey: 'home.crackTheCode.tagline',
    accent: 'text-rose-400',
    dark: 'bg-slate-800',
    games: [
      { to: '/guess-the-phone',   emoji: '📱', color: 'bg-violet-600', titleKey: 'home.crackTheCode.guessPhone.title',   descKey: 'home.crackTheCode.guessPhone.desc'   },
      { to: '/hack-the-password', emoji: '🔐', color: 'bg-rose-600',   titleKey: 'home.crackTheCode.hackPassword.title', descKey: 'home.crackTheCode.hackPassword.desc' },
    ],
  },
  {
    key: 'patternsInChaos',
    titleKey: 'home.patternsInChaos.title',
    taglineKey: 'home.patternsInChaos.tagline',
    accent: 'text-indigo-400',
    dark: 'bg-slate-900',
    games: [
      { to: '/galton-board',    emoji: '🟣', color: 'bg-violet-600', titleKey: 'home.patternsInChaos.galtonBoard.title',  descKey: 'home.patternsInChaos.galtonBoard.desc'  },
      { to: '/random-walk',     emoji: '🚶', color: 'bg-cyan-500',   titleKey: 'home.patternsInChaos.randomWalk.title',   descKey: 'home.patternsInChaos.randomWalk.desc'   },
      { to: '/monte-carlo-pi',  emoji: '🎯', color: 'bg-rose-500',   titleKey: 'home.patternsInChaos.monteCarloPi.title', descKey: 'home.patternsInChaos.monteCarloPi.desc' },
      { to: '/birthday-room',   emoji: '🎂', color: 'bg-pink-500',   titleKey: 'birthdayRoom.title',                      descKey: 'home.birthdayRoom.desc'                 },
      { to: '/monty-hall',      emoji: '🚪', color: 'bg-amber-500',  titleKey: 'home.patternsInChaos.montyHall.title',    descKey: 'home.patternsInChaos.montyHall.desc'    },
      { to: '/mystery-machine', emoji: '🔍', color: 'bg-indigo-500', titleKey: 'mysteryMachine.title',                    descKey: 'home.mysteryMachine.desc'               },
    ],
  },
]

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-14">
      <p className="text-center text-lg text-violet-600 font-semibold">
        {t('home.subtitle')}
      </p>

      {TIERS.map(tier => (
        <section key={tier.key}>
          {tier.dark ? (
            <div className={`-mx-4 ${tier.dark} rounded-3xl px-6 py-10`}>
              <div className="text-center mb-6">
                <h2 className={`text-2xl font-extrabold ${tier.accent} mb-1`}>
                  {t(tier.titleKey)}
                </h2>
                <p className="text-slate-400 text-sm">{t(tier.taglineKey)}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {tier.games.map(g => (
                  <GameCard
                    key={g.to}
                    to={g.to}
                    emoji={g.emoji}
                    color={g.color}
                    title={t(g.titleKey)}
                    desc={t(g.descKey)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h2 className={`text-2xl font-extrabold ${tier.accent} mb-1`}>
                  {t(tier.titleKey)}
                </h2>
                <p className="text-gray-400 text-sm">{t(tier.taglineKey)}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tier.games.map(g => (
                  <GameCard
                    key={g.to}
                    to={g.to}
                    emoji={g.emoji}
                    color={g.color}
                    title={t(g.titleKey)}
                    desc={t(g.descKey)}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      ))}
    </div>
  )
}
