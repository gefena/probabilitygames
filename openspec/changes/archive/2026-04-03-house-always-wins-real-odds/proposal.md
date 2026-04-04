## Why

The House Always Wins page teaches expected value and house edge using simplified, illustrative numbers. Players have no reference point for how these concepts apply to real gambling they hear about. A "Real World Odds" section at the bottom closes that gap — showing the actual math of real games with concrete, tangible comparisons (how many tickets, how much it costs to guarantee a win, how pool size explodes combinations).

## What Changes

- Add a "Real World Odds" accordion section at the bottom of HouseAlwaysWinsPage, covering: Israeli Lotto vs Powerball (two-lottery comparison showing how pool size affects combinations), European Roulette (cover-all-numbers trap), American vs European Roulette (cost of the extra pocket), Slot Machines (hidden odds), and Blackjack (skill vs no-skill edge)
- Each accordion row shows: house edge %, collapsed summary line, expanded concrete math ("N tickets × price = total cost to guarantee; jackpot after tax = Y; net guaranteed loss = Z")
- Two-lottery comparison shows how increasing the pool from 37→69 numbers multiplies combinations 18× — making the odds tangible through the contrast

## Capabilities

### New Capabilities
*(none)*

### Modified Capabilities
- `house-always-wins`: add Real World Odds accordion section and corresponding i18n keys

## Impact

- Modified: `src/pages/HouseAlwaysWinsPage.jsx` — new `RealOddsSection` component at the bottom of the page
- Modified: `src/i18n/en.json`, `src/i18n/he.json` — new keys under `houseAlwaysWins.realOdds.*`
