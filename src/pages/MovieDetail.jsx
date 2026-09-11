import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from '../components/movie/MovieCard'

const KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function MovieDetail() {
  const { id } = useParams()

  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [similarMovies, setSimilarMovies] = useState([])
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
        const creditsResponse = await fetch(
          `${BASE_URL}/movie/${id}/credits`,
          {
            headers: {
              Authorization: `Bearer ${KEY}`,
            },
            signal: controller.signal,
          }
        )

        if (!creditsResponse.ok) {
          throw new Error('Failed to fetch cast')
        }
        const creditsData = await creditsResponse.json()
        setCast(creditsData.cast.slice(0, 10))

        const similarResponse = await fetch(
          `${BASE_URL}/movie/${id}/similar`,
          {
            headers: {
              Authorization: `Bearer ${KEY}`,
            },
            signal: controller.signal,
          }
        )

        if (!similarResponse.ok) {
          throw new Error('Failed to fetch similar movies')
        }

        const similarData = await similarResponse.json()

        setSimilarMovies(similarData.results)
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
    <main className="min-h-screen bg-zinc-950 text-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full max-w-sm mx-auto rounded-xl shadow-2xl"
            />
          </div>

          <div className="md:col-span-2">

            <h1 className="text-4xl sm:text-5xl font-bold">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-4">

              <span className="text-yellow-400 font-bold">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>

              <span className="text-gray-400">
                {movie.release_date?.slice(0, 4)}
              </span>

            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-gray-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-3">
              Overview
            </h2>

            <p className="text-gray-300 leading-7">
              {movie.overview}
            </p>
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Cast
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-4">
              {cast.map((person) => (
                <div
                  key={person.id}
                  className="min-w-[120px] w-[120px]"
                >
                  <img
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                        : 'https://via.placeholder.com/185x278?text=No+Image'
                    }
                    alt={person.name}
                    className="w-full aspect-[2/3] object-cover rounded-lg"
                  />

                  <h3 className="text-sm font-semibold text-white mt-2">
                    {person.name}
                  </h3>

                  <p className="text-xs text-gray-400">
                    {person.character}
                  </p>
                </div>
              ))}
            </div>
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Similar Movies
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-6">
              {similarMovies.slice(0, 10).map((movie) => (
                <div
                  key={movie.id}
                  className="min-w-[160px] sm:min-w-[190px] md:min-w-[210px]"
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </main>
  )
}

export default MovieDetail