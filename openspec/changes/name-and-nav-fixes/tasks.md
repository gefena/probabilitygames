## 1. Hebrew Game Name Corrections

- [x] 1.1 In `src/i18n/he.json`, change `common.games.coin-flip` from "מעבדת הטבעת מטבע" to "מעבדת הטלת מטבעות"
- [x] 1.2 In `src/i18n/he.json`, change `common.games.roll-and-race` from "גלגלו ותחרות" to "גלגלו והתחרו"
- [x] 1.3 In `src/i18n/he.json`, change `common.games.monte-carlo-pi` from "מונטה קרלו π" to "מונטה קרלו π (פאי)"

## 2. Scroll to Top on Navigation

- [x] 2.1 In `src/App.jsx`, add a `useEffect` keyed on `location.pathname` that calls `window.scrollTo(0, 0)`

## 3. Climber Race — Replace Old Color Names in Quiz & Explainer Text

- [x] 3.1 In `src/i18n/en.json` climberRace quiz q1: replace "Sunny" → "Yellow", "Storm" → "Blue" in question, answer a, and explanation text
- [x] 3.2 In `src/i18n/en.json` climberRace quiz q2 & q3: replace "Ivy" → "Green" wherever it appears
- [x] 3.3 In `src/i18n/en.json` climberRace explainer body: replace "Sunny" → "Yellow", "Storm" → "Blue"
- [x] 3.4 In `src/i18n/he.json` climberRace quiz q1: replace "שמשון" → "צהוב", "סערה" → "כחול", "בלייז" → "אדום", "איבי" → "ירוק" in question, answer a, and explanation
- [x] 3.5 In `src/i18n/he.json` climberRace quiz q2 & q3: replace "איבי" → "ירוק" wherever it appears
- [x] 3.6 In `src/i18n/he.json` climberRace explainer body: replace "שמשי" → "צהוב", "סערה" → "כחול"
