const Country = ({ country }) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <p><strong>languages:</strong></p>
            <ul>{Object.values(country.languages).map(language => <li>{language}</li>)}</ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
        </div>
    )
}

export default Country