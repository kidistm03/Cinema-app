import { Link } from 'react-router-dom'

function PersonCard({ person }) {
  return (
    <Link
      to={`/celebrities/${person.id}`}
      className="group block overflow-hidden rounded-lg bg-zinc-900 text-center transition duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {person.profile_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
          alt={person.name}
          className="aspect-[2/3] w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[2/3] w-full items-center justify-center bg-zinc-800 text-5xl">
          👤
        </div>
      )}

      <div className="p-3">
        <h3 className="truncate font-bold text-white">
          {person.name}
        </h3>

        <p className="mt-1 truncate text-sm text-gray-400">
          {person.known_for_department || 'Celebrity'}
        </p>
      </div>
    </Link>
  )
}

export default PersonCard
