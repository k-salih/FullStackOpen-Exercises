import { useState } from 'react'
import PersonForm from './components/PersonForm'
import RenderPersons from './components/GetPersons'
import SearchFilter from './components/SearchFilter'

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
  

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
      <SearchFilter value={searchBy} onChange={handleSearch}/>

      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} onSubmit={addPerson} 
      onNameChange={handleNameChange} onNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <RenderPersons persons={persons} searchBy={searchBy}/>
    </div>
  )
}

export default App

