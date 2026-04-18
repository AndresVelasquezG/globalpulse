import { useMemo } from 'react'
import { useCountries } from '../hooks/useCountries'
import Loader from '../components/Loader'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend
} from 'recharts'
import './economypage.css'

const COLORS = ['#7c6af7', '#38bdf8', '#4ade80', '#fb923c', '#f472b6', '#e879f9']

function TooltipGDP({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="eco-tooltip">
        <p className="eco-tooltip-label">{label}</p>
        <p className="eco-tooltip-value">
          {payload[0].value} <span>países</span>
        </p>
      </div>
    )
  }
  return null
}

function EconomyPage() {
  const { countries, loading, error } = useCountries()

  // Países por región con conteo
  const byRegion = useMemo(() => {
    const map = countries.reduce((acc, c) => {
      if (!c.region) return acc
      acc[c.region] = (acc[c.region] || 0) + 1
      return acc
    }, {})
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [countries])

  // Países con mayor área
  const topArea = useMemo(() => {
    return [...countries]
      .filter(c => c.area)
      .sort((a, b) => b.area - a.area)
      .slice(0, 8)
      .map(c => ({
        name: c.name.common,
        area: parseFloat((c.area / 1_000_000).toFixed(2)),
      }))
  }, [countries])

  // Estadísticas generales
  const stats = useMemo(() => {
    if (!countries.length) return null
    const withArea = countries.filter(c => c.area > 0)
    const totalArea = withArea.reduce((sum, c) => sum + c.area, 0)
    const independent = countries.filter(c => c.independent).length
    const unMembers = countries.filter(c => c.unMember).length

    return { totalArea, independent, unMembers, total: countries.length }
  }, [countries])

  if (loading) return <Loader message="Cargando datos económicos..." />
  if (error) return <p style={{ color: '#f87171', textAlign: 'center' }}>{error}</p>

  return (
    <div className="economy-page">

      {/* Stats generales */}
      <div className="eco-stats-grid animate-fade-in-up">
        <div className="eco-stat-card" style={{ '--eco-color': '#7c6af7' }}>
          <span className="eco-stat-icon">🌍</span>
          <div>
            <p className="eco-stat-label">Total países</p>
            <h2 className="eco-stat-value">{stats.total}</h2>
          </div>
        </div>
        <div className="eco-stat-card" style={{ '--eco-color': '#38bdf8' }}>
          <span className="eco-stat-icon">🏳️</span>
          <div>
            <p className="eco-stat-label">Países independientes</p>
            <h2 className="eco-stat-value">{stats.independent}</h2>
          </div>
        </div>
        <div className="eco-stat-card" style={{ '--eco-color': '#4ade80' }}>
          <span className="eco-stat-icon">🇺🇳</span>
          <div>
            <p className="eco-stat-label">Miembros de la ONU</p>
            <h2 className="eco-stat-value">{stats.unMembers}</h2>
          </div>
        </div>
        <div className="eco-stat-card" style={{ '--eco-color': '#fb923c' }}>
          <span className="eco-stat-icon">📐</span>
          <div>
            <p className="eco-stat-label">Área total mundial</p>
            <h2 className="eco-stat-value">
              {(stats.totalArea / 1_000_000).toFixed(0)}M km²
            </h2>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="eco-charts-grid animate-fade-in-up delay-2">

        {/* Países por región - Pie */}
        <div className="eco-chart-card">
          <div className="chart-card-header">
            <h3 className="chart-card-title">🌐 Países por región</h3>
            <p className="chart-card-subtitle">Distribución de países en el mundo</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={byRegion}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={{ stroke: '#475569' }}
              >
                {byRegion.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e1e4a',
                  border: '1px solid #2e2e6a',
                  borderRadius: '10px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top países por área - Barras */}
        <div className="eco-chart-card">
          <div className="chart-card-header">
            <h3 className="chart-card-title">📐 Países más grandes por área</h3>
            <p className="chart-card-subtitle">Área en millones de km²</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topArea}
              layout="vertical"
              margin={{ top: 0, right: 20, left: 80, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e4a" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}M`}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={({ active, payload, label }) => {
                if (active && payload?.length) {
                  return (
                    <div className="eco-tooltip">
                      <p className="eco-tooltip-label">{label}</p>
                      <p className="eco-tooltip-value">
                        {payload[0].value}M <span>km²</span>
                      </p>
                    </div>
                  )
                }
                return null
              }} />
              <Bar dataKey="area" radius={[0, 6, 6, 0]} maxBarSize={22}>
                {topArea.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla de subregiones */}
      <div className="eco-table-card animate-fade-in-up delay-3">
        <div className="chart-card-header">
          <h3 className="chart-card-title">🗺️ Resumen por región</h3>
          <p className="chart-card-subtitle">Países, población y área promedio</p>
        </div>
        <table className="eco-table">
          <thead>
            <tr>
              <th>Región</th>
              <th>Países</th>
              <th>Población total</th>
              <th>Área promedio</th>
            </tr>
          </thead>
          <tbody>
            {byRegion.map((item, index) => {
              const regionCountries = countries.filter(c => c.region === item.name)
              const totalPop = regionCountries.reduce((s, c) => s + c.population, 0)
              const avgArea = regionCountries.filter(c => c.area)
                .reduce((s, c, _, arr) => s + c.area / arr.length, 0)

              return (
                <tr key={item.name} className="eco-table-row">
                  <td>
                    <span
                      className="eco-region-dot"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    {item.name}
                  </td>
                  <td>{item.value}</td>
                  <td>{(totalPop / 1_000_000_000).toFixed(2)}B</td>
                  <td>{(avgArea / 1_000).toFixed(0)}K km²</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default EconomyPage