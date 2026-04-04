## Context

Compound events require two independent sub-events and a combinator (AND / OR). The tree diagram is the canonical visual. This game is new but follows the same page pattern as existing games.

## Goals / Non-Goals

**Goals:**
- 2 configurable events (Event A and Event B), each a mini-spinner with 2–4 outcomes and editable weights
- AND / OR toggle
- Computed combined probability displayed live
- Tree diagram SVG showing all branches; winning branches highlighted
- "Run trial" and "Run ×100" buttons; result history tracks combined-event frequency
- Frequency vs. prediction comparison after trials

**Non-Goals:**
- 3-event chains (too complex for initial version)
- Non-independent events (conditional probability already covered by Card Draw)

## Decisions

### Decision 1: Event configuration UX

Each event is a mini-version of the Magic Spinner controls: 2–4 named outcomes with integer weights. One outcome per event is designated "success" (highlighted). The combined probability computes P(A success AND/OR B success).

### Decision 2: Tree diagram layout

```
           A=success (p=0.5)
          /    \
        B=s    B=f        AND: only top-left is a win
       (win)  (lose)
          \
     A=fail (p=0.5)
          \
         B=s    B=f       OR: top-left, top-right, bottom-left are wins
```

Draw as an SVG with two levels. Winning branches drawn in green, losing in grey. Probability fraction shown on each branch.

### Decision 3: AND vs OR formula display

Show the formula used:
- AND: `P(A) × P(B) = result`
- OR: `P(A) + P(B) − P(A AND B) = result`

Keeps the math visible so kids can verify by hand.

## Risks / Trade-offs

- **Risk: Tree diagram becomes cluttered with 4×4 outcomes** — Limit each event to 4 outcomes max. With 4+4, the tree has 16 leaves — manageable.
- **Risk: "Success" outcome designation is confusing** — Use a star icon (⭐) to mark the "success" outcome for each event. Clearly labelled in the UI.
