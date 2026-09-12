import { createContext, useContext, useEffect, useState } from 'react'

const WatchlistContext = createContext()

function WatchlistProvider({ children }) {
    const [watchlist, setWatchlist] = useState(() => {
        const savedWatchlist = localStorage.getItem('watchlist')

        return savedWatchlist
            ? JSON.parse(savedWatchlist)
            : []
    })

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
    useEffect(() => {
        localStorage.setItem(
            'watchlist',
            JSON.stringify(watchlist)
        )
    }, [watchlist])
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