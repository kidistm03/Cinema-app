function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/3] rounded-lg bg-zinc-800"></div>

      <div className="mt-3 h-4 rounded bg-zinc-800"></div>

      <div className="mt-2 h-3 w-1/2 rounded bg-zinc-800"></div>
    </div>
  )
}

export default SkeletonCard