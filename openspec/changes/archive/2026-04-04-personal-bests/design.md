## Context

Games currently track scores in React state that resets on unmount. `localStorage` is only used for language preference. There's no persistence layer and no shared pattern for it.

## Goals / Non-Goals

**Goals:**
- Persist personal bests across sessions via localStorage
- Show a subtle badge on each applicable game page
- Celebrate new records with a brief animation
- Keep the storage footprint tiny (one key per game)

**Non-Goals:**
- Cross-device sync or accounts
- Leaderboards
- Persisting full game history or stats beyond a single "best" number
- Adding persistence to games that don't have natural score moments (simulations like Galton Board, Random Walk, Monte Carlo)

## Decisions

**Shared `usePersonalBest` hook** — each game calls `usePersonalBest('higher-or-lower')` and gets back `{ best, setBestIfHigher }`. The hook reads from `localStorage` on mount and writes on update. This keeps the pattern consistent without coupling games to each other.

**Storage key format**: `pb:<game-id>` (e.g. `pb:higher-or-lower`). Simple string prefix avoids collision with other localStorage usage.

**Badge component**: a small inline `<PersonalBestBadge best={best} isNew={isNew} />` that each game places near its score. Not a global component — each game decides where to put it. The `isNew` flag triggers a brief scale+glow animation.

**What counts as "best"** varies per game:
| Game | Metric | Type |
|------|--------|------|
| Higher or Lower | Longest streak | max |
| Dice Detective | Score out of 5 | max |
| Coin Flip (Streak) | Prediction score | max |
| Greedy Pig | Largest win margin | max |
| Bridge Quest | Best tournament W-L | max wins |
| Probability Bingo | Total wins | cumulative |

## Risks / Trade-offs

- **Risk**: localStorage cleared by user or browser → graceful fallback to 0, no errors.
- **Trade-off**: Probability Bingo uses cumulative wins (not a "best") which is a different pattern. The hook should support both `max` and `accumulate` modes, or Bingo can just use its own simple logic.
