## 1. Connection map and component

- [x] 1.1 Create `src/data/gameConnections.js` — export a map of game ID → array of `{ to, emoji, titleKey, reasonKey }` with 1–2 suggestions per game
- [x] 1.2 Create `src/components/GameSuggestions.jsx` — renders a "You might also like" section with compact horizontal cards showing emoji, title, and reason
- [x] 1.3 Add i18n keys to `en.json` and `he.json`: section title ("You might also like" / "אולי תאהב גם") and all per-game reason strings

## 2. Integrate into game pages

- [x] 2.1 Add `<GameSuggestions gameId="..." />` below the QuizPanel on all game pages that have entries in the connection map
