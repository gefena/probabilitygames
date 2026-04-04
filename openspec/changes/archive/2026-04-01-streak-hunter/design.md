## Context

Streak Hunter is a mode added to the existing CoinFlipPage rather than a new page. The page gains a mode toggle ("Flip Lab" / "Streak Hunter") at the top. In Streak Hunter mode the existing flip mechanic is reused; the UI replaces the stats panel with streak-focused displays.

## Goals / Non-Goals

**Goals:**
- Mode toggle at the top of CoinFlipPage
- In Streak Hunter mode: flip history shown as a colored horizontal sequence (purple = heads, pink = tails), scrollable, most recent at right
- Current streak length and type highlighted
- Before each flip: player predicts "streak continues" or "streak breaks"
- Score: +1 for correct prediction, 0 for wrong (no penalty — keeps it fun)
- Streak-length histogram: how many streaks of each length have occurred
- Longest streak display
- Reset resets streak data but keeps the mode

**Non-Goals:**
- Saving streak records
- Streak predictions affecting the actual flip outcome

## Decisions

### Decision 1: Mode state — separate or unified

Streak Hunter mode uses the same underlying flip state (`heads`, `tails`, `total`) but adds `flipHistory` (array of 'H'/'T'), `currentStreak`, `streakLengths` (object), and `prediction` state. These are added to the existing page component.

Only one set of state needs to reset on mode switch — clear streak-specific state, keep totals.

### Decision 2: Flip history rendering

Render as a flex-wrap row of small colored squares (12×12px), newest on the right. Cap display at last 100 flips (beyond that, the row becomes unreadable). Use a `useRef` to auto-scroll to the newest square.

### Decision 3: Prediction timing

Show the prediction buttons AFTER the flip result is visible from the previous flip (or at page load before the first flip, showing both options). Lock prediction once chosen, reveal result, then unlock for the next flip. This creates a pause-and-think rhythm.

## Risks / Trade-offs

- **Risk: Mode switch while mid-flip** — Disable the mode toggle while a flip animation is playing.
- **Risk: Streak histogram gets sparse** — Only render bars for streak lengths that have actually occurred (sparse bar chart). Show a note "no streak of length 5+ yet" if applicable.
