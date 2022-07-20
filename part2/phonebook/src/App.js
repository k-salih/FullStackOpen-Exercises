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
      id: Math.max(...persons.map(person => person.id)) + 1
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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?` )) {
        const personToUpdate = persons.find(person => person.name === newName)
        const changedPerson = {...personToUpdate, number: newNumber }
        return (
          personService
            .update(personToUpdate.id, changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
              setNewName('')
              setNewNumber('')
            }
        )
      )}
    } 
  }


  const deleteEntry = (person) => {
    const personToDelete = persons.find(p => p.id === person.id)
      if (window.confirm(`Delete ${person.name} ?`)) {
        return (
        personService
          .deletePerson(person.id)
          .then(setPersons(persons.filter(person => person.id !== personToDelete.id))
        ))
      }
  }
  
  useEffect(() => {
      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])  

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
      <SearchFilter value={searchBy} onChange={handleSearch}/>

      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} onSubmit={addPerson} 
      onNameChange={handleNameChange} onNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <RenderPersons persons={persons} searchBy={searchBy} onDelete={deleteEntry}/>
    </div>
  )
}

export default App

