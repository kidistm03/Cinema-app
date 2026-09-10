import useMovies from '../hooks/useMovies'

function Home() {
  const { movies, loading, error } = useMovies('/trending/movie/week')

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white pt-24 p-10">
        Loading movies...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white pt-24 p-10">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-24 p-10">
      <h1 className="text-3xl font-bold mb-6">
        Trending Movies
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            <h2 className="mt-2 font-semibold">
              {movie.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home