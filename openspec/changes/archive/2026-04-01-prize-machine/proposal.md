## Why

Expected value is the most practically useful probability concept — it explains why lotteries, carnival games, and slot machines are designed to take your money. Yet it's completely absent from the current curriculum. Kids encounter these games constantly and benefit hugely from understanding "on average, is this worth playing?"

## What Changes

- Add a new **Prize Machine** game page where kids configure a prize table (up to 5 prizes, each with a probability and a payout), set a cost per play, and then run the machine many times to observe their balance trending toward the expected value.
- A live **expected value calculator** shows the theoretical average outcome per play as the prize table is edited.
- A **balance chart** plots actual cumulative balance vs. the expected-value trend line, making the convergence visible.
- The explainer teaches: expected value = sum of (prize × probability); if EV < cost, the game is unfair to the player.

## Capabilities

### New Capabilities

- `prize-machine`: Expected value game with configurable prize table, cost-per-play, balance tracking, and EV trend line.

### Modified Capabilities

_(none — new page only, no changes to existing games)_

## Impact

- New file: `src/pages/PrizeMachinePage.jsx`
- New route added to `src/App.jsx`
- New home-page card added to `src/pages/HomePage.jsx`
- New i18n keys under `prizeMachine.*` in `en.json` and `he.json`
- No new dependencies (uses existing Recharts for balance chart)
