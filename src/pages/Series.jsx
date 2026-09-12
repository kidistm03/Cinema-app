import { useEffect, useState } from 'react'
import GenreFilterSkeleton from '../components/ui/GenreFilterSkeleton'
import GenreFilter from '../components/ui/GenreFilter'
import MovieGrid from '../components/movie/MovieGrid'
import SkeletonCard from '../components/movie/SkeletonCard'
import SortSelect from '../components/ui/SortSelect'

const KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function Series() {
  const [genres, setGenres] = useState([])
  const [series, setSeries] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [sortBy, setSortBy] = useState('popularity.desc')
  const [genresLoading, setGenresLoading] = useState(true)
  const [seriesLoading, setSeriesLoading] = useState(true)

  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchGenres() {
      try {
        setGenresLoading(true)
        setError(null)

        const response = await fetch(
          `${BASE_URL}/genre/tv/list`,
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

    async function fetchSeries() {
      try {
        setSeriesLoading(true)
        setError(null)

        let endpoint = `/discover/tv?sort_by=${sortBy}`

        if (selectedGenre) {
          endpoint += `&with_genres=${selectedGenre}`
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
          throw new Error('Failed to fetch series')
        }

        const data = await response.json()

        setSeries(data.results)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setSeriesLoading(false)
        }
      }
    }

    fetchSeries()

    return () => {
      controller.abort()
    }
  }, [selectedGenre, sortBy])

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          Browse Series
        </h1>

        {genresLoading && <GenreFilterSkeleton />}

        {!genresLoading && !error && (
          <>
            <GenreFilter
              genres={genres}
              selectedGenre={selectedGenre}
              onSelectGenre={setSelectedGenre}
            />

            <div className="mt-4 flex justify-end">
              <SortSelect
                sortBy={sortBy}
                onSortChange={setSortBy}
                type="tv"
              />
            </div>
          </>
        )}

        <div className="mt-8">

          {seriesLoading && (
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

          {!seriesLoading && !error && (
            <MovieGrid movies={series} />
          )}

        </div>

      </div>
    </main>
  )
}

export default Series
