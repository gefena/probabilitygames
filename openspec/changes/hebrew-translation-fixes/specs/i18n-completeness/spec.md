## ADDED Requirements

### Requirement: Hebrew game and tier titles use consistent grammatical form
Hebrew game titles and tier titles SHALL use either noun form or imperative plural form. Infinitive verb forms (לפצח, לפרוץ, להטיל, etc.) SHALL NOT be used as titles.

#### Scenario: Crack the Code tier title
- **WHEN** the user views the home page in Hebrew
- **THEN** the Crack the Code tier heading reads "פצחו את הקוד" (imperative), not "לפצח את הקוד" (infinitive)

#### Scenario: Hack the Password game title
- **WHEN** the user views the Hack the Password card or page title in Hebrew
- **THEN** the title reads "פרצו את הסיסמה" (imperative), not "לפרוץ את הסיסמה" (infinitive)

### Requirement: Hebrew coin-flip title uses correct verb
The Hebrew title for the Coin Flip game SHALL use "הטלת" (flipping/tossing) not "הטבעת" (minting).

#### Scenario: Coin Flip title is semantically correct
- **WHEN** the user views the Coin Flip game in Hebrew
- **THEN** no visible title contains the word "הטבעת" (minting)

### Requirement: Roll and Race Hebrew title uses verb form
The Hebrew title for Roll and Race SHALL use the imperative verb "והתחרו" (compete), not the noun "ותחרות" (competition).

#### Scenario: Roll and Race title is grammatically correct
- **WHEN** the user views the Roll and Race game title in Hebrew
- **THEN** the title reads "גלגלו והתחרו", not "גלגלו ותחרות"
