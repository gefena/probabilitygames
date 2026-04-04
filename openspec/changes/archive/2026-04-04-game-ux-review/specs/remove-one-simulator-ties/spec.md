## ADDED Requirements

### Requirement: Remove One simulator counts tie outcomes correctly
The `simulateGame` function SHALL detect when multiple boards clear on the same roll and attribute the win fractionally (0.5 per tied player) rather than returning the first player found in iteration order.

#### Scenario: Two boards clear on the same roll in simulation
- **WHEN** both the player and Larry (or Max) remove their last token on the same simulated roll
- **THEN** each tied player SHALL receive 0.5 wins credited in the simulation results, not 1.0 to the player and 0 to Larry/Max

#### Scenario: All three boards clear simultaneously
- **WHEN** all three boards clear on the same simulated roll
- **THEN** each player SHALL receive approximately 0.33 wins credited

#### Scenario: Simulator win percentages are consistent with live game tie outcomes
- **WHEN** the simulator runs 1000 games on a placement that frequently ties with Larry
- **THEN** the simulated `you` win percentage SHALL be lower than if ties were counted as `you` wins
