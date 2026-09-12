import { Link } from 'react-router-dom'
import { useWatchlist } from '../../context/WatchlistContext'

function MovieCard({ movie }) {
  const year = movie.release_date
    ? movie.release_date.slice(0, 4)
    : 'N/A'
  const {
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  } = useWatchlist()

  const saved = isInWatchlist(movie.id)

  function handleWatchlist() {
    if (saved) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie)
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-lg bg-zinc-900 transition duration-300 hover:scale-105 hover:shadow-2xl">
      <button
        onClick={handleWatchlist}
        className="absolute right-3 top-3 z-20 rounded-full bg-black/70 p-2 text-xl transition hover:scale-110"
      >
        {saved ? '❤️' : '🤍'}
      </button>
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover"
        />

        <div className="absolute inset-0 bg-black/70 opacity-0 transition duration-300 group-hover:opacity-100 flex items-end">
          <div className="p-4 w-full">

            <h2 className="text-lg font-bold text-white">
              {movie.title}
            </h2>

            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-300">
                {year}
              </span>

              <span className="rounded-full bg-red-600 px-2 py-1 text-sm font-bold text-white">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            </div>

          </div>
        </div>
      </Link>

    </div>
  )
}

export default MovieCard