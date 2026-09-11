function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-3">
      <button
        onClick={() => onSelectGenre(null)}
        className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
          selectedGenre === null
            ? 'bg-red-600 text-white'
            : 'bg-zinc-800 text-gray-300 hover:bg-red-600 hover:text-white'
        }`}
      >
        All
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelectGenre(genre.id)}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
            selectedGenre === genre.id
              ? 'bg-red-600 text-white'
              : 'bg-zinc-800 text-gray-300 hover:bg-red-600 hover:text-white'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  )
}

export default GenreFilter