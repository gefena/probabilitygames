## ADDED Requirements

### Requirement: No-refill draw mode
The Candy Jar game SHALL offer a "No Refill" toggle. When enabled, each drawn candy is removed from the jar, reducing the count of that colour by 1. The jar composition and probability displays SHALL update after each draw to reflect the new counts.

#### Scenario: Drawn candy is removed
- **WHEN** No Refill mode is active and a red candy is drawn
- **THEN** the red candy count decreases by 1 and the probability percentages update accordingly

#### Scenario: Empty jar prompt
- **WHEN** all candy counts reach 0 in No Refill mode
- **THEN** the draw button is disabled and a "Jar is empty — reset to refill" message is shown

#### Scenario: Reset restores jar in no-refill mode
- **WHEN** the user clicks Reset Draws in No Refill mode
- **THEN** all candy counts return to the most recently configured composition and draw history clears

#### Scenario: Batch draw stops at empty jar
- **WHEN** No Refill mode is active and a ×10 draw is started with only 6 candies remaining
- **THEN** exactly 6 draws occur (not 10) and the jar empties
