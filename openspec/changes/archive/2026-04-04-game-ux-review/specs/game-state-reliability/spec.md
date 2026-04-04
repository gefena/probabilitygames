## ADDED Requirements

### Requirement: CoinFlip lab-mode animation does not update state after mode switch
The `labFlip` animation timeout callback (600 ms) SHALL NOT update `heads`, `tails`, or `lastResult` state if the user has switched away from lab mode before the timeout fires.

#### Scenario: User switches to streak mode while flip animation is in flight
- **WHEN** the user clicks "Flip" in lab mode and then immediately switches to streak mode before the 600 ms animation completes
- **THEN** the lab mode state (`heads`, `tails`) SHALL NOT be incremented by the stale callback

#### Scenario: Normal lab flip completes without interference
- **WHEN** the user clicks "Flip" in lab mode and does not switch modes
- **THEN** the flip SHALL complete normally and update `heads` or `tails` as before

### Requirement: GuessThePhone give-up restart uses the current length
The give-up restart `setTimeout` in `GuessThePhonePage` SHALL use the length at the time the restart fires, not the length captured when "Give Up" was clicked. Alternatively, any pending restart SHALL be cancelled when the user selects a new length.

#### Scenario: User changes length during give-up countdown
- **WHEN** the user clicks "Give Up" (triggering a 2-second restart countdown) and then immediately selects a different number length
- **THEN** the new game SHALL start at the newly selected length, not the old one
- **AND** only one `startGame` call SHALL fire (no double-start)

#### Scenario: Normal give-up flow unchanged
- **WHEN** the user clicks "Give Up" and does not change the length before the 2-second timer fires
- **THEN** the game restarts at the same length as before

### Requirement: MonteCarloPi instant-mode respects pause between dart batches
The `runChunk` function SHALL check `runningRef.current` before adding each dart (or at minimum before processing each batch), so that clicking Pause stops the simulation within one batch rather than completing the entire current chunk.

#### Scenario: User pauses during instant-mode simulation
- **WHEN** the user clicks Pause while the simulation is running in instant mode
- **THEN** no more than one full batch of darts SHALL be added after the pause click is registered
- **AND** the dart count displayed SHALL stop incrementing within that batch

#### Scenario: Instant-mode reaches 100,000 darts and auto-stops
- **WHEN** the total dart count reaches 100,000 in instant mode
- **THEN** the simulation SHALL stop automatically as before (no regression)
