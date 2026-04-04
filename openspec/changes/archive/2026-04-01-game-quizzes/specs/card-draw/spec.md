## ADDED Requirements

### Requirement: Card draw quiz
The card draw game SHALL include a QuizPanel below the explainer, with a question bank that tests conditional probability and the "without replacement" mechanic.

The question bank SHALL contain at least 3 questions covering:
1. **Hearts after drawing hearts**: You draw 4 hearts in a row from a full deck. What happens to the probability of drawing another heart — does it go up, down, or stay the same? (Down — fewer hearts remain in a smaller deck, but the ratio drops)
2. **Drawing a non-suit card**: You draw the Ace of Spades. Does the probability of drawing a Heart change? (Yes — there are still 13 hearts but now only 51 cards, so 13/51 ≈ 25.5% vs original 25.0%)
3. **Without replacement vs. with replacement**: If you put each card back before drawing again, would past draws affect future probabilities? (No — the deck resets each time)

#### Scenario: Quiz appears below explainer
- **WHEN** the card draw page is loaded
- **THEN** the QuizPanel is visible below the ExplainerPanel

#### Scenario: Hearts-drop question connects to before/after panel
- **WHEN** the user answers the hearts-drop question
- **THEN** the explanation points to the before/after display in the ExplainerPanel and shows how the orange ↓ indicator confirms the drop

#### Scenario: With-replacement question teaches contrast
- **WHEN** the user answers the with/without replacement question
- **THEN** the explanation clarifies that card draw is "without replacement" by default and this is what makes conditional probability interesting
