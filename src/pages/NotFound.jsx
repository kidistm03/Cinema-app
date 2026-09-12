import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>

      <Link
        to="/"
        className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound