import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import './populationgrowthchart.css'

const data = [
  { year: '1950', population: 2.5 },
  { year: '1960', population: 3.0 },
  { year: '1970', population: 3.7 },
  { year: '1980', population: 4.4 },
  { year: '1990', population: 5.3 },
  { year: '2000', population: 6.1 },
  { year: '2010', population: 6.9 },
  { year: '2020', population: 7.8 },
  { year: '2024', population: 8.1 },
]

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="growth-tooltip">
        <p className="growth-tooltip-year">Año {label}</p>
        <p className="growth-tooltip-value">
          {payload[0].value}B <span>personas</span>
        </p>
      </div>
    )
  }
  return null
}

function PopulationGrowthChart() {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h3 className="chart-card-title">📈 Crecimiento poblacional mundial</h3>
        <p className="chart-card-subtitle">Población total en billones desde 1950</p>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>

            {/* Definimos el gradiente del área rellena */}
            <defs>
              <linearGradient id="populationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e4a" vertical={false} />

            <XAxis
              dataKey="year"
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#1e1e4a' }}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}B`}
              domain={[2, 9]}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#38bdf8', strokeWidth: 1, strokeDasharray: '4 4' }} />

            <Area
              type="monotone"
              dataKey="population"
              stroke="#38bdf8"
              strokeWidth={3}
              fill="url(#populationGradient)"
              dot={{ fill: '#38bdf8', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 7, fill: '#38bdf8', stroke: '#0a0a1a', strokeWidth: 2 }}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PopulationGrowthChart