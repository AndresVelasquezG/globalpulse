import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './ContinentsChart.css'

const data = [
  { name: 'Asia', value: 4753 },
  { name: 'África', value: 1460 },
  { name: 'Europa', value: 742 },
  { name: 'América', value: 1050 },
  { name: 'Oceanía', value: 45 },
]

const COLORS = ['#7c6af7', '#38bdf8', '#4ade80', '#fb923c', '#f472b6']

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="continents-tooltip">
        <p className="continents-tooltip-label">{payload[0].name}</p>
        <p className="continents-tooltip-value">
          {payload[0].value}M <span>habitantes</span>
        </p>
      </div>
    )
  }
  return null
}

// Etiqueta personalizada dentro de cada porción
function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  if (percent < 0.05) return null // no mostrar etiqueta si la porción es muy pequeña

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

function ContinentsChart() {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h3 className="chart-card-title">🌐 Población por continente</h3>
        <p className="chart-card-subtitle">Distribución en millones de personas</p>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={110}
              dataKey="value"
              labelLine={false}
              label={CustomLabel}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />

            <Legend
              formatter={(value) => (
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ContinentsChart