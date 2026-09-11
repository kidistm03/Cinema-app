function SortSelect({ sortBy, onSortChange }) {
  return (
    <select
      value={sortBy}
      onChange={(event) => onSortChange(event.target.value)}
      className="rounded-lg bg-zinc-800 px-4 py-2 text-white outline-none transition focus:ring-2 focus:ring-red-600"
    >
      <option value="popularity.desc">Most Popular</option>
      <option value="vote_average.desc">Highest Rated</option>
      <option value="primary_release_date.desc">Newest</option>
      <option value="primary_release_date.asc">Oldest</option>
    </select>
  )
}

export default SortSelect