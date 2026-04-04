## 1. Two-dice mode

- [ ] 1.1 Add state for game mode (`single` vs `double`) and two-dice sum tracking
- [ ] 1.2 Show "Level Up!" animation when streak reaches 5, switch to two-dice mode
- [ ] 1.3 Render two dice side by side when in double mode, display their sum prominently
- [ ] 1.4 Update odds calculation to compute P(sum > current) and P(sum < current) for two d6
- [ ] 1.5 Update odds panel to show a mini histogram of sum probabilities (2–12) with higher/lower regions shaded
- [ ] 1.6 Add i18n strings for two-dice mode to `en.json` and `he.json`

## 2. Double-or-nothing

- [ ] 2.1 Show an optional "Bet it all" button when streak ≥ 3 — player picks an exact value
- [ ] 2.2 If correct, double the streak; if wrong, reset to 0 with a dramatic animation
- [ ] 2.3 Show the exact-match probability next to the bet (e.g. "1/6 chance" or "5/36 chance" in two-dice mode)
- [ ] 2.4 Add i18n strings for double-or-nothing UI to `en.json` and `he.json`

## 3. Update explainer

- [ ] 3.1 Add content to the explainer about sum distributions — why 7 is the most common sum with two dice
