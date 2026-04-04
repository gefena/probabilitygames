## Why

The Dice Detective game page crashes silently when loaded: `diceDetective.js` exports quiz questions in a bespoke format (`answers`, `text`, hardcoded strings) that does not match the schema `QuizPanel` requires (`options`, `label` i18n keys, per-option `correct` boolean). `question.options` is `undefined` at runtime, causing a TypeError that leaves users with a blank page.

## What Changes

- Rewrite `src/quizzes/diceDetective.js` to use the canonical `QuizPanel` question schema (`options` with `label`/`correct`, i18n key references)
- Add Dice Detective quiz strings to `src/i18n/en.json` and `src/i18n/he.json` under `quiz.diceDetective.*`
- Remove the hardcoded English inline strings currently in `diceDetective.js`

## Capabilities

### New Capabilities

_(none — this is a bug fix, no new capability is introduced)_

### Modified Capabilities

- `quiz-engine`: The `diceDetective.js` question bank file must conform to the schema already specified for all quiz bank files — i18n keys, `options` array, per-option `correct` boolean.
- `dice-detective-game`: The QuizPanel at the bottom of the Dice Detective page must render correctly in both English and Hebrew.

## Impact

- `src/quizzes/diceDetective.js` — full rewrite of exported array
- `src/i18n/en.json` — add `quiz.diceDetective` subtree (3 questions × question/options/explanation)
- `src/i18n/he.json` — add same subtree in Hebrew
- No changes to `QuizPanel`, `DiceDetectivePage`, routing, or any other file
