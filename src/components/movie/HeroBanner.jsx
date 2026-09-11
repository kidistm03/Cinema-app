import { Link } from 'react-router-dom'

function HeroBanner({ movie }) {
  if (!movie) {
    return null
  }

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">

      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">

          <div className="max-w-xl">

            <p className="text-red-500 font-semibold mb-3">
              Featured Movie
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {movie.title}
            </h1>

            <p className="text-gray-300 text-sm sm:text-base line-clamp-3 mb-6">
              {movie.overview}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-yellow-400 font-bold">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>

              <span className="text-gray-300">
                {movie.release_date?.slice(0, 4)}
              </span>
            </div>

            <Link
              to={`/movie/${movie.id}`}
              className="inline-block rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              View Details
            </Link>

          </div>

        </div>
      </div>

    </section>
  )
}

export default HeroBanner