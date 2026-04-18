import { useState, useEffect } from 'react'
import { getCountryByCode } from '../services/countriesService'

export function useCountry(code) {
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!code) return

    async function fetchCountry() {
      try {
        setLoading(true)
        const data = await getCountryByCode(code)
        setCountry(data)
      } catch (err) {
        setError('No se pudo cargar el país')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCountry()
  }, [code])

  return { country, loading, error }
}