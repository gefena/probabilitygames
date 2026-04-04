## 1. i18n strings

- [x] 1.1 Add `bridgeQuest.*` namespace to `src/i18n/en.json` (title, emoji, subtitle, howToPlay, pathLabel, bridgePct, tapToPreview, survival, choosePath, botChoice, botReason, crossing, safe, fell, survived, didNotSurvive, botSurvived, botFell, pointYou, pointBot, tie, score, nextRace, winTournament, loseTournament, drawTournament, playAgain, raceN, greedyBot, explainer.*)
- [x] 1.2 Add `home.games.bridgeQuest` entry to `src/i18n/en.json`
- [x] 1.3 Add all bridgeQuest i18n keys to `src/i18n/he.json` with Hebrew translations
- [x] 1.4 Add `home.games.bridgeQuest` entry to `src/i18n/he.json`

## 2. Quiz

- [x] 2.1 Create `src/quizzes/bridgeQuest.js` with 3 questions about multiplying sequential independent probabilities

## 3. BridgeQuestPage — path generation and bot logic

- [x] 3.1 Create `src/pages/BridgeQuestPage.jsx` with `randomPath()`, `randomRace()`, and `greedyBotPick()` helpers
- [x] 3.2 Implement game state: `race` (paths array), `phase`, `preview`, `chosen`, `botChosen`, `playerResults`, `botResults`, `scores`, `raceIndex`
- [x] 3.3 Implement `racePoint()` scoring and tournament completion detection after 3 races

## 4. BridgeQuestPage — tap-to-preview mechanic

- [x] 4.1 Render three path rows; tap a path to set `preview` and show expanded survival % panel
- [x] 4.2 Show "N in 100 make it through" survival display in the preview panel
- [x] 4.3 Implement confirm button (or second tap) that sets `chosen` and triggers bot reveal + crossing phase

## 5. BridgeQuestPage — crossing animation

- [x] 5.1 Implement `runCrossing(bridges, onBridgeResult)` using sequential `setTimeout`-based reveals; use a ref to avoid stale closures
- [x] 5.2 Animate player crossing: bridge pills turn green/red one at a time with 700ms suspense pause + 400ms relief pause; show player emoji position
- [x] 5.3 After player crossing completes (500ms gap), animate bot crossing with same mechanic

## 6. BridgeQuestPage — race result and tournament UI

- [x] 6.0 Render race indicator ("Race N of 3") in the game header; visible during picking and crossing phases
- [x] 6.1 Show race result after both crossings: who won the point (or tie), updated score
- [x] 6.2 Show "Next Race →" button between races (races 1→2, 2→3); generate new paths on advance
- [x] 6.3 Show tournament result screen after race 3: final score, win/lose/draw message, Play Again button

## 7. Routing and home card

- [x] 7.1 Import `BridgeQuestPage` and add `/bridge-quest` route in `src/App.jsx`
- [x] 7.2 Add Bridge Quest `GameCard` entry after Climber Race in the `goDeeper` tier in `src/pages/HomePage.jsx`

## 8. ExplainerPanel and QuizPanel

- [x] 8.1 Add ExplainerPanel with sequential multiplication content (`bridgeQuest.explainer.*` keys)
- [x] 8.2 Add QuizPanel using `src/quizzes/bridgeQuest.js`
