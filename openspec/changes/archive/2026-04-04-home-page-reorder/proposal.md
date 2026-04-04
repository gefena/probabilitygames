## Why

The current home page game order is slightly disorganized, with games of varying complexity mixed together. This proposal reorders the games to follow a clear progression from simple, easy, and highly playable to more complex, abstract, and less playable. This helps new users build their understanding of probability incrementally.

## What Changes

- Reorder games within the "Start Here" tier to prioritize immediate, clear-result games.
- Reorder games within the "Go Deeper" tier by grouping by concept (Two Dice Sums, Strategy, Rules of Probability, EV) and ordering by increasing complexity and required decision-making.
- Reorder games within the "Patterns in Chaos" tier to place the most complex concept (Statistical Inference) at the end.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `home-page-tiers`: Update the order of games within each tier.

## Impact

- `src/pages/HomePage.jsx`: The `TIERS` array will be reordered.
