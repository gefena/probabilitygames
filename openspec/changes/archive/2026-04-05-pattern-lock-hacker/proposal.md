## Why

Guess the Phone and Hack the Password both teach the same idea: independent positions multiply. Pattern Lock teaches something genuinely different — ordered arrangements (permutations P(n,k)) — and delivers the best "wow" moment in the phone/security trilogy: the smudge attack, where seeing which dots were touched collapses 985,824 possibilities down to 24.

## What Changes

- Add a new game: **Pattern Lock Hacker** (`/pattern-lock-hacker`)
- Player draws patterns on an interactive 3×3 dot grid to crack a secret pattern
- Secret is a random ordered sequence of k distinct dots (k = 4–9, simplified model — no Android pass-through rule)
- Feedback: correct pattern wins; wrong pattern shakes and clears
- **Smudge Attack** button reveals which dots are in the secret (not order) — showing dramatically how few orderings remain
- Stats panel shows total possible patterns (P(9,k)) and attempts used
- Difficulty: pattern length selector (4–9 dots), like the length selector in the existing games
- Connects to Guess the Phone and Hack the Password via cross-game suggestions

## Capabilities

### New Capabilities

- `pattern-lock-hacker`: Draw-to-guess pattern lock game with smudge attack mechanic

### Modified Capabilities

_(none)_

## Impact

- `src/pages/PatternLockHackerPage.jsx` — new page (~250 lines)
- `src/App.jsx` — add route `/pattern-lock-hacker`
- `src/i18n/en.json` and `he.json` — add `patternLock.*` strings
- `src/data/gameConnections.js` — wire up cross-game suggestions
- `src/pages/HomePage.jsx` — add card for new game
