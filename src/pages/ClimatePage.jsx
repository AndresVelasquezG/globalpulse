import { useMemo } from 'react'
import { useClimate } from '../hooks/useClimate'
import { getWeatherInfo } from '../services/climateService'
import Loader from '../components/Loader'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, ReferenceLine
} from 'recharts'
import './climatepage.css'

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const temp = payload[0].value
    return (
      <div className="climate-tooltip">
        <p className="climate-tooltip-label">{label}</p>
        <p className="climate-tooltip-value">
          {temp}°C
        </p>
      </div>
    )
  }
  return null
}

function ClimatePage() {
  const { cities, loading, error } = useClimate()

  // Estadísticas generales
  const stats = useMemo(() => {
    if (!cities.length) return null
    const temps = cities.map(c => c.weather.temperature_2m)
    const avg = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1)
    const max = cities.reduce((a, b) =>
      a.weather.temperature_2m > b.weather.temperature_2m ? a : b
    )
    const min = cities.reduce((a, b) =>
      a.weather.temperature_2m < b.weather.temperature_2m ? a : b
    )
    const avgHumidity = (
      cities.reduce((a, b) => a + b.weather.relative_humidity_2m, 0) / cities.length
    ).toFixed(0)

    return { avg, max, min, avgHumidity }
  }, [cities])

  // Datos para el gráfico
  const chartData = useMemo(() => {
    return cities.map(c => ({
      name: c.city,
      temp: c.weather.temperature_2m,
    }))
  }, [cities])

  // Color de barra según temperatura
  function getTempColor(temp) {
    if (temp <= 0) return '#38bdf8'
    if (temp <= 15) return '#7c6af7'
    if (temp <= 25) return '#4ade80'
    if (temp <= 32) return '#fb923c'
    return '#f87171'
  }

  if (loading) return <Loader message="Obteniendo clima en tiempo real..." />
  if (error) return <p style={{ color: '#f87171', textAlign: 'center' }}>{error}</p>

  return (
    <div className="climate-page">

      {/* Stats generales */}
      <div className="climate-stats-grid animate-fade-in-up">
        <div className="climate-stat-card" style={{ '--eco-color': '#fb923c' }}>
          <span className="climate-stat-icon">🌡️</span>
          <div>
            <p className="climate-stat-label">Temperatura promedio</p>
            <h2 className="climate-stat-value">{stats.avg}°C</h2>
          </div>
        </div>
        <div className="climate-stat-card" style={{ '--eco-color': '#f87171' }}>
          <span className="climate-stat-icon">🔥</span>
          <div>
            <p className="climate-stat-label">Ciudad más caliente</p>
            <h2 className="climate-stat-value">{stats.max.city}</h2>
            <p className="climate-stat-sub">{stats.max.weather.temperature_2m}°C</p>
          </div>
        </div>
        <div className="climate-stat-card" style={{ '--eco-color': '#38bdf8' }}>
          <span className="climate-stat-icon">🧊</span>
          <div>
            <p className="climate-stat-label">Ciudad más fría</p>
            <h2 className="climate-stat-value">{stats.min.city}</h2>
            <p className="climate-stat-sub">{stats.min.weather.temperature_2m}°C</p>
          </div>
        </div>
        <div className="climate-stat-card" style={{ '--eco-color': '#7c6af7' }}>
          <span className="climate-stat-icon">💧</span>
          <div>
            <p className="climate-stat-label">Humedad promedio</p>
            <h2 className="climate-stat-value">{stats.avgHumidity}%</h2>
          </div>
        </div>
      </div>

      {/* Gráfico de temperaturas */}
      <div className="climate-chart-card animate-fade-in-up delay-2">
        <div className="chart-card-header">
          <h3 className="chart-card-title">🌡️ Temperaturas actuales por ciudad</h3>
          <p className="chart-card-subtitle">Temperatura en °C en tiempo real</p>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 60 }}>
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
              tickFormatter={(v) => `${v}°`}
            />
            <ReferenceLine y={0} stroke="#475569" strokeDasharray="4 4" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124,106,247,0.05)' }} />
            <Bar dataKey="temp" radius={[6, 6, 0, 0]} maxBarSize={50}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={getTempColor(entry.temp)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Leyenda de colores */}
        <div className="climate-legend">
          <span style={{ color: '#38bdf8' }}>❄️ Muy frío (≤0°C)</span>
          <span style={{ color: '#7c6af7' }}>🌬️ Frío (1–15°C)</span>
          <span style={{ color: '#4ade80' }}>🌤️ Templado (16–25°C)</span>
          <span style={{ color: '#fb923c' }}>☀️ Caliente (26–32°C)</span>
          <span style={{ color: '#f87171' }}>🔥 Muy caliente (+33°C)</span>
        </div>
      </div>

      {/* Cards de ciudades */}
      <div className="climate-cities-grid animate-fade-in-up delay-3">
        {cities.map((city) => {
          const { icon, label } = getWeatherInfo(city.weather.weather_code)
          const temp = city.weather.temperature_2m
          return (
            <div key={city.city} className="climate-city-card">
              <div className="climate-city-header">
                <img
                  src={`https://flagcdn.com/w40/${city.flagCode}.png`}
                  alt={`Bandera de ${city.country}`}
                  className="climate-city-flag-img"
                />
                <div>
                  <p className="climate-city-name">{city.city}</p>
                  <p className="climate-city-country">{city.country}</p>
                </div>
                <span className="climate-city-icon">{icon}</span>
              </div>
              <div className="climate-city-temp" style={{ color: getTempColor(temp) }}>
                {temp}°C
              </div>
              <div className="climate-city-details">
                <span>💧 {city.weather.relative_humidity_2m}%</span>
                <span>💨 {city.weather.wind_speed_10m} km/h</span>
              </div>
              <p className="climate-city-label">{label}</p>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default ClimatePage