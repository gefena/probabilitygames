## ADDED Requirements

### Requirement: Greedy Pig Q1 answer label is numerically accurate
The `quiz.greedyPig.q1.a` translation key in `en.json` and `he.json` SHALL display a label consistent with the net expected value calculation shown in the explanation. The explanation computes `(5/6) × 4 − (1/6) × 18 = 0.33 points`; the label MUST NOT state "About 3 points."

#### Scenario: Student reads correct answer label
- **WHEN** a student selects the correct answer for Greedy Pig Q1
- **THEN** the label shown MUST reflect that the expected gain is approximately 0.33 points (or "barely positive / less than 1 point"), consistent with the explanation text

#### Scenario: Label and explanation are internally consistent
- **WHEN** a student reads both the option label and the explanation
- **THEN** the numeric value stated in the label and the value computed in the explanation SHALL agree (both ~0.33, not one saying 3 and the other saying 0.33)

### Requirement: Greedy Pig explainer example uses unambiguous EV terminology
The `greedyPig.explainer.example` text in `en.json` and `he.json` SHALL not say "expected gain from one more roll is about 3 points" without clarifying that this refers to the gross contribution from non-bust outcomes. The actual net EV for 12 accumulated points is ~1.33, not 3.

#### Scenario: Explainer example is read alongside the quiz explanation
- **WHEN** a student reads the explainer then the quiz explanation
- **THEN** the two SHALL use "expected gain" consistently — either both refer to gross (positive-case only) or both refer to net EV — with no contradictory numbers

#### Scenario: Explainer states the clarifying phrase
- **WHEN** the explainer example mentions an expected-gain number
- **THEN** the sentence SHALL include a qualifier such as "from non-bust rolls" if it describes gross gain, or SHALL compute the net value if it describes net EV
