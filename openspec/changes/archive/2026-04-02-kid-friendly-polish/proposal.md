## Why

The site targets kids, but many games use academic jargon in their explainer titles and subtitles — "Statistical Inference", "The √n Law", "The Law of Large Numbers", "conditional probability". Kids bounce off unfamiliar terms before the explanation even lands. Additionally, no game has a "how to play" intro that tells kids what they're about to see and what to do first. The result: great interactive content wrapped in language that creates unnecessary barriers.

## What Changes

Three categories of text changes across all 14 games (EN + HE):

1. **Add "How to Play" intro text** — A 1-2 sentence instruction shown prominently at the top of each game page, telling kids what to do first and what to watch for. For the original 5 games, improve the existing `.instructions` key. For the other 9 games, add a new `.howToPlay` key and render it below the subtitle.

2. **De-jargon explainer titles** — Replace academic labels with curiosity-driven titles:
   - "The Law of Large Numbers" → "Why Does It Get Closer to 50/50?"
   - "Statistical Inference" → "How to Be a Probability Detective"
   - "The √n Law" → "The Surprising Rule of Random Steps"
   - "Probability = Part ÷ Whole" → "More of One Colour = Better Chance"
   - "Expected Value" → "What You'll Win (or Lose) on Average"
   - etc.

3. **Rewrite subtitles** for games that lead with jargon — make them curiosity-driven and plain-language.

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `i18n-completeness`: Adding new `howToPlay` keys across 9 game pages; updating existing subtitle, explainer.title, and explainer.body text in both locales

## Impact

- `src/i18n/en.json` — update ~40 text values, add ~9 new keys
- `src/i18n/he.json` — matching Hebrew updates
- `src/pages/*.jsx` — 9 game pages gain a `howToPlay` paragraph rendered below subtitle
- No structural, routing, or dependency changes
