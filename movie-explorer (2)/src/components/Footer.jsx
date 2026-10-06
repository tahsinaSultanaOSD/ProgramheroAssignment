import { Link } from 'react-router-dom'
import { Clapperboard } from 'lucide-react'

const columns = [
  {
    title: 'Navigation',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Explore Movies', to: '/movies' },
      { label: 'Top Rated', to: '/movies?sort=rating' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { label: 'Drama', to: '/movies#genres' },
      { label: 'Sci-Fi', to: '/movies#genres' },
      { label: 'Action', to: '/movies#genres' },
    ],
  },
  {
    title: 'Curation',
    links: [
      { label: 'Watchlist', to: '/watchlist' },
      { label: 'GitHub Repository', href: 'https://github.com/' },
      { label: 'TVMaze API', href: 'https://www.tvmaze.com/api' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
        <span className="flex items-center gap-2 text-xs text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          TVMaze API Operational
        </span>
        <span className="text-xs text-muted">Public REST API · No key required</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-red to-orange">
              <Clapperboard size={16} className="text-cream" />
            </span>
            <span className="font-display text-lg font-semibold text-cream">MovieExplorer</span>
          </div>
          <p className="text-sm text-muted leading-relaxed max-w-xs">
            A student project pairing a live TV &amp; movie catalog with a cinema-inspired
            interface.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-cream mb-4">{col.title}</p>
            <ul className="space-y-2.5">
              {col.links.map((link) =>
                link.to ? (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-muted hover:text-red transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted hover:text-red transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
        <p>© {year} MovieExplorer. Powered by the TVMaze API. All rights reserved.</p>
        <p>Built with React, Vite &amp; Tailwind CSS.</p>
      </div>
    </footer>
  )
}
