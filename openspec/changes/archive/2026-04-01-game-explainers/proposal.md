## Why

The games teach probability through play, but kids need a bridge between the fun and the concept — a short, visual explanation right inside each game that answers "why does this happen?" using concrete examples they can immediately test in the game itself.

## What Changes

- Add an in-game explainer section below the interactive area of each game
- Each explainer includes: a plain-language concept summary (1–3 sentences), a worked example using numbers the child can verify in the game, and a visual aid (emoji illustration, probability bar, or simple diagram) to reinforce the idea
- Explainers are fully bilingual (English / Hebrew) and match the current language setting
- No new routes or libraries required — purely additive UI within existing game pages

## Capabilities

### New Capabilities

*(none — all changes are additions to existing game capabilities)*

### Modified Capabilities

- `coin-flip-lab`: Add in-game explainer panel covering the Law of Large Numbers with a live "distance from 50%" indicator
- `lucky-dice`: Add explainer panel for equally-likely outcomes (1 die) and triangular sum distribution (2–3 dice), with a worked example tied to the current chart
- `candy-jar`: Add explainer panel showing how probability = (count of colour) ÷ (total), with a live fraction derived from the current jar composition
- `magic-spinner`: Add explainer panel linking slice size to probability, showing the fraction for each slice and a "fair vs. unfair spinner" callout
- `card-draw`: Add explainer panel for conditional probability, showing a before/after example of how drawing one card changes the odds for the next

## Impact

- Modifies: `src/pages/CoinFlipPage.jsx`, `LuckyDicePage.jsx`, `CandyJarPage.jsx`, `MagicSpinnerPage.jsx`, `CardDrawPage.jsx`
- New shared component: `src/components/ExplainerPanel.jsx`
- New i18n strings added to `src/i18n/en.json` and `src/i18n/he.json`
- No new dependencies
