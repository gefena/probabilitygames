## Why

The site supports Hebrew (RTL) as a full language, but an audit reveals several hardcoded English strings that bypass the i18n system entirely. These appear as untranslated English text when users switch to Hebrew: tooltip labels, default event names in Lucky Combo, an SVG label in Magic Spinner, and a "games each" suffix in Monty Hall. The JSON key parity between EN and HE is already 100% (594/594 keys), so the work is purely fixing hardcoded strings in JSX.

## What Changes

- **MontyHallPage**: `'Wins'` in Recharts Tooltip formatter → use i18n key; `"games each"` inline suffix → use i18n key
- **LuckyComboPage**: Default outcome labels `'Heads'`, `'Tails'`, `'⭐ Six'`, `'1–5'` are hardcoded English — add i18n keys and use them as defaults
- **MagicSpinnerPage**: `Start` text label in the SVG tree diagram → use i18n key
- Add the corresponding Hebrew translations to `he.json` (and EN strings to `en.json`) for all new keys

## Capabilities

### New Capabilities

_(none — this is a bug-fix change, no new pages or features)_

### Modified Capabilities

- `i18n-completeness`: Hardcoded English strings found in JSX across 3 pages — fix all to use `t()` with proper EN/HE keys

## Impact

- `src/pages/MontyHallPage.jsx` — 2 string fixes
- `src/pages/LuckyComboPage.jsx` — 4 default label fixes
- `src/pages/MagicSpinnerPage.jsx` — 1 SVG label fix
- `src/pages/HouseAlwaysWinsPage.jsx` — `{edge}% edge` badge label fix
- `src/i18n/en.json` — new keys for all fixes
- `src/i18n/he.json` — matching Hebrew translations
