## 1. i18n keys

- [x] 1.1 Add `rollAndRace.*` namespace to `en.json`: `title`, `emoji`, `subtitle`, `howToPlay`, `trackLabel`, `pickPrompt`, `yourCar`, `rollBtn`, `autoBtn`, `win`, `lose`, `playAgain`, `rollResult`
- [x] 1.2 Add `rollAndRace.explainer.*`: `title`, `body`, `example`, `callout`, `furtherReading`
- [x] 1.3 Add `rollAndRace.simulator.*`: `title`, `lockedHint`, `sim100`, `sim500`, `sim1000`, `resultsLabel`, `carLabel`, `winsLabel`
- [x] 1.4 Add `quiz.rollAndRace.q1/q2/q3` — questions about why car 7 wins most, probability of each sum, expected race length
- [x] 1.5 Add `home.games.rollAndRace.title` and `home.games.rollAndRace.desc`
- [x] 1.6 Translate all above keys to Hebrew in `he.json`

## 2. Quiz file

- [x] 2.1 Create `src/quizzes/rollAndRace.js` — export array of 3 quiz question objects referencing `quiz.rollAndRace.q*` keys

## 3. RollAndRacePage

- [x] 3.1 Create `src/pages/RollAndRacePage.jsx` with phase state machine (`picking`, `racing`, `finished`), positions state `{ 2:0 … 12:0 }`, chosen car, track length [5/10/15] default 10
- [x] 3.2 Render 11-lane track: each lane shows sum label, car emoji (player's lane highlighted with accent color and star), progress cells (filled/empty), finish flag
- [x] 3.3 Implement two pip-pattern dice (same `PIP_LAYOUTS` + shake pattern as GreedyPigPage), displayed side by side with sum shown below
- [x] 3.4 Implement Roll button: animate dice, advance matching car, detect winner, transition to `finished` phase
- [x] 3.5 Implement Auto-finish button: fire rolls via `setTimeout` chain (~80ms apart) using `autoRef` flag to allow interruption; button changes to "Stop" while auto-running
- [x] 3.6 Add win/lose reveal panel with Play Again button; play again returns to `picking` phase and resets all positions
- [x] 3.7 Implement `runSimulation(n, trackLen)` pure function; add simulator UI with 100/500/1000 buttons; render Recharts BarChart with player's car highlighted; lock until `gamesPlayed >= 1`
- [x] 3.8 Add `ExplainerPanel` and `QuizPanel`

## 4. Routing and home page

- [x] 4.1 Add import and route `/roll-and-race` in `src/App.jsx`
- [x] 4.2 Add Roll & Race entry to `goDeeper` tier in `src/pages/HomePage.jsx` TIERS array

## 5. Verify

- [x] 5.1 Run `npm run lint` — 0 errors
- [x] 5.2 Run `npm run build` — clean build
