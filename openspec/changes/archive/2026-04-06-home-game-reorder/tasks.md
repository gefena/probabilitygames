## 1. i18n — English

- [x] 1.1 Add `home.tiers.beatTheBot.title` = "Beat the Bot" and `home.tiers.beatTheBot.tagline` = "Pick your strategy. Outsmart the machine." to `en.json`
- [x] 1.2 Add `home.tiers.testYourWits.title` = "Test Your Wits" and `home.tiers.testYourWits.tagline` = "Think fast. Decide smart. Beat the odds." to `en.json`
- [x] 1.3 Add `home.tiers.fromChaosToOrder.title` = "From Chaos to Order" and `home.tiers.fromChaosToOrder.tagline` = "Watch randomness become pattern." to `en.json`

## 2. i18n — Hebrew

- [x] 2.1 Add `home.tiers.beatTheBot.title` and `home.tiers.beatTheBot.tagline` in Hebrew to `he.json`
- [x] 2.2 Add `home.tiers.testYourWits.title` and `home.tiers.testYourWits.tagline` in Hebrew to `he.json`
- [x] 2.3 Add `home.tiers.fromChaosToOrder.title` and `home.tiers.fromChaosToOrder.tagline` in Hebrew to `he.json`

## 3. HomePage TIERS array

- [x] 3.1 Replace the `TIERS` array in `HomePage.jsx` with four new tiers in this order: `beatTheBot`, `crackTheCode`, `testYourWits`, `fromChaosToOrder`
- [x] 3.2 **Tier 1 — beatTheBot**: light background, `text-emerald-500` accent, `titleKey: 'home.tiers.beatTheBot.title'`, `taglineKey: 'home.tiers.beatTheBot.tagline'`, games: bridge-quest, climber-race, greedy-pig, remove-one, probability-bingo
- [x] 3.3 **Tier 2 — crackTheCode**: keep existing dark `bg-slate-800`, `text-rose-400` accent, games unchanged (guess-the-phone, hack-the-password, pattern-lock-hacker); `titleKey` stays `'home.crackTheCode.title'` and `taglineKey` stays `'home.crackTheCode.tagline'` — do NOT change these paths
- [x] 3.4 **Tier 3 — testYourWits**: light background, `text-indigo-500` accent, `titleKey: 'home.tiers.testYourWits.title'`, `taglineKey: 'home.tiers.testYourWits.tagline'`, games: higher-or-lower, dice-detective, monty-hall, mystery-machine, house-always-wins, prize-machine
- [x] 3.5 **Tier 4 — fromChaosToOrder**: dark `bg-slate-900`, `text-indigo-400` accent, `titleKey: 'home.tiers.fromChaosToOrder.title'`, `taglineKey: 'home.tiers.fromChaosToOrder.tagline'`, games: coin-flip, dice, candy-jar, spinner, card-draw, roll-and-race, pizza-builder, lucky-combo, galton-board, random-walk, monte-carlo-pi, birthday-room
