## MODIFIED Requirements

### Requirement: Quiz explanations are age-appropriate
Quiz explanations SHALL use plain language suitable for a 10-year-old. Academic gambling terminology (e.g. "Gambler's Fallacy") SHALL NOT appear in explanation text; the concept SHALL be explained in plain language instead.

#### Scenario: Coin flip quiz q2 explanation
- **GIVEN** the user answers the question about whether previous flips affect future ones
- **WHEN** the explanation is revealed
- **THEN** the text explains that the coin has no memory and each flip is independent
- **AND** the phrase "Gambler's Fallacy" does not appear in the explanation
