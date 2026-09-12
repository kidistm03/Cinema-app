import { createContext, useContext, useState } from 'react'

const WatchlistContext = createContext()

function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([])

  function addToWatchlist(movie) {
    setWatchlist((current) => [...current, movie])
  }

  function removeFromWatchlist(movieId) {
    setWatchlist((current) =>
      current.filter((movie) => movie.id !== movieId)
    )
  }

  function isInWatchlist(movieId) {
    return watchlist.some((movie) => movie.id === movieId)
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}

function useWatchlist() {
  return useContext(WatchlistContext)
}

export { WatchlistProvider, useWatchlist }