## MODIFIED Requirements

### Requirement: Three parallel paths with bridge probabilities
BridgeQuestPage SHALL display 3 parallel paths from START to END. Each path SHALL have 2–4 bridges. Each bridge SHALL show its individual survival probability as either a percentage or a fraction depending on the active display mode. Bridge values SHALL be drawn from the curated fraction pool (1/2, 1/3, 2/3, 3/4, 4/5, 5/6, 9/10, 3/5, 2/5). Paths SHALL be randomly generated at the start of each race, with bridge positions randomised along the road lane.

#### Scenario: Three paths visible at race start
- **WHEN** a new race begins
- **THEN** three road lane paths are visible, each showing its bridges with individual survival values in the active display mode

#### Scenario: Bridges have valid probabilities
- **WHEN** any race is generated
- **THEN** every bridge probability is one of: 1/2, 1/3, 2/3, 3/4, 4/5, 5/6, 9/10, 3/5, 2/5

#### Scenario: Each path has 2 to 4 bridges
- **WHEN** any race is generated
- **THEN** each of the three paths has between 2 and 4 bridges
