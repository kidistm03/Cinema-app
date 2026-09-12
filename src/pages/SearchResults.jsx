import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useDebounce from '../hooks/useDebounce'
import MovieGrid from '../components/movie/MovieGrid'
import SkeletonCard from '../components/movie/SkeletonCard'

const KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()

  const initialQuery = searchParams.get('query') || ''

  const [query, setQuery] = useState(initialQuery)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const debouncedQuery = useDebounce(query)

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setMovies([])
      return
    }

    setSearchParams({
      query: debouncedQuery,
    })

    const controller = new AbortController()

    async function searchMovies() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `${BASE_URL}/search/movie?query=${encodeURIComponent(debouncedQuery)}`,
          {
            headers: {
              Authorization: `Bearer ${KEY}`,
            },
            signal: controller.signal,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to search movies')
        }

        const data = await response.json()

        setMovies(data.results)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    searchMovies()

    return () => {
      controller.abort()
    }
  }, [debouncedQuery, setSearchParams])

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-bold mb-6">
          Search Movies
        </h1>

        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for a movie..."
          className="mb-8 w-full rounded-lg bg-zinc-800 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-red-600"
        />

        {loading && (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {error && (
          <p className="text-red-500">
            Error: {error}
          </p>
        )}

        {!loading && !error && movies.length > 0 && (
          <MovieGrid movies={movies} />
        )}

        {!loading && !error && query && movies.length === 0 && (
          <p className="text-gray-400">
            No movies found.
          </p>
        )}

      </div>
    </main>
  )
}

export default SearchResults