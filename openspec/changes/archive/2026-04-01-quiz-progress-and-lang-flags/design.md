## Context

`QuizPanel` currently shows one question at a time with no indication of position in the bank. Kids don't know if there's one question or ten remaining. The language switcher in `AppLayout` uses plain text labels ("EN" / "עב") which are easy to miss for young users unfamiliar with language codes.

Both changes are purely cosmetic/presentational — no logic changes, no new state beyond what `currentIndex` already provides.

## Goals / Non-Goals

**Goals:**
- Show `currentIndex + 1 / questions.length` counter inside QuizPanel, always visible
- Show a row of dots (one per question) with the current question's dot filled, rest outlined
- Replace "EN" / "עב" text in `AppLayout` language button with 🇬🇧 / 🇮🇱 emoji

**Non-Goals:**
- Persistent quiz progress across page reloads
- Marking questions as "correct" vs "incorrect" in the dot bar (dots indicate position only, not score)
- Any change to question content, routing, or game logic

## Decisions

### Decision 1: Counter format — "2 / 3" vs "Question 2 of 3"

**Choice: Numeric "2 / 3"** displayed in small muted text next to the panel title.

A short numeric format works in both LTR and RTL without needing i18n keys. "Question 2 of 3" would require translation. The counter is a navigation aid, not instructional text.

### Decision 2: Dot bar style — filled circle vs progress bar

**Choice: Row of small filled/outlined dots**, one per question in the bank.

With 3 questions (the current bank size), a 3-dot row is immediately readable. A linear progress bar would look empty with so few steps. Dots are also a familiar pattern from mobile app onboarding.

Current dot: filled, colored with the page's accentColor tint. Other dots: outlined in gray.

### Decision 3: Flag emoji vs flag image assets

**Choice: Emoji flags 🇬🇧 / 🇮🇱.**

No image assets needed. Emoji render on all modern platforms and are universally recognised. The existing button click handler and `localStorage` persistence remain unchanged — only the visible label changes.

## Risks / Trade-offs

- **Risk: Emoji flag rendering varies by OS** — on most modern devices (iOS, Android, Windows 11, macOS) country flags render correctly. On older Linux systems they may appear as letter pairs (GB / IL). Acceptable for a kids' educational app targeting modern devices.
- **Risk: Dot color depends on accentColor prop** — accentColor is a Tailwind border class string (e.g. `border-violet-400`). To use it as a fill, we derive the color from a small static map inside QuizPanel rather than parsing the class string. This keeps the component self-contained.
