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

### Requirement: Language switcher
The site SHALL provide a visible toggle to switch between English and Hebrew. Switching language SHALL update all UI text and flip the layout direction (LTR ↔ RTL) without a page reload. The switcher buttons SHALL display emoji country flags (🇬🇧 for English, 🇮🇱 for Hebrew) instead of text labels, making the control immediately recognisable to young users.

#### Scenario: Switch to Hebrew
- **WHEN** the user selects Hebrew from the language switcher
- **THEN** all visible text changes to Hebrew, the `dir` attribute on `<html>` becomes `rtl`, and all layout elements mirror correctly

#### Scenario: Switch back to English
- **WHEN** the user selects English from the language switcher
- **THEN** all visible text reverts to English and the `dir` attribute on `<html>` becomes `ltr`

#### Scenario: Flag buttons identify languages
- **WHEN** the language switcher is visible
- **THEN** the English option shows 🇬🇧 and the Hebrew option shows 🇮🇱

### Requirement: Persistent language preference
The site SHALL remember the user's language choice across page reloads using localStorage.

#### Scenario: Language persists after reload
- **WHEN** the user selects Hebrew and then reloads the page
- **THEN** the site loads in Hebrew with RTL layout

### Requirement: Navigation back to home
Every game page SHALL include a clearly labeled "Home" / "בית" button that returns the user to the home page.

#### Scenario: Back to home from a game
- **WHEN** the user clicks the Home button on any game page
- **THEN** the browser navigates to `/` and the home page is displayed

### Requirement: Responsive layout
The site SHALL be usable on screens ≥ 375 px wide (mobile phones, tablets, and desktop). Content SHALL not overflow or clip at any of these widths. Multi-column layouts SHALL collapse to a single column on screens narrower than 768 px.

#### Scenario: Mobile layout
- **WHEN** the viewport width is 375 px
- **THEN** all game cards and game UIs are fully visible and usable without horizontal scrolling, and controls have touch-friendly tap targets (≥ 44 px)

#### Scenario: Tablet layout
- **WHEN** the viewport width is 768 px
- **THEN** all game cards and game UIs are fully visible and usable without horizontal scrolling

### Requirement: Playful visual theme
The site SHALL use a bright color palette, rounded corners, large friendly typography, and smooth transitions to create an engaging, kid-friendly aesthetic.

#### Scenario: Visual consistency
- **WHEN** the user visits any page
- **THEN** the page uses the shared color palette, typography scale, and spacing defined in the design tokens (no plain-HTML default styling visible)


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


### Requirement: Route for Roll & Race page
`App.jsx` SHALL include the route `/roll-and-race` pointing to `RollAndRacePage`.

#### Scenario: Direct navigation to roll-and-race
- **WHEN** the user navigates to `#/roll-and-race`
- **THEN** RollAndRacePage renders

### Requirement: Route for Remove One page
`App.jsx` SHALL include the route `/remove-one` pointing to `RemoveOnePage`.

#### Scenario: Direct navigation to remove-one
- **WHEN** the user navigates to `#/remove-one`
- **THEN** RemoveOnePage renders

### Requirement: Route for Higher or Lower page
`App.jsx` SHALL include the route `/higher-or-lower` pointing to `HigherOrLowerPage`.

#### Scenario: Direct navigation to higher-or-lower
- **WHEN** the user navigates to `#/higher-or-lower`
- **THEN** HigherOrLowerPage renders

### Requirement: Route for Probability Bingo page
`App.jsx` SHALL include the route `/probability-bingo` pointing to `ProbabilityBingoPage`.

#### Scenario: Direct navigation to probability-bingo
- **WHEN** the user navigates to `#/probability-bingo`
- **THEN** ProbabilityBingoPage renders

### Requirement: Route for Pizza Builder page
`App.jsx` SHALL include the route `/pizza-builder` pointing to `PizzaBuilderPage`.

#### Scenario: Direct navigation to pizza-builder
- **WHEN** the user navigates to `#/pizza-builder`
- **THEN** PizzaBuilderPage renders

### Requirement: Route for Climber Race page
`App.jsx` SHALL include the route `/climber-race` pointing to `ClimberRacePage`.

#### Scenario: Direct navigation to climber-race
- **WHEN** the user navigates to `#/climber-race`
- **THEN** ClimberRacePage renders

## ADDED Requirements

### Requirement: Route for Bridge Quest page
`App.jsx` SHALL include the route `/bridge-quest` pointing to `BridgeQuestPage`.

#### Scenario: Direct navigation to bridge-quest
- **WHEN** the user navigates to `#/bridge-quest`
- **THEN** BridgeQuestPage renders
