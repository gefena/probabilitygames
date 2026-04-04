## 1. Prize Table UI

- [x] 1.1 Create `src/pages/PrizeMachinePage.jsx` with state: `prizes` (array of {label, prob, payout}), `cost`, `startBalance`, `balance`, `plays`, `history`
- [x] 1.2 Render a prize table with editable rows (label input, probability % input, payout input) and an "Add Prize" button (max 5 rows); show running total probability and a red warning when > 100%
- [x] 1.3 Render cost-per-play and starting balance inputs; lock both after the first play

## 2. Expected Value Display

- [x] 2.1 Compute `netEV = Σ(payout × prob/100) − cost` in real time as the table is edited
- [x] 2.2 Display the net EV per play with color coding: red if negative, green if positive, grey if zero

## 3. Play Mechanic

- [x] 3.1 Implement weighted-random outcome selection from the prize table (same pattern as Candy Jar)
- [x] 3.2 Add ×1 / ×10 / ×100 play multiplier buttons; each updates balance and appends to `history`
- [x] 3.3 Add Reset button: restores `balance` to `startBalance`, clears `history` and `plays`, unlocks inputs

## 4. Balance Chart

- [x] 4.1 Render a Recharts `LineChart` with two series: actual balance and EV trend line (`startBalance + plays × netEV`)
- [x] 4.2 Cap x-axis at last 200 plays (sliding window); always show most recent plays

## 5. Explainer, Quiz, Route, and i18n

- [x] 5.1 Add `ExplainerPanel` with title "Expected Value", body explaining EV formula, and a live example showing current EV calculation
- [x] 5.2 Add `QuizPanel` with 3 questions about expected value (is this game worth playing? what does EV = −2 mean? which machine is fairer?)
- [x] 5.3 Add quiz bank file `src/quizzes/prizeMachine.js` and i18n keys `quiz.prizeMachine.*` in `en.json` and `he.json`
- [x] 5.4 Add `prizeMachine.*` i18n keys to `en.json` and `he.json`
- [x] 5.5 Add route `/prize-machine` in `src/App.jsx` and a home-page card in `HomePage.jsx` (emoji 🎰, accent color amber)
