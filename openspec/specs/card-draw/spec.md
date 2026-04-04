### Requirement: Visual card deck
The game SHALL display a shuffled standard 52-card deck represented as a face-down stack. The number of remaining cards SHALL be visible on or near the deck.

#### Scenario: Initial deck
- **WHEN** the game loads or is reset
- **THEN** a deck of 52 face-down cards is displayed with "52 cards remaining" shown

### Requirement: Draw a card
The user SHALL be able to draw the top card from the deck. The card SHALL animate as it slides out and flips to reveal its suit and rank. Drawn cards are removed from the deck (sampling without replacement).

#### Scenario: Draw a card
- **WHEN** the user clicks "Draw a Card"
- **THEN** a card animates out of the deck, flips to show its face, and is added to the drawn pile. The remaining count decreases by 1.

#### Scenario: Deck empty
- **WHEN** all 52 cards have been drawn
- **THEN** the "Draw" button is disabled and a "Deck is empty — reset to play again!" message is shown

### Requirement: Probability tracker
The game SHALL display two probability panels that update after every draw:
- **Suit panel**: shows the current probability of drawing each suit (♠ ♥ ♦ ♣) as a fraction and percentage.
- **Rank panel**: contains a persistent dropdown listing all 13 ranks (Ace, 2–10, Jack, Queen, King). The selected rank's probability is shown as a fraction and percentage. The dropdown retains the user's selection across draws.

#### Scenario: Initial suit probabilities
- **WHEN** the game loads with a full deck
- **THEN** each suit panel shows 13/52 = 25%

#### Scenario: Initial rank probability
- **WHEN** the game loads and "Ace" is selected in the rank dropdown
- **THEN** the rank panel shows 4/52 ≈ 7.7%

#### Scenario: Suit probability updates after draw
- **WHEN** a heart is drawn
- **THEN** the hearts panel updates to (remaining hearts) / (remaining cards)

#### Scenario: Rank probability updates after draw
- **WHEN** a King is drawn and "King" is the selected rank
- **THEN** the rank panel updates to (remaining Kings) / (remaining cards)

#### Scenario: User changes rank selection
- **WHEN** the user selects a different rank from the dropdown
- **THEN** the rank panel immediately shows the probability of that rank given the current remaining deck, with no draw required

### Requirement: Drawn cards history
The game SHALL show the sequence of drawn cards in a scrollable row or pile, with each card's suit symbol and rank visible.

#### Scenario: History grows
- **WHEN** the user draws multiple cards
- **THEN** each drawn card appears in the history in draw order

### Requirement: Conditional probability highlight
After each draw, the game SHALL highlight in plain language how the draw changed probabilities. Example: "You drew a ♥. Now there are only 12 hearts left in 51 cards — the chance of drawing another heart dropped to 23.5%!"

#### Scenario: Explanation after heart draw
- **WHEN** a heart is drawn
- **THEN** the game displays a sentence explaining the updated heart probability in both English and Hebrew (per current language)

### Requirement: Shuffle and reset
The user SHALL be able to shuffle and reset the deck at any time, returning all cards to the deck.

#### Scenario: Reset deck
- **WHEN** the user clicks "Shuffle & Reset"
- **THEN** all 52 cards return to the deck, drawn history clears, and probabilities return to initial values

### Requirement: Bilingual content
All text SHALL be available in English and Hebrew, including suit names and rank names.

#### Scenario: Hebrew suit names
- **WHEN** the global language is Hebrew
- **THEN** suit names display in Hebrew (e.g., לב for Hearts) and all other text is in Hebrew

### Requirement: Card draw explainer panel
The game SHALL display an explainer panel that teaches the user about conditional probability as cards are drawn. The panel SHALL show a prompt on load, transition to before/after states around the first draw, use a blue up-arrow to signal when a probability increases, update on every subsequent draw, reset when the deck is shuffled, and be available in both English and Hebrew.

#### Scenario: Prompt on load
- **WHEN** the game loads with a full deck
- **THEN** the explainer panel shows an introductory prompt inviting the user to draw a card to see how probabilities change

#### Scenario: Before/after after first draw
- **WHEN** the user draws the first card
- **THEN** the explainer panel transitions from the pre-draw prompt to a before/after view showing the probability of a selected suit or rank before and after that draw

#### Scenario: Blue up-arrow for probability increase
- **WHEN** a draw causes the probability of any tracked suit or rank to increase (e.g., a competing suit is removed)
- **THEN** the explainer panel displays a blue up-arrow next to the probability value that increased

#### Scenario: Updates on every draw
- **WHEN** the user draws any subsequent card
- **THEN** the explainer panel updates its before/after values and any directional indicators to reflect the latest deck state

#### Scenario: Resets on shuffle
- **WHEN** the user clicks "Shuffle & Reset"
- **THEN** the explainer panel returns to the introductory prompt state as if the game had just loaded

#### Scenario: Bilingual
- **WHEN** the global language is switched between English and Hebrew
- **THEN** all explainer panel text (including before/after labels and directional cues) displays in the selected language

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
