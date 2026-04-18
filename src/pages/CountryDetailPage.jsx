import { useParams, useNavigate } from 'react-router-dom'
import { useCountry } from '../hooks/useCountry'
import Loader from '../components/Loader'
import './countrydetailpage.css'

const regionColors = {
  Asia: '#7c6af7',
  Americas: '#38bdf8',
  Africa: '#4ade80',
  Europe: '#fb923c',
  Oceania: '#f472b6',
  Antarctic: '#94a3b8',
}

function CountryDetailPage() {
  // useParams lee el código del país desde la URL (ej: /countries/co)
  const { code } = useParams()
  const navigate = useNavigate()
  const { country, loading, error } = useCountry(code)

  if (loading) return <Loader message="Cargando información del país..." />

  if (error) return (
    <p style={{ color: '#f87171', textAlign: 'center', padding: '48px' }}>
      {error}
    </p>
  )

  if (!country) return null

  // Formateamos la población con separadores de miles
  const formattedPopulation = country.population.toLocaleString()

  // Las monedas vienen como objeto, las convertimos a array
  const currencies = country.currencies
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
    : '—'

  // Los idiomas también vienen como objeto
  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : '—'

  // Las fronteras son códigos de países (ej: ["COL", "BRA"])
  const borders = country.borders || []

  return (
    <div className="detail-page animate-fade-in">

      {/* Botón volver */}
      <button className="detail-back" onClick={() => navigate('/countries')}>
        ← Volver a países
      </button>

      <div className="detail-grid">

        {/* Columna izquierda — bandera e info principal */}
        <div className="detail-left animate-fade-in-up">
          <img
            className="detail-flag"
            src={country.flags.svg || country.flags.png}
            alt={country.flags.alt || `Bandera de ${country.name.common}`}
          />

          <div className="detail-header">
            <h1 className="detail-name">{country.name.common}</h1>
            <p className="detail-official">{country.name.official}</p>
            <span
              className="detail-region-badge"
              style={{ '--region-color': regionColors[country.region] || '#94a3b8' }}
            >
              {country.region} {country.subregion ? `— ${country.subregion}` : ''}
            </span>
          </div>
        </div>

        {/* Columna derecha — datos detallados */}
        <div className="detail-right animate-fade-in-up delay-2">

          <div className="detail-stats">
            <div className="detail-stat">
              <span className="detail-stat-icon">👥</span>
              <div>
                <p className="detail-stat-label">Población</p>
                <p className="detail-stat-value">{formattedPopulation}</p>
              </div>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-icon">🏙️</span>
              <div>
                <p className="detail-stat-label">Capital</p>
                <p className="detail-stat-value">{country.capital?.[0] || '—'}</p>
              </div>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-icon">📐</span>
              <div>
                <p className="detail-stat-label">Área</p>
                <p className="detail-stat-value">
                  {country.area ? `${country.area.toLocaleString()} km²` : '—'}
                </p>
              </div>
            </div>
            <div className="detail-stat">
              <span className="detail-stat-icon">🕐</span>
              <div>
                <p className="detail-stat-label">Zona horaria</p>
                <p className="detail-stat-value">{country.timezones?.[0] || '—'}</p>
              </div>
            </div>
          </div>

          <div className="detail-info-grid">
            <div className="detail-info-item">
              <p className="detail-info-label">💬 Idiomas</p>
              <p className="detail-info-value">{languages}</p>
            </div>
            <div className="detail-info-item">
              <p className="detail-info-label">💵 Monedas</p>
              <p className="detail-info-value">{currencies}</p>
            </div>
            <div className="detail-info-item">
              <p className="detail-info-label">🚗 Conducción</p>
              <p className="detail-info-value">
                {country.car?.side === 'left' ? '⬅️ Izquierda' : '➡️ Derecha'}
              </p>
            </div>
            <div className="detail-info-item">
              <p className="detail-info-label">🌐 Dominio web</p>
              <p className="detail-info-value">{country.tld?.[0] || '—'}</p>
            </div>
          </div>

          {/* Países fronterizos */}
          {borders.length > 0 && (
            <div className="detail-borders">
              <p className="detail-borders-label">🗺️ Países fronterizos</p>
              <div className="detail-borders-list">
                {borders.map((border) => (
                  <button
                    key={border}
                    className="detail-border-btn"
                    onClick={() => navigate(`/countries/${border.toLowerCase()}`)}
                  >
                    {border}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default CountryDetailPage