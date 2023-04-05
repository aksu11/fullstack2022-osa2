import { useState } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons'
import service from './service.js'
import { useEffect } from 'react'
import Notification from './components/Notification.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToshow, setPersonsToshow] = useState([]) 
  const [nameFilter, setNameFilter] = useState('')
  const [notification, setNotification ] = useState(null)

  useEffect(() => {
    service.getAll()
      .then(persons => {
        setPersons(persons)
        setPersonsToshow(persons)
      })
  }, [])

  const submitForm = (event) => {
    event.preventDefault()
    let found = null
    persons.forEach(person => {
      if(newName.toLowerCase().split(' ').join('') === person.name.toLowerCase().split(' ').join('')) found = person
    })
    if (found) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)){
        service.update(found.id, {name: newName, number: newNumber})
          .then(response => {
            const newPersons = persons.filter(person => person.id !== response.id).concat(response)
            setPersons(newPersons)
            setPersonsToshow(newPersons)
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      service.create({name: newName, number: newNumber})
        .then(response => {
          const newPersons = persons.concat([response])
          setPersons(newPersons)
          setPersonsToshow(newPersons)
          setNewName('')
          setNewNumber('')
          setNotification({type: 'note', content: response.name + ' was added succesfully'})
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const nameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const numberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const filterNames = (event) => {
    event.preventDefault()
    setNameFilter(event.target.value)
    const pts = persons.filter( person => person.name.toLowerCase().includes(event.target.value.toLowerCase()) )
    setPersonsToshow(pts)
  }

  const removePerson = (name, id) => {
    if(window.confirm(`Delete ${name} ?`)) {
      service.remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setPersonsToshow(personsToshow.filter(person => person.id !== id))
          setNotification({type: 'note', content: `${name} was removed succesfully`})
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification({type: 'error', content: `${name} has allready removed from server`})
          setTimeout(() => {
            setNotification(null)
            setPersons(persons.filter(person => person.id !== id))
            setPersonsToshow(personsToshow.filter(person => person.id !== id))
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter value={nameFilter} handle={filterNames}/>
      <h3>Add a new</h3>
      <PersonForm name={newName} number={newNumber} nameChange={nameChange} numberChange={numberChange}
        submitForm={submitForm}/>
      <h3>Numbers</h3>
      <Persons persons={personsToshow} remove={removePerson}/>
    </div>
  )

}

export default App
