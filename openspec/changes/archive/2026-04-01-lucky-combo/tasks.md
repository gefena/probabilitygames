## 1. Event Configuration UI

- [x] 1.1 Create `src/pages/LuckyComboPage.jsx` with state: `eventA` (array of {label, weight, success}), `eventB` (same), `combinator` ('AND'|'OR'), `history`, `trials`
- [x] 1.2 Render two side-by-side event editors, each with 2–4 outcome rows (label input, weight stepper) and a star button to designate the success outcome
- [x] 1.3 Add AND / OR toggle button between the two event editors

## 2. Combined Probability Display

- [x] 2.1 Compute `pA = successWeight / totalWeight` for each event; compute `pCombined` based on combinator (AND: pA × pB; OR: pA + pB − pA × pB)
- [x] 2.2 Display the formula used and the result prominently; update live as events or combinator change

## 3. Tree Diagram

- [x] 3.1 Render an SVG tree diagram with Event A branches at the first level and Event B branches at the second level
- [x] 3.2 Highlight winning branches in green (those satisfying the AND/OR condition); show probability fraction on each branch
- [x] 3.3 Show probability fraction labels at each branch node

## 4. Trial Simulation

- [x] 4.1 Implement trial logic: independently sample Event A and Event B outcomes, evaluate the AND/OR condition, update `history` and `trials`
- [x] 4.2 Add ×1 / ×100 trial buttons; display observed frequency vs. theoretical probability

## 5. Explainer, Quiz, Route, and i18n

- [x] 5.1 Add `ExplainerPanel` explaining the multiplication rule (AND) and addition rule (OR) with examples
- [x] 5.2 Add `QuizPanel` with 3 questions: AND probability calculation, OR probability calculation, why AND makes things less likely
- [x] 5.3 Add quiz bank `src/quizzes/luckyCombo.js` and i18n keys `quiz.luckyCombo.*`
- [x] 5.4 Add `luckyCombo.*` i18n keys to `en.json` and `he.json`
- [x] 5.5 Add route `/lucky-combo` in `src/App.jsx` and home-page card (emoji 🔗, accent color teal)
