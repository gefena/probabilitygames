## 1. Machine Setup

- [x] 1.1 Create `src/pages/MysteryMachinePage.jsx` with state: `difficulty`, `outcomes` (array of {label, trueWeight}), `budget`, `tally` (object), `phase` ('playing'|'revealed')
- [x] 1.2 On difficulty selection, generate 2–4 outcomes with random weights (1–10 each, min 20% each for Easy); store as hidden state; set `budget`
- [x] 1.3 Render a difficulty selector (Easy / Medium / Hard) that resets and starts a new machine

## 2. Trial Output

- [x] 2.1 "Produce output" button: sample a random outcome (weighted), increment `tally[outcome]`, decrement `budget`
- [x] 2.2 Add ×10 multiplier button
- [x] 2.3 Render tally as colored count bars (one per outcome, no label indicating true probability)
- [x] 2.4 Disable produce buttons when `budget === 0`; show low-trial warning at ≤ 10 remaining

## 3. Estimate Submission

- [x] 3.1 Render percentage sliders for each outcome (0–100, step 1); display running total
- [x] 3.2 Disable Submit when total ≠ 100%; show "Total must equal 100%" message
- [x] 3.3 Submit button transitions to 'revealed' phase

## 4. Reveal and Scoring

- [x] 4.1 Show a side-by-side comparison table: outcome label, Your Guess %, True Value %, Difference — color-coded green (<5%), yellow (5–15%), red (>15%)
- [x] 4.2 Compute score = 100 − average absolute error; display prominently
- [x] 4.3 "Play Again" button generates a new machine at the same difficulty

## 5. Explainer, Quiz, Route, and i18n

- [x] 5.1 Add `ExplainerPanel` explaining statistical inference: more trials = better estimate
- [x] 5.2 Add `QuizPanel` with 3 questions: why more trials help, what if you only had 5 trials, what does "estimate" mean
- [x] 5.3 Add quiz bank `src/quizzes/mysteryMachine.js` and `quiz.mysteryMachine.*` i18n keys
- [x] 5.4 Add `mysteryMachine.*` i18n keys to `en.json` and `he.json`
- [x] 5.5 Add route `/mystery-machine` in `src/App.jsx` and home-page card (emoji 🔍, accent color indigo)
