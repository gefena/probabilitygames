## ADDED Requirements

### Requirement: Dice explainer panel
The game SHALL display an explainer panel below the controls and above the chart. The panel content SHALL adapt to the current dice count:

**1 die mode:**
1. **Concept title**: "Equal Chances" (localized)
2. **Explanation**: Each face has exactly 1 chance in 6. No face is luckier than another.
3. **Visual aid**: Six emoji die faces (⚀⚁⚂⚃⚄⚅) in a row, each labelled "1/6", to make equal probability concrete
4. **Worked example** (static): "Roll 60 times and you'd expect each face about 10 times. Roll more — do they even out?"

**2 dice mode:**
1. **Concept title**: "Why Does 7 Win?" (localized)
2. **Explanation**: With 2 dice there are 36 combinations. Some sums can be made more ways than others, so they appear more often.
3. **Visual aid**: A small table or list showing the 3 most common sums and how many ways they can be rolled: 6→5 ways, 7→6 ways, 8→5 ways
4. **Worked example** (static): "Sum 7 can be: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1 — that's 6 out of 36 rolls!"

**3 dice mode:**
1. **Concept title**: "The Bell Curve" (localized)
2. **Explanation**: With 3 dice the middle sums (9, 10, 11, 12) appear far more often than the extremes (3 or 18).
3. **Visual aid**: An approximate bell-shape hint using block characters (e.g., ▁▂▄▇█▇▄▂▁) — decorative and not a precise mapping to all 16 possible sums (3–18); serves only to suggest the shape
4. **Worked example** (static): "Sum 10 has 27 ways out of 216. Sum 3 has only 1 way. Spot the difference in your chart!"

The panel SHALL update immediately when the dice count selector changes.

#### Scenario: Single-die panel shows equal chances
- **WHEN** 1 die is selected
- **THEN** the explainer shows "Equal Chances", six die-face icons each labelled 1/6, and the worked example about rolling 60 times

#### Scenario: Two-dice panel shows why 7 wins
- **WHEN** 2 dice are selected
- **THEN** the explainer shows "Why Does 7 Win?", the ways-to-make table for sums 6/7/8, and the 1+6 … 6+1 worked example

#### Scenario: Three-dice panel shows bell curve hint
- **WHEN** 3 dice are selected
- **THEN** the explainer shows "The Bell Curve" and the worked example comparing sum 10 vs. sum 3

#### Scenario: Panel switches on dice count change
- **WHEN** the user changes the dice count
- **THEN** the explainer panel updates immediately to show the relevant concept

#### Scenario: Panel is bilingual
- **WHEN** the global language is Hebrew
- **THEN** all explainer panel text displays in Hebrew
