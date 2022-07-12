const RenderPersons = ({persons, searchBy}) => {

  if (searchBy === "") {
    return (persons.map(person => <p key={person.name}>{person.name} {person.number}</p>));
  } else {
    const filteredPersons = persons.filter(person => 
        {(person.name.toLowerCase().includes(searchBy.toLowerCase()))});

    return (filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>))
  } 
}