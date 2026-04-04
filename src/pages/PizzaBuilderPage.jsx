import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import GamePageLayout from '../components/GamePageLayout'
import ExplainerPanel from '../components/ExplainerPanel'
import QuizPanel from '../components/QuizPanel'
import pizzaBuilderQuestions from '../quizzes/pizzaBuilder'

// ── Constants ─────────────────────────────────────────────────────────────────
const ALL_CRUSTS   = ['thin', 'thick', 'sourdough', 'deepDish']
const ALL_TOPPINGS = ['mushroom', 'pepper', 'cheese', 'olive', 'pepperoni']

const DEFAULT_CRUSTS   = ['thin', 'thick']
const DEFAULT_TOPPINGS = ['mushroom', 'pepper']

// ── Pure helpers ──────────────────────────────────────────────────────────────
function cellKey(ci, ti) {
  return `${ci}|${ti}`
}

function pruneWinners(winners, crusts, toppings) {
  const valid = new Set()
  for (let ci = 0; ci < crusts.length; ci++) {
    for (let ti = 0; ti < toppings.length; ti++) {
      valid.add(cellKey(ci, ti))
    }
  }
  return new Set([...winners].filter(k => valid.has(k)))
}

function cellCount(orders, ci, ti) {
  const key = cellKey(ci, ti)
  return orders.filter(o => o.key === key).length
}

function isEvenSpread(orders, crusts, toppings) {
  const totalCells = crusts.length * toppings.length
  if (orders.length < 20 || totalCells === 0) return false
  const expected = orders.length / totalCells
  for (let ci = 0; ci < crusts.length; ci++) {
    for (let ti = 0; ti < toppings.length; ti++) {
      const count = cellCount(orders, ci, ti)
      if (count === 0 || count > expected * 1.5) return false
    }
  }
  return true
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function PizzaBuilderPage() {
  const { t } = useTranslation()

  const [crusts,   setCrusts]   = useState(DEFAULT_CRUSTS)
  const [toppings, setToppings] = useState(DEFAULT_TOPPINGS)
  const [winners,  setWinners]  = useState(new Set())
  const [orders,   setOrders]   = useState([])
  const [lastOrder, setLastOrder] = useState(null)
  const [isOrdering, setIsOrdering] = useState(false)

  const [showCrustPicker,   setShowCrustPicker]   = useState(false)
  const [showToppingPicker, setShowToppingPicker] = useState(false)

  // ── Derived ──────────────────────────────────────────────────────────────────
  const totalCells    = crusts.length * toppings.length
  const winCount      = winners.size
  const availableCrusts   = ALL_CRUSTS.filter(c => !crusts.includes(c))
  const availableToppings = ALL_TOPPINGS.filter(t => !toppings.includes(t))

  // ── Menu management ───────────────────────────────────────────────────────────
  function addCrust(id) {
    const newCrusts = [...crusts, id]
    setCrusts(newCrusts)
    setShowCrustPicker(false)
  }

  function removeCrust(ci) {
    const newCrusts = crusts.filter((_, i) => i !== ci)
    setCrusts(newCrusts)
    setWinners(pruneWinners(winners, newCrusts, toppings))
    setOrders([])
    setLastOrder(null)
  }

  function addTopping(id) {
    const newToppings = [...toppings, id]
    setToppings(newToppings)
    setShowToppingPicker(false)
  }

  function removeTopping(ti) {
    const newToppings = toppings.filter((_, i) => i !== ti)
    setToppings(newToppings)
    setWinners(pruneWinners(winners, crusts, newToppings))
    setOrders([])
    setLastOrder(null)
  }

  // ── Winner selection ──────────────────────────────────────────────────────────
  function toggleCell(ci, ti) {
    const key = cellKey(ci, ti)
    const next = new Set(winners)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    setWinners(next)
  }

  function toggleRow(ci) {
    const rowKeys = toppings.map((_, ti) => cellKey(ci, ti))
    const allSelected = rowKeys.every(k => winners.has(k))
    const next = new Set(winners)
    if (allSelected) rowKeys.forEach(k => next.delete(k))
    else rowKeys.forEach(k => next.add(k))
    setWinners(next)
  }

  function toggleColumn(ti) {
    const colKeys = crusts.map((_, ci) => cellKey(ci, ti))
    const allSelected = colKeys.every(k => winners.has(k))
    const next = new Set(winners)
    if (allSelected) colKeys.forEach(k => next.delete(k))
    else colKeys.forEach(k => next.add(k))
    setWinners(next)
  }

  // ── Ordering ──────────────────────────────────────────────────────────────────
  function doOrder() {
    if (isOrdering) return
    setIsOrdering(true)
    setTimeout(() => {
      const ci = Math.floor(Math.random() * crusts.length)
      const ti = Math.floor(Math.random() * toppings.length)
      const key = cellKey(ci, ti)
      const isWin = winners.has(key)
      const order = { ci, ti, key, isWin }
      setLastOrder(order)
      setOrders(prev => [...prev, order])
      setIsOrdering(false)
    }, 350)
  }

  function handleReset() {
    setOrders([])
    setLastOrder(null)
  }

  // ── Render ────────────────────────────────────────────────────────────────────
  const even = isEvenSpread(orders, crusts, toppings)

  return (
    <GamePageLayout title={t('pizzaBuilder.title')} emoji={t('pizzaBuilder.emoji')}>
      <p className="text-gray-600 mb-2">{t('pizzaBuilder.subtitle')}</p>
      <p className="text-sm text-gray-500 mb-6">{t('pizzaBuilder.howToPlay')}</p>

      {/* ── Menu Builder ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-5">

        {/* Crusts row */}
        <div className="mb-3">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Crusts</div>
          <div className="flex flex-wrap gap-2 items-center">
            {crusts.map((id, ci) => (
              <span key={id} className="flex items-center gap-1 bg-amber-100 text-amber-800 rounded-full px-3 py-1 text-sm font-semibold">
                {t(`pizzaBuilder.crust.${id}`)}
                {crusts.length > 1 && (
                  <button
                    onClick={() => removeCrust(ci)}
                    className="text-amber-500 hover:text-amber-700 font-bold leading-none"
                    aria-label={t('pizzaBuilder.removeCrust')}
                  >×</button>
                )}
              </span>
            ))}
            {availableCrusts.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => { setShowCrustPicker(p => !p); setShowToppingPicker(false) }}
                  className="text-sm text-amber-600 hover:text-amber-800 font-semibold border border-dashed border-amber-400 rounded-full px-3 py-1"
                >
                  {t('pizzaBuilder.addCrust')}
                </button>
                <AnimatePresence>
                  {showCrustPicker && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute top-9 left-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-2 flex flex-col gap-1 min-w-[120px]"
                    >
                      {availableCrusts.map(id => (
                        <button
                          key={id}
                          onClick={() => addCrust(id)}
                          className="text-sm text-left px-3 py-1.5 rounded-lg hover:bg-amber-50 text-gray-700 font-medium"
                        >
                          {t(`pizzaBuilder.crust.${id}`)}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Toppings row */}
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Toppings</div>
          <div className="flex flex-wrap gap-2 items-center">
            {toppings.map((id, ti) => (
              <span key={id} className="flex items-center gap-1 bg-rose-100 text-rose-800 rounded-full px-3 py-1 text-sm font-semibold">
                {t(`pizzaBuilder.topping.${id}`)}
                {toppings.length > 1 && (
                  <button
                    onClick={() => removeTopping(ti)}
                    className="text-rose-500 hover:text-rose-700 font-bold leading-none"
                    aria-label={t('pizzaBuilder.removeTopping')}
                  >×</button>
                )}
              </span>
            ))}
            {availableToppings.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => { setShowToppingPicker(p => !p); setShowCrustPicker(false) }}
                  className="text-sm text-rose-600 hover:text-rose-800 font-semibold border border-dashed border-rose-400 rounded-full px-3 py-1"
                >
                  {t('pizzaBuilder.addTopping')}
                </button>
                <AnimatePresence>
                  {showToppingPicker && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute top-9 left-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-2 flex flex-col gap-1 min-w-[140px]"
                    >
                      {availableToppings.map(id => (
                        <button
                          key={id}
                          onClick={() => addTopping(id)}
                          className="text-sm text-left px-3 py-1.5 rounded-lg hover:bg-rose-50 text-gray-700 font-medium"
                        >
                          {t(`pizzaBuilder.topping.${id}`)}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Grid ──────────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-5">
        <div className="text-sm text-gray-500 mb-3">{t('pizzaBuilder.winnerHint')}</div>

        <div className="overflow-x-auto">
          <table className="border-separate border-spacing-1">
            <thead>
              <tr>
                <th className="w-20" />
                {toppings.map((tid, ti) => (
                  <th key={tid}>
                    <button
                      onClick={() => toggleColumn(ti)}
                      className="w-16 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg px-1 py-1.5 transition-colors leading-tight"
                    >
                      {t(`pizzaBuilder.topping.${tid}`)}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {crusts.map((cid, ci) => (
                <tr key={cid}>
                  <td>
                    <button
                      onClick={() => toggleRow(ci)}
                      className="w-20 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg px-2 py-2 transition-colors text-left leading-tight"
                    >
                      {t(`pizzaBuilder.crust.${cid}`)}
                    </button>
                  </td>
                  {toppings.map((tid, ti) => {
                    const key = cellKey(ci, ti)
                    const isWinner = winners.has(key)
                    const isLastOrdered = lastOrder?.key === key
                    const count = orders.length >= 1 ? cellCount(orders, ci, ti) : null

                    let cellClass = 'w-16 h-16 rounded-xl border-2 text-xl flex items-center justify-center relative transition-all select-none cursor-pointer'
                    if (isLastOrdered && lastOrder?.isWin) {
                      cellClass += ' bg-emerald-200 border-emerald-500 scale-110'
                    } else if (isLastOrdered) {
                      cellClass += ' bg-red-100 border-red-400'
                    } else if (isWinner) {
                      cellClass += ' bg-violet-200 border-violet-500 ring-2 ring-violet-400'
                    } else {
                      cellClass += ' bg-gray-50 border-gray-200 hover:border-violet-300 hover:bg-violet-50'
                    }

                    return (
                      <td key={tid}>
                        <button className={cellClass} onClick={() => toggleCell(ci, ti)}>
                          🍕
                          <AnimatePresence>
                            {count !== null && (
                              <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`absolute -top-1.5 -end-1.5 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${count === 0 ? 'bg-gray-300 text-gray-600' : 'bg-violet-600 text-white'}`}
                              >
                                {count}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Winner count */}
        <div className="mt-3 text-sm font-semibold text-center">
          {winCount > 0
            ? <span className="text-violet-700">{t('pizzaBuilder.winCount', { n: winCount, total: totalCells })}</span>
            : <span className="text-gray-400">{t('pizzaBuilder.noWinners')}</span>
          }
        </div>
      </div>

      {/* ── Order button + result ─────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-3 mb-6">
        {winCount === 0 && (
          <p className="text-sm text-amber-600 font-medium">{t('pizzaBuilder.noWinnersHint')}</p>
        )}
        <button
          onClick={doOrder}
          disabled={isOrdering}
          className="px-8 py-3 bg-violet-600 text-white font-bold rounded-2xl text-lg hover:bg-violet-700 active:scale-95 transition-all disabled:opacity-50"
        >
          {t('pizzaBuilder.orderBtn')}
        </button>

        <AnimatePresence mode="wait">
          {lastOrder && !isOrdering && (
            <motion.div
              key={`${lastOrder.key}-${orders.length}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`text-base font-bold ${lastOrder.isWin ? 'text-emerald-600' : 'text-rose-600'}`}
            >
              {lastOrder.isWin
                ? t('pizzaBuilder.win',  { crust: t(`pizzaBuilder.crust.${crusts[lastOrder.ci]}`),   topping: t(`pizzaBuilder.topping.${toppings[lastOrder.ti]}`) })
                : t('pizzaBuilder.lose', { crust: t(`pizzaBuilder.crust.${crusts[lastOrder.ci]}`),   topping: t(`pizzaBuilder.topping.${toppings[lastOrder.ti]}`) })
              }
            </motion.div>
          )}
        </AnimatePresence>

        {orders.length > 0 && (
          <p className="text-xs text-gray-400">{t('pizzaBuilder.ordersLabel', { n: orders.length })}</p>
        )}
      </div>

      {/* ── Heatmap ───────────────────────────────────────────────────────────── */}
      {orders.length >= 20 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-extrabold text-gray-800 text-sm">{t('pizzaBuilder.heatmapTitle')}</h3>
            <button
              onClick={handleReset}
              className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg px-2 py-1"
            >
              {t('pizzaBuilder.resetBtn')}
            </button>
          </div>
          <p className={`text-sm font-semibold mb-1 ${even ? 'text-emerald-600' : 'text-amber-600'}`}>
            {even ? t('pizzaBuilder.heatmapEven') : t('pizzaBuilder.heatmapUneven')}
          </p>
          <p className="text-xs text-gray-400">{t('pizzaBuilder.ordersLabel', { n: orders.length })}</p>
        </div>
      )}

      {/* ── Explainer + Quiz ──────────────────────────────────────────────────── */}
      <ExplainerPanel
        accentColor="border-orange-500"
        title={t('pizzaBuilder.explainer.title')}
        body={t('pizzaBuilder.explainer.body')}
        example={t('pizzaBuilder.explainer.example')}
        callout={t('pizzaBuilder.explainer.callout')}
        furtherReading={t('pizzaBuilder.explainer.furtherReading')}
      />

      <QuizPanel questions={pizzaBuilderQuestions} />
    </GamePageLayout>
  )
}
