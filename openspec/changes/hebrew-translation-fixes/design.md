## Context

All fixes are in `src/i18n/he.json`. No code changes required. The errors fall into three categories:

1. **Wrong word** — "הטבעת" (minting) vs "הטלת" (flipping/tossing). Completely different meaning.
2. **Wrong grammatical form** — "ותחרות" (noun: "and competition") vs "והתחרו" (verb: "and compete").
3. **Inconsistent title style** — "לפצח" / "לפרוץ" are infinitives ("to crack" / "to hack"). All other tier titles and game titles in Hebrew use either noun form (מרוץ מטפסים, בינגו הסתברות) or imperative plural (נצחו את הבוט, הסירו אחד, גלגלו והתחרו). Infinitives are grammatically valid Hebrew but sound like task descriptions, not titles.

## Goals / Non-Goals

**Goals:**
- Fix all 5 wrong/inconsistent Hebrew strings
- Make Crack the Code and Hack the Password titles consistent with the imperative style used throughout

**Non-Goals:**
- Stylistic rewrites of correct strings
- Changes to any English strings
- Changes to any code files

## Decisions

**Imperative plural for titles** — Hebrew game/tier titles throughout the app use imperative plural (e.g. "נצחו", "הסירו", "גלגלו"). The two infinitive titles ("לפצח", "לפרוץ") are fixed to imperative plural to match.

**`home.games.coinFlip.title` vs `common.games.coin-flip`** — The `common.games.coin-flip` key was already correctly fixed to `"מעבדת הטלת מטבעות"`. The `home.games.coinFlip.title` key at line 34 is a stale duplicate that still has the wrong word. It may not be rendered in the current UI (the TIERS array uses `common.games.coin-flip`), but it should be corrected for cleanliness.

## Risks / Trade-offs

- No risk — pure string substitution in a single JSON file, no logic involved.
