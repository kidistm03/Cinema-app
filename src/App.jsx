import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WatchlistProvider } from './context/WatchlistContext'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Home from './pages/Home'
import Browse from './pages/Browse'
import MovieDetail from './pages/MovieDetail'
import Series from './pages/Series'
import SeriesDetail from './pages/SeriesDetail'
import Celebrities from './pages/Celebrities'
import CelebrityDetail from './pages/CelebrityDetail'
import SearchResults from './pages/SearchResults'
import Watchlist from './pages/Watchlist'
import NotFound from './pages/NotFound'

function App() {
  return (
    <WatchlistProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/series" element={<Series />} />
          <Route path="/series/:id" element={<SeriesDetail />} />
          <Route path="/celebrities" element={<Celebrities />} />
          <Route path="/celebrities/:id" element={<CelebrityDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </WatchlistProvider>
  )
}

export default App