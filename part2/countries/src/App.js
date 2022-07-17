import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import CountryInfo from './components/CountryInfo'

const App = () => {
  const [countries, setCountries] =useState([])
  const [searchTerm, setSearch] = useState('')

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      find countries
      <Search value={searchTerm} onChange={handleSearch}/>
      <CountryInfo countries={countries} searchTerm={searchTerm}/>
    </div>
  )
}

export default App

