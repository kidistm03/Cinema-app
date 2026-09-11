import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link to="/" className="text-2xl font-bold text-red-500">
            Cinema
          </Link>

          <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto">
            <Link
              to="/"
              className="text-sm sm:text-base text-gray-300 hover:text-white transition whitespace-nowrap"
            >
              Home
            </Link>

            <Link
              to="/browse"
              className="text-sm sm:text-base text-gray-300 hover:text-white transition whitespace-nowrap"
            >
              Movies
            </Link>

            <Link
              to="/search"
              className="text-sm sm:text-base text-gray-300 hover:text-white transition whitespace-nowrap"
            >
              Search
            </Link>

            <Link
              to="/watchlist"
              className="text-sm sm:text-base text-gray-300 hover:text-white transition whitespace-nowrap"
            >
              Watchlist
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar