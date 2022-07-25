import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import RenderPersons from './components/GetPersons'
import SearchFilter from './components/SearchFilter'
import personService from './services/person'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchBy, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [negative, setNegative] = useState(false)

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
          setMessage(`${personObject.name} has been added to phonebook`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
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
              setMessage(`${personObject.name}'s number has been changed to ${newNumber}`)
              setTimeout(() => {
                setMessage(null)
              },5000)})
              .catch( error => {
                setMessage(`${personObject.name} has already been deleted from the server`)
                setNegative(true)
                setTimeout(() => {
                  setMessage(null)
                },5000)
              })
        )
      }
    }
  }

  const deleteEntry = (person) => {
    const personToDelete = persons.find(p => p.id === person.id)
      if (window.confirm(`Delete ${person.name} ?`)) {
        return (
        personService
          .deletePerson(person.id)
          .then( () => {
            setPersons(persons.filter(person => person.id !== personToDelete.id))
            setMessage(`${person.name} has been deleted.`)
            setTimeout(() => {
              setMessage(null)
            },5000)
          }
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
      <Notification message={message} negative={negative}/>
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