## MODIFIED Requirements

### Requirement: Prize Machine explainer uses age-appropriate examples
The Prize Machine explainer `example` field SHALL express expected value in terms of "play N times and expect to lose/gain X coins total" rather than presenting a multi-step decimal multiplication chain.

#### Scenario: EV explainer example
- **GIVEN** the user reads the ExplainerPanel on PrizeMachinePage
- **WHEN** they read the `example` text
- **THEN** the example describes the outcome over 100 plays in plain language
- **AND** does not require the reader to multiply decimal probabilities
