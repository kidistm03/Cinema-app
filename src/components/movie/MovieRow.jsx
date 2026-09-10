import MovieCard from './MovieCard'

function MovieRow({ title, movies }) {
  return (
    <section className="mb-10">

      <h2 className="text-2xl font-bold text-white mb-4">
        {title}
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[160px] sm:min-w-[190px] md:min-w-[210px]"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

    </section>
  )
}

export default MovieRow