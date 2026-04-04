## ADDED Requirements

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
