## 1. Trim site-shell/spec.md

- [x] 1.1 Replace the 8+ individual "Route for X page" requirements (Roll & Race, Remove One, Higher or Lower, Probability Bingo, Pizza Builder, Climber Race, Bridge Quest, Greedy Pig, Hack the Password, Guess the Phone routes) with a single general routing requirement
- [x] 1.2 Merge the "Crack the Code home page section" and "Greedy Pig card on home page" additive requirements into the general "Home page with game cards" requirement (update the game count to match reality)
- [x] 1.3 Delete the now-redundant "Route for Greedy Pig page" and "Routes for new game pages" (Crack the Code pair) requirements that are covered by the consolidated routing requirement

## 2. Trim i18n-completeness/spec.md

- [x] 2.1 Delete the 6 game-specific hotfix scenarios from "No hardcoded user-facing strings" and "No hardcoded user-visible strings in JSX": MysteryMachine reveal table header, BirthdayRoom tooltip, MontyHall tooltip label, MontyHall sim results suffix, LuckyCombo default event labels, MagicSpinner tree diagram start label
- [x] 2.2 Delete the 3 per-game locale requirements: "guess-phone-game keys in both locales", "hack-password-game keys in both locales", "greedy-pig-game keys in both locales"

## 3. Trim quiz-engine/spec.md

- [x] 3.1 Replace the "diceDetective bank file conforms" scenario (game-specific) with a generic scenario covering any quiz bank file

## 4. Verify

- [x] 4.1 Read through each edited spec and confirm no meaningful requirement was accidentally removed — every behavior still covered by at least one remaining requirement
