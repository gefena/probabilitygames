## ADDED Requirements

### Requirement: Candy jar quiz
The candy jar game SHALL include a QuizPanel below the explainer, with a question bank that tests proportional reasoning and the effect of changing jar composition.

The question bank SHALL contain at least 3 questions covering:
1. **Doubling effect**: A jar has 2 red and 8 blue. You double the red to 4. Is red now twice as likely? (No — it goes from 2/10 = 20% to 4/12 ≈ 33%, not 40%)
2. **Equal probability**: You want each colour to have exactly 1/3 chance. The jar has red=5, blue=3, green=2. What must you change?
3. **Zero count edge case**: If you remove all green candies, what is the probability of drawing green?

#### Scenario: Quiz appears below explainer
- **WHEN** the candy jar page is loaded
- **THEN** the QuizPanel is visible below the ExplainerPanel

#### Scenario: Doubling question corrects intuition
- **WHEN** the user answers the doubling question
- **THEN** the explanation clarifies that probability depends on the ratio to the total, and invites the user to set red=2, blue=8 and then red=4 to check the bar

#### Scenario: Zero-count question teaches edge case
- **WHEN** the user answers the zero-count question
- **THEN** the explanation confirms 0% and explains that 0 out of any total is always 0
