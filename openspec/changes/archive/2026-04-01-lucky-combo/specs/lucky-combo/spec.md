## ADDED Requirements

### Requirement: Event configuration
The Lucky Combo game SHALL allow the user to configure two independent events (Event A and Event B). Each event SHALL have 2–4 named outcomes with integer weights. One outcome per event SHALL be designatable as the "success" outcome (marked with a star icon). Weights need not sum to any particular value — probabilities are derived from weight/total.

#### Scenario: Change success outcome
- **WHEN** the user clicks the star icon next to a different outcome
- **THEN** that outcome becomes the success outcome and the combined probability updates immediately

### Requirement: AND / OR combinator
The game SHALL provide an AND / OR toggle. AND mode computes P(A success AND B success) = P(A) × P(B). OR mode computes P(A success OR B success) = P(A) + P(B) − P(A AND B).

#### Scenario: AND probability
- **WHEN** P(A success) = 0.5 and P(B success) = 0.5 and AND is selected
- **THEN** the combined probability displays as 25%

#### Scenario: OR probability
- **WHEN** P(A success) = 0.5 and P(B success) = 0.5 and OR is selected
- **THEN** the combined probability displays as 75%

### Requirement: Tree diagram
The game SHALL display an SVG tree diagram showing all outcome combinations. Winning branches (those that satisfy the AND/OR condition) SHALL be highlighted in green; others in grey. Each branch SHALL show its probability fraction.

#### Scenario: AND tree highlights one branch
- **WHEN** AND mode is active
- **THEN** only the branch where both events are success is highlighted green

#### Scenario: OR tree highlights multiple branches
- **WHEN** OR mode is active
- **THEN** all branches where at least one event is success are highlighted green

### Requirement: Trial simulation
The game SHALL support running ×1 and ×100 trials. After each trial set, the observed combined-event frequency SHALL update and be displayed alongside the theoretical probability.

#### Scenario: Frequency converges to theory
- **WHEN** the user runs 1000 total trials
- **THEN** the observed frequency is close to the theoretical combined probability

### Requirement: Bilingual support
All text SHALL be available in English and Hebrew.

#### Scenario: Hebrew mode
- **WHEN** the global language is Hebrew
- **THEN** all Lucky Combo text displays in Hebrew with RTL layout
