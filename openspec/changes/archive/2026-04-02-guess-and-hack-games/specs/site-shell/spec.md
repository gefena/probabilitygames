## ADDED Requirements

### Requirement: Crack the Code home page section
The home page SHALL include a new "Crack the Code" section containing cards for GuessThePhonePage and HackThePasswordPage. The section SHALL use a distinct dark background (matching the Patterns in Chaos section style) to signal a different game category.

#### Scenario: Home page shows Crack the Code section
- **WHEN** a user visits the home page
- **THEN** a "Crack the Code" section is visible containing cards for both new games

### Requirement: Routes for new game pages
`App.jsx` SHALL include routes `/guess-the-phone` and `/hack-the-password` pointing to the respective page components.

#### Scenario: Direct navigation to guess-the-phone
- **WHEN** the user navigates to `#/guess-the-phone`
- **THEN** GuessThePhonePage renders

#### Scenario: Direct navigation to hack-the-password
- **WHEN** the user navigates to `#/hack-the-password`
- **THEN** HackThePasswordPage renders
