import { useMemo } from 'react'
import { useCountries } from './useCountries'

export function useStats() {
  const { countries, loading, error } = useCountries()

  // useMemo evita recalcular estos valores en cada render
  // solo los recalcula cuando `countries` cambia
  const stats = useMemo(() => {
    if (!countries.length) return null

    // Total de países
    const totalCountries = countries.length

    // Población mundial total
    const totalPopulation = countries.reduce(
      (sum, country) => sum + country.population, 0
    )

    // País más poblado
    const mostPopulated = countries[0]?.name?.common || ''

    // Continente con más países
    const regionCount = countries.reduce((acc, country) => {
      acc[country.region] = (acc[country.region] || 0) + 1
      return acc
    }, {})

    const topRegion = Object.entries(regionCount)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || ''

    return {
      totalCountries,
      totalPopulation,
      mostPopulated,
      topRegion,
    }
  }, [countries])

  return { stats, loading, error }
}