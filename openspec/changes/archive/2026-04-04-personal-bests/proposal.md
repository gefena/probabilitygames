## Why

Every game session resets on page leave — a kid who builds a 12-streak in Higher or Lower comes back tomorrow and it's gone. This kills the "one more try" loop. Lightweight persistence of personal bests makes returning feel like continuing, not restarting.

## What Changes

Add `localStorage`-backed personal best tracking to games that have natural scoreable moments:

- **Higher or Lower**: persist best streak (already tracked as `best` state)
- **Dice Detective**: persist best score out of 5 (already tracked as `firstAttemptCorrect`)
- **Coin Flip Streak mode**: persist best prediction score (already tracked as `score`)
- **Greedy Pig**: persist best win margin (score difference when player wins)
- **Bridge Quest**: persist best tournament record (e.g. "3-0")
- **Probability Bingo**: persist total wins

Display as a small "Personal Best: N" badge near the score area of each game page. Show a brief celebration animation when a new personal best is set.

## Capabilities

### New Capabilities

- `personal-bests`: A shared hook/utility for reading and writing per-game best scores to localStorage, plus a small UI badge component

### Modified Capabilities

_(none — this adds to game pages without changing their behavior)_

## Impact

- New shared utility: `src/hooks/usePersonalBest.js` (or similar)
- New shared component: personal best badge
- Modified pages: HigherOrLowerPage, DiceDetectivePage, CoinFlipPage, GreedyPigPage, BridgeQuestPage, ProbabilityBingoPage
- `src/i18n/en.json` and `he.json` — add personal best strings
