## 1. Page Shell and Navigation

- [x] 1.1 Create `src/pages/HouseAlwaysWinsPage.jsx` with the page layout: title, subtitle, three game cards, and comparison chart
- [x] 1.2 Add route `/house-always-wins` in `src/App.jsx`
- [x] 1.3 Add a home-page card or featured link in `HomePage.jsx` (emoji 🏦, distinct from the five game cards — perhaps a separate "Learn more" section)

## 2. Lottery Card

- [x] 2.1 Render the lottery explainer card with: simplified jackpot odds (1/1000), payout (500 coins), ticket cost (5 coins), computed EV (−4.5 coins/ticket), house edge (~90%)
- [x] 2.2 Implement the lottery mini-simulator: balance state, "Buy ticket" and "×10" buttons, weighted-random outcome (1/1000 jackpot), balance chart (Recharts Line) showing actual vs. EV trend
- [x] 2.3 Label the simulator clearly as "simplified" to distinguish from real lottery odds

## 3. Slot Machine Card

- [x] 3.1 Render the slot machine card: P(jackpot) = 1/1000, payout = 800 coins, cost = 1 coin, EV = −0.2 coins/spin, house edge = 20%
- [x] 3.2 Implement the slot machine mini-simulator: balance state, "Spin" and "×10" buttons, balance chart

## 4. Roulette Card

- [x] 4.1 Render the roulette card: P(win) = 1/37, payout = 35:1, EV ≈ −0.027 coins/coin, house edge ≈ 2.7%
- [x] 4.2 Implement the roulette mini-simulator: balance state, "Bet" and "×10" buttons, balance chart

## 5. House Edge Comparison Chart

- [x] 5.1 Render a Recharts horizontal `BarChart` comparing house edge: Slots 20%, Roulette 2.7%, Lottery ~90% — color coded red (high edge) to green (low edge)

## 6. Explainer and i18n

- [x] 6.1 Add an `ExplainerPanel` at the top of the page explaining house edge = 1 − (total payout / total wagered) and why all these games are designed to lose money over time
- [x] 6.2 Add `houseAlwaysWins.*` i18n keys to `en.json` and `he.json` (all card labels, simulator labels, explainer text)
