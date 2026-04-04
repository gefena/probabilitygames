## ADDED Requirements

### Requirement: Coin flip quiz
The coin flip game SHALL include a QuizPanel below the explainer, with a question bank that tests understanding of fairness and the law of large numbers using biased-coin scenarios.

The question bank SHALL contain at least 3 questions covering:
1. **Biased coin identification**: A coin lands heads 70% of the time — can you tell after 5 flips? After 1000?
2. **Long-run vs. short-run**: After 10 flips all heads, is the next flip more likely tails? (gambler's fallacy)
3. **Fair coin definition**: If a coin is fair, what percentage of heads do you expect over a very large number of flips?

#### Scenario: Quiz appears below explainer
- **WHEN** the coin flip page is loaded
- **THEN** the QuizPanel is visible below the ExplainerPanel showing the first question

#### Scenario: Gambler's fallacy question teaches independence
- **WHEN** the user answers the question about whether tails is "due" after many heads
- **THEN** the explanation clarifies that each flip is independent — past results do not affect future flips

#### Scenario: Biased coin question links to the game
- **WHEN** the user reads the question about a 70% heads coin
- **THEN** the explanation suggests setting the multiplier to ×100 and observing whether heads dominates
