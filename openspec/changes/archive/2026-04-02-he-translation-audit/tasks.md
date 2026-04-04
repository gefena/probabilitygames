## 1. Add i18n keys (en.json + he.json)

- [x] 1.1 Add `montyHall.wins` and `montyHall.gamesEach` to `en.json` and matching Hebrew keys to `he.json`
- [x] 1.2 Add `luckyCombo.defaultA1` (Heads), `luckyCombo.defaultA2` (Tails), `luckyCombo.defaultB1` (Six), `luckyCombo.defaultB2` (1–5) to `en.json` and matching Hebrew translations to `he.json`
- [x] 1.3 Add `spinner.treeStart` to `en.json` and matching Hebrew to `he.json`
- [x] 1.4 Add `houseAlwaysWins.edgeBadge` to `en.json` (e.g. `"{{n}}% edge"`) and Hebrew translation to `he.json`

## 2. Fix MontyHallPage.jsx

- [x] 2.1 Replace `formatter={(val) => [val, 'Wins']}` with `formatter={(val) => [val, t('montyHall.wins')]}`
- [x] 2.2 Replace the inline `{simResults.total.toLocaleString()} games each` with `{t('montyHall.gamesEach', { n: simResults.total.toLocaleString() })}`

## 3. Fix HouseAlwaysWinsPage.jsx

- [x] 3.1 Replace `{edge}% edge` in the GameCard badge with `{t('houseAlwaysWins.edgeBadge', { n: edge })}`

## 4. Fix LuckyComboPage.jsx

- [x] 4.1 Move `DEFAULT_A` and `DEFAULT_B` initialization inside the component as lazy `useState` initializers so they can call `t()`, replacing hardcoded `'Heads'`, `'Tails'`, `'⭐ Six'`, `'1–5'` labels with translated values

## 5. Fix MagicSpinnerPage.jsx

- [x] 5.1 Replace the hardcoded `Start` string in the SVG `<text>` element with `{t('spinner.treeStart')}`

## 6. Verify

- [x] 6.1 Run `npm run lint` — 0 errors
- [x] 6.2 Run `npm run build` — clean build, no warnings
