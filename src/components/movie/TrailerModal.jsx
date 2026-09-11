function TrailerModal({ videoKey, onClose }) {
  if (!videoKey) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-4xl">

        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-2xl text-white hover:text-red-500"
        >
          ✕
        </button>

        <div className="aspect-video overflow-hidden rounded-xl bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="Movie Trailer"
            className="h-full w-full"
            allowFullScreen
          ></iframe>
        </div>

      </div>
    </div>
  )
}

export default TrailerModal