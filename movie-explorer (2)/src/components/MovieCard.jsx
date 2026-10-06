import { Bookmark, Info } from 'lucide-react'
import { useWatchlist } from '../context/WatchlistContext.jsx'

function formatYear(premiered) {
  if (!premiered) return 'TBA'
  return premiered.slice(0, 4)
}

function formatRating(rating) {
  if (!rating || rating.average == null) return 'N/A'
  return rating.average.toFixed(1)
}

export default function MovieCard({ show, onSeeDetails }) {
  const poster = show.image?.medium || null
  const { isSaved, toggle } = useWatchlist()
  const saved = isSaved(show.id)
  const category = show.genres?.slice(0, 2).join(' • ') || 'Show'

  return (
    <div className="group flex flex-col rounded-xl bg-surface border border-white/10 overflow-hidden hover:border-white/20 transition-colors">
      <div className="relative aspect-[2/3] bg-surface2">
        {poster ? (
          <img
            src={poster}
            alt={`Poster for ${show.name}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-sm px-4 text-center">
            No image available
          </div>
        )}

        <span className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-md bg-ink/80 px-2 py-1 text-[11px] font-medium text-cream">
          📅 {formatYear(show.premiered)}
        </span>
        <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-md bg-ink/80 px-2 py-1 text-[11px] font-semibold text-gold">
          ⭐ {formatRating(show.rating)}
        </span>

        <button
          onClick={() => toggle(show)}
          aria-label={saved ? `Remove ${show.name} from watchlist` : `Add ${show.name} to watchlist`}
          aria-pressed={saved}
          className={`absolute bottom-2.5 right-2.5 flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
            saved ? 'bg-red text-cream' : 'bg-ink/80 text-cream hover:bg-ink'
          }`}
        >
          <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex flex-col flex-1 px-4 pt-3.5 pb-4">
        <p className="text-[11px] uppercase tracking-wide text-orange font-medium">{category}</p>
        <h3 className="font-display text-base font-semibold text-cream leading-snug line-clamp-2 mt-1">
          {show.name}
        </h3>

        <button
          onClick={() => onSeeDetails(show)}
          className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-surface2 border border-white/10 text-sm font-semibold text-cream py-2.5 hover:border-white/25 transition-colors"
        >
          See Details
          <Info size={14} />
        </button>
      </div>
    </div>
  )
}
