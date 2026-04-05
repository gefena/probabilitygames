## Why

Bridge Quest teaches the multiplication rule for sequential probabilities, but showing only percentages (e.g. "75%") makes it harder to reason about the math than fractions do (e.g. "3/4"). Additionally the current flat-row layout of bridge pills gives no visual sense of traversing a path — it looks like a data table rather than a road. Adding a road visual and random bridge placement makes the game feel spatial and helps players intuit that bridges are obstacles along a journey.

## What Changes

- Bridge probabilities are generated from a curated set of "nice fractions" (1/2, 2/3, 3/4, 4/5, 1/3, 3/5, 2/5) instead of arbitrary integers
- A toggle button lets the player switch bridge display between percentage and fraction form
- Each path is rendered as a horizontal road lane with bridges placed at randomised positions along it, not as a flat flex row of pills
- The combined survival preview also shows fraction form when fractions mode is active

## Capabilities

### New Capabilities
- `bridge-fraction-display`: Toggle between percentage and fraction display for bridge probabilities
- `bridge-road-visual`: Render each path as a visual road lane with bridges at random positions along it

### Modified Capabilities
- `bridge-quest-game`: Bridge generation logic changes (fraction-based values, random x-placement); display requirements updated

## Impact

- `src/pages/BridgeQuestPage.jsx` — `randomPath()` logic, `BridgePill` component, `PathRow` component, new road layout
- `src/i18n/en.json` and `he.json` — new key for fraction/percentage toggle label in `bridgeQuest` namespace
