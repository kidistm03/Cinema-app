import { useEffect, useState } from 'react'
import GenreFilter from '../components/ui/GenreFilter'
import MovieGrid from '../components/movie/MovieGrid'
import SkeletonCard from '../components/movie/SkeletonCard'

const KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function Browse() {
  const [genres, setGenres] = useState([])
  const [movies, setMovies] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)

  const [genresLoading, setGenresLoading] = useState(true)
  const [moviesLoading, setMoviesLoading] = useState(true)

  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchGenres() {
      try {
        setGenresLoading(true)
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
          setGenresLoading(false)
        }
      }
    }

    fetchGenres()

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function fetchMovies() {
      try {
        setMoviesLoading(true)
        setError(null)

        let endpoint = '/discover/movie'

        if (selectedGenre) {
          endpoint += `?with_genres=${selectedGenre}`
        }

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

        setMovies(data.results)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setMoviesLoading(false)
        }
      }
    }

    fetchMovies()

    return () => {
      controller.abort()
    }
  }, [selectedGenre])

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          Browse Movies
        </h1>

        {!genresLoading && !error && (
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />
        )}

        <div className="mt-8">

          {moviesLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {Array.from({ length: 10 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          )}

          {error && (
            <p className="text-red-500 text-lg">
              Error: {error}
            </p>
          )}

          {!moviesLoading && !error && (
            <MovieGrid movies={movies} />
          )}

        </div>

      </div>
    </main>
  )
}

export default Browse