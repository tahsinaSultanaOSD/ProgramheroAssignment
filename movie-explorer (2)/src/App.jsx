import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import MovieListingPage from './pages/MovieListingPage.jsx'
import WatchlistPage from './pages/WatchlistPage.jsx'
import { WatchlistProvider } from './context/WatchlistContext.jsx'

export default function App() {
  return (
    <WatchlistProvider>
      <div className="min-h-screen flex flex-col bg-ink font-body text-cream">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MovieListingPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </WatchlistProvider>
  )
}
