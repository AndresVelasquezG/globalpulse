import './countriestable.css'
import { useCountries } from '../hooks/useCountries'
import Loader from './Loader'

const regionColors = {
  'Asia': '#7c6af7',
  'Americas': '#38bdf8',
  'Africa': '#4ade80',
  'Europe': '#fb923c',
  'Oceania': '#f472b6',
  'Antarctic': '#94a3b8',
}

function CountriesTable() {
  const { countries, loading, error } = useCountries()

  // Tomamos solo los 8 más poblados
  const top8 = countries.slice(0, 8)

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h3 className="chart-card-title">🗺️ Países más poblados</h3>
        <p className="chart-card-subtitle">Datos en tiempo real — restcountries.com</p>
      </div>

      {loading && <Loader message="Cargando países..." />}

      {error && (
        <p style={{ color: '#f87171', padding: '24px', textAlign: 'center' }}>
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="countries-table-wrapper">
          <table className="countries-table">
            <thead>
              <tr>
                <th>País</th>
                <th>Región</th>
                <th>Población</th>
              </tr>
            </thead>
            <tbody>
              {top8.map((country) => (
                <tr key={country.cca2} className="countries-table-row">
                  <td>
                    <div className="country-name">
                      <img
                        className="country-flag"
                        src={country.flags.png}
                        alt={country.flags.alt || `Bandera de ${country.name.common}`}
                      />
                      <span>{country.name.common}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className="country-region-badge"
                      style={{ '--region-color': regionColors[country.region] || '#94a3b8' }}
                    >
                      {country.region}
                    </span>
                  </td>
                  <td className="country-population">
                    {(country.population / 1_000_000).toFixed(1)}M
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default CountriesTable