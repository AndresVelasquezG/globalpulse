import { useMemo } from 'react'
import { useCountries } from '../hooks/useCountries'
import Loader from '../components/Loader'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import './populationpage.css'

const COLORS = ['#7c6af7', '#38bdf8', '#4ade80', '#fb923c', '#f472b6']

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="pop-tooltip">
        <p className="pop-tooltip-label">{label}</p>
        <p className="pop-tooltip-value">
          {payload[0].value}M <span>habitantes</span>
        </p>
      </div>
    )
  }
  return null
}

function PopulationPage() {
  const { countries, loading, error } = useCountries()

  // Top 10 países más poblados
  const top10 = useMemo(() => {
    return countries
      .slice(0, 10)
      .map((c) => ({
        name: c.name.common,
        population: parseFloat((c.population / 1_000_000).toFixed(1)),
        flag: c.flags.png,
      }))
  }, [countries])

  // Población por región
  const byRegion = useMemo(() => {
    const regionMap = countries.reduce((acc, c) => {
      if (!c.region) return acc
      acc[c.region] = (acc[c.region] || 0) + c.population
      return acc
    }, {})

    return Object.entries(regionMap)
      .map(([region, population]) => ({
        region,
        population: parseFloat((population / 1_000_000_000).toFixed(2)),
      }))
      .sort((a, b) => b.population - a.population)
  }, [countries])

  // Estadísticas generales
  const generalStats = useMemo(() => {
    if (!countries.length) return null
    const total = countries.reduce((sum, c) => sum + c.population, 0)
    const avg = total / countries.length
    const max = countries[0]
    const min = [...countries].sort((a, b) => a.population - b.population)
      .find(c => c.population > 0)

    return { total, avg, max, min }
  }, [countries])

  if (loading) return <Loader message="Cargando datos de población..." />
  if (error) return <p style={{ color: '#f87171', textAlign: 'center' }}>{error}</p>

  return (
    <div className="population-page">

      {/* Estadísticas generales */}
      <div className="pop-stats-grid animate-fade-in-up">
        <div className="pop-stat-card">
          <p className="pop-stat-label">🌍 Población total</p>
          <h2 className="pop-stat-value">
            {(generalStats.total / 1_000_000_000).toFixed(2)}B
          </h2>
          <p className="pop-stat-sub">personas en el mundo</p>
        </div>
        <div className="pop-stat-card">
          <p className="pop-stat-label">📊 Promedio por país</p>
          <h2 className="pop-stat-value">
            {(generalStats.avg / 1_000_000).toFixed(1)}M
          </h2>
          <p className="pop-stat-sub">habitantes promedio</p>
        </div>
        <div className="pop-stat-card">
          <p className="pop-stat-label">🏆 País más poblado</p>
          <h2 className="pop-stat-value pop-stat-name">
            {generalStats.max?.name?.common}
          </h2>
          <p className="pop-stat-sub">
            {(generalStats.max?.population / 1_000_000_000).toFixed(2)}B habitantes
          </p>
        </div>
        <div className="pop-stat-card">
          <p className="pop-stat-label">🔍 País menos poblado</p>
          <h2 className="pop-stat-value pop-stat-name">
            {generalStats.min?.name?.common}
          </h2>
          <p className="pop-stat-sub">
            {generalStats.min?.population.toLocaleString()} habitantes
          </p>
        </div>
      </div>

      {/* Gráfico top 10 */}
      <div className="pop-chart-card animate-fade-in-up delay-2">
        <div className="chart-card-header">
          <h3 className="chart-card-title">👥 Top 10 países más poblados</h3>
          <p className="chart-card-subtitle">Población en millones de personas</p>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={top10} margin={{ top: 10, right: 10, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e4a" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={{ stroke: '#1e1e4a' }}
              tickLine={false}
              angle={-35}
              textAnchor="end"
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}M`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124,106,247,0.05)' }} />
            <Bar dataKey="population" radius={[6, 6, 0, 0]} maxBarSize={50}>
              {top10.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Población por región */}
      <div className="pop-chart-card animate-fade-in-up delay-3">
        <div className="chart-card-header">
          <h3 className="chart-card-title">🌐 Población por región</h3>
          <p className="chart-card-subtitle">Total en billones de personas</p>
        </div>
        <div className="pop-regions-list">
          {byRegion.map((item, index) => {
            const max = byRegion[0].population
            const pct = (item.population / max) * 100
            return (
              <div key={item.region} className="pop-region-row">
                <span className="pop-region-name">{item.region}</span>
                <div className="pop-region-bar-wrapper">
                  <div
                    className="pop-region-bar"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                </div>
                <span className="pop-region-value">{item.population}B</span>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default PopulationPage