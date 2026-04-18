import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCountries } from '../hooks/useCountries'
import Loader from '../components/Loader'
import './countriespage.css'

const regions = ['Todas', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

const regionColors = {
    Asia: '#7c6af7',
    Americas: '#38bdf8',
    Africa: '#4ade80',
    Europe: '#fb923c',
    Oceania: '#f472b6',
    Antarctic: '#94a3b8',
}

function CountriesPage() {
    const { countries, loading, error } = useCountries()
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [selectedRegion, setSelectedRegion] = useState('Todas')

    // Filtramos los países según búsqueda y región seleccionada
    // useMemo evita recalcular el filtro en cada render
    const filtered = useMemo(() => {
        return countries.filter((country) => {
            const matchesSearch = country.name.common
                .toLowerCase()
                .includes(search.toLowerCase())

            const matchesRegion =
                selectedRegion === 'Todas' || country.region === selectedRegion

            return matchesSearch && matchesRegion
        })
    }, [countries, search, selectedRegion])

    return (
        <div className="countries-page">

            {/* Barra de búsqueda y filtros */}
            <div className="countries-controls animate-fade-in-up">
                <div className="countries-search-wrapper">
                    <span className="countries-search-icon">🔍</span>
                    <input
                        className="countries-search"
                        type="text"
                        placeholder="Buscar país..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button
                            className="countries-search-clear"
                            onClick={() => setSearch('')}
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div className="countries-filters">
                    {regions.map((region) => (
                        <button
                            key={region}
                            className={`countries-filter-btn ${selectedRegion === region ? 'active' : ''}`}
                            onClick={() => setSelectedRegion(region)}
                        >
                            {region}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contador de resultados */}
            {!loading && !error && (
                <p className="countries-count animate-fade-in">
                    Mostrando <strong>{filtered.length}</strong> países
                </p>
            )}

            {loading && <Loader message="Cargando países del mundo..." />}
            {error && (
                <p style={{ color: '#f87171', textAlign: 'center' }}>{error}</p>
            )}

            {/* Grid de cards de países */}
            {!loading && !error && (
                <div className="countries-grid animate-fade-in">
                    {filtered.map((country) => (
                        <div key={country.cca2} className="country-card" onClick={() => navigate(`/countries/${country.cca2.toLowerCase()}`)}
                            style={{ cursor: 'pointer' }}>
                            <img
                                className="country-card-flag"
                                src={country.flags.png}
                                alt={country.flags.alt || `Bandera de ${country.name.common}`}
                            />
                            <div className="country-card-body">
                                <h3 className="country-card-name">{country.name.common}</h3>
                                <div className="country-card-info">
                                    <span className="country-card-label">Región</span>
                                    <span
                                        className="country-card-region"
                                        style={{ color: regionColors[country.region] || '#94a3b8' }}
                                    >
                                        {country.region}
                                    </span>
                                </div>
                                <div className="country-card-info">
                                    <span className="country-card-label">Población</span>
                                    <span className="country-card-value">
                                        {country.population.toLocaleString()}
                                    </span>
                                </div>
                                <div className="country-card-info">
                                    <span className="country-card-label">Capital</span>
                                    <span className="country-card-value">
                                        {country.capital?.[0] || '—'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="countries-empty">
                            <p>😕 No se encontraron países con "<strong>{search}</strong>"</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CountriesPage