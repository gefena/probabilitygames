## ADDED Requirements

### Requirement: Fade transition between routes
The application SHALL apply a short opacity fade when navigating between routes. The outgoing and incoming pages SHALL fade simultaneously.

#### Scenario: Navigating to a game page
- **WHEN** the user navigates from the home page to any game page
- **THEN** the content fades out and the new content fades in over approximately 150ms

#### Scenario: Navigating back to home
- **WHEN** the user navigates from a game page back to the home page
- **THEN** the same fade transition applies

### Requirement: Transition does not block interaction
The fade transition SHALL complete within 200ms so that it never feels like a loading delay.

#### Scenario: Transition duration
- **WHEN** any route change occurs
- **THEN** the full fade transition completes in 150ms or less
