import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import './populationchart.css'

const data = [
  { country: 'China', population: 1425 },
  { country: 'India', population: 1429 },
  { country: 'EE.UU', population: 340 },
  { country: 'Indonesia', population: 277 },
  { country: 'Pakistán', population: 240 },
  { country: 'Brasil', population: 216 },
  { country: 'Nigeria', population: 223 },
  { country: 'Bangladesh', population: 173 },
]

// Este componente personaliza el tooltip que aparece al pasar el mouse
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip-label">{label}</p>
        <p className="chart-tooltip-value">
          {payload[0].value}M <span>habitantes</span>
        </p>
      </div>
    )
  }
  return null
}

function PopulationChart() {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h3 className="chart-card-title">👥 Países más poblados</h3>
        <p className="chart-card-subtitle">Población en millones de personas</p>
      </div>

      <div className="chart-wrapper">
        {/* ResponsiveContainer hace que el gráfico se adapte al tamaño del contenedor */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>

            {/* Líneas de fondo del gráfico */}
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e4a" vertical={false} />

            {/* Eje horizontal - nombres de países */}
            <XAxis
              dataKey="country"
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#1e1e4a' }}
              tickLine={false}
            />

            {/* Eje vertical - números */}
            <YAxis
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}M`}
            />

            {/* Tooltip personalizado al hacer hover */}
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124, 106, 247, 0.05)' }} />

            {/* Las barras del gráfico */}
            <Bar
              dataKey="population"
              fill="#7c6af7"
              radius={[6, 6, 0, 0]}
              maxBarSize={50}
            />

          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PopulationChart