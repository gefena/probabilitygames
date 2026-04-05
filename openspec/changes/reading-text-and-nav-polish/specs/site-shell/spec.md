## MODIFIED Requirements

### Requirement: Navigation back to home
Every game page SHALL include a clearly labeled "← Home" / "← בית" button that returns the user to the home page. The button SHALL have sufficient padding to provide a comfortable tap target (minimum ~44 px touch height) on mobile devices.

#### Scenario: Back to home from a game
- **WHEN** the user clicks the Home button on any game page
- **THEN** the browser navigates to `/` and the home page is displayed

#### Scenario: Tap target on mobile
- **WHEN** the user views any game page on a mobile device (viewport ≤ 640 px)
- **THEN** the Home button has a vertical tap area of at least 44 px (via padding) and is easy to tap without precision

## ADDED Requirements

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
