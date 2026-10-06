import { useEffect, useRef } from 'react'
import { X, Bookmark } from 'lucide-react'
import { useWatchlist } from '../context/WatchlistContext.jsx'

function stripHtml(html) {
  if (!html) return 'No summary available.'
  return html.replace(/<[^>]*>/g, '')
}

function formatRating(rating) {
  if (!rating || rating.average == null) return 'N/A'
  return rating.average.toFixed(1)
}

export default function MovieModal({ show, onClose }) {
  const closeButtonRef = useRef(null)
  const { isSaved, toggle } = useWatchlist()

  useEffect(() => {
    closeButtonRef.current?.focus()

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!show) return null

  const backdrop = show.image?.original || show.image?.medium || null
  const genres = show.genres?.length ? show.genres.join(', ') : 'Not specified'
  const network = show.network?.name || show.webChannel?.name || 'Unknown'
  const saved = isSaved(show.id)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" aria-hidden="true" />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface border border-white/10 animate-modal-rise">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-ink/70 text-cream hover:bg-red transition-colors"
        >
          <X size={16} />
        </button>

        {backdrop ? (
          <img
            src={backdrop}
            alt={`Backdrop for ${show.name}`}
            className="w-full h-56 sm:h-72 object-cover"
          />
        ) : (
          <div className="w-full h-40 bg-surface2 flex items-center justify-center text-muted">
            No image available
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id="modal-title" className="font-display text-2xl sm:text-3xl font-bold text-cream">
              {show.name}
            </h2>
            <button
              onClick={() => toggle(show)}
              aria-pressed={saved}
              className={`shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                saved ? 'bg-red text-cream' : 'bg-surface2 border border-white/10 text-cream hover:border-white/25'
              }`}
            >
              <Bookmark size={13} fill={saved ? 'currentColor' : 'none'} />
              {saved ? 'Saved' : 'Watchlist'}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            <span>⭐ Rating: {formatRating(show.rating)}</span>
            <span>📅 Premiered: {show.premiered || 'TBA'}</span>
            <span>Status: {show.status || 'Unknown'}</span>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted mb-1">Genre</p>
              <p className="text-cream">{genres}</p>
            </div>
            <div>
              <p className="text-muted mb-1">Network</p>
              <p className="text-cream">{network}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-muted mb-2 text-sm">Overview</p>
            <p className="text-cream leading-relaxed">{stripHtml(show.summary)}</p>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="rounded-full bg-red px-6 py-2.5 font-semibold text-cream hover:bg-red/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
