## ADDED Requirements

### Requirement: Dice Detective quiz panel renders correctly
The Dice Detective game page SHALL include a QuizPanel mounted with conformant question data. The page SHALL not crash on load due to a schema mismatch between the question bank and the QuizPanel component.

#### Scenario: Game page loads without error
- **WHEN** the user navigates to `/dice-detective`
- **THEN** the game UI (dice display, question, grid) and the quiz panel below it are both visible with no blank page or JavaScript error

#### Scenario: Quiz panel displays in English
- **WHEN** the language is set to English and the user views the Dice Detective page
- **THEN** the QuizPanel shows the first question in English with all answer options visible

#### Scenario: Quiz panel displays in Hebrew
- **WHEN** the language is set to Hebrew and the user views the Dice Detective page
- **THEN** the QuizPanel shows the first question in Hebrew with all answer options visible and RTL layout applied
