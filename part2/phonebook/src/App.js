import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 

  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const [newNumber, setNewNumber] = useState('')

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
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
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App

