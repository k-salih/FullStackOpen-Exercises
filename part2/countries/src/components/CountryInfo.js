import Country from './Country' 

const CountryInfo = ({ countries, searchTerm}) => {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    if (filteredCountries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    } else if (filteredCountries.length > 1) {
        return (
            <div>
                <ul>
                    {filteredCountries.map(country => <li>{country.name.common}</li>)}
                </ul>
            </div>
        )
    } else if (filteredCountries.length === 1) {
        return (
            <div>
                <Country country={filteredCountries[0]} />
            </div>
        )
    }
}

export default CountryInfo