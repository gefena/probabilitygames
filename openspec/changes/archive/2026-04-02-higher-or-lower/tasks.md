## 1. i18n keys

- [x] 1.1 Add `higherOrLower.*` namespace to `en.json`: `title`, `emoji`, `subtitle`, `howToPlay`, `currentRoll`, `higherBtn`, `lowerBtn`, `streak`, `best`, `correct`, `wrong`, `push`, `pushHint`, `oddsHigher`, `oddsEqual`, `oddsLower`
- [x] 1.2 Add `higherOrLower.explainer.*`: `title`, `body`, `example`, `callout`, `furtherReading`
- [x] 1.3 Add `quiz.higherOrLower.q1/q2/q3` — questions about conditional probability, the equal constant, and streak math
- [x] 1.4 Add `home.games.higherOrLower.title` and `home.games.higherOrLower.desc`
- [x] 1.5 Translate all above keys to Hebrew in `he.json`

## 2. Quiz file

- [x] 2.1 Create `src/quizzes/higherOrLower.js` — export array of 3 quiz question objects referencing `quiz.higherOrLower.q*` keys

## 3. HigherOrLowerPage

- [x] 3.1 Create `src/pages/HigherOrLowerPage.jsx` with phase state machine (`idle`, `guessing`, `result`), `currentFace` state (initial random 1–6), `streak` and `best` state, `outcome` state (`'correct' | 'wrong' | 'push' | null`); use `phase !== 'idle'` to gate button presses — no separate `isRolling` boolean needed
- [x] 3.2 Implement `odds(f)` pure function returning `{ higher: (6-f)/6, equal: 1/6, lower: (f-1)/6 }` and display the three bars with fraction + percentage labels before each guess
- [x] 3.3 Implement pip-pattern die using `PIP_LAYOUTS` / `DieFace` component (same pattern as other game pages), shake animation via Framer Motion
- [x] 3.4 Implement Higher and Lower buttons: disable Higher when face=6, disable Lower when face=1; `isRolling` guard against double-tap
- [x] 3.5 Implement roll mechanic: button tap → set `phase('guessing')` → after 350ms shake reveal new face → compute outcome inline (`nextFace > currentFace` → higher, `nextFace === currentFace` → push, else lower) → set `outcome` and `currentFace` → set `phase('result')` → update streak/best → after 1500ms set `phase('idle')`
- [x] 3.6 Show inline result feedback: correct (green), wrong (red, streak resets), push (amber, streak preserved, show `pushHint`)
- [x] 3.7 Add `ExplainerPanel` and `QuizPanel`

## 4. Routing and home page

- [x] 4.1 Add import and route `/higher-or-lower` in `src/App.jsx`
- [x] 4.2 Add Higher or Lower entry to `startHere` tier in `src/pages/HomePage.jsx` TIERS array

## 5. Verify

- [x] 5.1 Run `npm run lint` — 0 errors
- [x] 5.2 Run `npm run build` — clean build
