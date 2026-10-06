const BASE_URL = 'https://api.tvmaze.com'

export async function fetchAllShows() {
  const res = await fetch(`${BASE_URL}/shows`)
  if (!res.ok) throw new Error('Failed to load shows')
  return res.json()
}

export async function searchShows(query) {
  const res = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`)
  if (!res.ok) throw new Error('Search failed')
  const data = await res.json()
  return data.map((entry) => entry.show)
}

export function sortByRating(shows) {
  return [...shows].sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
}
