import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import RenderPersons from './components/GetPersons'
import SearchFilter from './components/SearchFilter'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchBy, setSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])  

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
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    } else {
      window.alert(`${newName} is already added to phonebook` )
      setNewName('')
      setNewNumber('')
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

