## Context

The app's Greedy Pig game has a quiz question (Q1) where the "correct" answer label says "About 3 points" but the explanation computes a net expected value of 0.33 points. The explainer panel also uses the phrase "expected gain from one more roll is only about 3 points" with 12 accumulated points, which blurs the distinction between gross expected gain and net EV. A third issue exists in Lucky Combo Q3 where the explanation declares two options correct but only one is marked correct in the quiz data.

All three fixes are isolated string/content changes — there is no business logic, data model, or architectural change involved.

## Goals / Non-Goals

**Goals:**
- Correct the `quiz.greedyPig.q1.a` label in `en.json` (and matching Hebrew key in `he.json`) so it accurately reflects the ~0.33 net EV
- Reword the `greedyPig.explainer.example` to make clear whether it describes gross or net expected gain, and give the numerically consistent value
- Resolve the Lucky Combo Q3 contradiction: either update the explanation to remove the "both are correct" claim, or mark both options A and C as correct in the quiz JS

**Non-Goals:**
- Changing game mechanics or simulation code
- Modifying any other quiz questions (all other math was verified as correct)
- Updating quiz questions in Hebrew beyond the keys changed in English

## Decisions

**Decision: Fix the Q1 label rather than rewording the explanation**
The quiz explanation already has the correct calculation (0.33 points) and the correct reasoning. Only the option A label is wrong. Changing the label is the minimal, targeted fix. Alternative: rewrite the question to ask about gross expected gain (~3 points) — rejected because the explanation already teaches net EV and that's the more valuable lesson.

**Decision: Reword explainer example to state gross vs net explicitly**
The explainer body uses "expected gain" loosely. Rather than changing the number, add a clause that clarifies "from non-bust rolls" so it matches what the quiz explanation later computes precisely. This preserves the intuitive buildup of the explainer while removing the apparent contradiction.

**Decision: Remove "both are correct" from Lucky Combo Q3 explanation rather than marking C correct**
Option C says "Because AND is a stricter rule than OR" — while true, it's less precise than option A which identifies the root mechanism (needing both conditions simultaneously). Removing the "both are correct" sentence keeps the explanation accurate without requiring changes to the quiz JS.

## Risks / Trade-offs

- Hebrew translations (`he.json`) must be updated alongside English or the Hebrew quiz will show a wrong answer label → Mitigation: update both files in the same commit and verify the Hebrew translation is semantically consistent.
- Changing Q1 label content could confuse users who have already seen the old wording → Low risk since this is a fix, not a feature change; no persistent user quiz state is stored.

## Open Questions

- None — all three fixes are well-defined content-only changes.
