## 1. i18n keys

- [ ] 1.1 Add `removeOne.*` namespace to `en.json`: `title`, `emoji`, `subtitle`, `howToPlay`, `tokensLabel`, `tokensReady`, `rollBtn`, `yourBoard`, `larry`, `max`, `larryHint`, `maxHint`, `rollResult`, `win`, `lose`, `tie`, `playAgain`
- [ ] 1.2 Add `removeOne.explainer.*`: `title`, `body`, `example`, `callout`, `furtherReading`
- [ ] 1.3 Add `removeOne.simulator.*`: `title`, `lockedHint`, `sim100`, `sim500`, `sim1000`, `resultsLabel`, `winRateLabel`
- [ ] 1.4 Add `quiz.removeOne.q1/q2/q3` — questions about optimal placement, why even spread loses, expected rolls to clear
- [ ] 1.5 Add `home.games.removeOne.title` and `home.games.removeOne.desc`
- [x] 1.6 Translate all above keys to Hebrew in `he.json`

## 2. Quiz file

- [x] 2.1 Create `src/quizzes/removeOne.js` — export array of 3 quiz question objects referencing `quiz.removeOne.q*` keys

## 3. RemoveOnePage

- [x] 3.1 Create `src/pages/RemoveOnePage.jsx` with phase state machine (`placing`, `rolling`, `finished`), `playerTokens` state `{ 2:0 … 12:0 }`, `larryBoard` and `maxBoard` state (named distinct from `larryTokens()`/`maxTokens()` pure functions), `isRolling` boolean, `lastPlacement` ref saved on Roll press for simulator
- [x] 3.2 Implement placement UI: 11 rows (sums 2–12), each with − button, dot display (filled circles), + button; running total banner; Roll button disabled until total === 18
- [x] 3.3 Implement `larryTokens()` and `maxTokens()` pure functions returning fixed distributions summing to 18; show bot boards as read-only during placement phase
- [x] 3.4 Implement two pip-pattern dice (same PIP_LAYOUTS pattern), shake animation, sum display below
- [x] 3.5 Implement roll mechanic: player taps Roll button → dice shake → highlight matching row → compute new boards inline → check win synchronously → enable Roll again; use `isRolling` boolean to guard against double-taps during animation
- [x] 3.6 Add win/lose/tie reveal panel with Play Again button; Play Again resets to placing phase
- [x] 3.7 Implement `runSimulation(n, yourTokens)` pure function comparing three strategies; add simulator UI with 100/500/1000 buttons; Recharts BarChart with player's bar highlighted; lock until `gamesPlayed >= 1`
- [x] 3.8 Add `ExplainerPanel` and `QuizPanel`

## 4. Routing and home page

- [x] 4.1 Add import and route `/remove-one` in `src/App.jsx`
- [x] 4.2 Add Remove One entry to `goDeeper` tier in `src/pages/HomePage.jsx` TIERS array, after Roll & Race

## 5. Verify

- [x] 5.1 Run `npm run lint` — 0 errors
- [x] 5.2 Run `npm run build` — clean build
