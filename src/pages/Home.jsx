import useMovies from '../hooks/useMovies'
import MovieRow from '../components/movie/MovieRow'
import SkeletonCard from '../components/movie/SkeletonCard'
import HeroBanner from '../components/movie/HeroBanner'

function Home() {
  const trending = useMovies('/trending/movie/week')
  const popular = useMovies('/movie/popular')
  const topRated = useMovies('/movie/top_rated')

  const isLoading =
    trending.loading ||
    popular.loading ||
    topRated.loading

  const error =
    trending.error ||
    popular.error ||
    topRated.error

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white pt-24 px-4 sm:px-6 lg:px-8">

        <h1 className="text-3xl font-bold mb-8">
          Loading movies...
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>

      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white pt-24 px-4 flex items-center justify-center">
        <p className="text-red-500 text-xl">
          Error: {error}
        </p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <HeroBanner movie={trending.movies[0]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

        <MovieRow
          title="Trending This Week"
          movies={trending.movies}
        />

        <MovieRow
          title="Popular Movies"
          movies={popular.movies}
        />

        <MovieRow
          title="Top Rated Movies"
          movies={topRated.movies}
        />

      </div>

    </main>
  )
}

export default Home