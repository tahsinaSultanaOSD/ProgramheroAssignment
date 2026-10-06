import { Link } from 'react-router-dom'
import { Bookmark } from 'lucide-react'
import MovieCard from '../components/MovieCard.jsx'
import { useWatchlist } from '../context/WatchlistContext.jsx'
import { useState } from 'react'
import MovieModal from '../components/MovieModal.jsx'

export default function WatchlistPage() {
  const { watchlist } = useWatchlist()
  const [selectedShow, setSelectedShow] = useState(null)

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      <p className="text-xs font-semibold tracking-wide text-red mb-2">SAVED FOR LATER</p>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-cream mb-8">Your Watchlist</h1>

      {watchlist.length === 0 ? (
        <div className="rounded-2xl bg-surface border border-white/10 px-8 py-16 text-center">
          <Bookmark size={28} className="mx-auto text-muted mb-4" />
          <p className="text-cream font-medium">Your watchlist is empty</p>
          <p className="text-muted mt-1 mb-6">Tap the bookmark icon on any title to save it here.</p>
          <Link
            to="/movies"
            className="inline-flex items-center rounded-full bg-red px-6 py-2.5 font-semibold text-cream hover:bg-red/90 transition-colors"
          >
            Browse movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {watchlist.map((show) => (
            <MovieCard key={show.id} show={show} onSeeDetails={setSelectedShow} />
          ))}
        </div>
      )}

      {selectedShow && (
        <MovieModal show={selectedShow} onClose={() => setSelectedShow(null)} />
      )}
    </div>
  )
}
