### Requirement: House Always Wins quiz
The HouseAlwaysWinsPage SHALL include a QuizPanel with 3 questions covering expected value and house edge concepts, matching the pattern used by all other 25 game pages.

#### Scenario: Quiz renders on page
- **WHEN** the user navigates to the House Always Wins page
- **THEN** a QuizPanel is displayed below the ExplainerPanel, with 3 questions

#### Scenario: Quiz questions cover game concepts
- **WHEN** the user interacts with the quiz
- **THEN** the questions test understanding of: (1) expected value meaning, (2) why the house wins long-term, and (3) which common game has the lowest house edge

#### Scenario: Quiz follows site pattern
- **WHEN** the quiz is rendered
- **THEN** it uses the same QuizPanel component, accent color, and i18n key structure as other game quizzes

### Requirement: House Always Wins quiz i18n
All quiz question text, option labels, and explanations SHALL be stored as i18n keys in both en.json and he.json under the `quiz.houseAlwaysWins.*` namespace.

#### Scenario: English quiz text
- **WHEN** the language is English
- **THEN** all quiz questions, options, and explanations display in English

#### Scenario: Hebrew quiz text
- **WHEN** the language is Hebrew
- **THEN** all quiz questions, options, and explanations display in Hebrew
