function Toast({ message }) {
  if (!message) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] rounded-lg bg-red-600 px-5 py-3 text-white shadow-xl">
      {message}
    </div>
  )
}

export default Toast