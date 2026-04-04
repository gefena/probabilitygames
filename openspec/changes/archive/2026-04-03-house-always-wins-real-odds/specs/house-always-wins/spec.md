## ADDED Requirements

### Requirement: Real World Odds accordion section
The HouseAlwaysWinsPage SHALL display a "Real World Odds" section below the existing bar chart. The section SHALL contain exactly 5 accordion rows (Lottery, European Roulette, American vs European Roulette, Slot Machines, Blackjack), each collapsed by default and independently expandable.

#### Scenario: Section renders below chart
- **WHEN** the user navigates to the House Always Wins page
- **THEN** a "Real World Odds" panel appears below the existing bar chart with the section title and subtitle visible

#### Scenario: Accordion rows collapsed by default
- **WHEN** the page first loads
- **THEN** all 5 accordion rows are collapsed, showing only emoji + title + house edge badge + one-line summary

#### Scenario: Row expands on tap
- **WHEN** the user taps any collapsed accordion row
- **THEN** that row expands to show the step-by-step math detail; all other rows remain in their current state

#### Scenario: Row collapses on second tap
- **WHEN** the user taps an already-expanded accordion row
- **THEN** that row collapses back to its summary view

### Requirement: Lottery row — real combination math
The Lottery accordion row SHALL present two real lotteries side by side: Israeli Lotto (primary) and Powerball (comparison), each with exact combination counts, cost to guarantee, jackpot range, net loss, and time to fill manually.

#### Scenario: Israeli Lotto numbers displayed
- **WHEN** the user expands the Lottery row
- **THEN** the panel shows: 16,273,488 combinations [C(37,6) × 7], ₪7 per ticket, ₪114 million to guarantee, typical jackpot ₪5–15 million, guaranteed net loss at least ₪99 million, and 31 years at 1 ticket/minute

#### Scenario: Powerball numbers displayed
- **WHEN** the user expands the Lottery row
- **THEN** the panel shows: 292,201,338 combinations [C(69,5) × 26], $2 per ticket, $584 million to guarantee, jackpot after tax ~$150–250 million, guaranteed net loss ~$350 million, and 555 years at 1 ticket/minute

#### Scenario: 18× multiplier insight shown
- **WHEN** the user expands the Lottery row
- **THEN** an insight block explains that going from 37 to 69 numbers (adding 32) multiplies combinations 18× — not doubles them

### Requirement: European Roulette row — cover-all trap
The European Roulette accordion row SHALL explain the cover-all-numbers strategy, showing the guaranteed £1 loss per spin and the "37 friends" group analogy.

#### Scenario: Cover-all math displayed
- **WHEN** the user expands the European Roulette row
- **THEN** the panel shows: 37 pockets, £37 to cover all, £36 returned, −£1 net every spin

#### Scenario: Group analogy displayed
- **WHEN** the user expands the European Roulette row
- **THEN** an insight block presents the 37-friends analogy: one wins £35, 36 lose £1, casino keeps £1 from the group every spin

### Requirement: American vs European Roulette row — cost of the extra pocket
The American vs European Roulette accordion row SHALL compare both wheels numerically, showing that the single "00" pocket nearly doubles the house edge.

#### Scenario: Parallel comparison displayed
- **WHEN** the user expands the American vs European Roulette row
- **THEN** the panel shows both wheels side by side: European 37 pockets → −£1, American 38 pockets → −£2 per full cover

#### Scenario: 100-spin cost comparison displayed
- **WHEN** the user expands the American vs European Roulette row
- **THEN** the panel shows: European £2.70 expected loss vs American £5.26 over 100 spins at £1 each

#### Scenario: Always-play-European recommendation shown
- **WHEN** the user expands the American vs European Roulette row
- **THEN** an insight block states: one extra pocket costs £2.56 per £100 wagered and recommends European when a choice exists

### Requirement: Slot Machines row — hidden odds
The Slot Machines accordion row SHALL explain that RTP is set in software and not published, contrasting the transparency of roulette with the opacity of slots.

#### Scenario: RTP range and example displayed
- **WHEN** the user expands the Slot Machines row
- **THEN** the panel shows the typical RTP range (85–98%), the 92% RTP example (£1,000 in → £920 expected back), and states the odds are hidden by design

#### Scenario: Roulette contrast insight shown
- **WHEN** the user expands the Slot Machines row
- **THEN** an insight block contrasts roulette (visible wheel, countable pockets) with slots (hidden mechanism), stating this opacity is intentional

### Requirement: Blackjack row — skill shrinks the edge
The Blackjack accordion row SHALL show that basic strategy (a learnable rule chart) reduces the house edge from ~4% to ~0.5%, with the concrete monetary difference over 1,000 hands.

#### Scenario: Random vs strategy comparison displayed
- **WHEN** the user expands the Blackjack row
- **THEN** the panel shows: random play ~4% edge → ~£400 loss per £10,000 wagered vs basic strategy ~0.5% edge → ~£50 loss

#### Scenario: Monetary difference highlighted
- **WHEN** the user expands the Blackjack row
- **THEN** the difference (£350 saved) is shown as the result of knowing a simple card rule chart

#### Scenario: Card counting note shown
- **WHEN** the user expands the Blackjack row
- **THEN** an insight block mentions card counting can flip the edge to the player but casinos ban counters, and that basic strategy is legal

### Requirement: Full EN/HE i18n for Real World Odds
All text in the Real World Odds section SHALL be internationalised under the `houseAlwaysWins.realOdds.*` key namespace in both en.json and he.json. The section SHALL render correctly in RTL layout when Hebrew is active.

#### Scenario: English strings render
- **WHEN** the language is set to English
- **THEN** all accordion titles, summaries, step labels, and insight texts display in English

#### Scenario: Hebrew strings render
- **WHEN** the language is set to Hebrew
- **THEN** all accordion titles, summaries, step labels, and insight texts display in Hebrew with correct RTL alignment

#### Scenario: House edge badge renders
- **WHEN** any accordion row is visible
- **THEN** the house edge percentage badge displays with red styling (text-red-300, bg-red-950) in both languages
