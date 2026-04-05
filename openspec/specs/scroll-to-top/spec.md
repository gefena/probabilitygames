### Requirement: Scroll to top on route change
The application SHALL scroll the window to the top whenever the URL pathname changes.

#### Scenario: User navigates from home page to a game
- **WHEN** the user clicks a game card on the home page (which may be scrolled down)
- **THEN** the game page is displayed scrolled to the very top, showing the back button and game title

#### Scenario: User navigates back to home
- **WHEN** the user clicks the back-to-home button from any game page
- **THEN** the home page is displayed from the top
