## 1. Nudge utility functions

- [ ] 1.1 Create `src/utils/nudges.js` with a `getCoinFlipNudge(state)` function: takes `{ heads, tails, total, lastBatch }`, returns `{ key, params }` or `null`. Implement the √n-based normal-range check (within 1.5 SD → normal, beyond 2 SD → unusual), the 100+ convergence nudge, and the ×100 batch nudge
- [ ] 1.2 Add `getGaltonNudge(state)` function: takes `{ totalBalls, bins, rows }`, returns nudge key at 500+ balls about the bell curve / CLT
- [ ] 1.3 Add `getCandyJarNudge(state)` function: takes `{ prevProb, currentProb, composition }`, returns nudge key when composition changes shift probability or when a color crosses 50%
- [ ] 1.4 Add `getLuckyDiceNudge(state)` function: takes `{ rolls, faceCounts, loadedFace, loadedWeight }`, returns nudge key at 50+ rolls comparing observed vs expected frequency

## 2. i18n strings

- [ ] 2.1 Add all nudge text keys to `src/i18n/en.json` under `nudges.coinFlip.*`, `nudges.galton.*`, `nudges.candyJar.*`, `nudges.luckyDice.*` with interpolation variables
- [ ] 2.2 Add matching Hebrew translations to `src/i18n/he.json`

## 3. NudgeBanner component

- [ ] 3.1 Create a `NudgeBanner` component that accepts a nudge key + params, renders translated text with `AnimatePresence` fade-in/out (`opacity` + `y` transition), styled as muted inline text

## 4. Integrate into game pages

- [ ] 4.1 Wire `getCoinFlipNudge` into `CoinFlipPage.jsx` — call on state change, render `NudgeBanner` near the stats display
- [ ] 4.2 Wire `getGaltonNudge` into `GaltonBoardPage.jsx` — call after drops, render `NudgeBanner` near the histogram. At 50+ balls, overlay the theoretical binomial distribution as a `Line` series on the Recharts histogram
- [ ] 4.3 Wire `getCandyJarNudge` into `CandyJarPage.jsx` — call on composition change and draw results, render `NudgeBanner` near the probability display
- [ ] 4.4 Wire `getLuckyDiceNudge` into `LuckyDicePage.jsx` — call after rolls, render `NudgeBanner` near the frequency chart
