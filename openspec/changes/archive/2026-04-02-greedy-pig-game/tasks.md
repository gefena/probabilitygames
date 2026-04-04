## 1. i18n keys (en.json)

- [x] 1.1 Add `greedyPig` namespace: `title`, `emoji`, `subtitle`, `howToPlay`, `targetLabel`, `yourScore`, `botScore`, `turnTotal`, `turnTotalHint`, `rollBtn`, `bankBtn`, `playerTurn`, `botTurn`, `botThinking`, `botRolling`, `bust`, `playerBust`, `botBust`, `banked`, `botBanked`, `win`, `lose`, `playAgain`, `attempts`
- [x] 1.2 Add bot reaction keys: `greedyPig.botReaction.lucky`, `greedyPig.botReaction.close`, `greedyPig.botReaction.bust`, `greedyPig.botReaction.bank`
- [x] 1.3 Add `greedyPig.explainer.*`: `title`, `body`, `example`, `callout`, `furtherReading`
- [x] 1.4 Add `greedyPig.simulator.*`: `title`, `lockedHint`, `simulate100`, `simulate1000`, `simulate10000`, `resultsLabel`, `strategyLabel`, `winRateLabel`
- [x] 1.5 Add `quiz.greedyPig.q1/q2/q3` — 3 questions about expected value and optimal stopping
- [x] 1.6 Add home page card key: `home.greedyPig.desc`

## 2. Hebrew translations (he.json)

- [x] 2.1 Translate all `greedyPig.*` keys to Hebrew
- [x] 2.2 Translate `home.greedyPig.desc` to Hebrew

## 3. Quiz file

- [x] 3.1 Create `src/quizzes/greedyPig.js` — export array of 3 quiz question objects referencing `quiz.greedyPig.q*` i18n keys

## 4. Die face component

- [x] 4.1 Create a `DieFace` component (inline in GreedyPigPage or separate) that renders pip patterns 1–6 as a small grid using Tailwind; value 1 renders in red; Framer Motion shake animation on each new roll

## 5. GreedyPigPage — core game loop

- [x] 5.1 Create `src/pages/GreedyPigPage.jsx` with phase state machine (`player_turn`, `player_bust`, `bot_turn_start`, `bot_rolling`, `bot_bust`, `bot_banking`, `game_over`), score state, turn total state
- [x] 5.2 Add target preset buttons [30, 50, 75, 100] (default 50); changing target resets game and recalculates `botThreshold = Math.round(target * 0.35)`
- [x] 5.3 Implement player turn: Roll button (roll die → accumulate or bust), Bank button (add turn total to score, hand off to bot); buttons disabled when not `player_turn`
- [x] 5.4 Implement bust handling: brief red flash on die + turn total animates to 0, then transition to bot turn
- [x] 5.5 Implement live bot turn: `setTimeout` chain — `bot_turn_start` (600ms pause) → `bot_rolling` (animate roll, 700ms deliberation pause) → loop if below threshold, bank if at/above, bust if 1
- [x] 5.6 Add bot micro-reaction status line (lucky roll / close call / bust / bank) using i18n keys
- [x] 5.7 Add score display (both scores always visible), turn total display (prominent, styled as "at risk"), win/lose detection and `game_over` state with Play Again

## 6. Simulator

- [x] 6.1 Implement simulator unlock gate: `gamesPlayed >= 1`
- [x] 6.2 Implement `runSimulation(n, bankAt, target)` — pure function, returns win count for player banking at `bankAt` over `n` games (bot uses threshold = Math.round(target * 0.35))
- [x] 6.3 Add simulator UI: buttons for 100 / 1000 / 10000 games; run all 5 strategies (bank at 10/15/20/25/30); display results as Recharts BarChart with highest bar highlighted

## 7. Routing and home page

- [x] 7.1 Add import and route `/greedy-pig` in `src/App.jsx`
- [x] 7.2 Add Greedy Pig card to the "Explore More" section in `src/pages/HomePage.jsx`

## 8. ExplainerPanel and QuizPanel

- [x] 8.1 Add `ExplainerPanel` with `furtherReading` prop (expected value / optimal stopping) and `QuizPanel` to GreedyPigPage

## 9. Verify

- [x] 9.1 Run `npm run lint` — 0 errors
- [x] 9.2 Run `npm run build` — clean build
