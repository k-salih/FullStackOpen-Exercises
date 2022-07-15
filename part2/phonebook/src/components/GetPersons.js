const RenderPersons = ({persons, searchBy}) => {

  const filteredPersons = persons.filter(person => {
    return (person.name.toLowerCase().includes(searchBy.toLowerCase()))})

  if (searchBy === "") {
    return (persons.map(person => <p key={person.name}>{person.name} {person.number}</p>));

  } else {
    return (filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>))
  } 
}

export default RenderPersons