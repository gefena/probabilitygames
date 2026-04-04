## Why

The home page currently organises games into arbitrary sections (top grid, "Explore More", "Crack the Code", "Patterns in Chaos") that mix complexity levels. A first-time visitor — typically a child — lands on the page with no sense of where to start. Ordering content by increasing complexity lets beginners start confidently and naturally graduate to richer, more cerebral experiences.

## What Changes

- Remove the current multi-section layout (top game-card grid + Explore More + Crack the Code + Patterns in Chaos)
- Replace with a single vertically-flowing page divided into named **tiers**, each with a short heading and description
- Tier 1 — **Start Here**: the five simplest, most interactive single-tap games (Coin Flip, Lucky Dice, Candy Jar, Magic Spinner, Card Draw)
- Tier 2 — **Go Deeper**: strategy / decision games that require more thought (Greedy Pig, House Always Wins, Lucky Combo, Prize Machine)
- Tier 3 — **Crack the Code**: the combinatorics guessing games (Guess the Phone, Hack the Password)
- Tier 4 — **Patterns in Chaos**: simulation / visualisation games requiring the most abstraction (Galton Board, Random Walk, Monte Carlo π, Monty Hall, Birthday Room, Mystery Machine)
- Each tier has a distinct colour accent and a one-sentence description of its theme
- Cards within tiers retain their existing design; only the grouping and page scaffolding change

## Capabilities

### New Capabilities
- `home-page-tiers`: Progressive-complexity tier layout for the home page

### Modified Capabilities
- `site-shell`: Home page structure requirement changes (tier layout replaces section layout)

## Impact

- `src/pages/HomePage.jsx` — complete rewrite of layout; game routing and card data unchanged
- `src/i18n/en.json` and `he.json` — new tier heading and description keys
- No routing, component, or dependency changes
