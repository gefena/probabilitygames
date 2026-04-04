## 1. Mode Toggle

- [x] 1.1 Add `mode` state ('lab'|'streak') to `CoinFlipPage.jsx` and render a two-button toggle ("Flip Lab" / "Streak Hunter") at the top of the page
- [x] 1.2 In Streak Hunter mode, hide the stats panel and chart; show the streak UI instead

## 2. Flip History Sequence

- [x] 2.1 Add `flipHistory` state (array of 'H'|'T') updated on every flip
- [x] 2.2 Render the history as a flex-wrap row of 12×12 colored squares (purple = H, pink = T), capped at last 100; auto-scroll to newest using a `useRef`

## 3. Current Streak Display

- [x] 3.1 Derive `currentStreak` (type + length) from `flipHistory`; display it prominently (e.g., "🔥 Heads × 5")

## 4. Streak Prediction

- [x] 4.1 Add `prediction` state (null | 'continues' | 'breaks') and `score` state
- [x] 4.2 Show "Streak continues" and "Streak breaks" prediction buttons before each flip; disable Flip button until a prediction is made
- [x] 4.3 After the flip, evaluate the prediction, animate correct/wrong feedback, increment score if correct, then reset `prediction` to null

## 5. Streak Histogram

- [x] 5.1 Add `streakLengths` state (object: length → count); update when a streak ends
- [x] 5.2 Render a Recharts `BarChart` of streak lengths (x = length, y = count)

## 6. i18n

- [x] 6.1 Add `coin.streak.*` keys to `en.json` and `he.json` (mode labels, prediction buttons, score label, histogram title)
