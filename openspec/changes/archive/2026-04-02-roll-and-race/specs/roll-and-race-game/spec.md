## ADDED Requirements

### Requirement: Player picks one car before the race
Before rolling begins the player SHALL select one car corresponding to a sum (2–12). The race SHALL not start until a car is chosen.

#### Scenario: Player picks a car
- **WHEN** the player taps a sum button (2–12)
- **THEN** that car is highlighted as the player's car and the Roll button becomes active

### Requirement: All 11 cars race simultaneously
The track SHALL display all 11 cars (one per possible two-dice sum: 2–12). Every roll advances exactly the car whose sum matches the dice result.

#### Scenario: Roll advances the matching car
- **WHEN** the player rolls and the dice sum to N
- **THEN** car N advances one step and all other cars remain in place

#### Scenario: All cars visible throughout the race
- **WHEN** the race is in progress
- **THEN** all 11 lanes are visible with each car's current position shown

### Requirement: Two dice animate on each roll
Each roll SHALL show two pip-pattern dice with a shake animation before the result is revealed.

#### Scenario: Dice shake before result
- **WHEN** the player taps Roll
- **THEN** both dice play a shake animation and then show the rolled values

### Requirement: Configurable track length
The player SHALL be able to set the track length to 5, 10, or 15 steps before starting a race. The default SHALL be 10.

#### Scenario: Default track length is 10
- **WHEN** the page first loads
- **THEN** track length is set to 10

#### Scenario: Changing track length resets the race
- **WHEN** the player selects a different track length
- **THEN** all car positions reset to 0 and the picking phase begins again

### Requirement: Manual roll and auto-finish
The page SHALL provide a Roll button (advances one roll at a time) and an Auto-finish button (resolves the race at speed until a winner is found).

#### Scenario: Manual roll advances one step
- **WHEN** the player taps Roll during a race
- **THEN** the dice animate, one car advances, and the button is ready for the next roll

#### Scenario: Auto-finish resolves the race
- **WHEN** the player taps Auto-finish
- **THEN** rolls fire automatically at speed until the first car reaches the finish line

### Requirement: Win and lose states
When a car reaches or passes the finish line the race SHALL end immediately with a win or lose message depending on whether the player's car won.

#### Scenario: Player's car wins
- **WHEN** the player's chosen car is the first to reach the finish line
- **THEN** a win celebration is shown

#### Scenario: Another car wins
- **WHEN** a car other than the player's reaches the finish line first
- **THEN** a lose message is shown naming the winning car

### Requirement: Simulator unlocked after first race
After the player completes at least one race a simulator section SHALL unlock. The simulator SHALL run 100, 500, or 1000 races and display win counts per car as a bar chart. The player's car bar SHALL be visually highlighted.

#### Scenario: Simulator locked before first race
- **WHEN** the player has not yet completed a race
- **THEN** the simulator is visible but dimmed with a hint to race first

#### Scenario: Simulator shows win distribution
- **WHEN** the player runs the simulator
- **THEN** a bar chart shows win counts for all 11 cars, with car 7 visibly dominant
