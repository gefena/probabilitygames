## ADDED Requirements

### Requirement: Quiz progress indicator
The QuizPanel SHALL display a progress indicator showing the user's current position in the question bank. The indicator SHALL consist of:
1. A numeric counter (e.g. "2 / 3") showing the current question number and total
2. A row of dots — one dot per question — where the current question's dot is filled and the others are outlined

The indicator SHALL update each time the user advances to the next question.

#### Scenario: Counter shows current position
- **WHEN** the user is on the second of three questions
- **THEN** the counter displays "2 / 3"

#### Scenario: Dots reflect current question
- **WHEN** the user is on the second of three questions
- **THEN** two dots are visible: the first filled (already seen), the second filled (current), the third outlined (upcoming) — or equivalently: the current dot is filled, the rest are outlined

#### Scenario: Indicator updates on next
- **WHEN** the user clicks "Next question"
- **THEN** both the counter and the dot row update to reflect the new current question index

#### Scenario: Indicator cycles back to start
- **WHEN** the user advances past the last question
- **THEN** the counter resets to "1 / N" and the first dot is filled
