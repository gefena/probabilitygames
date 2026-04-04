## Context

`QuizPanel` defines a strict question object schema (see `openspec/specs/quiz-engine/spec.md`):
- `id`: unique string
- `question`: i18n key
- `options`: array of `{ label: <i18n key>, correct: <boolean> }`
- `explanation`: i18n key

`diceDetective.js` was written independently and uses a different schema:
- `key` instead of `id`
- Hardcoded English strings for `question` and `explanation` (not i18n keys)
- `answers` array (not `options`) with `{ key, text }` (not `{ label, correct }`)
- `correct` as a key string on the question object, not a boolean per option

All other quiz bank files (`luckyDice.js`, `bridgeQuest.js`, etc.) already conform to the canonical schema. This is purely a data-layer inconsistency — `QuizPanel` itself is correct and complete.

## Goals / Non-Goals

**Goals:**
- Restore the Dice Detective game page to a working state
- Conform `diceDetective.js` to the canonical quiz-engine schema
- All three existing questions translated into both English and Hebrew

**Non-Goals:**
- Changing or extending the `QuizPanel` component
- Changing `DiceDetectivePage` beyond the quiz import (the game logic is unaffected)
- Adding PropTypes/TypeScript validation to catch this class of bug in future (separate concern)
- Rewording or replacing the quiz questions themselves (content is fine, only the format is wrong)

## Decisions

**Decision: Full rewrite of `diceDetective.js`, not a shim**

The canonical schema is already specified and every other bank file follows it. A compatibility shim in `QuizPanel` would add complexity to a shared component and mask the underlying contract. The right fix is at the data source.

**Decision: i18n keys under `quiz.diceDetective.*`**

Consistent with the pattern used across all other quiz banks (`quiz.dice.*`, `quiz.bridgeQuest.*`, etc.). Placing them here keeps quiz content co-located by game in both language files.

**Decision: Preserve question content, change only the format**

The three questions are pedagogically sound and cover distinct concepts (counting as prerequisite to probability, grid semantics, complement rule). No reason to change the content — only the format needs to change.

## Risks / Trade-offs

- **Risk**: Hebrew translations for quiz content require accurate mathematical phrasing.  
  → Mitigation: Follow the existing Hebrew style in `he.json` for comparable quiz content (complement rule phrasing already appears in `bridgeQuest` explanations).

- **Risk**: The quiz content keys may collide with existing `quiz.*` keys.  
  → Mitigation: Use the namespaced `quiz.diceDetective.*` prefix; verify no existing key overlaps before writing.
