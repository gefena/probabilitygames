## Why

Four quiz questions across BridgeQuest, MontyHall, BirthdayRoom, and RemoveOne contain content errors — either misleading answer text, a correct answer marked wrong, a factual error in an explanation, or a factually incorrect distractor. These are educational games; bad content undermines learning even when the correct answer is selected.

## What Changes

- **BridgeQuest Q1** — Rewrite option a's label text: the current label "it has only one bridge to cross, so there is only one chance to fall" teaches a false heuristic (fewer bridges ≠ always safer). Replace with text that references the actual math (60% > 56%).
- **MontyHall Q2** — Option a ("The host always opens the door you didn't pick, so your original choice still has 1/3 probability") is marked `correct: false` but is logically correct. Rewrite option a to be a clearly wrong statement, keeping option c as the marked-correct answer.
- **BirthdayRoom Q2** — Fix explanation wording: "every new person added creates N new pairs" → "N-1 new pairs."
- **RemoveOne Q3** — Fix distractor option c: "there are only 2 ways to roll a 2" → "there is only 1 way to roll a 2 (1+1)." (The actual count of combinations for sum 2 is 1, not 2.)

## Capabilities

### New Capabilities
- `quiz-content-corrections`: Corrected text content for 4 quiz items across 4 games, in both `en.json` and `he.json`.

### Modified Capabilities

## Impact

- `src/i18n/en.json` — 4 string changes (BridgeQuest Q1 option a, MontyHall Q2 option a, BirthdayRoom Q2 explanation, RemoveOne Q3 option c)
- `src/i18n/he.json` — same 4 keys updated in Hebrew
- No JS logic changes; no quiz `.js` files need changes (correct flags remain the same)
