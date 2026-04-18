import { useState, useEffect } from 'react'
import { getAllCitiesWeather } from '../services/climateService'

export function useClimate() {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true)
        const data = await getAllCitiesWeather()
        setCities(data)
      } catch (err) {
        setError('No se pudo cargar el clima')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  return { cities, loading, error }
}