## Why

Several small but visible polish issues exist in the live app: three Hebrew game names are incorrect or unclear, navigating to a game doesn't scroll to the top of the page, and the Climber Race quiz questions still refer to colors by old character-style names ("Sunny", "Storm", "שמשון") rather than the plain colors shown in the game UI.

## What Changes

- Fix Hebrew translation for `coin-flip` game name: "מעבדת הטבעת מטבע" → "מעבדת הטלת מטבעות"
- Fix Hebrew translation for `roll-and-race` game name: "גלגלו ותחרות" → "גלגלו והתחרו"
- Fix Hebrew translation for `monte-carlo-pi` game name: append " (פאי)" to clarify the π symbol
- Add scroll-to-top behavior when navigating to any game route
- Update Climber Race quiz question text (both `en.json` and `he.json`) to use plain color names instead of old character names

## Capabilities

### New Capabilities
- `scroll-to-top`: Automatically scroll the page to the top whenever the route changes

### Modified Capabilities
- `i18n-completeness`: Hebrew game name strings corrected; Climber Race quiz prose updated to match current color-only UI

## Impact

- `src/i18n/he.json` — three game name keys, ~7 quiz/explainer lines
- `src/i18n/en.json` — ~6 quiz/explainer lines (Climber Race color names)
- `src/App.jsx` — one additional `useEffect` for scroll reset
