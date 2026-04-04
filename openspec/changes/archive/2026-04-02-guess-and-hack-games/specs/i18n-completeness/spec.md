## ADDED Requirements

### Requirement: guess-phone-game keys in both locales
All user-visible strings in `GuessThePhonePage` and its quiz SHALL have corresponding keys in both `en.json` and `he.json`.

#### Scenario: Hebrew locale renders guess-phone page
- **WHEN** the user switches to Hebrew and visits the Guess the Phone page
- **THEN** all labels, instructions, button text, and explainer content render in Hebrew

### Requirement: hack-password-game keys in both locales
All user-visible strings in `HackThePasswordPage` and its quiz SHALL have corresponding keys in both `en.json` and `he.json`.

#### Scenario: Hebrew locale renders hack-password page
- **WHEN** the user switches to Hebrew and visits the Hack the Password page
- **THEN** all labels, instructions, button text, difficulty tier names, and explainer content render in Hebrew
