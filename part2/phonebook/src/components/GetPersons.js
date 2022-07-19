const RenderPersons = ({persons, searchBy, onDelete}) => {

  const filteredPersons = persons.filter(person => {
    return (person.name.toLowerCase().includes(searchBy.toLowerCase()))})

  if (searchBy === "") {
    return (persons.map(person => {
      return (
    <div key={person.id}>
      {person.name} {person.number + " "} 
      <button onClick={() => onDelete(person)}> delete </button>
    </div>)
  }));

  } else {
    return (
      filteredPersons.map(person => {
      return (
      <div key={person.id}>
        {person.name} {person.number + " "} <button onClick={() => onDelete(person)}> delete </button>
      </div>
      )
    })
   )
  } 
}

export default RenderPersons