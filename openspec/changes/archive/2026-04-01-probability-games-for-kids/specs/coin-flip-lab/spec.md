## ADDED Requirements

### Requirement: Animated coin flip
The game SHALL display a large animated coin that flips (3D rotation animation) each time the user triggers a flip, landing on Heads or Tails. The result SHALL be determined by a fair random 50/50 calculation.

#### Scenario: Single flip
- **WHEN** the user clicks the "Flip!" button
- **THEN** the coin plays a 3D flip animation and displays the result (Heads or Tails) with the matching face

#### Scenario: Fair randomness
- **WHEN** the user performs 1000 flips total
- **THEN** both outcomes are possible on every flip (no deterministic sequence)

### Requirement: Multi-flip mode
The game SHALL allow the user to flip 10 or 100 coins at once using a selector. When flipping many coins, each result SHALL be added to the running totals instantly (no per-coin animation; only a summary animation).

#### Scenario: Flip 10 at once
- **WHEN** the user selects "×10" and clicks Flip
- **THEN** 10 results are generated at once, the totals update by 10, and a quick burst animation plays

#### Scenario: Flip 100 at once
- **WHEN** the user selects "×100" and clicks Flip
- **THEN** 100 results are generated instantly and totals update

### Requirement: Live statistics panel
The game SHALL show a statistics panel that updates after every flip, displaying: total flips, heads count, tails count, heads percentage, and a bar chart of heads vs. tails frequencies.

#### Scenario: Stats update after flip
- **WHEN** a flip (or batch of flips) completes
- **THEN** all statistics and the bar chart update to reflect the new totals

#### Scenario: Percentage approaches 50%
- **WHEN** the user has performed many flips
- **THEN** the heads percentage value is visible and animated toward 50% over time

### Requirement: Reset
The game SHALL include a Reset button that clears all flip history and resets statistics to zero.

#### Scenario: Reset clears history
- **WHEN** the user clicks Reset
- **THEN** all counters return to 0, the chart resets, and the coin returns to its neutral state

### Requirement: Bilingual content
All labels, buttons, and instructional text in this game SHALL be available in both English and Hebrew, controlled by the global language setting.

#### Scenario: Hebrew mode
- **WHEN** the global language is set to Hebrew
- **THEN** all in-game text (button labels, stat labels, instructions) displays in Hebrew
