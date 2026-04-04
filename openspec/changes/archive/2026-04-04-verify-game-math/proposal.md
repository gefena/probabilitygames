## Why

The educational app contains probability games with quiz questions — if the quiz answers or explanations contain math errors, students learn incorrect probability concepts. A review of all games found mostly sound math, but revealed two real errors and one misleading explanation in the Greedy Pig game that need correction.

## What Changes

- **Fix** the incorrect answer label in the Greedy Pig quiz (Q1): option A is marked correct but says "About 3 points" when the correct net expected value is ~0.33 points.
- **Clarify** the Greedy Pig explainer body example, which says "about 3 points expected gain" for 12 accumulated points — this confuses gross expected gain (positive outcomes only: 5/6 × 4 ≈ 3.33) with net EV (1.33), making it inconsistent with the quiz explanation that computes net EV.
- **Fix** the Lucky Combo quiz Q3: the explanation says "Both answers (a) and (c) are correct!" but only option A is marked `correct: true` — students who pick C are marked wrong despite the explanation confirming C is also right.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `greedy-pig-quiz-math`: Fix incorrect expected value label in Q1 and ambiguous wording in the explainer example
- `lucky-combo-quiz-q3`: Resolve contradiction between quiz answer marking and explanation text

## Impact

- `src/quizzes/greedyPig.js` — Q1 answer label change (or correct answer pointer)
- `src/i18n/en.json` — `quiz.greedyPig.q1.a` label text; `greedyPig.explainer.example` text; `quiz.luckyCombo.q3` explanation or option marking
- `src/i18n/he.json` — same keys as en.json need matching Hebrew translation updates
