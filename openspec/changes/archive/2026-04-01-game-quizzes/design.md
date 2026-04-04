## Context

Five probability games exist, each with an ExplainerPanel that teaches a concept. There is no mechanism to check whether a child has understood — they could click through without reading. The quiz adds a low-stakes comprehension check at the bottom of each game page, using the same visual style as the game so answers can be verified by playing.

The project uses React 18 + Tailwind CSS v3 + Framer Motion + react-i18next. No backend or persistence layer exists; everything is in-memory.

## Goals / Non-Goals

**Goals:**
- One QuizPanel per game, rendered below the main game content
- Each quiz has a small question bank (3–4 questions); one question is shown at a time
- Questions feature "biased" or "twisted" variants of the game mechanics to probe deeper understanding (not just recall)
- Correct/incorrect animated feedback with a brief explanation shown after answering
- "Next question" button advances to the next question from the bank (cycling)
- All text bilingual via existing i18n
- RTL-safe layout using Tailwind logical properties

**Non-Goals:**
- Persistent score tracking or user accounts
- Adaptive difficulty or ML-based question selection
- More than one question visible at a time
- Accepting free-text answers (multiple-choice only)

## Decisions

### Decision 1: Shared QuizPanel component vs. per-game quiz components

**Choice: Shared `QuizPanel` component with a `questions` prop.**

Each game passes its own question bank array. QuizPanel manages `currentIndex`, `selected` answer, and `revealed` (whether answer has been shown) as local state. This avoids duplicating animation and feedback logic across 5 files while keeping question content co-located with each game (or in a separate quiz data file per game).

Alternative: per-game quiz components — rejected because the UI/animation logic is identical and would be copy-paste across 5 files.

### Decision 2: Question bank location — inline in page vs. separate data file

**Choice: Separate `src/quizzes/<game>.js` files, each exporting an array of question objects.**

Keeps game page files readable. Question banks can be reviewed/extended independently.

Question shape:
```js
{
  id: 'q1',
  question: 'quiz.<game>.q1.question',   // i18n key
  options: [
    { label: 'quiz.<game>.q1.a', correct: false },
    { label: 'quiz.<game>.q1.b', correct: true  },
    { label: 'quiz.<game>.q1.c', correct: false },
  ],
  explanation: 'quiz.<game>.q1.explanation',  // i18n key, shown after answering
}
```

Alternative: inline arrays inside the JSX — rejected because it clutters game pages and makes i18n key management harder to audit.

### Decision 3: Question selection strategy — sequential vs. random

**Choice: Sequential (cycle through bank in order), with a "Next" button after revealing the answer.**

Simpler state; no risk of the same question repeating immediately. The bank is small (3–4 questions) so kids see all of them within a few cycles.

Alternative: random shuffle — adds a tiny bit of variety but complicates "have I seen all questions?" logic for no educational gain at this age group.

### Decision 4: Feedback style

After the user selects an answer:
- Correct: green check animation (Framer Motion scale-in), option highlights green, explanation appears
- Incorrect: gentle shake animation on the wrong option (red tint), correct answer highlighted in green, explanation appears
- A "Next question →" button (or "← שאלה הבאה" in Hebrew) appears to advance

Avoid using red for incorrect in a punishing way — the shake is subtle. The correct answer is always revealed so kids learn from mistakes.

### Decision 5: Placement within the page

QuizPanel goes at the very bottom of each game page, after all charts and the ExplainerPanel. Rationale: kids should play first, read the explainer, then test themselves — top-to-bottom learning flow.

## Risks / Trade-offs

- **Risk: Question bank feels thin** (3–4 questions per game) → Mitigation: each question has a distinct "twist" (biased mechanics, edge cases) so even 3 questions feel meaningfully different; bank can be extended later without changing the component.
- **Risk: Kids spam "Next" without reading the explanation** → Accepted trade-off; there is no enforcement mechanism without adding friction. The explanation is shown prominently and the "Next" button is placed below it.
- **Risk: Hebrew translations of math-heavy explanations are awkward** → Mitigation: use i18next named interpolation for numeric values (e.g., `{{pct}}`) so word order in Hebrew can be expressed naturally.

## Open Questions

None — all decisions resolved above.
