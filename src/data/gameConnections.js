// Hand-curated map of game ID → 1-2 related game suggestions.
// Each entry: { to, emoji, titleKey, reasonKey }
// reasonKey references `suggestions.<from>.<index>` in i18n

const gameConnections = {
  'coin-flip': [
    { to: '/galton-board',  emoji: '🟣', titleKey: 'common.games.galton-board',  reasonKey: 'suggestions.coinFlip.0' },
    { to: '/dice',    emoji: '🎲', titleKey: 'common.games.dice',    reasonKey: 'suggestions.coinFlip.1' },
  ],
  'dice': [
    { to: '/higher-or-lower', emoji: '🎲', titleKey: 'common.games.higher-or-lower', reasonKey: 'suggestions.dice.0' },
    { to: '/dice-detective',  emoji: '🔍', titleKey: 'common.games.dice-detective',  reasonKey: 'suggestions.dice.1' },
  ],
  'candy-jar': [
    { to: '/card-draw',    emoji: '🃏', titleKey: 'common.games.card-draw',    reasonKey: 'suggestions.candyJar.0' },
    { to: '/remove-one',   emoji: '🎯', titleKey: 'common.games.remove-one',   reasonKey: 'suggestions.candyJar.1' },
  ],
  'spinner': [
    { to: '/dice',        emoji: '🎲', titleKey: 'common.games.dice',        reasonKey: 'suggestions.spinner.0' },
    { to: '/candy-jar',   emoji: '🍬', titleKey: 'common.games.candy-jar',   reasonKey: 'suggestions.spinner.1' },
  ],
  'higher-or-lower': [
    { to: '/card-draw',     emoji: '🃏', titleKey: 'common.games.card-draw',     reasonKey: 'suggestions.higherOrLower.0' },
    { to: '/bridge-quest',  emoji: '🌉', titleKey: 'common.games.bridge-quest',  reasonKey: 'suggestions.higherOrLower.1' },
  ],
  'card-draw': [
    { to: '/higher-or-lower', emoji: '🎲', titleKey: 'common.games.higher-or-lower', reasonKey: 'suggestions.cardDraw.0' },
    { to: '/remove-one',      emoji: '🎯', titleKey: 'common.games.remove-one',      reasonKey: 'suggestions.cardDraw.1' },
  ],
  'dice-detective': [
    { to: '/probability-bingo', emoji: '🎱', titleKey: 'common.games.probability-bingo', reasonKey: 'suggestions.diceDetective.0' },
    { to: '/lucky-dice',        emoji: '🎲', titleKey: 'common.games.lucky-dice',         reasonKey: 'suggestions.diceDetective.1' },
  ],
  'probability-bingo': [
    { to: '/dice-detective', emoji: '🔍', titleKey: 'common.games.dice-detective', reasonKey: 'suggestions.probabilityBingo.0' },
    { to: '/roll-and-race',  emoji: '🏎️', titleKey: 'common.games.roll-and-race',  reasonKey: 'suggestions.probabilityBingo.1' },
  ],
  'greedy-pig': [
    { to: '/bridge-quest', emoji: '🌉', titleKey: 'common.games.bridge-quest', reasonKey: 'suggestions.greedyPig.0' },
    { to: '/climber-race', emoji: '🧗', titleKey: 'common.games.climber-race', reasonKey: 'suggestions.greedyPig.1' },
  ],
  'bridge-quest': [
    { to: '/greedy-pig',   emoji: '🐷', titleKey: 'common.games.greedy-pig',   reasonKey: 'suggestions.bridgeQuest.0' },
    { to: '/monty-hall',   emoji: '🚪', titleKey: 'common.games.monty-hall',   reasonKey: 'suggestions.bridgeQuest.1' },
  ],
  'galton-board': [
    { to: '/coin-flip',    emoji: '🪙', titleKey: 'common.games.coin-flip',    reasonKey: 'suggestions.galtonBoard.0' },
    { to: '/random-walk',  emoji: '🚶', titleKey: 'common.games.random-walk',  reasonKey: 'suggestions.galtonBoard.1' },
  ],
  'random-walk': [
    { to: '/galton-board',   emoji: '🟣', titleKey: 'common.games.galton-board',   reasonKey: 'suggestions.randomWalk.0' },
    { to: '/monte-carlo-pi', emoji: '🎯', titleKey: 'common.games.monte-carlo-pi', reasonKey: 'suggestions.randomWalk.1' },
  ],
  'monty-hall': [
    { to: '/bridge-quest', emoji: '🌉', titleKey: 'common.games.bridge-quest', reasonKey: 'suggestions.montyHall.0' },
    { to: '/birthday-room',emoji: '🎂', titleKey: 'common.games.birthday-room',reasonKey: 'suggestions.montyHall.1' },
  ],
  'birthday-room': [
    { to: '/monty-hall',     emoji: '🚪', titleKey: 'common.games.monty-hall',     reasonKey: 'suggestions.birthdayRoom.0' },
    { to: '/monte-carlo-pi', emoji: '🎯', titleKey: 'common.games.monte-carlo-pi', reasonKey: 'suggestions.birthdayRoom.1' },
  ],
  'monte-carlo-pi': [
    { to: '/random-walk',  emoji: '🚶', titleKey: 'common.games.random-walk',  reasonKey: 'suggestions.monteCarloPi.0' },
    { to: '/galton-board', emoji: '🟣', titleKey: 'common.games.galton-board', reasonKey: 'suggestions.monteCarloPi.1' },
  ],
  'roll-and-race': [
    { to: '/probability-bingo', emoji: '🎱', titleKey: 'common.games.probability-bingo', reasonKey: 'suggestions.rollAndRace.0' },
    { to: '/dice-detective',    emoji: '🔍', titleKey: 'common.games.dice-detective',    reasonKey: 'suggestions.rollAndRace.1' },
  ],
  'climber-race': [
    { to: '/greedy-pig',   emoji: '🐷', titleKey: 'common.games.greedy-pig',   reasonKey: 'suggestions.climberRace.0' },
    { to: '/bridge-quest', emoji: '🌉', titleKey: 'common.games.bridge-quest', reasonKey: 'suggestions.climberRace.1' },
  ],
  'remove-one': [
    { to: '/candy-jar', emoji: '🍬', titleKey: 'common.games.candy-jar', reasonKey: 'suggestions.removeOne.0' },
    { to: '/card-draw', emoji: '🃏', titleKey: 'common.games.card-draw', reasonKey: 'suggestions.removeOne.1' },
  ],
  'pizza-builder': [
    { to: '/lucky-combo', emoji: '🔗', titleKey: 'common.games.lucky-combo', reasonKey: 'suggestions.pizzaBuilder.0' },
    { to: '/candy-jar',   emoji: '🍬', titleKey: 'common.games.candy-jar',   reasonKey: 'suggestions.pizzaBuilder.1' },
  ],
  'lucky-combo': [
    { to: '/pizza-builder',    emoji: '🍕', titleKey: 'common.games.pizza-builder',    reasonKey: 'suggestions.luckyCombo.0' },
    { to: '/hack-the-password',emoji: '🔐', titleKey: 'common.games.hack-the-password',reasonKey: 'suggestions.luckyCombo.1' },
  ],
  'house-always-wins': [
    { to: '/prize-machine', emoji: '🎰', titleKey: 'common.games.prize-machine', reasonKey: 'suggestions.houseAlwaysWins.0' },
    { to: '/greedy-pig',    emoji: '🐷', titleKey: 'common.games.greedy-pig',    reasonKey: 'suggestions.houseAlwaysWins.1' },
  ],
  'prize-machine': [
    { to: '/house-always-wins', emoji: '🏦', titleKey: 'common.games.house-always-wins', reasonKey: 'suggestions.prizeMachine.0' },
    { to: '/lucky-combo',       emoji: '🔗', titleKey: 'common.games.lucky-combo',       reasonKey: 'suggestions.prizeMachine.1' },
  ],
  'guess-the-phone': [
    { to: '/hack-the-password', emoji: '🔐', titleKey: 'common.games.hack-the-password', reasonKey: 'suggestions.guessThePhone.0' },
    { to: '/lucky-combo',       emoji: '🔗', titleKey: 'common.games.lucky-combo',       reasonKey: 'suggestions.guessThePhone.1' },
  ],
  'hack-the-password': [
    { to: '/guess-the-phone', emoji: '📱', titleKey: 'common.games.guess-the-phone', reasonKey: 'suggestions.hackThePassword.0' },
    { to: '/lucky-combo',     emoji: '🔗', titleKey: 'common.games.lucky-combo',     reasonKey: 'suggestions.hackThePassword.1' },
  ],
  'mystery-machine': [
    { to: '/lucky-dice',     emoji: '🎲', titleKey: 'common.games.lucky-dice',     reasonKey: 'suggestions.mysteryMachine.0' },
    { to: '/dice-detective', emoji: '🔍', titleKey: 'common.games.dice-detective', reasonKey: 'suggestions.mysteryMachine.1' },
  ],
}

export default gameConnections
