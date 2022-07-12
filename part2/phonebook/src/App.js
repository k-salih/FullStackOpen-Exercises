import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchBy, setSearch] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id:persons.length + 1
    }
    if (persons.map(person => person.name).includes(personObject.name) === false) {
      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("");
    } else {
      window.alert(`${newName} is already added to phonebook` );
    } 
  }

  const Display = ({persons}) => {
    if (searchBy === "") {
      return (persons.map(person => <p key={person.name}>{person.name} {person.number}</p>))
    } else {
      const filteredPersons = persons.filter(person => (person.name.toLowerCase().includes(searchBy.toLowerCase())))
      return (filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>))
    } 
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with<input
        value={searchBy}
        onChange={handleSearch}></input>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>

        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}/>
        </div>

        <div>
          number: <input
          value={newNumber}
          onChange={handleNumberChange}></input>
        </div>

        <div>
          <button type="submit">add</button>
        </div>

      </form>
      <h2>Numbers</h2>
      <Display persons={persons}/>
      
    </div>
  )
}

export default App

