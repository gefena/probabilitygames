## MODIFIED Requirements

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
