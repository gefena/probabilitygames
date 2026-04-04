## ADDED Requirements

### Requirement: Greedy Pig card on home page
The home page "Explore More" section SHALL include a card for GreedyPigPage.

#### Scenario: Home page shows Greedy Pig card
- **WHEN** a user visits the home page
- **THEN** a Greedy Pig card is visible in the Explore More section with title, emoji, and description

### Requirement: Route for Greedy Pig page
`App.jsx` SHALL include the route `/greedy-pig` pointing to `GreedyPigPage`.

#### Scenario: Direct navigation to greedy pig
- **WHEN** the user navigates to `#/greedy-pig`
- **THEN** GreedyPigPage renders
