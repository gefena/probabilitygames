## ADDED Requirements

### Requirement: Quiz cycle history tracking
QuizPanel SHALL track whether each answer in the current cycle was correct or incorrect, accumulating a `cycleHistory` array of booleans as the player progresses through all questions.

#### Scenario: History grows with each answer
- **WHEN** the player selects an answer to any question
- **THEN** the result (correct/incorrect) is appended to `cycleHistory` for the current cycle

### Requirement: Cycle summary screen
After the player answers the last question in a cycle, QuizPanel SHALL display a summary screen instead of immediately looping to Q1. The summary SHALL show the number of correct answers out of total questions and a coloured dot row reflecting each answer (green=correct, red=incorrect).

#### Scenario: Summary appears after last question
- **WHEN** the player clicks Next after answering the final question in a cycle
- **THEN** the quiz transitions to a summary screen showing score (e.g. "2 / 3") and a dot row

#### Scenario: Correct answers shown in green, wrong in red
- **WHEN** the summary screen is displayed
- **THEN** each dot corresponds to one question: green for correct, red for incorrect, in order

### Requirement: Try Again resets the cycle
The summary screen SHALL include a "Try again" button that resets the quiz to Q1 with a fresh cycle.

#### Scenario: Try Again starts a new cycle
- **WHEN** the player clicks "Try again" on the summary screen
- **THEN** the quiz resets to question 1 with all state cleared and cycleHistory empty
