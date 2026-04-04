## Why

The app teaches sample space and probability through simulators and explorations, but has no game that focuses on **counting favorable outcomes** — the step before probability. Dice Detective fills this gap: players count which outcomes in a two-dice sample space match a given condition, first by tapping cells directly, then by reasoning and typing the answer.

## What Changes

- Add a new **Dice Detective** game page where each round presents two custom dice (different colors, 4 faces each, up to 3 shape types) and a counting question
- Render all 16 outcomes as a tappable 4×4 grid — each cell shows the shape pair for that outcome
- Rounds 1–2 (tap mode): player taps which cells match the condition, submits, gets cell-by-cell feedback
- Rounds 3–5 (count mode): player types the count directly; after submit, matching cells are highlighted with a one-line math explanation
- Dice configuration and question type are procedurally randomised each round, so every session is different
- 5 question templates: one die / one shape, same shape on both, at least one, exactly one, different shapes on each
- Add Dice Detective card to the HomePage "Go Deeper" tier
- Full EN/HE i18n

## Capabilities

### New Capabilities

- `dice-detective-game`: 5-round counting game — randomised dice configs, 4×4 sample space grid, tap-then-type round structure, procedural question generation

### Modified Capabilities

- `home-page-tiers`: add Dice Detective card to the "Go Deeper" tier

## Impact

- New: `src/pages/DiceDetectivePage.jsx`
- New: `src/quizzes/diceDetective.js`
- Modified: `src/App.jsx` — new `/dice-detective` route
- Modified: `src/pages/HomePage.jsx` — new game card
- Modified: `src/i18n/en.json`, `src/i18n/he.json` — new `diceDetective.*` keys
