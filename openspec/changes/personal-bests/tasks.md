## 1. Shared infrastructure

- [x] 1.1 Create `src/hooks/usePersonalBest.js` — a hook that reads/writes `pb:<gameId>` from localStorage, returns `{ best, setBestIfHigher, isNew }` where `isNew` is true for the current render cycle after a new record
- [x] 1.2 Create `src/components/PersonalBestBadge.jsx` — small inline badge showing "Best: N" with a brief scale+glow animation when `isNew` is true
- [x] 1.3 Add i18n keys for personal best label and "New record!" text to `en.json` and `he.json`

## 2. Integrate into games

- [x] 2.1 Higher or Lower — persist best streak, show badge near streak banner
- [x] 2.2 Dice Detective — persist best score (out of 5), show badge on end screen
- [x] 2.3 Coin Flip Streak mode — persist best prediction score, show badge near score display
- [x] 2.4 Greedy Pig — persist best win margin, show badge near scoreboard
- [x] 2.5 Bridge Quest — persist best tournament wins (0-3), show badge on tournament result screen
- [x] 2.6 Probability Bingo — persist total wins (cumulative), show badge near game area
