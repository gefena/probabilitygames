## Why

Kids (and adults) regularly encounter real-world games of chance — lotteries, slot machines, roulette, scratch cards — without understanding why they are designed to lose money over time. Adding a dedicated educational section that explains the mathematics behind "the house always wins" gives kids a powerful real-world lens for the expected value concept and helps build healthy skepticism about gambling.

## What Changes

- Add a new **House Always Wins** page (accessible from the home page) with three interactive explainer cards covering: the lottery, a slot machine, and roulette.
- Each card shows the real odds, the real payout, the expected value per play, and an interactive simulator ("spend $10 on tickets and see what you get back on average").
- A "total winnings over time" chart shows the house edge eroding the player's balance regardless of individual wins.
- The tone is educational and neutral — not anti-gambling moralising, but clear math that empowers kids to understand the design.

## Capabilities

### New Capabilities

- `house-always-wins`: Educational page with interactive explainers for lottery, slot machine, and roulette, each showing real expected value and a simulation.

### Modified Capabilities

_(none)_

## Impact

- New file: `src/pages/HouseAlwaysWinsPage.jsx`
- New route in `src/App.jsx`
- New home-page card or nav link in `src/pages/HomePage.jsx`
- New i18n keys under `houseAlwaysWins.*`
- No new dependencies
