import MovieGrid from '../components/movie/MovieGrid'
import { useWatchlist } from '../context/WatchlistContext'

function Watchlist() {
  const { watchlist } = useWatchlist()

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          My Watchlist
        </h1>

        {watchlist.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4"></p>
            <p className="text-xl text-gray-400">
              Your watchlist is empty.
            </p>
            <p className="text-gray-500 mt-2">
              Add movies you want to watch later.
            </p>
          </div>
        ) : (
          <MovieGrid movies={watchlist} />
        )}

      </div>
    </main>
  )
}

export default Watchlist