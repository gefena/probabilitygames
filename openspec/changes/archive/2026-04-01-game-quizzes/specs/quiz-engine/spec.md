## ADDED Requirements

### Requirement: QuizPanel component
The system SHALL provide a shared `QuizPanel` React component that accepts a `questions` prop (array of question objects) and renders one multiple-choice question at a time with animated feedback.

Each question object SHALL have the shape:
- `id`: unique string
- `question`: i18n key string
- `options`: array of `{ label: <i18n key>, correct: <boolean> }`
- `explanation`: i18n key string shown after answering

#### Scenario: Question renders with options
- **WHEN** QuizPanel is mounted with a non-empty questions array
- **THEN** the current question text and all its answer options are visible

#### Scenario: Correct answer feedback
- **WHEN** the user selects the correct option
- **THEN** that option highlights green, a checkmark animation plays, and the explanation text appears below

#### Scenario: Incorrect answer feedback
- **WHEN** the user selects an incorrect option
- **THEN** that option shows a red tint with a subtle shake animation, the correct option is highlighted green, and the explanation text appears below

#### Scenario: Next question advances the bank
- **WHEN** an answer has been revealed and the user clicks "Next question"
- **THEN** the panel resets to show the next question in the bank (cycling back to the first when the end is reached)

#### Scenario: Options are disabled after answering
- **WHEN** the user has selected any option
- **THEN** all options become non-interactive until "Next question" is clicked

### Requirement: Question bank files
The system SHALL store question banks in `src/quizzes/<game>.js` files, each exporting a default array of question objects. Question content SHALL be referenced by i18n keys (not inline strings) so all text is translatable.

#### Scenario: Bank file loaded by game page
- **WHEN** a game page imports its quiz bank file
- **THEN** the imported array contains at least 3 question objects, each with a valid `question`, `options`, and `explanation` field

### Requirement: Quiz bilingual support
All question text, option labels, and explanations SHALL be available in both English and Hebrew via the existing react-i18next system, under the `quiz` namespace.

#### Scenario: Hebrew quiz display
- **WHEN** the global language is set to Hebrew
- **THEN** all quiz questions, options, and explanations display in Hebrew with RTL layout
