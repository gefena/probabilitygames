### Requirement: Home page with game cards
The site SHALL display a home page organising all games into four complexity tiers (Start Here, Go Deeper, Crack the Code, Patterns in Chaos). Each tier displays a heading, tagline, and a responsive grid of `GameCard` entries. Every game in the project SHALL have a visible card in one of the four tiers.

#### Scenario: Home page loads
- **WHEN** the user navigates to `/`
- **THEN** four tier sections are displayed in complexity order, each with a heading, tagline, and one or more game cards

#### Scenario: Navigating to a game
- **WHEN** the user clicks a game card in any tier
- **THEN** the browser navigates to the game's route and the game loads

#### Scenario: All games are accessible
- **WHEN** the user views the complete home page
- **THEN** every game has a visible card in one of the four tiers

### Requirement: Routes for all game pages
`App.jsx` SHALL include a route for every game card shown on the home page. Each route SHALL point to the corresponding page component.

#### Scenario: Direct navigation to any game
- **WHEN** the user navigates directly to a game's route (e.g. `#/dice-detective`)
- **THEN** the corresponding game page renders without error

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
Every game page SHALL include a clearly labeled "← Games" / "→ משחקים" pill-chip button that returns the user to the home page. The button SHALL use a white background, soft shadow, and `rounded-full` shape consistent with the site's card aesthetic. The button SHALL have sufficient padding to provide a comfortable tap target (minimum ~44 px touch height) on mobile devices.

#### Scenario: Back to home from a game
- **WHEN** the user clicks the Games button on any game page
- **THEN** the browser navigates to `/` and the home page is displayed

#### Scenario: Tap target on mobile
- **WHEN** the user views any game page on a mobile device (viewport ≤ 640 px)
- **THEN** the Games button has a vertical tap area of at least 44 px (via padding) and is easy to tap without precision

#### Scenario: Pill chip appearance
- **WHEN** the Games button is rendered on any game page
- **THEN** it appears as a white rounded-full chip with a subtle shadow, visually distinct from plain text and consistent with the site's card aesthetic

### Requirement: Responsive layout
The site SHALL be usable on screens ≥ 375 px wide (mobile phones, tablets, and desktop). Content SHALL not overflow or clip at any of these widths. Multi-column layouts SHALL collapse to a single column on screens narrower than 768 px.

#### Scenario: Mobile layout
- **WHEN** the viewport width is 375 px
- **THEN** all game cards and game UIs are fully visible and usable without horizontal scrolling, and controls have touch-friendly tap targets (≥ 44 px)

#### Scenario: Tablet layout
- **WHEN** the viewport width is 768 px
- **THEN** all game cards and game UIs are fully visible and usable without horizontal scrolling

### Requirement: Playful visual theme
The site SHALL use a soft, lower-contrast color palette, rounded corners, large friendly typography, and smooth transitions to create an engaging, eye-friendly aesthetic. The global background SHALL use a soft slate tone (e.g. `slate-100`) rather than pure white or high-vibrancy violet, ensuring a comfortable viewing experience during extended use.

#### Scenario: Visual consistency
- **WHEN** the user visits any page
- **THEN** the page uses the shared color palette (slate-100 background), typography scale, and spacing defined in the design tokens (no plain-HTML default styling visible)

#### Scenario: Comfortable viewing
- **WHEN** the user views large container panels
- **THEN** the panels are clearly defined but do not cause eye strain from high-brightness contrast against the global background

### Requirement: Localized mobile header title
The mobile header title (visible on screens < 640px) SHALL be retrieved via the i18n key `site.title` and SHALL NOT be hardcoded in English.

#### Scenario: Mobile header in Hebrew
- **WHEN** the user switches to Hebrew and views the site on a mobile device
- **THEN** the mobile header displays the translated site title ("מגרש המשחקים של ההסתברות")

### Requirement: Readable text scale in shared panels
The `ExplainerPanel` and `QuizPanel` shared components SHALL render reading content (body text, examples, quiz questions, quiz options, quiz explanations) at `text-base` (16 px) — the browser default — not below it. Section headings within panels SHALL be larger than body text to maintain visual hierarchy.

#### Scenario: Explainer body text is legible
- **WHEN** a game page renders an ExplainerPanel
- **THEN** the body, example, and callout text is displayed at 16 px (text-base)

#### Scenario: Quiz question is legible
- **WHEN** a game page renders a QuizPanel
- **THEN** the question text, option labels, and explanation text are displayed at 16 px (text-base)

#### Scenario: Panel headings are visually distinct
- **WHEN** ExplainerPanel or QuizPanel are rendered
- **THEN** the section heading (💡 / 🧠) is larger than the body text beneath it
