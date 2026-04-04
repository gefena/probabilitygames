## ADDED Requirements

### Requirement: Probability Bingo surfaces Pete's fixed strategy to the player
The game SHALL display a visible caption near Pete's grid explaining that Pete uses a fixed probability-weighted placement (high-frequency sums 6, 7, 8 in one row), so students can understand the strategic difference and learn from it.

#### Scenario: Pete's strategy hint is visible during gameplay
- **WHEN** the player is on the Probability Bingo page and the game is in progress
- **THEN** a caption near Pete's board SHALL read something like "Pete: 6, 7, 8 in a row — most-rolled sums" or equivalent

#### Scenario: Hint is translated correctly
- **WHEN** the app language is switched to Hebrew
- **THEN** Pete's strategy hint SHALL be translated (i18n key provided)

#### Scenario: Hint does not appear on Larry's board
- **WHEN** the player views Larry's board
- **THEN** no fixed-strategy hint SHALL be shown (Larry uses a random grid)
