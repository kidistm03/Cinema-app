function GenreFilterSkeleton() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-3 animate-pulse">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-9 w-24 shrink-0 rounded-full bg-zinc-800"
        ></div>
      ))}
    </div>
  )
}

export default GenreFilterSkeleton