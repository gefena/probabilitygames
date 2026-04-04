## ADDED Requirements

### Requirement: House Always Wins page
The site SHALL include a "Why the House Always Wins" educational page, accessible from the home page. The page SHALL explain the concept of expected value and house edge through three interactive examples: a simplified lottery, a simplified slot machine, and European roulette.

#### Scenario: Page accessible from home
- **WHEN** the user visits the home page
- **THEN** a card or link for "Why the House Always Wins" is visible and navigates to the page

### Requirement: Lottery explainer card
The page SHALL include an interactive card for a simplified lottery. The card SHALL display: the probability of winning the jackpot, the jackpot payout in coins, the ticket cost in coins, and the expected value per ticket. A mini-simulator SHALL allow the user to "buy" multiple tickets and see cumulative winnings vs. the EV trend.

#### Scenario: Lottery EV is strongly negative
- **WHEN** the lottery card is displayed
- **THEN** the expected value per ticket is shown as a negative number (house edge ~96%), highlighted in red

#### Scenario: Lottery simulation runs
- **WHEN** the user clicks the play button on the lottery simulator
- **THEN** tickets are purchased and the balance chart updates showing actual vs. EV trend

### Requirement: Slot machine explainer card
The page SHALL include an interactive card for a simplified slot machine (3 reels, 10 symbols each, 1 jackpot symbol per reel). The card SHALL display: P(jackpot) = 1/1000, payout = 800 coins, cost = 1 coin, EV = −0.2 coins/spin. A mini-simulator SHALL allow spinning.

#### Scenario: Slot machine house edge displayed
- **WHEN** the slot machine card is displayed
- **THEN** the house edge is shown as 20%

### Requirement: Roulette explainer card
The page SHALL include an interactive card for European roulette (37 numbers, single-number bet). The card SHALL display: P(win) = 1/37, payout = 35:1, EV ≈ −0.027 coins per coin bet, house edge ≈ 2.7%. A mini-simulator SHALL allow placing bets.

#### Scenario: Roulette has lowest house edge
- **WHEN** all three cards are visible
- **THEN** the roulette card shows the lowest house edge (2.7%) among the three examples

### Requirement: House edge comparison
The page SHALL display a horizontal bar chart comparing the house edge of all three games side by side, making the lottery's extreme disadvantage visually obvious.

#### Scenario: Comparison chart renders
- **WHEN** the page loads
- **THEN** a bar chart shows three bars: Slots (20%), Roulette (2.7%), Lottery (~96%)

### Requirement: Bilingual support
All text SHALL be available in English and Hebrew.

#### Scenario: Hebrew mode
- **WHEN** the global language is Hebrew
- **THEN** all House Always Wins page text displays in Hebrew with RTL layout
