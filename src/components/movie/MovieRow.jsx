import { useRef } from 'react'
import MovieCard from './MovieCard'

function MovieRow({ title, movies }) {
  const rowRef = useRef(null)

  function scrollLeft() {
    rowRef.current.scrollBy({
      left: -500,
      behavior: 'smooth',
    })
  }

  function scrollRight() {
    rowRef.current.scrollBy({
      left: 500,
      behavior: 'smooth',
    })
  }

  return (
    <section className="mb-10">

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="rounded-full bg-zinc-800 px-3 py-2 text-white transition hover:bg-red-600"
          >
            ←
          </button>

          <button
            onClick={scrollRight}
            className="rounded-full bg-zinc-800 px-3 py-2 text-white transition hover:bg-red-600"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
      >
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