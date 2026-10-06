import { useEffect, useState, useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import MovieCard from '../components/MovieCard.jsx'
import MovieModal from '../components/MovieModal.jsx'
import { fetchAllShows, searchShows, sortByRating } from '../lib/api.js'

const GENRE_FILTERS = ['All', 'Drama', 'Sci-Fi', 'Comedy', 'Action', 'Thriller']

const SORT_OPTIONS = [
  { value: 'rating', label: 'Top Rated (Highest First)' },
  { value: 'newest', label: 'Newest First' },
  { value: 'az', label: 'Title (A–Z)' },
]

export default function MovieListingPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')
  const [sort, setSort] = useState(searchParams.get('sort') === 'rating' ? 'rating' : 'rating')
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedShow, setSelectedShow] = useState(null)

  const loadAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchAllShows()
      setShows(sortByRating(data).slice(0, 60))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const loadSearch = useCallback(async (searchQuery) => {
    setLoading(true)
    setError(null)
    try {
      const results = await searchShows(searchQuery)
      setShows(results)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  useEffect(() => {
    const trimmed = query.trim()
    const timeoutId = setTimeout(() => {
      if (trimmed.length === 0) {
        loadAll()
      } else {
        loadSearch(trimmed)
      }
    }, 350)
    return () => clearTimeout(timeoutId)
  }, [query, loadAll, loadSearch])

  const visibleShows = useMemo(() => {
    let result = shows

    if (genre !== 'All') {
      result = result.filter((show) => show.genres?.includes(genre))
    }

    result = [...result]
    if (sort === 'rating') {
      result.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
    } else if (sort === 'newest') {
      result.sort((a, b) => (b.premiered || '').localeCompare(a.premiered || ''))
    } else if (sort === 'az') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [shows, genre, sort])

  function handleSortChange(value) {
    setSort(value)
    setSearchParams(value === 'rating' ? {} : { sort: value })
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-14">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold tracking-wide text-red mb-2">CATALOG DISCOVERY</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-cream">
            Explore Movies &amp; Series
          </h1>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface border border-white/10 px-4 py-1.5 text-xs text-muted mt-1">
          ⭐ Showing {visibleShows.length} result{visibleShows.length === 1 ? '' : 's'} for
          {query.trim() ? ` "${query.trim()}"` : ' "All Shows"'} (TVMaze GET /shows)
        </span>
      </div>

      <div className="flex items-center gap-3 rounded-full bg-surface border border-white/10 focus-within:border-white/30 px-5 py-3 mb-6 transition-colors">
        <Search size={17} className="text-muted shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie, series, or actor by name..."
          aria-label="Search for a movie or show"
          className="flex-1 bg-transparent outline-none text-cream placeholder:text-muted text-sm"
        />
      </div>

      <div
        id="genres"
        className="flex flex-wrap items-center justify-between gap-4 mb-10 scroll-mt-24"
      >
        <div className="flex flex-wrap gap-2">
          {GENRE_FILTERS.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              data-active={genre === g}
              className="chip rounded-full px-4 py-1.5 text-sm font-medium"
            >
              {g}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm text-muted">
          <SlidersHorizontal size={15} />
          <span className="hidden sm:inline">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="bg-surface border border-white/10 rounded-full px-3.5 py-1.5 text-cream text-sm outline-none focus:border-white/30"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-surface">
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading && <p className="text-muted text-center py-16">Loading titles…</p>}

      {!loading && error && (
        <p className="text-red text-center py-16">
          Something went wrong: {error}. Please try again.
        </p>
      )}

      {!loading && !error && visibleShows.length === 0 && (
        <p className="text-muted text-center py-16">
          No titles matched your search or filters. Try something else.
        </p>
      )}

      {!loading && !error && visibleShows.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {visibleShows.map((show) => (
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
