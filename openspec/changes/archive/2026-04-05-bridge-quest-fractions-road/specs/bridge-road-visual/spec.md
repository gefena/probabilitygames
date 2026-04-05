## ADDED Requirements

### Requirement: Road lane layout per path
Each path SHALL be rendered as a horizontal road lane. The road lane SHALL have a visible road line running from left (start) to right (finish), with bridges positioned along it. The path layout SHALL replace the current flat flex-row of bridge pills.

#### Scenario: Road line visible
- **WHEN** the player views any path
- **THEN** a horizontal road line is visible spanning the full width of the path row

#### Scenario: Start and finish ends visible
- **WHEN** the player views any path
- **THEN** the left end is labelled or styled as "START" and the right end as "FINISH" (or uses icons/arrows)

### Requirement: Bridges randomly placed along the road
Each bridge SHALL appear at a randomised horizontal position along the road lane rather than being evenly or sequentially placed. Bridges SHALL not overlap each other. Positions SHALL be assigned at race generation time and remain fixed during that race.

#### Scenario: Bridge positions are random
- **WHEN** two races are generated in sequence
- **THEN** the bridges appear at different horizontal positions in each race (not always the same spacing)

#### Scenario: Bridges do not overlap
- **WHEN** any race is generated
- **THEN** no two bridges on the same path are positioned so close that they visually overlap

#### Scenario: Positions remain stable
- **WHEN** the player taps a path to preview it
- **THEN** the bridge positions do not shift or reorder
