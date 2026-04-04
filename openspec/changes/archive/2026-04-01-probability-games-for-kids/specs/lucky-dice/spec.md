## ADDED Requirements

### Requirement: Animated dice roll
The game SHALL display 1 to 3 animated dice. When the user rolls, each die plays a tumbling animation and lands on a random face (1–6). Results SHALL be uniformly random.

#### Scenario: Roll one die
- **WHEN** the user has selected 1 die and clicks "Roll!"
- **THEN** one die animates and displays a random face value 1–6

#### Scenario: Roll three dice
- **WHEN** the user has selected 3 dice and clicks "Roll!"
- **THEN** three dice animate simultaneously, each showing an independent random result

### Requirement: Dice count selector
The game SHALL provide a control to choose how many dice to roll (1, 2, or 3). Changing the count SHALL update the display immediately.

#### Scenario: Switch to 2 dice
- **WHEN** the user selects "2 dice"
- **THEN** two dice appear on screen, replacing the previous configuration

### Requirement: Prediction challenge
Before each roll, the game SHALL invite the user to make a prediction appropriate to the dice mode:
- **1 die**: predict which face (1–6) will appear.
- **2 or 3 dice**: predict the sum (2–12 for 2 dice; 3–18 for 3 dice) using a dropdown.

After the roll the game SHALL compare the result to the prediction, show friendly feedback, and display the theoretical probability of that exact outcome so the child understands why it is easy or hard to predict.

#### Scenario: Correct single-die prediction
- **WHEN** the user predicts face 4 with 1 die and rolls a 4
- **THEN** the game shows a celebration animation and "You got it! The chance of rolling a 4 is 1 in 6." (localized)

#### Scenario: Incorrect single-die prediction
- **WHEN** the user predicts face 4 but a different face appears
- **THEN** the game shows "Not this time! Rolling a 4 has a 1 in 6 chance — try again!" (localized)

#### Scenario: Correct sum prediction (2 dice)
- **WHEN** the user predicts sum 7 with 2 dice and the dice sum to 7
- **THEN** the game shows a celebration and "7 is the most likely sum — you picked well! It has a 6 in 36 chance." (localized)

#### Scenario: Incorrect sum prediction (2 dice)
- **WHEN** the user predicts sum 2 with 2 dice and the sum is not 2
- **THEN** the game shows "Not this time! Sum 2 only happens 1 in 36 rolls — that's a tough one!" (localized)

#### Scenario: Prediction resets after each roll
- **WHEN** a roll completes
- **THEN** the prediction input resets so the user makes a fresh prediction before the next roll

### Requirement: Roll history distribution chart
With **1 die** selected, the game SHALL display a bar chart of counts for each face value (1–6) with a reference line at the expected probability (1/6 ≈ 16.7%). With **2 or 3 dice** selected, the chart SHALL switch to a **sum distribution** — tracking how often each possible sum appears — with a reference line showing the theoretical probability of each sum. The chart updates after every roll.

#### Scenario: Single-die face chart
- **WHEN** 1 die is selected and the user has rolled several times
- **THEN** the chart shows 6 bars (one per face) and a flat reference line at 1/6

#### Scenario: Two-dice sum chart
- **WHEN** 2 dice are selected and the user has rolled several times
- **THEN** the chart shows 11 bars (sums 2–12), and the reference line forms a triangle shape peaking at sum 7

#### Scenario: Chart switches on dice count change
- **WHEN** the user changes the number of dice
- **THEN** the chart resets and switches to the appropriate mode (face chart or sum chart)

#### Scenario: Reset history
- **WHEN** the user clicks Reset
- **THEN** all roll counts clear to zero and the chart resets

### Requirement: Bilingual content
All labels, prompts, and results text SHALL be available in English and Hebrew.

#### Scenario: Hebrew mode
- **WHEN** the global language is Hebrew
- **THEN** all dice game text displays in Hebrew
