import { useEffect, useState } from 'react'
import GenreFilterSkeleton from '../components/ui/GenreFilterSkeleton'
import GenreFilter from '../components/ui/GenreFilter'
import PersonGrid from '../components/people/PersonGrid'
import SkeletonCard from '../components/movie/SkeletonCard'

const KEY = import.meta.env.VITE_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const PAGES_TO_LOAD = 4

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'name.asc', label: 'Name (A-Z)' },
  { value: 'name.desc', label: 'Name (Z-A)' },
]

function Celebrities() {
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [sortBy, setSortBy] = useState('popularity.desc')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchPeople() {
      try {
        setLoading(true)
        setError(null)

        const pages = await Promise.all(
          Array.from({ length: PAGES_TO_LOAD }, (_, index) =>
            fetch(
              `${BASE_URL}/person/popular?page=${index + 1}`,
              {
                headers: {
                  Authorization: `Bearer ${KEY}`,
                },
                signal: controller.signal,
              }
            ).then((response) => {
              if (!response.ok) {
                throw new Error('Failed to fetch celebrities')
              }
              return response.json()
            })
          )
        )

        const combined = pages.flatMap((page) => page.results || [])
        setPeople(combined)
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

    fetchPeople()

    return () => {
      controller.abort()
    }
  }, [])

  // TMDB has no genre list for people, so departments (Acting, Directing...) act as the filter
  const departments = [...new Set(
    people.map((person) => person.known_for_department).filter(Boolean)
  )].sort().map((name) => ({ id: name, name }))

  const filtered = selectedDepartment
    ? people.filter((person) => person.known_for_department === selectedDepartment)
    : people

  // TMDB's /person endpoints don't support server-side sorting, so it's done here
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'name.asc') return a.name.localeCompare(b.name)
    if (sortBy === 'name.desc') return b.name.localeCompare(a.name)
    return b.popularity - a.popularity
  })

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Celebrities
        </h1>

        <p className="text-gray-400 mb-8">
          Popular actors, directors and crew from TMDB.
        </p>

        {loading && <GenreFilterSkeleton />}

        {!loading && !error && (
          <>
            <GenreFilter
              genres={departments}
              selectedGenre={selectedDepartment}
              onSelectGenre={setSelectedDepartment}
            />

            <div className="mt-4 flex justify-end">
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-lg bg-zinc-800 px-4 py-2 text-white outline-none transition focus:ring-2 focus:ring-red-600"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="mt-8">

          {loading && (
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

          {!loading && !error && (
            <PersonGrid people={sorted} />
          )}

        </div>

      </div>
    </main>
  )
}

export default Celebrities
