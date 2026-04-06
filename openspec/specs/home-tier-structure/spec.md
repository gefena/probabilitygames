## ADDED Requirements

### Requirement: Home tier ordering reflects interaction intensity
The home page SHALL order its tiers from highest to lowest interaction intensity: competitive bot games first, deduction challenges second, solo decision/challenge games third, passive simulations last.

#### Scenario: Most interactive games appear first
- **WHEN** a user visits the home page
- **THEN** the first section they see contains games with a bot opponent and a declared winner

#### Scenario: Passive simulations appear last
- **WHEN** a user scrolls to the bottom of the home page
- **THEN** the last section contains simulation and visualisation games with no win/lose outcome

### Requirement: Beat the Bot tier uses arcade-energy copy
The "Beat the Bot" tier title and tagline SHALL use active, competitive language that communicates the adversarial nature of the games.

#### Scenario: Beat the Bot heading is visible and energetic
- **WHEN** a user views the Beat the Bot tier
- **THEN** the heading reads "Beat the Bot" and the tagline communicates pick-a-strategy competitive play

### Requirement: From Chaos to Order tier uses a dark panel
The "From Chaos to Order" tier SHALL render on a dark background panel (matching the visual treatment of Crack the Code), visually separating the simulation tier from the challenge tiers above it.

#### Scenario: From Chaos to Order has dark background
- **WHEN** a user views the From Chaos to Order tier
- **THEN** the tier section is rendered inside a dark background panel
