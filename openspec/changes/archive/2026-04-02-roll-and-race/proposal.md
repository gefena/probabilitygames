## Why

The site already teaches two-dice probability analytically through `LuckyDicePage` (roll, see the sum, watch a bar chart build). But children learn through narrative — not charts. Roll & Race reframes the exact same triangular distribution as a race: 11 cars (one per possible sum, 2–12) compete on a track, advancing one step each time their number comes up. A child who bets on car 12 and watches it sit motionless for 30 rolls while car 7 laps the field absorbs the lesson in their gut, without being taught anything.

## What Changes

- New page `RollAndRacePage` at route `/roll-and-race`
- Player picks one car (sum 2–12) before the race; all 11 cars race simultaneously
- Two animated dice roll on each turn; the car whose number matches the sum advances one step
- Track length configurable: [5, 10, 15] steps, default 10
- Roll button (manual, one at a time) + Auto-finish button (completes the race at speed)
- Win/lose reveal when first car crosses the finish line
- Simulator unlocked after first completed race: run 100/500/1000 races, see win counts per car as a bar chart
- New card added to the "Go Deeper" tier on the home page
- Full EN + HE i18n, quiz, explainer

## Capabilities

### New Capabilities
- `roll-and-race-game`: Two-dice race game where all 11 sum-cars compete and the player bets on one

### Modified Capabilities
- `site-shell`: New route `/roll-and-race` and home page card in Go Deeper tier
- `home-page-tiers`: Roll & Race added to Go Deeper tier

## Impact

- `src/pages/RollAndRacePage.jsx` — new page
- `src/App.jsx` — new route
- `src/pages/HomePage.jsx` — one new entry in the `goDeeper` tier of the `TIERS` array
- `src/i18n/en.json` and `he.json` — new `rollAndRace.*` namespace + quiz keys
- `src/quizzes/rollAndRace.js` — new quiz file
- No new dependencies (reuses Recharts, Framer Motion, existing `DieFace`-style pattern)
