import './statcard.css'

function StatCard({ icon, title, value, subtitle, color }) {
  return (
    <div className="stat-card" style={{ '--card-color': color }}>
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-info">
        <p className="stat-card-title">{title}</p>
        <h2 className="stat-card-value">{value}</h2>
        <p className="stat-card-subtitle">{subtitle}</p>
      </div>
    </div>
  )
}

export default StatCard