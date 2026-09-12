import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useDebounce from '../hooks/useDebounce'
import MovieGrid from '../components/movie/MovieGrid'
import SkeletonCard from '../components/movie/SkeletonCard'
import PersonGrid from '../components/people/PersonGrid'

const KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()

  const initialQuery = searchParams.get('query') || ''

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const debouncedQuery = useDebounce(query)

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([])
      return
    }

    setSearchParams({ query: debouncedQuery })

    const controller = new AbortController()

    async function searchMovies() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `${BASE_URL}/search/multi?query=${encodeURIComponent(debouncedQuery)}`,
          {
            headers: {
              Authorization: `Bearer ${KEY}`,
            },
            signal: controller.signal,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to search')
        }

        const data = await response.json()

        setResults(data.results || [])
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

  const movies = results.filter(
    (item) => item.media_type === 'movie'
  )

  const series = results.filter(
    (item) => item.media_type === 'tv'
  )

  const celebrities = results.filter(
    (item) => item.media_type === 'person'
  )

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-bold mb-6">
          Search
        </h1>

        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search movies, series or celebrities..."
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

        {!loading && !error && query && (
          <>
            {movies.length > 0 && (
              <section className="mb-10">
                <h2 className="mb-5 text-2xl font-bold">
                  Movies
                </h2>

                <MovieGrid movies={movies} />
              </section>
            )}

            {series.length > 0 && (
              <section className="mb-10">
                <h2 className="mb-5 text-2xl font-bold">
                  Series
                </h2>

                <MovieGrid movies={series} />
              </section>
            )}

            {celebrities.length > 0 && (
              <section className="mb-10">
                <h2 className="mb-5 text-2xl font-bold">
                  Celebrities
                </h2>

                <PersonGrid people={celebrities} />
              </section>
            )}

            {results.length === 0 && (
              <p className="text-gray-400">
                No results found.
              </p>
            )}
          </>
        )}

      </div>
    </main>
  )
}

export default SearchResults