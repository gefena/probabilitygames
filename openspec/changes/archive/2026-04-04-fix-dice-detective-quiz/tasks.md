## 1. Add i18n strings

- [x] 1.1 Add `quiz.diceDetective` subtree to `src/i18n/en.json` with 3 questions (question key, 4 option label keys, explanation key each)
- [x] 1.2 Add matching `quiz.diceDetective` subtree to `src/i18n/he.json` with Hebrew translations

## 2. Fix quiz bank file

- [x] 2.1 Rewrite `src/quizzes/diceDetective.js` to use the canonical schema: `id`, `question` (i18n key), `options` array with `{ label, correct }`, `explanation` (i18n key)

## 3. Verify

- [x] 3.1 Load `/dice-detective` in the browser and confirm the game and quiz panel both render without error in English
- [x] 3.2 Switch to Hebrew and confirm the quiz panel renders in Hebrew with no missing translation keys
