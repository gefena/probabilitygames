## Why

Four Hebrew strings in `he.json` contain definite linguistic errors: one uses the wrong word entirely ("minting" instead of "flipping"), one has a grammatical error (noun used where a verb is required), and two use the infinitive form ("to crack", "to hack") where all other game and tier titles consistently use either noun or imperative forms. These mistakes are visible in the live UI — the Crack the Code section heading and the Hack the Password game title are both wrong right now.

## What Changes

- Fix `home.games.coinFlip.title`: `"מעבדת הטבעת מטבע"` → `"מעבדת הטלת מטבעות"` ("הטבעת" = minting; "הטלת" = flipping — entirely different words)
- Fix `home.rollAndRace.title`: `"גלגלו ותחרות"` → `"גלגלו והתחרו"` (noun "competition" → imperative verb "compete")
- Fix `home.crackTheCode.title`: `"לפצח את הקוד"` → `"פצחו את הקוד"` (infinitive → imperative, matching all other tier titles)
- Fix `common.games.hack-the-password`: `"לפרוץ את הסיסמה"` → `"פרצו את הסיסמה"` (infinitive → imperative)
- Fix `home.crackTheCode.hackPassword.title`: `"לפרוץ את הסיסמה"` → `"פרצו את הסיסמה"` (same fix, second location)

No English strings change. No code changes. Only `he.json`.

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `i18n-completeness`: Hebrew translation accuracy — correcting wrong/inconsistent strings

## Impact

- `src/i18n/he.json` only — 5 string values changed
- Visible UI changes: Crack the Code section heading, Hack the Password game title card and page title
