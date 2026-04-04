## Why

All current games tell kids the probabilities upfront. None teach them how to *discover* probabilities from data — which is what scientists, doctors, and engineers actually do. The Mystery Machine flips the model: the hidden probabilities are unknown and the child must experiment to estimate them. This introduces statistical inference in an accessible, game-like way.

## What Changes

- Add a new **Mystery Machine** game where the machine has hidden probability weights (secretly a candy jar, spinner, or die with unknown configuration). The player runs trials and must estimate the hidden probabilities.
- After a configurable number of trials (e.g., 30, 50, 100) the player submits their estimate. The machine reveals the truth and scores how close the estimate was.
- Difficulty levels: Easy (2 outcomes, 100 free trials), Medium (3 outcomes, 60 trials), Hard (4 outcomes, 40 trials).
- The explainer teaches: more trials → better estimate; this is how real experiments work.

## Capabilities

### New Capabilities

- `mystery-machine`: Probability inference game with hidden outcome weights, trial-based estimation, configurable difficulty, and reveal/score mechanic.

### Modified Capabilities

_(none)_

## Impact

- New file: `src/pages/MysteryMachinePage.jsx`
- New route in `src/App.jsx`
- New home-page card in `src/pages/HomePage.jsx`
- New i18n keys under `mysteryMachine.*`
- No new dependencies
