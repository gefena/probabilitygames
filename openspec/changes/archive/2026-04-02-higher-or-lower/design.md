## Context

Higher or Lower introduces conditional probability to the app — the first game where the odds of the next outcome depend on the current visible state. A single d6 is rolled; the player predicts whether the next roll is higher or lower. The mechanic is familiar from card games but with the distinct advantage that a die's probabilities are fully transparent and enumerable.

## Goals / Non-Goals

**Goals:**
- Placement in Start Here tier — zero setup, immediate play, single interaction per round
- Live odds panel displayed before each guess, showing P(higher), P(equal), P(lower) for the current face
- Push-on-equal tie rule: a tie preserves the streak but scores no point, with an explanation that P(equal) = 1/6 always
- Running streak counter + session best; no target — intrinsic motivation to beat one's own record
- ExplainerPanel and QuizPanel consistent with other game pages

**Non-Goals:**
- Configurable die type (always d6)
- Multiplayer or bot opponents
- Score history across sessions (no localStorage persistence)
- A "same" third-guess button (adds complexity without proportional educational gain)

## Decisions

### Odds panel shown before guess, not after

Showing P(higher/equal/lower) before the guess makes probability a decision tool, not just an explanation. The player internalises "I have 5/6 chance — I should say Higher" rather than seeing odds as a post-hoc justification. Consistent with how the app treats probability throughout.

```
Current: 3
Higher  ▓▓▓▓▓░░░░░  3/6 = 50%
Equal   ▓░░░░░░░░░  1/6 = 17%   ← always the same
Lower   ▓▓▓░░░░░░░  2/6 = 33%
```

### Equal = push (streak preserved, no increment)

Alternatives considered:
- **Equal = wrong**: Mathematically clean but losing a long streak on a trivial guess (rolled 1, said Higher) from a tie feels arbitrary and unjust to kids.
- **Silent re-roll**: Hides the 1/6 constant entirely — a missed teaching moment.
- **Push (chosen)**: Streak survives; the UI surfaces "P(equal) is always 1/6 no matter what shows" — the most surprising and memorable fact in the game. No progress made, game continues.

### Probability formula

```js
// For d6, current face f:
function odds(f) {
  return {
    higher: (6 - f) / 6,   // faces strictly above f
    equal:  1 / 6,          // always constant
    lower:  (f - 1) / 6,   // faces strictly below f
  }
}
```

Values shown as fractions (`(6−f)/6`) and percentages. Both displayed — the fraction is precise, the percentage is intuitive.

### Phase state machine

```
'idle'     — initial die shown, player hasn't guessed yet
'guessing' — player has made prediction, waiting for roll
'result'   — roll revealed, outcome shown (correct / wrong / push)
```

Transition: `idle → guessing` on button press → roll after short delay → `result` for ~1.5s → back to `idle` with new die value.

`isRolling` boolean guards against double-taps during animation.

### Streak state

```js
const [streak, setStreak] = useState(0)
const [best, setBest] = useState(0)

// On correct:
setStreak(s => {
  const next = s + 1
  setBest(b => Math.max(b, next))
  return next
})

// On push (equal):
// streak unchanged, show push message

// On wrong:
setStreak(0)
```

No game-over state — the loop continues indefinitely after a wrong guess, streak resets to 0.

### Die face: pip pattern component

Reuse the `DieFace` / `PIP_LAYOUTS` pattern already established in GreedyPigPage, RollAndRacePage, and RemoveOnePage. No new dependency.

### Odds bar display

Simple percentage bars using Tailwind width classes — no Recharts needed. The bars are visual guides, not data charts.

```jsx
// width computed as: Math.round(pct * 100) + '%'
<div className="h-3 rounded-full bg-emerald-500" style={{ width: `${Math.round(p.higher * 100)}%` }} />
```

### i18n key structure

```
higherOrLower.title
higherOrLower.emoji          — 🎲
higherOrLower.subtitle
higherOrLower.howToPlay
higherOrLower.currentRoll    — "Current roll: {{n}}"
higherOrLower.higherBtn      — "Higher ▲"
higherOrLower.lowerBtn       — "Lower ▼"
higherOrLower.streak         — "Streak: {{n}}"
higherOrLower.best           — "Best: {{n}}"
higherOrLower.correct        — "✓ Correct!"
higherOrLower.wrong          — "✗ Wrong! Streak resets."
higherOrLower.push           — "Push — same number!"
higherOrLower.pushHint       — "P(equal) is always 1/6, no matter what shows."
higherOrLower.oddsHigher     — "Higher"
higherOrLower.oddsEqual      — "Equal"
higherOrLower.oddsLower      — "Lower"
higherOrLower.explainer.*
quiz.higherOrLower.q1/q2/q3
home.games.higherOrLower.title
home.games.higherOrLower.desc
```

## Risks / Trade-offs

- **Face 1 or 6 removes one button's utility** — When the die shows 1, Lower is impossible (P=0); when 6, Higher is impossible. The button should be disabled (disabled, not hidden) so the player sees the asymmetry visually. Hiding it would confuse the layout.
- **Odds bars on narrow screens** — Three bars with labels fit in ~280px. Minimum supported width is 375px so this is safe.
- **Streak resets feel punishing** — Softened by the push rule and by immediately showing the new roll so the player can go again instantly. No modal, no ceremony on wrong — just reset and continue.

## Open Questions

None — design fully determined.
