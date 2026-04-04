## MODIFIED Requirements

### Requirement: Home page with game cards
The site SHALL display a home page organising all games into four complexity tiers (Start Here, Go Deeper, Crack the Code, Patterns in Chaos). Each tier displays a heading, tagline, and a responsive grid of `GameCard` entries. All 15 games SHALL be reachable from the home page.

#### Scenario: Home page loads
- **WHEN** the user navigates to `/`
- **THEN** four tier sections are displayed in complexity order, each with a heading, tagline, and one or more game cards

#### Scenario: Navigating to a game
- **WHEN** the user clicks a game card in any tier
- **THEN** the browser navigates to the game's route and the game loads

#### Scenario: All games are accessible
- **WHEN** the user views the complete home page
- **THEN** all 15 games have a visible card in one of the four tiers
