## 1. i18n strings

- [x] 1.1 Add `climberRace.*` namespace to `src/i18n/en.json` (title, emoji, subtitle, howToPlay, climber names, bet UI, spin result, warning, win/lose, playAgain, historyTitle, historyWon, historyLost, explainer.*, betArc, betRatio, betWinIf, noBet, betLabel, betOr, spinBtn, spinResult, betWon, betMissed, noBetResult)
- [x] 1.2 Add `home.games.climberRace` entry to `src/i18n/en.json`
- [x] 1.3 Add all climberRace i18n keys to `src/i18n/he.json` with Hebrew translations
- [x] 1.4 Add `home.games.climberRace` entry to `src/i18n/he.json`

## 2. Quiz

- [x] 2.1 Create `src/quizzes/climberRace.js` with 3 questions about the addition rule for mutually exclusive events

## 3. ClimberRacePage — core game logic

- [x] 3.1 Create `src/pages/ClimberRacePage.jsx` with constants (`COLORS`, `MIN_PCT`), `randomSpinner()`, and `weightedPick()` helpers
- [x] 3.2 Implement all game state: `bet`, `spinner`, `steps`, `isSpinning`, `raceWinner`, `lastSpin`, `history`
- [x] 3.3 Implement `doSpin()`: weighted pick, advance step, detect race winner, update history, regenerate spinner for next turn
- [x] 3.4 Implement bet selection logic: toggle climber in/out of bet, enforce max 2 climbers

## 4. ClimberRacePage — SVG spinner

- [x] 4.1 Adapt `buildArcs` pattern from `MagicSpinnerPage.jsx` for fixed 4-climber pie; add needle angle helpers (sector start/end angles for landing computation)
- [x] 4.2 Render SVG pie chart with 4 arcs sized by spinner percentages; highlight bet arcs with brighter fill and stroke ring
- [x] 4.3 Animate needle with Framer Motion: several full rotations ending at midpoint of winning sector; needle angle resets after result is shown

## 5. ClimberRacePage — mountain display

- [x] 5.1 Render two-column mountain with step dots for each climber (6 dots per track, filled = reached)
- [x] 5.2 Show climber emoji + name tokens as tappable bet selectors; highlight selected climbers
- [x] 5.3 Show warning badge when any climber is at step 5

## 6. ClimberRacePage — bet panel and result

- [x] 6.1 Show combined bet arc percentage and plain-language ratio (using `toRatio()`) when bet is non-empty
- [x] 6.2 Show spin result line after each spin: winning climber name + bet won/missed indicator
- [x] 6.3 Show win/lose race result message when race ends; show Play Again button
- [x] 6.4 When bet is empty and spin resolves, show neutral result line ("No bet placed — {{name}} advances!") instead of won/missed indicator

## 7. ClimberRacePage — race history

- [x] 7.1 Render last-5-races history list below the game (race winner emoji + name, won ✓ / lost ✗ indicator)

## 8. ClimberRacePage — ExplainerPanel and QuizPanel

- [x] 8.1 Add ExplainerPanel with addition rule content (`climberRace.explainer.*` keys)
- [x] 8.2 Add QuizPanel using `src/quizzes/climberRace.js`

## 9. Routing and home card

- [x] 9.1 Import `ClimberRacePage` and add `/climber-race` route in `src/App.jsx`
- [x] 9.2 Add Climber Race `GameCard` entry after Pizza Builder in the `goDeeper` tier in `src/pages/HomePage.jsx`
