import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function MovieDetail() {
  const { id } = useParams()

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchMovie() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `${BASE_URL}/movie/${id}`,
          {
            headers: {
              Authorization: `Bearer ${KEY}`,
            },
            signal: controller.signal,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch movie')
        }

        const data = await response.json()

        setMovie(data)
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

    fetchMovie()

    return () => {
      controller.abort()
    }
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white pt-24 px-4">
        <p className="text-gray-400">
          Loading movie...
        </p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white pt-24 px-4">
        <p className="text-red-500">
          Error: {error}
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 px-4">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold">
          {movie.title}
        </h1>

        <p className="mt-4 text-gray-400">
          {movie.overview}
        </p>

      </div>
    </main>
  )
}

export default MovieDetail