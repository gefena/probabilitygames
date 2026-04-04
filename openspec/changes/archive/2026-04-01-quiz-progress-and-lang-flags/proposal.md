## Why

Two small but meaningful UX improvements:
1. Kids have no feedback on how far through the quiz they are — adding a progress indicator (e.g. "Question 2 of 3") helps them know how much is left and encourages them to complete all questions.
2. The language switcher shows plain text ("EN" / "עב") which is harder to spot at a glance for young users. Replacing it with emoji country flags (🇬🇧 for English, 🇮🇱 for Hebrew) makes the control instantly recognisable and more fun.

## What Changes

- Add a **question counter** to `QuizPanel` showing the current question number and total (e.g. "2 / 3") — updated on every "Next question" advance.
- Add a **dot-based progress bar** to `QuizPanel`: one dot per question in the bank, filled/colored for the current question, outlined for upcoming ones.
- Replace the plain "EN" / "עב" text labels in the language switcher (in `AppLayout`) with 🇬🇧 and 🇮🇱 emoji flags, keeping the same click behaviour.
- No changes to question content, game logic, or routes.

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `quiz-engine`: Add quiz progress indicator requirement (counter + dot bar on QuizPanel)
- `site-shell`: Add flag requirement to language switcher

## Impact

- Modified files: `src/components/QuizPanel.jsx`, `src/components/AppLayout.jsx`
- No new dependencies, no i18n key changes (counter is rendered inline as numbers)
