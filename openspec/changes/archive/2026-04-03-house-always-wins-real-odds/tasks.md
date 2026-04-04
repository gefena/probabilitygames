## 1. i18n — English keys

- [x] 1.1 Add `houseAlwaysWins.realOdds.title` and `houseAlwaysWins.realOdds.subtitle` to en.json
- [x] 1.2 Add all Lottery keys (`lottery.title`, `.edge`, `.summary`, `.il.*`, `.pb.*`, `.insight`) to en.json
- [x] 1.3 Add all European Roulette keys (`euRoulette.title`, `.edge`, `.summary`, `.step1–3`, `.insight`) to en.json
- [x] 1.4 Add all American vs European Roulette keys (`amRoulette.title`, `.edge`, `.summary`, `.step1–3`, `.insight`) to en.json
- [x] 1.5 Add all Slot Machines keys (`slots.title`, `.edge`, `.summary`, `.step1–3`, `.insight`) to en.json
- [x] 1.6 Add all Blackjack keys (`blackjack.title`, `.edge`, `.summary`, `.step1–3`, `.insight`) to en.json

## 2. i18n — Hebrew keys

- [x] 2.1 Add all `houseAlwaysWins.realOdds.*` keys to he.json (matching structure from task 1)

## 3. RealOddsRow accordion component

- [x] 3.1 Create `RealOddsRow` component with local `useState(false)` toggle; props: `emoji`, `title`, `edge`, `summary`, `children`
- [x] 3.2 Render collapsed state: emoji + bold title + red edge badge (`text-red-300 bg-red-950`) + chevron (`▲`/`▼`)
- [x] 3.3 Render expanded state: italic summary paragraph + `children` slot; use `space-y-2 text-sm text-slate-300`
- [x] 3.4 Add `border-b border-slate-700 last:border-0` separator between rows

## 4. RealOddsSection — section wrapper

- [x] 4.1 Create `RealOddsSection` component with dark panel (`bg-slate-800/60 rounded-2xl p-5`) matching existing section style
- [x] 4.2 Render section title (`houseAlwaysWins.realOdds.title`) and subtitle (`houseAlwaysWins.realOdds.subtitle`)
- [x] 4.3 Render 5 `RealOddsRow` instances in order: Lottery, European Roulette, American vs EU Roulette, Slots, Blackjack

## 5. Lottery row content

- [x] 5.1 Render Israeli Lotto block: label, combinations count, cost to guarantee, jackpot range, net loss, time to fill — all from i18n keys
- [x] 5.2 Render Powerball block: same structure, using `.pb.*` keys
- [x] 5.3 Render insight block (`lottery.insight`) with the 18× multiplier explanation

## 6. European Roulette row content

- [x] 6.1 Render 3 step lines (`euRoulette.step1–3`)
- [x] 6.2 Render insight block (`euRoulette.insight`) with the 37-friends analogy

## 7. American vs European Roulette row content

- [x] 7.1 Render 3 step lines (`amRoulette.step1–3`)
- [x] 7.2 Render insight block (`amRoulette.insight`) with the always-play-European recommendation

## 8. Slot Machines row content

- [x] 8.1 Render 3 step lines (`slots.step1–3`)
- [x] 8.2 Render insight block (`slots.insight`) with the hidden-by-design explanation

## 9. Blackjack row content

- [x] 9.1 Render 3 step lines (`blackjack.step1–3`)
- [x] 9.2 Render insight block (`blackjack.insight`) with the card-counting note

## 10. Integration

- [x] 10.1 Import and render `RealOddsSection` at the bottom of `HouseAlwaysWinsPage.jsx`, below the existing bar chart
