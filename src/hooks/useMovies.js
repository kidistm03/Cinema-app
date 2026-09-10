import { useEffect, useState } from 'react'

const KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function useMovies(endpoint) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchMovies() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `${BASE_URL}${endpoint}`,
          {
            headers: {
              Authorization: `Bearer ${KEY}`,
            },
            signal: controller.signal,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch movies')
        }

        const data = await response.json()

        setMovies(data.results || [])
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

    fetchMovies()

    return () => {
      controller.abort()
    }
  }, [endpoint])

  return { movies, loading, error }
}

export default useMovies