## Why

The home page currently organises games into vague tiers ("Start Here", "Go Deeper") that don't reflect how the games actually feel to play. Competitive games with real win/lose outcomes are buried alongside passive simulations, meaning the most engaging games don't lead. Reordering by interaction type — bot battles first, then deduction puzzles, then solo challenges, then visualisations — gives users an immediate sense of what's possible and pulls them toward the most exciting experiences first.

## What Changes

- Replace the 4 existing home page tiers with 4 new tiers ordered by interaction intensity
- **Tier 1 — "Beat the Bot"**: the 5 games with a real bot opponent and a declared winner (bridge-quest, climber-race, greedy-pig, remove-one, probability-bingo)
- **Tier 2 — "Crack the Code"**: keep existing 3 deduction/hacking games unchanged (guess-the-phone, hack-the-password, pattern-lock-hacker), dark background preserved
- **Tier 3 — "Test Your Wits"**: solo challenge and decision games — higher-or-lower, dice-detective, monty-hall (moved from Patterns in Chaos), mystery-machine (moved), house-always-wins, prize-machine
- **Tier 4 — "From Chaos to Order"**: all 12 passive simulation/visualisation games, dark background
- Update i18n keys for the two renamed/new tiers in `en.json` and `he.json`
- Monty Hall and Mystery Machine move from Tier 4 to Tier 3

## Capabilities

### New Capabilities

- `home-tier-structure`: The home page tier layout, ordering, and naming — defines which tiers exist, what they are called, and which games belong in each tier

### Modified Capabilities

- `home-page-tiers`: The existing tier structure is being replaced with a new ordering and naming scheme

## Impact

- `src/pages/HomePage.jsx` — TIERS array rewritten: new keys, new game assignments, tier order changed
- `src/i18n/en.json` — new/updated tier title and tagline keys for "Beat the Bot" and "Test Your Wits"
- `src/i18n/he.json` — same Hebrew translations
- No game pages touched; no routing changes; no component changes
