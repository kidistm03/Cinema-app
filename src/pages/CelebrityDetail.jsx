import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from '../components/movie/MovieCard'

const KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function CelebrityDetail() {
  const { id } = useParams()

  const [person, setPerson] = useState(null)
  const [credits, setCredits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchPerson() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `${BASE_URL}/person/${id}`,
          {
            headers: {
              Authorization: `Bearer ${KEY}`,
            },
            signal: controller.signal,
          }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch celebrity')
        }

        const data = await response.json()
        setPerson(data)

        const creditsResponse = await fetch(
          `${BASE_URL}/person/${id}/combined_credits`,
          {
            headers: {
              Authorization: `Bearer ${KEY}`,
            },
            signal: controller.signal,
          }
        )

        if (!creditsResponse.ok) {
          throw new Error('Failed to fetch credits')
        }

        const creditsData = await creditsResponse.json()

        const sortedCredits = (creditsData.cast || [])
          .filter((item) => item.poster_path)
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 18)

        setCredits(sortedCredits)
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

    fetchPerson()

    return () => {
      controller.abort()
    }
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white pt-24 px-4">
        <p className="text-gray-400">
          Loading celebrity...
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
            {person.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                alt={person.name}
                className="w-full max-w-sm mx-auto rounded-xl shadow-2xl"
              />
            ) : (
              <div className="flex aspect-[2/3] w-full max-w-sm mx-auto items-center justify-center rounded-xl bg-zinc-800 text-7xl">
                👤
              </div>
            )}
          </div>

          <div className="md:col-span-2">

            <h1 className="text-4xl sm:text-5xl font-bold">
              {person.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-4">

              {person.known_for_department && (
                <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-gray-300">
                  {person.known_for_department}
                </span>
              )}

              {person.birthday && (
                <span className="text-gray-400">
                  Born {person.birthday}
                </span>
              )}

              {person.place_of_birth && (
                <span className="text-gray-400">
                  {person.place_of_birth}
                </span>
              )}

            </div>

            <h2 className="text-2xl font-bold mt-8 mb-3">
              Biography
            </h2>

            <p className="text-gray-300 leading-7">
              {person.biography || 'No biography available.'}
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              Movies &amp; Series Worked On
            </h2>

            {credits.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {credits.map((item) => (
                  <MovieCard
                    key={`${item.media_type}-${item.id}`}
                    movie={item}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No known credits found.
              </p>
            )}

          </div>

        </div>

      </div>
    </main>
  )
}

export default CelebrityDetail
