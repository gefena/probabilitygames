## ADDED Requirements

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
