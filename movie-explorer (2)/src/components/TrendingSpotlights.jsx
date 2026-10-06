import { useEffect, useState } from 'react'
import { Radio } from 'lucide-react'
import { fetchAllShows, sortByRating } from '../lib/api.js'

export default function TrendingSpotlights() {
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchAllShows()
      .then((data) => {
        if (cancelled) return
        setShows(sortByRating(data).slice(0, 4))
      })
      .catch(() => {
        if (!cancelled) setShows([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-red text-xs font-semibold tracking-wide">
            <Radio size={14} />
            TONIGHT'S TRENDING SPOTLIGHTS
          </div>
          <span className="text-xs text-muted">TVMaze live metric</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 rounded-lg bg-surface border border-white/10 animate-pulse" />
            ))}

          {!loading &&
            shows.map((show) => (
              <div
                key={show.id}
                className="flex items-center gap-3 rounded-lg bg-surface border border-white/10 p-2.5"
              >
                <div className="w-11 h-11 rounded-md overflow-hidden bg-surface2 shrink-0">
                  {show.image?.medium ? (
                    <img
                      src={show.image.medium}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-cream font-medium truncate">{show.name}</p>
                  <p className="text-xs text-muted">
                    ⭐ {show.rating?.average?.toFixed(1) ?? 'N/A'} · {show.genres?.[0] || 'Show'}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
