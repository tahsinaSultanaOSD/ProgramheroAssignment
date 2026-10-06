import { Link, useLocation } from 'react-router-dom'
import { Clapperboard, Bookmark, CircleUserRound, ArrowRight } from 'lucide-react'
import { useWatchlist } from '../context/WatchlistContext.jsx'

export default function Navbar() {
  const location = useLocation()
  const { watchlist } = useWatchlist()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/movies', label: 'Explore Movies' },
    { to: '/movies?sort=rating', label: 'Top Rated' },
    { to: '/movies#genres', label: 'Genres' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-red to-orange">
            <Clapperboard size={18} className="text-cream" strokeWidth={2.25} />
          </span>
          <span className="font-display text-lg font-semibold text-cream">MovieExplorer</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive =
              link.to === '/' ? location.pathname === '/' : location.pathname === '/movies'
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                  isActive
                    ? 'text-red border-red'
                    : 'text-muted border-transparent hover:text-cream'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            to="/watchlist"
            className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
              location.pathname === '/watchlist'
                ? 'text-red border-red'
                : 'text-muted border-transparent hover:text-cream'
            }`}
          >
            Watchlist
          </Link>
        </nav>

        <div className="flex items-center gap-4 shrink-0">
          <Link
            to="/watchlist"
            aria-label={`Watchlist, ${watchlist.length} saved`}
            className="relative text-muted hover:text-cream transition-colors"
          >
            <Bookmark size={19} />
            {watchlist.length > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-red text-[10px] font-semibold text-cream">
                {watchlist.length}
              </span>
            )}
          </Link>
          <span className="hidden sm:inline text-muted">
            <CircleUserRound size={20} />
          </span>
          <Link
            to="/movies"
            className="inline-flex items-center gap-1.5 rounded-full bg-red px-5 py-2 text-sm font-semibold text-cream hover:bg-red/90 transition-colors"
          >
            Explore Now
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </header>
  )
}
