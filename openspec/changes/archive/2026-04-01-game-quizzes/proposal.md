## Why

Kids learn probability by playing the games, but without a check on understanding they may just click without internalising the concepts. Adding a short quiz after each game session gives immediate feedback and reveals common misconceptions — especially around biased vs. fair mechanics.

## What Changes

- Add a **QuizPanel** shared component that presents a multiple-choice question and shows an animated correct/incorrect response with a short explanation.
- Add **one quiz per game**, each with 3–4 questions that use the same visual language as the game (biased dice, weighted spinner, skewed candy jar, etc.) so kids can verify their answer by trying it in the game.
- Questions rotate or are selected from a small bank so returning players see variety.
- Quiz state is local (no persistence) — it resets when the game page reloads.
- All quiz text is bilingual (English + Hebrew) via the existing i18n system.

## Capabilities

### New Capabilities

- `quiz-engine`: Shared QuizPanel component, question-bank schema, answer evaluation logic, and animated feedback.

### Modified Capabilities

- `coin-flip-lab`: Add quiz requirement — biased coin challenge (e.g., "A coin lands heads 70% of the time — is it fair?")
- `lucky-dice`: Add quiz requirement — biased/loaded die questions (e.g., "A die lands on 6 three times as often as any other face — what is its probability?")
- `candy-jar`: Add quiz requirement — jar composition reasoning (e.g., "You double the red candies — does blue become more or less likely?")
- `magic-spinner`: Add quiz requirement — weighted spinner probability (e.g., "Slice A has weight 3, B has weight 1, C has weight 2 — which slice wins most often?")
- `card-draw`: Add quiz requirement — conditional probability questions (e.g., "After drawing 4 hearts, are the remaining hearts more or less probable than at the start?")

## Impact

- New file: `src/components/QuizPanel.jsx`
- Modified files: all 5 game page components to include `<QuizPanel />`
- New i18n keys added to `en.json` and `he.json` under `quiz.*` namespace
- No new dependencies required; uses existing Framer Motion for feedback animations
