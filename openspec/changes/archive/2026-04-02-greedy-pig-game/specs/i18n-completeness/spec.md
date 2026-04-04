## ADDED Requirements

### Requirement: greedy-pig-game keys in both locales
All user-visible strings in `GreedyPigPage` and its quiz SHALL have corresponding keys in both `en.json` and `he.json`.

#### Scenario: Hebrew locale renders greedy pig page
- **WHEN** the user switches to Hebrew and visits the Greedy Pig page
- **THEN** all labels, instructions, button text, bot reactions, and explainer content render in Hebrew
