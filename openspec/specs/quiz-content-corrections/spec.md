## Requirements

### Requirement: BridgeQuest Q1 option a uses math-based reasoning
Option a for BridgeQuest Q1 SHALL state that Path B wins because its survival probability (60%) exceeds Path A's combined survival probability (80% × 70% = 56%), rather than citing "fewer bridges = fewer chances to fall."

#### Scenario: English label is updated
- **WHEN** `quiz.bridgeQuest.q1.a` is read from `en.json`
- **THEN** the value is `"Path B — 60% survival beats Path A's 80% × 70% = 56%"`

#### Scenario: Hebrew label is updated
- **WHEN** `quiz.bridgeQuest.q1.a` is read from `he.json`
- **THEN** the value no longer references "הזדמנות אחת ליפול" (one chance to fall) and instead references the 60% vs 56% comparison

### Requirement: MontyHall Q2 option a is a clearly wrong statement
Option a for MontyHall Q2 SHALL express the classic 50/50 fallacy so that `correct: false` is appropriate. It MUST NOT contain reasoning that leads to the correct conclusion.

#### Scenario: English label is updated
- **WHEN** `quiz.montyHall.q2.a` is read from `en.json`
- **THEN** the value is `"It doesn't matter whether you switch — eliminating one door makes the remaining two equally likely at 50% each"`

#### Scenario: Hebrew label is updated
- **WHEN** `quiz.montyHall.q2.a` is read from `he.json`
- **THEN** the value expresses the 50/50 fallacy (equal likelihood after elimination) and does not contain the statement that the original door has 1/3 probability

### Requirement: BirthdayRoom Q2 explanation uses correct pair count
The explanation for BirthdayRoom Q2 SHALL state that each new person creates N−1 new pairs (not N), where N is the new total count.

#### Scenario: English explanation is updated
- **WHEN** `quiz.birthdayRoom.q2.explanation` is read from `en.json`
- **THEN** the value contains "N-1 new pairs" (not "N new pairs") and references "the N-1 people already in the room"

#### Scenario: Hebrew explanation is updated
- **WHEN** `quiz.birthdayRoom.q2.explanation` is read from `he.json`
- **THEN** the value contains "N-1 זוגות" (not "N זוגות") and the example numbers (45, 190, 435) remain unchanged

### Requirement: RemoveOne Q3 option c states correct combination count for sum 2
Option c for RemoveOne Q3 SHALL state that there is exactly 1 way to roll a sum of 2 with two dice (not 2 ways).

#### Scenario: English label is updated
- **WHEN** `quiz.removeOne.q3.c` is read from `en.json`
- **THEN** the value is `"2 rolls — there is only 1 way to roll a 2 (1+1)"`

#### Scenario: Hebrew label is updated
- **WHEN** `quiz.removeOne.q3.c` is read from `he.json`
- **THEN** the value states "דרך אחת" (one way) instead of "2 דרכים" (2 ways)
