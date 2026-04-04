## ADDED Requirements

### Requirement: Three parallel paths with bridge probabilities
BridgeQuestPage SHALL display 3 parallel paths from START to END. Each path SHALL have 2–4 bridges, each showing its individual survival probability as a percentage. Paths SHALL be randomly generated at the start of each race.

#### Scenario: Three paths visible at race start
- **WHEN** a new race begins
- **THEN** three path rows are visible, each showing its bridges with individual survival percentages

#### Scenario: Bridges have valid probabilities
- **WHEN** any race is generated
- **THEN** every bridge probability is between 30% and 95% inclusive

#### Scenario: Each path has 2 to 4 bridges
- **WHEN** any race is generated
- **THEN** each of the three paths has between 2 and 4 bridges

### Requirement: Tap-to-preview combined survival probability
The player SHALL be able to tap a path to preview its combined survival probability (product of all bridge probabilities) before committing to it. The combined survival SHALL be shown as "N in 100 make it through". A second tap on the same path (or a confirm button) commits the choice.

#### Scenario: Tap reveals combined survival
- **WHEN** the player taps a path they have not yet chosen
- **THEN** that path expands to show the combined survival percentage as "N in 100 make it through"

#### Scenario: Tapping a different path switches preview
- **WHEN** the player taps a different path while one is already previewed
- **THEN** the preview switches to the newly tapped path

#### Scenario: Confirm commits the choice
- **WHEN** the player taps a previewed path again or presses the confirm button
- **THEN** the path is locked in and the crossing phase begins

### Requirement: Greedy Bot opponent reveals its choice after player commits
After the player commits to a path, the Greedy Bot SHALL reveal which path it chose. The bot SHALL always pick the path whose minimum single-bridge probability is the highest. The bot's reasoning SHALL be shown ("It avoids the scariest bridge").

#### Scenario: Bot choice revealed after player commits
- **WHEN** the player commits to a path
- **THEN** the Greedy Bot's chosen path is highlighted and labelled with the path letter and the bot's reasoning

#### Scenario: Bot picks path with highest minimum bridge
- **WHEN** any race is generated and the bot makes its choice
- **THEN** the bot selects the path whose lowest individual bridge probability is the greatest among all paths

### Requirement: Player crosses bridges first, then bot
After the player commits, the player's character SHALL cross the chosen path bridge-by-bridge. Each bridge result (safe or fell) SHALL be revealed with a short pause. After the player's crossing completes, the bot crosses its chosen path in the same animated manner. Each character's bridge outcomes are independent — the bot and player roll separately even if they chose the same path.

#### Scenario: Bridge results revealed sequentially
- **WHEN** a character is crossing a path
- **THEN** each bridge lights green (safe) or red (fell) one at a time with a pause between

#### Scenario: Character stops on fall
- **WHEN** a character falls on a bridge
- **THEN** the crossing stops at that bridge and no further bridges are revealed for that character

#### Scenario: Bot crosses after player
- **WHEN** the player's crossing animation completes
- **THEN** the bot's crossing animation starts

#### Scenario: Same path chosen by both — independent outcomes
- **WHEN** the player and the bot choose the same path
- **THEN** each character rolls independently for each bridge; the player may survive while the bot falls, or vice versa

### Requirement: Race result and scoring
After both crossings complete, a race result SHALL be shown. If the player survived and the bot fell, the player earns 1 point. If the bot survived and the player fell, the bot earns 1 point. If both survived or both fell, no point is awarded (tie).

#### Scenario: Player wins a race
- **WHEN** the player reaches the end and the bot fell
- **THEN** the player earns 1 point and a "You win this race! +1" message is shown

#### Scenario: Bot wins a race
- **WHEN** the bot reaches the end and the player fell
- **THEN** the bot earns 1 point and a "Bot wins this race! +1" message is shown

#### Scenario: Race ties
- **WHEN** both the player and the bot reach the end, or both fall
- **THEN** no point is awarded and a "Tie — no point" message is shown

### Requirement: 3-race tournament
The game SHALL run exactly 3 races per tournament. After all 3 races, a tournament result screen SHALL show the final score and declare the winner, or a draw.

#### Scenario: All 3 races are played
- **WHEN** a tournament starts
- **THEN** exactly 3 races are played before the tournament result is shown

#### Scenario: Tournament winner declared
- **WHEN** all 3 races are complete
- **THEN** the player with more points is declared the tournament winner; if equal, it is a draw

#### Scenario: Score tracked throughout tournament
- **WHEN** any race result is shown
- **THEN** the current score (e.g. "You 2 – Bot 1") is visible

### Requirement: Play Again resets tournament
A Play Again button on the tournament result screen SHALL reset all state and start a new tournament with freshly generated paths.

#### Scenario: Play Again resets everything
- **WHEN** the player clicks Play Again
- **THEN** scores reset to 0, new paths are generated, and race 1 begins

### Requirement: ExplainerPanel and QuizPanel
BridgeQuestPage SHALL include an ExplainerPanel explaining the multiplication rule for sequential independent events and a QuizPanel with 3 questions.

#### Scenario: Explainer visible
- **WHEN** the user views BridgeQuestPage
- **THEN** an ExplainerPanel is visible below the game explaining P(path) = P(b1) × P(b2) × … × P(bn)

#### Scenario: Quiz visible
- **WHEN** the user views BridgeQuestPage
- **THEN** a QuizPanel with 3 questions about sequential probability is visible

### Requirement: Bridge Quest fully bilingual EN/HE
All text in BridgeQuestPage SHALL be provided in both English and Hebrew via the `bridgeQuest.*` i18n namespace.

#### Scenario: Hebrew locale renders correctly
- **WHEN** the user switches to Hebrew
- **THEN** all BridgeQuestPage text renders in Hebrew with correct RTL layout
