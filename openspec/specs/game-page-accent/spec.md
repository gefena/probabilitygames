## ADDED Requirements

### Requirement: Coloured accent bar at top of each game page
Each game page SHALL display a subtle coloured horizontal bar at the very top of its content area. The colour SHALL match the game's card colour on the home page. The bar SHALL fade to transparent toward the right.

#### Scenario: Accent bar visible on game page
- **WHEN** the user navigates to any game page
- **THEN** a thin coloured gradient bar is visible at the top of the page content, above the back button

#### Scenario: Accent colour matches home card
- **WHEN** a game's home card uses a violet background
- **THEN** the game page accent bar is also violet

#### Scenario: Unknown path falls back gracefully
- **WHEN** a game page is accessed whose path has no entry in the accent lookup table
- **THEN** the accent bar defaults to violet without error
