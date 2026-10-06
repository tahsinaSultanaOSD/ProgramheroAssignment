import { createContext, useContext, useEffect, useState } from 'react'

const WatchlistContext = createContext(null)
const STORAGE_KEY = 'movie-explorer:watchlist'

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))
    } catch {
      // storage unavailable — watchlist just won't persist this session
    }
  }, [watchlist])

  function isSaved(id) {
    return watchlist.some((show) => show.id === id)
  }

  function toggle(show) {
    setWatchlist((prev) =>
      prev.some((s) => s.id === show.id)
        ? prev.filter((s) => s.id !== show.id)
        : [...prev, show]
    )
  }

  return (
    <WatchlistContext.Provider value={{ watchlist, isSaved, toggle }}>
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext)
  if (!ctx) throw new Error('useWatchlist must be used within a WatchlistProvider')
  return ctx
}
