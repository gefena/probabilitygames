## ADDED Requirements

### Requirement: Magic spinner quiz
The magic spinner game SHALL include a QuizPanel below the explainer, with a question bank that tests understanding of weighted probability and comparing slice chances.

The question bank SHALL contain at least 3 questions covering:
1. **Relative weight**: Spinner has slice A weight=3, B weight=1, C weight=2. Total = 6. What is A's probability? (3/6 = 50%)
2. **Fair spinner test**: Which spinner is fair — A) all slices weight 1, B) slices weight 1/2/3, C) slices weight 2/2/2?
3. **Doubling a slice**: Slice A has weight 1, B weight 1. You change A to weight 2. Is A now twice as likely to win as B? (Yes — 2/3 vs 1/3)

#### Scenario: Quiz appears below explainer
- **WHEN** the magic spinner page is loaded
- **THEN** the QuizPanel is visible below the ExplainerPanel

#### Scenario: Weight fraction question links to current spinner
- **WHEN** the user answers the relative-weight question
- **THEN** the explanation invites the user to set those weights on the live spinner and observe the percentages shown on the slices

#### Scenario: Fair spinner question reinforces callout
- **WHEN** the user answers the fair spinner test
- **THEN** the explanation connects to the amber callout: equal weights = equal chances
