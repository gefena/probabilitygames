## 1. Fix Broken Links

- [x] 1.1 In `src/data/gameConnections.js`, change the two `/lucky-dice` entries (lines 32, 107) to `to: '/dice'` and `titleKey: 'common.games.dice'`

## 2. Add 404 Catch-All Route

- [x] 2.1 Add `notFound.title` and `notFound.message` keys to `src/i18n/en.json` and `src/i18n/he.json`
- [x] 2.2 Add an inline `NotFoundPage` component and `<Route path="*">` as the last route in `src/App.jsx`, displaying emoji + translated title + message + "Back to Games" button

## 3. Add House Always Wins Quiz

- [x] 3.1 Add quiz i18n keys under `houseAlwaysWins.quiz.*` in `src/i18n/en.json` and `src/i18n/he.json` (3 questions with options and explanations)
- [x] 3.2 Create `src/quizzes/houseAlwaysWins.js` with 3 questions following the existing quiz file pattern
- [x] 3.3 Import and wire `QuizPanel` into `src/pages/HouseAlwaysWinsPage.jsx` below the ExplainerPanel

## 4. Fix Redundant Header Spans

- [x] 4.1 In `src/components/AppLayout.jsx`, replace the two `<span>` elements (lines 19-20) with a single `<span>{t('site.title')}</span>`
