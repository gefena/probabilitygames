## ADDED Requirements

### Requirement: ExplainerPanel is collapsible
ExplainerPanel SHALL support collapsing and expanding its content. The title row SHALL act as a toggle button. A chevron icon SHALL indicate the current state (▲ open, ▼ closed).

#### Scenario: Panel starts open
- **WHEN** a game page loads
- **THEN** the ExplainerPanel is fully expanded showing all content sections

#### Scenario: Clicking the title collapses the panel
- **WHEN** the user clicks the ExplainerPanel title row while the panel is open
- **THEN** the body, example, callout, and furtherReading sections collapse with a smooth animation

#### Scenario: Clicking the title expands the panel
- **WHEN** the user clicks the ExplainerPanel title row while the panel is collapsed
- **THEN** the content sections expand with a smooth animation

### Requirement: Collapse animation is smooth
The collapse and expand transitions SHALL use an animated height change so the content does not snap open or closed.

#### Scenario: Smooth expand
- **WHEN** the panel transitions from collapsed to open
- **THEN** the content reveals with an animated height transition, not a sudden jump

#### Scenario: Smooth collapse
- **WHEN** the panel transitions from open to collapsed
- **THEN** the content hides with an animated height transition, not a sudden disappearance
