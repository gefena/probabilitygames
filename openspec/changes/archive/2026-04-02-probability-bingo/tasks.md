## 1. i18n keys

- [x] 1.1 Add `probabilityBingo.*` namespace to `en.json`: `title`, `emoji`, `subtitle`, `howToPlay`, `editBtn`, `doneBtn`, `rollBtn`, `player`, `larry`, `pete`, `larryHint`, `peteHint`, `rollResult`, `bingo`, `win`, `lose`, `tie`, `playAgain`, `pickNumber`, `nearBingo`
- [x] 1.2 Add `probabilityBingo.explainer.*`: `title`, `body`, `example`, `callout`, `furtherReading`
- [x] 1.3 Add `probabilityBingo.simulator.*`: `title`, `lockedHint`, `sim100`, `sim500`, `sim1000`, `resultsLabel`, `winRateLabel`, `larryNote`
- [x] 1.4 Add `quiz.probabilityBingo.q1/q2/q3` — questions about spatial placement, line strategy vs Remove One, and why concentrating high-probability numbers in one line beats spreading
- [x] 1.5 Add `home.games.probabilityBingo.title` and `home.games.probabilityBingo.desc`
- [x] 1.6 Translate all above keys to Hebrew in `he.json`

## 2. Quiz file

- [x] 2.1 Create `src/quizzes/probabilityBingo.js` — export array of 3 quiz question objects referencing `quiz.probabilityBingo.q*` keys

## 3. ProbabilityBingoPage

- [x] 3.1 Create `src/pages/ProbabilityBingoPage.jsx` with phase state machine (`placing`, `rolling`, `finished`), `playerGrid` state (9-element number array), `playerCrossed` / `larryCrossed` / `peteCrossed` state (9-element boolean arrays), `isRolling` boolean, `lastRoll`, `winner`, `gamesPlayed`, `editIndex` (null | 0–8), `lastPlayerGrid` ref
- [x] 3.2 Implement `balancedRandomCard()` pure function (guarantees one of 5/6/7/8/9 per row); `larryGrid()` (pure random 2–12); `peteGrid()` (fixed: [6,7,8,4,5,3,9,9,4]); `LINES` constant (8 winning lines); `checkBingo(crossed)` and `crossMatching(crossed, grid, sum)` pure functions
- [x] 3.3 Implement placing phase UI: 3×3 grid showing `playerGrid` values; Edit Card button toggling edit mode; number picker (2–12 with probability hint bars) opening on square tap; Done button; bot grids shown read-only alongside player's grid
- [x] 3.4 Implement near-bingo highlighting: compute `hotLines(crossed)` (lines with exactly 1 uncrossed square) and apply amber ring to those squares in player's grid during rolling phase
- [x] 3.5 Implement two pip-pattern dice with shake animation (`PIP_LAYOUTS` / `DieFace` pattern), sum display below
- [x] 3.6 Implement roll mechanic: `doRoll()` → shake → after 400ms cross matching squares via `crossMatching` on all three grids inline → `checkBingo` synchronously on new crossed states → set winner (`'player'|'larry'|'pete'|'tie-larry'|'tie-pete'`) → `setPhase('finished')` if bingo; `isRolling` guard against double-tap
- [x] 3.7 Implement finished phase: win/lose/tie message; post-game reveal showing all three 3×3 grids with crossed squares and winning line highlighted; Play Again resets to placing phase with a new `balancedRandomCard()`
- [x] 3.8 Implement `runSimulation(n, playerGrid)` pure function (re-randomises Larry's grid each game); simulator UI with 100/500/1000 buttons; Recharts BarChart with player's bar highlighted; locked until `gamesPlayed >= 1`
- [x] 3.9 Add `ExplainerPanel` and `QuizPanel`

## 4. Routing and home page

- [x] 4.1 Add import and route `/probability-bingo` in `src/App.jsx`
- [x] 4.2 Add Probability Bingo entry to `goDeeper` tier in `src/pages/HomePage.jsx` TIERS array, after Remove One

## 5. Verify

- [x] 5.1 Run `npm run lint` — 0 errors
- [x] 5.2 Run `npm run build` — clean build
