import axios from 'axios'
import { useEffect, useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')
    
    const onChange = (event) => {
        setValue(event.target.value)
    }
    
    return {
        type,
        value,
        onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        const baseUrl = `https://restcountries.com/v3.1/name/${name}?fullText=true`
        async function fetchCountry() {
            try {
                const response = await axios.get(baseUrl)
                setCountry(response.data[0])
            } catch (error) {
                setCountry(null)
            }
        }
        if (name) {
            fetchCountry()
        }
    }, [country, name])
    return country
}
