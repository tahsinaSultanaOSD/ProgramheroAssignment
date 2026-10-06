import { Link } from 'react-router-dom'
import { PlayCircle, Star } from 'lucide-react'

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden hero-glow">
      <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface px-4 py-1.5 text-xs font-medium text-muted mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-orange" aria-hidden="true" />
          OVER 50,000+ TITLES POWERED BY TVMAZE API
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.03] max-w-3xl text-cream uppercase">
          Discover <span className="gradient-text">Movies</span> &amp; Series
        </h1>

        <p className="mt-6 max-w-xl text-base sm:text-lg text-muted leading-relaxed">
          Explore and discover your favorite movies and shows from around the world.
          Live catalog data, ratings, and full details at your fingertips.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/movies"
            className="inline-flex items-center gap-2 rounded-full bg-red px-7 py-3.5 font-semibold text-cream hover:bg-red/90 transition-colors"
          >
            <PlayCircle size={18} />
            Explore Now
          </Link>
          <Link
            to="/movies?sort=rating"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-surface px-7 py-3.5 font-semibold text-cream hover:border-white/30 transition-colors"
          >
            <Star size={16} />
            View Top Rated
          </Link>
        </div>
      </div>
    </section>
  )
}
