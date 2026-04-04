## ADDED Requirements

### Requirement: Home page with game cards
The site SHALL display a home page listing all five games as large, colorful clickable cards with an icon, title, and one-sentence description of the probability concept covered.

#### Scenario: Home page loads
- **WHEN** the user navigates to `/`
- **THEN** five game cards are displayed in a responsive grid, each with a title, icon/illustration, and short description

#### Scenario: Navigating to a game
- **WHEN** the user clicks a game card
- **THEN** the browser navigates to the game's route and the game loads

### Requirement: Language switcher
The site SHALL provide a visible toggle to switch between English and Hebrew. Switching language SHALL update all UI text and flip the layout direction (LTR ↔ RTL) without a page reload.

#### Scenario: Switch to Hebrew
- **WHEN** the user selects Hebrew from the language switcher
- **THEN** all visible text changes to Hebrew, the `dir` attribute on `<html>` becomes `rtl`, and all layout elements mirror correctly

#### Scenario: Switch back to English
- **WHEN** the user selects English from the language switcher
- **THEN** all visible text changes to English and the layout returns to LTR

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
