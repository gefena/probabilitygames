import { useState, useCallback, useEffect } from 'react'

/**
 * Persist a personal best score for a game.
 * @param {string} gameId   - Storage key prefix, e.g. 'higher-or-lower'
 * @param {string} [mode]   - 'max' (default) or 'accumulate'
 */
export function usePersonalBest(gameId, mode = 'max') {
  const storageKey = `pb:${gameId}`

  const [best, setBest] = useState(() => {
    try {
      const val = localStorage.getItem(storageKey)
      return val !== null ? Number(val) : 0
    } catch {
      return 0
    }
  })

  const [isNew, setIsNew] = useState(false)

  // Clear isNew after one render cycle
  useEffect(() => {
    if (isNew) {
      const t = setTimeout(() => setIsNew(false), 2000)
      return () => clearTimeout(t)
    }
  }, [isNew])

  const setBestIfHigher = useCallback((value) => {
    const numVal = Number(value)
    setBest(prev => {
      let next
      if (mode === 'accumulate') {
        next = prev + numVal
      } else {
        next = Math.max(prev, numVal)
      }
      if (next > prev) {
        try { localStorage.setItem(storageKey, String(next)) } catch { /* ignore */ }
        setIsNew(true)
        return next
      }
      return prev
    })
  }, [storageKey, mode])

  return { best, setBestIfHigher, isNew }
}
