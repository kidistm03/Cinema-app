function GenreFilter({ genres }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-3">
      {genres.map((genre) => (
        <button
          key={genre.id}
          className="whitespace-nowrap rounded-full bg-zinc-800 px-4 py-2 text-sm text-gray-300 transition hover:bg-red-600 hover:text-white"
        >
          {genre.name}
        </button>
      ))}
    </div>
  )
}

export default GenreFilter