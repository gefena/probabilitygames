## 1. i18n keys — Guess the Phone (en.json)

- [x] 1.1 Add `guessPhone` namespace: `title`, `emoji`, `subtitle`, `howToPlay`, `lengthLabel`, `attemptsLabel`, `probabilityLabel`, `probabilityValue`, `newGame`, `giveUp`, `win`, `winMessage`, `positionLabel`, `positionHint`
- [x] 1.2 Add `guessPhone.explainer.*`: `title`, `body`, `example`, `callout`, `furtherReading`
- [x] 1.3 Add `guessPhone.quiz` array with 3 questions (each with `question`, `options[4]`, `answer`, `explanation`)

## 2. i18n keys — Hack the Password (en.json)

- [x] 2.1 Add `hackPassword` namespace: `title`, `emoji`, `subtitle`, `howToPlay`, `lengthLabel`, `difficultyLabel`, `diffEasy`, `diffMedium`, `diffHard`, `attemptsLabel`, `probabilityLabel`, `probabilityValue`, `combinationsLabel`, `comparisonLabel`, `newGame`, `giveUp`, `win`, `winMessage`, `positionLabel`, `positionHint`
- [x] 2.2 Add `hackPassword.explainer.*`: `title`, `body`, `example`, `callout`, `furtherReading`
- [x] 2.3 Add `hackPassword.quiz` array with 3 questions

## 3. Hebrew translations (he.json)

- [x] 3.1 Translate all `guessPhone.*` keys to Hebrew
- [x] 3.2 Translate all `hackPassword.*` keys to Hebrew

## 4. Quiz files

- [x] 4.1 Create `src/quizzes/guessThePhone.js` — export array of 3 quiz question objects referencing `guessPhone.quiz[*]` i18n keys
- [x] 4.2 Create `src/quizzes/hackThePassword.js` — export array of 3 quiz question objects referencing `hackPassword.quiz[*]` i18n keys

## 5. GuessThePhonePage component

- [x] 5.1 Create `src/pages/GuessThePhonePage.jsx` — length preset buttons (1/2/3/4/5, default 1), secret generation, position slots display
- [x] 5.2 Add digit picker (0–9 button grid), position selection, guess submission logic (correct → lock green, wrong → increment counter)
- [x] 5.3 Add probability display `1 in 10^(unsolved)`, guess history chips (last 10), win state with Framer Motion celebration
- [x] 5.4 Add Give Up (reveal secret) and New Game actions
- [x] 5.5 Add `ExplainerPanel` with `furtherReading` prop and `QuizPanel`

## 6. HackThePasswordPage component

- [x] 6.1 Create `src/pages/HackThePasswordPage.jsx` — length presets (1/2/3/4/5, default 1), difficulty selector (Easy/Medium/Hard), secret generation from active alphabet
- [x] 6.2 Add character picker grid (renders full active alphabet as buttons), position selection, guess submission logic
- [x] 6.3 Add probability display `alphabetSize^(unsolved)` with large-number comparison label, guess history chips, win state animation
- [x] 6.4 Add Give Up and New Game actions (preserve length + difficulty on New Game)
- [x] 6.5 Add `ExplainerPanel` with `furtherReading` prop and `QuizPanel`

## 7. Routing and home page

- [x] 7.1 Add imports and routes `/guess-the-phone` and `/hack-the-password` in `src/App.jsx`
- [x] 7.2 Add "Crack the Code" section to `src/pages/HomePage.jsx` with dark background and cards for both new games

## 8. Verify

- [x] 8.1 Run `npm run lint` — 0 errors
- [x] 8.2 Run `npm run build` — clean build
