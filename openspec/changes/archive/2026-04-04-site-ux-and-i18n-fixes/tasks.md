## 1. i18n Restructuring & Hebrew Fixes

- [x] 1.1 In `src/i18n/en.json` and `he.json`, create a `common.games` object and move all game titles there using consistent kebab-case IDs.
- [x] 1.2 In `src/i18n/he.json`, search for and fix "pre-reversed" punctuation (e.g., change `"!הטל"` to `"הטל!"`).
- [x] 1.3 Add/Verify `site.title` key in both `en.json` and `he.json`.

## 2. Site Shell & Navigation Fixes

- [x] 2.1 Update `src/components/AppLayout.jsx` to use `t('site.title')` for the mobile header instead of hardcoded "Probability Playground".
- [x] 2.2 Update `src/pages/HomePage.jsx` to use the new `common.games` keys for all game cards.
- [x] 2.3 Update all game page components (e.g., `CoinFlipPage.jsx`, etc.) to use the new `common.games` keys for their headers.

## 3. Dynamic Title & URL Language Param

- [x] 3.1 In `src/i18n/index.js`, add logic to detect `lng` parameter from `window.location` (both search and hash) and initialize `i18next` with it.
- [x] 3.2 In `src/App.jsx`, implement a `useEffect` that updates `document.title` whenever the route or language changes. It should use the current game name (if on a game page) and the site title.

## 4. Verification

- [x] 4.1 Verify document title updates correctly when switching languages and navigating between games.
- [x] 4.2 Verify mobile header is localized.
- [x] 4.3 Verify Hebrew punctuation appears at the correct end of lines in RTL view.
- [x] 4.4 Verify `?lng=he` correctly sets the site to Hebrew on load.
