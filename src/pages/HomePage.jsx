import { useTranslation } from 'react-i18next'
import GameCard from '../components/GameCard'

const TIERS = [
  {
    key: 'beatTheBot',
    titleKey: 'home.tiers.beatTheBot.title',
    taglineKey: 'home.tiers.beatTheBot.tagline',
    accent: 'text-emerald-500',
    games: [
      { to: '/bridge-quest',      emoji: '🌉', color: 'bg-blue-500',    titleKey: 'common.games.bridge-quest',       descKey: 'home.games.bridgeQuest.desc'      },
      { to: '/climber-race',      emoji: '🧗', color: 'bg-violet-500',  titleKey: 'common.games.climber-race',       descKey: 'home.games.climberRace.desc'      },
      { to: '/greedy-pig',        emoji: '🐷', color: 'bg-orange-500',  titleKey: 'common.games.greedy-pig',         descKey: 'home.greedyPig.desc'              },
      { to: '/remove-one',        emoji: '🎯', color: 'bg-emerald-600', titleKey: 'common.games.remove-one',         descKey: 'home.games.removeOne.desc'        },
      { to: '/roll-and-race',     emoji: '🏎️', color: 'bg-red-500',    titleKey: 'common.games.roll-and-race',      descKey: 'home.games.rollAndRace.desc'      },
      { to: '/probability-bingo', emoji: '🎱', color: 'bg-violet-600',  titleKey: 'common.games.probability-bingo',  descKey: 'home.games.probabilityBingo.desc' },
    ],
  },
  {
    key: 'crackTheCode',
    titleKey: 'home.crackTheCode.title',
    taglineKey: 'home.crackTheCode.tagline',
    accent: 'text-rose-400',
    dark: 'bg-slate-800',
    games: [
      { to: '/guess-the-phone',    emoji: '📱', color: 'bg-violet-600', titleKey: 'common.games.guess-the-phone',    descKey: 'home.crackTheCode.guessPhone.desc'  },
      { to: '/hack-the-password',  emoji: '🔐', color: 'bg-rose-600',   titleKey: 'common.games.hack-the-password',  descKey: 'home.crackTheCode.hackPassword.desc' },
      { to: '/pattern-lock-hacker',emoji: '🔒', color: 'bg-slate-600',  titleKey: 'common.games.pattern-lock-hacker',descKey: 'home.crackTheCode.patternLock.desc' },
    ],
  },
  {
    key: 'testYourWits',
    titleKey: 'home.tiers.testYourWits.title',
    taglineKey: 'home.tiers.testYourWits.tagline',
    accent: 'text-indigo-500',
    games: [
      { to: '/higher-or-lower', emoji: '🎲', color: 'bg-indigo-600', titleKey: 'common.games.higher-or-lower', descKey: 'home.games.higherOrLower.desc'  },
      { to: '/dice-detective',  emoji: '🔍', color: 'bg-violet-600', titleKey: 'common.games.dice-detective',  descKey: 'home.games.diceDetective.desc'  },
      { to: '/monty-hall',      emoji: '🚪', color: 'bg-amber-500',  titleKey: 'common.games.monty-hall',      descKey: 'home.patternsInChaos.montyHall.desc' },
      { to: '/mystery-machine', emoji: '🔍', color: 'bg-indigo-500', titleKey: 'common.games.mystery-machine', descKey: 'home.mysteryMachine.desc'            },
      { to: '/house-always-wins',emoji: '🏦', color: 'bg-red-500',   titleKey: 'common.games.house-always-wins',descKey: 'home.houseAlwaysWins.desc'          },
      { to: '/prize-machine',   emoji: '🎰', color: 'bg-amber-500',  titleKey: 'common.games.prize-machine',   descKey: 'home.prizeMachine.desc'             },
    ],
  },
  {
    key: 'fromChaosToOrder',
    titleKey: 'home.tiers.fromChaosToOrder.title',
    taglineKey: 'home.tiers.fromChaosToOrder.tagline',
    accent: 'text-indigo-400',
    dark: 'bg-slate-900',
    games: [
      { to: '/coin-flip',      emoji: '🪙', color: 'bg-violet-500', titleKey: 'common.games.coin-flip',      descKey: 'home.games.coinFlip.desc'              },
      { to: '/dice',           emoji: '🎲', color: 'bg-orange-400', titleKey: 'common.games.dice',           descKey: 'home.games.dice.desc'                  },
      { to: '/candy-jar',      emoji: '🍬', color: 'bg-pink-500',   titleKey: 'common.games.candy-jar',      descKey: 'home.games.candy.desc'                 },
      { to: '/spinner',        emoji: '🎡', color: 'bg-emerald-500',titleKey: 'common.games.spinner',        descKey: 'home.games.spinner.desc'               },
      { to: '/card-draw',      emoji: '🃏', color: 'bg-blue-500',   titleKey: 'common.games.card-draw',      descKey: 'home.games.cards.desc'                 },
      { to: '/pizza-builder',  emoji: '🍕', color: 'bg-orange-500', titleKey: 'common.games.pizza-builder',  descKey: 'home.games.pizzaBuilder.desc'          },
      { to: '/lucky-combo',    emoji: '🔗', color: 'bg-teal-500',   titleKey: 'common.games.lucky-combo',    descKey: 'home.luckyCombo.desc'                  },
      { to: '/galton-board',   emoji: '🟣', color: 'bg-violet-600', titleKey: 'common.games.galton-board',   descKey: 'home.patternsInChaos.galtonBoard.desc' },
      { to: '/random-walk',    emoji: '🚶', color: 'bg-cyan-500',   titleKey: 'common.games.random-walk',    descKey: 'home.patternsInChaos.randomWalk.desc'  },
      { to: '/monte-carlo-pi', emoji: '🎯', color: 'bg-rose-500',   titleKey: 'common.games.monte-carlo-pi', descKey: 'home.patternsInChaos.monteCarloPi.desc'},
      { to: '/birthday-room',  emoji: '🎂', color: 'bg-pink-500',   titleKey: 'common.games.birthday-room',  descKey: 'home.birthdayRoom.desc'                },
    ],
  },
]

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-14">
      <div className="flex justify-center">
        <div className="bg-white/70 border border-violet-100 rounded-2xl px-6 py-4 text-center shadow-sm max-w-md">
          <div className="text-2xl mb-1">🎲 🪙 🎯</div>
          <p className="text-lg text-violet-600 font-semibold">{t('home.subtitle')}</p>
        </div>
      </div>

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
