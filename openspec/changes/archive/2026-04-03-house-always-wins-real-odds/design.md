## Context

HouseAlwaysWinsPage already has three simplified game cards (Lottery 90% edge, Slots 20%, Roulette 2.7%) and a bar chart. The new section sits below the chart — same page, no routing changes. It uses an accordion pattern (tap to expand) so younger players aren't overwhelmed, while curious players can dig into the actual numbers.

## Goals / Non-Goals

**Goals:**
- 5 accordion rows: Lottery comparison, European Roulette, American vs European Roulette, Slot Machines, Blackjack
- Each row collapsed: emoji + name + house edge % + one-line concrete summary
- Each row expanded: step-by-step plain-English math with "how many tickets / cost to guarantee / what you'd actually win"
- Israeli Lotto as primary lottery example; Powerball as the contrast — shows how 32 extra numbers in the pool multiplies combinations 18×
- Dark background panel consistent with existing "Crack the Code" / "Patterns in Chaos" section styling
- Full EN/HE i18n

**Non-Goals:**
- Simulators for real games (existing simplified simulators are sufficient)
- Updating the existing simplified game cards (they stay as teaching tools)
- More than 5 accordion items

## Decisions

### The real lottery numbers

**Israeli Lotto** (primary example — simple, local):
```
Pick 6 numbers from 1–37, plus 1 "strong number" from 1–7
Combinations: C(37,6) × 7 = 2,324,784 × 7 = 16,273,488
Ticket price: ~₪7
Cost to guarantee jackpot: 16,273,488 × ₪7 = ₪113,914,416 (~₪114 million)
Jackpot prize (typical): ₪5–15 million
Net guaranteed loss: at least ₪99 million
Time to fill at 1/minute: ~31 years
```

**Powerball** (comparison example — shows scale difference):
```
Pick 5 numbers from 1–69, plus 1 Powerball from 1–26
Combinations: C(69,5) × 26 = 11,238,513 × 26 = 292,201,338
Tickets at $2 each: $584,402,676 (~$584 million)
Jackpot (after lump sum + 37% federal tax): ~$150–250 million
Net guaranteed loss: ~$350 million minimum
Time to fill at 1/minute: ~555 years
```

**The comparison punch line:**
- Israeli: 16.3 million combinations
- Powerball: 292 million combinations
- Difference: **18× harder** — just from adding 32 more numbers to the pool (37→69)
- "Going from 37 numbers to 69 numbers doesn't double the difficulty — it multiplies it 18 times."

### European Roulette — the cover-all trap

```
37 pockets (numbers 0–36)
To guarantee a win: place £1 on all 37 numbers = £37 spent
One number wins: you receive 35:1 = £35 + your £1 stake back = £36 total
Net: −£1 every single spin, guaranteed
No betting system changes this — the math is fixed
```

Plain-language version: "Imagine 37 friends each bet on a different number. One wins £35. The other 36 each lose £1. Total lost to casino: £36 − £35 = £1 from the group, every spin."

### American vs European Roulette — the hidden cost of 00

```
European: 37 pockets → house keeps 1/37 ≈ 2.7% of every bet
American: 38 pockets (adds "00") → house keeps 2/38 ≈ 5.26% of every bet

Cover all numbers:
  European: £37 spent → £36 back → lose £1
  American: £38 spent → £36 back → lose £2

Over 100 spins at £1:
  European: expected loss £2.70
  American: expected loss £5.26
  Extra cost of one green pocket: £2.56 per £100
```

"One extra pocket — the 00 — doubles the casino's advantage."

### Slot Machines — deliberately hidden

```
Return to Player (RTP) is set in software and rarely published.
Typical range: 85%–98% depending on jurisdiction and machine.
UK minimum: 70% RTP
Las Vegas average: ~92% RTP

Example at 92% RTP:
Feed in £1,000 → expected return: £920
Feed in £10,000 over time → expected return: £9,200 (lost £800)

Unlike roulette: you cannot calculate the exact odds. They are hidden by design.
"You can see the roulette wheel. You cannot see inside the slot machine."
```

### Blackjack — where knowledge changes the math

```
No fixed guarantee — but skill visibly shrinks the house edge:

Random play (no strategy):   house edge ~4%
Basic strategy (learnable):  house edge ~0.5%

Over 1,000 hands at £10/hand (£10,000 wagered):
  Random player:   expected loss ~£400
  Basic strategy:  expected loss ~£50
  Difference: £350 — from knowing a simple card rule chart

"It's the only common casino game where reading a book helps."
Note: Card counting can flip the edge to the player (~+1%), but casinos ban counters.
```

### Accordion component design

```jsx
function RealOddsRow({ emoji, title, edge, summary, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-700 last:border-0">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-3 py-3 text-start">
        <span className="text-xl">{emoji}</span>
        <span className="font-bold text-white flex-1">{title}</span>
        <span className="text-xs font-bold text-red-300 bg-red-950 px-2 py-0.5 rounded-full">{edge}</span>
        <span className="text-slate-400 text-sm">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="pb-4 text-sm text-slate-300 space-y-2">
          <p className="text-slate-400 italic">{summary}</p>
          {children}
        </div>
      )}
    </div>
  )
}
```

### i18n key structure

```
houseAlwaysWins.realOdds.title          — "Real World Odds"
houseAlwaysWins.realOdds.subtitle       — "What would it actually cost to guarantee a win?"

houseAlwaysWins.realOdds.lottery.title        — "Lottery"
houseAlwaysWins.realOdds.lottery.edge         — "House keeps ~50%"
houseAlwaysWins.realOdds.lottery.summary      — "Millions of tickets. Costs more to guarantee than you could ever win."
houseAlwaysWins.realOdds.lottery.il.label     — "🇮🇱 Israeli Lotto (6 from 37 + strong number)"
houseAlwaysWins.realOdds.lottery.il.combos    — "16,273,488 combinations"
houseAlwaysWins.realOdds.lottery.il.cost      — "₪7 per ticket × 16.3 million = ₪114 million to guarantee"
houseAlwaysWins.realOdds.lottery.il.prize     — "Typical jackpot: ₪5–15 million"
houseAlwaysWins.realOdds.lottery.il.loss      — "Guaranteed net loss: at least ₪99 million"
houseAlwaysWins.realOdds.lottery.il.time      — "Filling 1 ticket per minute: 31 years"
houseAlwaysWins.realOdds.lottery.pb.label     — "🇺🇸 Powerball (5 from 69 + 1 from 26)"
houseAlwaysWins.realOdds.lottery.pb.combos    — "292,201,338 combinations — 18× more than Israeli Lotto"
houseAlwaysWins.realOdds.lottery.pb.cost      — "$2 per ticket × 292 million = $584 million to guarantee"
houseAlwaysWins.realOdds.lottery.pb.prize     — "Jackpot after tax: ~$150–250 million"
houseAlwaysWins.realOdds.lottery.pb.loss      — "Guaranteed net loss: ~$350 million"
houseAlwaysWins.realOdds.lottery.pb.time      — "Filling 1 ticket per minute: 555 years"
houseAlwaysWins.realOdds.lottery.insight      — "Adding 32 more numbers to the pool (37→69) doesn't double the combinations — it multiplies them 18×."

houseAlwaysWins.realOdds.euRoulette.title     — "European Roulette"
houseAlwaysWins.realOdds.euRoulette.edge      — "House keeps 2.7%"
houseAlwaysWins.realOdds.euRoulette.summary   — "Cover every number and you still lose £1 — guaranteed."
houseAlwaysWins.realOdds.euRoulette.step1     — "37 pockets (0–36). Bet £1 on all 37 numbers: costs £37."
houseAlwaysWins.realOdds.euRoulette.step2     — "One number wins: you get 35:1 = £35 + your £1 stake = £36 back."
houseAlwaysWins.realOdds.euRoulette.step3     — "Net result: −£1 every spin. No system changes this."
houseAlwaysWins.realOdds.euRoulette.insight   — "Imagine 37 friends each betting on a different number. One wins £35, 36 lose £1. The casino collects £1 from the group every spin."

houseAlwaysWins.realOdds.amRoulette.title     — "American vs European Roulette"
houseAlwaysWins.realOdds.amRoulette.edge      — "House keeps 5.26%"
houseAlwaysWins.realOdds.amRoulette.summary   — "One extra green pocket (00) nearly doubles the house advantage."
houseAlwaysWins.realOdds.amRoulette.step1     — "European: 37 pockets → cover all for £37 → win £36 → lose £1"
houseAlwaysWins.realOdds.amRoulette.step2     — "American: 38 pockets → cover all for £38 → win £36 → lose £2"
houseAlwaysWins.realOdds.amRoulette.step3     — "Over 100 spins at £1: European costs you £2.70. American costs £5.26."
houseAlwaysWins.realOdds.amRoulette.insight   — "One extra pocket — the 00 — costs you an extra £2.56 per £100 wagered. Always play European if you have the choice."

houseAlwaysWins.realOdds.slots.title          — "Slot Machines"
houseAlwaysWins.realOdds.slots.edge           — "House keeps 2–15%"
houseAlwaysWins.realOdds.slots.summary        — "The odds are hidden by design. You cannot calculate them."
houseAlwaysWins.realOdds.slots.step1          — "Slots have a Return to Player (RTP) set in software. Typical range: 85–98%."
houseAlwaysWins.realOdds.slots.step2          — "At 92% RTP: feed in £1,000 → expect £920 back."
houseAlwaysWins.realOdds.slots.step3          — "Unlike roulette, you cannot see the mechanism. The combinations are hidden."
houseAlwaysWins.realOdds.slots.insight        — "You can see a roulette wheel and count its pockets. You cannot see inside a slot machine — that is not an accident."

houseAlwaysWins.realOdds.blackjack.title      — "Blackjack"
houseAlwaysWins.realOdds.blackjack.edge       — "House keeps 0.5–4%"
houseAlwaysWins.realOdds.blackjack.summary    — "The only common casino game where knowing the rules saves real money."
houseAlwaysWins.realOdds.blackjack.step1      — "Random play: house edge ~4% → lose ~£400 per £10,000 wagered."
houseAlwaysWins.realOdds.blackjack.step2      — "Basic strategy (a simple rule chart): house edge ~0.5% → lose ~£50 per £10,000."
houseAlwaysWins.realOdds.blackjack.step3      — "Difference: £350 saved — just from learning when to hit and stand."
houseAlwaysWins.realOdds.blackjack.insight    — "Card counting can flip the edge to the player, but casinos ban counters. Basic strategy is legal and cuts your losses by 8×."
```

## Risks / Trade-offs

- **Currency mixing** — Israeli Lotto uses ₪, Powerball uses $, roulette examples use £ as neutral. Using £ for roulette/blackjack/slots avoids confusion while ₪ and $ anchor each lottery to its real context. Acceptable.
- **Numbers feel large for age 10** — "₪114 million" and "555 years" are hard to grasp. Mitigated by physical analogies (31 years vs 555 years is more graspable than 16M vs 292M) and the direct contrast between the two lotteries.
- **Simplified existing cards vs real numbers** — The page now shows two lottery frames: simplified (5 coins / 1000 odds) and real. Could confuse. Mitigated by clearly labelling the new section "Real World Odds" and keeping it visually separated.

## Open Questions

None — design fully determined.
