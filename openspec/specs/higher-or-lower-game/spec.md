## ADDED Requirements

### Requirement: Live odds panel before each guess
Before the player guesses, the page SHALL display P(higher), P(equal), and P(lower) for the current die face as both a fraction (e.g. 3/6) and a percentage, with a visual bar for each. P(equal) SHALL always display as 1/6.

#### Scenario: Odds update with each new roll
- **WHEN** a new die value is shown
- **THEN** the three probability bars and labels update to reflect that face's exact odds

#### Scenario: Equal odds are always 1/6
- **WHEN** any die face is showing
- **THEN** the Equal bar shows 1/6 = 17% regardless of the current face value

#### Scenario: Face 1 disables Lower button
- **WHEN** the current die shows 1
- **THEN** the Lower button is disabled (P(lower) = 0) and the Higher button is enabled

#### Scenario: Face 6 disables Higher button
- **WHEN** the current die shows 6
- **THEN** the Higher button is disabled (P(higher) = 0) and the Lower button is enabled

### Requirement: Push on equal roll
When the next roll equals the current roll, the player's streak SHALL be preserved with no increment and a push message SHALL appear explaining that P(equal) = 1/6 always.

#### Scenario: Tie preserves streak
- **WHEN** the player guesses Higher or Lower and the next roll equals the current roll
- **THEN** the streak counter does not change and a push message is shown

#### Scenario: Push message explains the constant
- **WHEN** a push occurs
- **THEN** the UI shows that P(equal) is always 1/6 regardless of the current face

### Requirement: Streak counter and session best
The page SHALL display the current streak (consecutive correct guesses) and the session best streak. A wrong guess resets the current streak to 0. A push does not change the streak.

#### Scenario: Correct guess increments streak
- **WHEN** the player guesses correctly
- **THEN** the streak counter increments by 1 and the session best updates if the new streak exceeds it

#### Scenario: Wrong guess resets streak
- **WHEN** the player guesses incorrectly
- **THEN** the streak counter resets to 0 and the session best is unchanged

#### Scenario: Session best persists within session
- **WHEN** the player achieves a new highest streak then loses it
- **THEN** the best counter continues to display the highest streak reached this session

### Requirement: Continuous play with no game-over state
After a wrong guess or push the game SHALL immediately continue with the new die face visible, allowing the player to guess again without any reset action.

#### Scenario: Game continues after wrong guess
- **WHEN** the player guesses wrong
- **THEN** the new die face is shown and the Higher/Lower buttons are re-enabled for the next round

#### Scenario: Game continues after push
- **WHEN** a push occurs
- **THEN** the new die face is shown and the Higher/Lower buttons are re-enabled for the next round
