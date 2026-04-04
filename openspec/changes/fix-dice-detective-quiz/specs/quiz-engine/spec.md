## ADDED Requirements

### Requirement: All quiz bank files conform to the canonical schema
Every `src/quizzes/<game>.js` file SHALL export an array where each element has `id` (string), `question` (i18n key), `options` (array of `{ label: <i18n key>, correct: <boolean> }`), and `explanation` (i18n key). No bank file may use alternate field names such as `answers`, `text`, `key`, or hardcoded strings in place of i18n keys.

#### Scenario: diceDetective bank file conforms
- **WHEN** `src/quizzes/diceDetective.js` is imported
- **THEN** the exported array contains exactly 3 objects, each with `id`, `question` (i18n key), `options` (array with `label` and `correct`), and `explanation` (i18n key)

#### Scenario: No hardcoded strings in bank files
- **WHEN** any quiz bank file is inspected
- **THEN** the `question`, `options[*].label`, and `explanation` fields are all i18n key strings (not inline English or Hebrew text)
