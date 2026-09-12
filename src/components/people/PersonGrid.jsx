import PersonCard from './PersonCard'

function PersonGrid({ people }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {people.map((person) => (
        <PersonCard
          key={person.id}
          person={person}
        />
      ))}
    </div>
  )
}

export default PersonGrid
