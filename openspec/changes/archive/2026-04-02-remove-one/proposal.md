## Why

Roll & Race shows children *which* sums come up most often by watching a race unfold. Remove One adds the next layer: *what happens when you act on that knowledge, or ignore it?* Players distribute tokens across sums 2–12 before any dice are rolled, then live with the consequences. A child who spreads evenly watches Max — who stacked tokens on 6, 7, 8 — finish long before them. The lesson arrives through defeat, not instruction.

## What Changes

- New page `RemoveOnePage` at route `/remove-one`
- **Placement phase**: player distributes exactly 18 tokens across numbers 2–12 using tap +/− controls; running total shown; Roll button unlocks when all 18 are placed
- **Game phase**: one shared dice roll per round; every player (human + two bots) removes one token from the matching number (if any); first to clear all tokens wins
- **Two bot opponents**:
  - *Lucky Larry* — spreads tokens as evenly as possible (naïve strategy)
  - *Max* — distributes tokens proportional to the theoretical two-dice probability distribution (near-optimal)
- Win/lose reveal with Play Again
- Simulator unlocked after first completed game: run 100/500/1000 games comparing three placement strategies, bar chart of win rates
- New card in the **Go Deeper** tier on the home page, positioned after Roll & Race
- Full EN + HE i18n, quiz, explainer

## Capabilities

### New Capabilities
- `remove-one-game`: Token placement strategy game using two-dice sums with two AI opponents

### Modified Capabilities
- `site-shell`: New route `/remove-one`
- `home-page-tiers`: Remove One added to Go Deeper tier after Roll & Race

## Impact

- `src/pages/RemoveOnePage.jsx` — new page
- `src/App.jsx` — new route
- `src/pages/HomePage.jsx` — one new entry in the `goDeeper` TIERS array
- `src/i18n/en.json` and `he.json` — new `removeOne.*` namespace + quiz keys
- `src/quizzes/removeOne.js` — new quiz file
- No new dependencies
