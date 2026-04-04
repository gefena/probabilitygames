## Why

The Birthday Problem is the single most surprising result in elementary probability — 23 people is enough for a 50% chance two share a birthday, far lower than most people's intuition of "about 183". It is perfectly visual, involves no complicated math beyond multiplication, and creates a lasting "wow" moment that makes kids curious about probability in general.

## What Changes

- Add a new **Birthday Room** game where the player adds people to a virtual room one at a time, watching the probability of a shared birthday climb.
- A **probability meter** fills as people are added. An animated "match found!" moment fires when two birthdays collide.
- A **simulation mode** runs the room 100 times and shows how often a match occurred at each room size, building intuition for the convergence.
- The explainer teaches: the probability grows quickly because every new person is compared to *all* existing people, not just one.

## Capabilities

### New Capabilities

- `birthday-room`: Birthday Problem game with step-by-step person-addition, live probability display, match animation, and multi-simulation mode.

### Modified Capabilities

_(none)_

## Impact

- New file: `src/pages/BirthdayRoomPage.jsx`
- New route in `src/App.jsx`
- New home-page card in `src/pages/HomePage.jsx`
- New i18n keys under `birthdayRoom.*`
- No new dependencies
