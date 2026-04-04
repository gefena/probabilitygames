## Why

With 26 games, kids tend to stick to whichever game they landed on. There's no breadcrumb leading from a simpler concept to a deeper one. A child who masters coin flips might never discover that the Galton Board shows what 1000 coin flips look like — even though that's the natural next step.

## What Changes

Add a "You might also like" suggestion at the bottom of each game page (below the quiz), showing 1–2 related games with a short reason why they connect. The suggestions are static — a hand-curated map of concept relationships, not algorithmic.

## Capabilities

### New Capabilities

- `cross-game-suggestions`: A shared component and a curated connection map linking games by concept progression

### Modified Capabilities

_(none)_

## Impact

- New component: `src/components/GameSuggestions.jsx`
- New data file: `src/data/gameConnections.js` (static map)
- Modified: every game page (add `<GameSuggestions>` below QuizPanel)
- `src/i18n/en.json` and `he.json` — add suggestion reason strings
