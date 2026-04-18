import { useState, useEffect } from 'react'
import { getCountries } from '../services/countriesService'

export function useCountries() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const data = await getCountries()

        // Ordenamos por población de mayor a menor
        const sorted = data.sort((a, b) => b.population - a.population)
        setCountries(sorted)
      } catch (err) {
        setError('No se pudieron cargar los datos')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, []) // el [] significa que solo se ejecuta una vez al montar el componente

  return { countries, loading, error }
}