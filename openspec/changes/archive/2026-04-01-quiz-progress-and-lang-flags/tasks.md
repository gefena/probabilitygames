## 1. Quiz Progress Indicator

- [x] 1.1 Add a static color map inside `QuizPanel.jsx` that maps each `accentColor` border class to a fill hex color (e.g. `'border-violet-400' → '#a78bfa'`) for use in the dot indicator
- [x] 1.2 Render a progress row at the top of the question area: left side shows "currentIndex + 1 / questions.length" in small muted text; right side shows a row of `questions.length` dots — current dot filled with the accent color, others outlined in gray
- [x] 1.3 Verify the counter and dots update correctly when the user clicks "Next question" (cycling back to 1 after the last question)

## 2. Language Flag Buttons

- [x] 2.1 In `AppLayout.jsx`, replace the "EN" text label with 🇬🇧 and the "עב" text label with 🇮🇱 on the language switcher buttons; keep all existing click handlers and active-state styling unchanged
