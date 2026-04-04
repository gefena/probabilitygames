## ADDED Requirements

### Requirement: Lucky Combo Q3 explanation does not declare multiple correct answers
The `quiz.luckyCombo.q3.explanation` text in `en.json` and `he.json` SHALL NOT state "Both answers (a) and (c) are correct" when only option A (`correct: true`) is accepted by the quiz engine. A student who selects option C SHALL be marked incorrect; the explanation MUST NOT contradict this by validating option C.

#### Scenario: Student selects option C and reads explanation
- **WHEN** a student selects option C ("AND is a stricter rule than OR") and is marked incorrect
- **THEN** the explanation they see SHALL NOT say option C is also correct (this contradicts the quiz outcome and confuses the student)

#### Scenario: Explanation is self-consistent with quiz marking
- **WHEN** the explanation for Q3 is displayed
- **THEN** it SHALL explain why option A is correct without endorsing option C as an equally correct alternative
