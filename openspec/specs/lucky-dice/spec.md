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

### Requirement: Dice explainer panel
The game SHALL display an explainer panel that teaches the user about dice probability. The panel SHALL adapt its content to the number of dice currently selected, switch automatically when the dice count changes, and be available in both English and Hebrew.

#### Scenario: Single-die panel
- **WHEN** 1 die is selected
- **THEN** the explainer panel shows probability content specific to a single die (e.g., 1-in-6 chance per face)

#### Scenario: Two-dice panel
- **WHEN** 2 dice are selected
- **THEN** the explainer panel updates to show probability content relevant to two-dice sums

#### Scenario: Three-dice panel
- **WHEN** 3 dice are selected
- **THEN** the explainer panel updates to show probability content relevant to three-dice sums

#### Scenario: Panel switches on count change
- **WHEN** the user changes the number of dice
- **THEN** the explainer panel immediately switches to the appropriate content for the new dice count

#### Scenario: Bilingual
- **WHEN** the global language is switched between English and Hebrew
- **THEN** all explainer panel text displays in the selected language

### Requirement: Lucky dice quiz
The lucky dice game SHALL include a QuizPanel below the explainer, with a question bank that adapts to the loaded die and bell-curve mechanics.

The question bank SHALL contain at least 3 questions covering:
1. **Loaded die probability**: A die is rigged so that 6 comes up 3× as often as any other face. Out of 8 possible "share units", how many belong to 6? What is its probability? (answer: 3/8 = 37.5%)
2. **Most likely 2-dice sum**: With 2 fair dice, which sum is most likely — 2, 7, or 12?
3. **Bell curve extremes**: With 3 dice, which is harder to roll — a sum of 3 or a sum of 10?

#### Scenario: Quiz appears below explainer
- **WHEN** the lucky dice page is loaded with any dice count
- **THEN** the QuizPanel is visible below the active ExplainerPanel

#### Scenario: Loaded die question uses weight fractions
- **WHEN** the user answers the loaded die question
- **THEN** the explanation shows how to divide the die's weight into shares (like the spinner) and encourages them to try unequal weights on the spinner game

#### Scenario: Bell curve question links to chart
- **WHEN** the user answers the 3-dice extremes question
- **THEN** the explanation points to the bar chart below and notes how rarely the bars at 3 and 18 appear
