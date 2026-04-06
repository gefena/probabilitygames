## Why

The site has two broken navigation links and is missing a catch-all route, causing users to land on blank pages. Additionally, one game (House Always Wins) is the only game without a quiz, breaking the otherwise consistent game structure across all 26 games.

## What Changes

- **Fix broken `/lucky-dice` suggestion links** — Two entries in `gameConnections.js` link to `/lucky-dice` (a non-existent route) with i18n key `common.games.lucky-dice` (also non-existent). Fix to `/dice` and `common.games.dice`.
- **Add 404 catch-all route** — Add a `<Route path="*">` in `App.jsx` that shows a friendly "page not found" screen with a link home.
- **Add quiz to House Always Wins** — Create `src/quizzes/houseAlwaysWins.js` and wire up `QuizPanel` in `HouseAlwaysWinsPage.jsx`, matching the pattern used by all other 25 games.
- **Fix redundant header spans** — Remove the duplicate `<span>` elements in `AppLayout.jsx` that both render `t('site.title')` identically.

## Capabilities

### New Capabilities
- `not-found-page`: A 404 catch-all route that displays a friendly message and navigates users back to the home page.
- `house-always-wins-quiz`: A quiz for the House Always Wins game covering expected value and house edge concepts.

### Modified Capabilities
- `site-shell`: Fix redundant header title spans in AppLayout.

## Impact

- **Files changed**: `src/data/gameConnections.js`, `src/App.jsx`, `src/components/AppLayout.jsx`, `src/pages/HouseAlwaysWinsPage.jsx`
- **Files created**: `src/quizzes/houseAlwaysWins.js`, plus i18n keys in `src/i18n/en.json` and `src/i18n/he.json`
- **No dependency changes**
- **No breaking changes**
