import { useEffect, useState } from 'react'
import GenreFilter from '../components/ui/GenreFilter'

const KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function Browse() {
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchGenres() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `${BASE_URL}/genre/movie/list`,
          {
            headers: {
              Authorization: `Bearer ${KEY}`,
            },
            signal: controller.signal,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch genres')
        }

        const data = await response.json()

        setGenres(data.genres)
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

    fetchGenres()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          Browse Movies
        </h1>

        {loading && (
          <p className="text-gray-400">
            Loading genres...
          </p>
        )}

        {error && (
          <p className="text-red-500">
            Error: {error}
          </p>
        )}

        {!loading && !error && (
          <GenreFilter genres={genres} />
        )}

      </div>
    </main>
  )
}

export default Browse