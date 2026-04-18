import StatCard from '../components/StatCard'
import PopulationChart from '../components/charts/PopulationChart'
import PopulationGrowthChart from '../components/charts/PopulationGrowthChart'
import ContinentsChart from '../components/charts/ContinentsChart'
import CountriesTable from '../components/CountriesTable'
import Loader from '../components/Loader'
import { useStats } from '../hooks/useStats'
import { formatPopulation } from '../utils/formatNumbers'
import './homepage.css'

function HomePage() {
  const { stats, loading, error } = useStats()

  const statCards = stats
    ? [
        {
          icon: '🌍',
          title: 'Países',
          value: stats.totalCountries,
          subtitle: 'estados reconocidos',
          color: '#7c6af7',
        },
        {
          icon: '👥',
          title: 'Población',
          value: formatPopulation(stats.totalPopulation),
          subtitle: 'personas en el mundo',
          color: '#38bdf8',
        },
        {
          icon: '🏆',
          title: 'Más poblado',
          value: stats.mostPopulated,
          subtitle: 'país con más habitantes',
          color: '#4ade80',
        },
        {
          icon: '🌐',
          title: 'Top región',
          value: stats.topRegion,
          subtitle: 'continente con más países',
          color: '#fb923c',
        },
      ]
    : []

  return (
    <div className="home-page">

      <div className="home-header animate-fade-in-up">
        <h2 className="home-title">Resumen Global</h2>
        <p className="home-subtitle">Estadísticas actualizadas del planeta</p>
      </div>

      {loading && <Loader message="Calculando estadísticas globales..." />}
      {error && (
        <p style={{ color: '#f87171', textAlign: 'center' }}>{error}</p>
      )}
      {!loading && !error && (
        <div className="stats-grid">
          {statCards.map((stat, index) => (
            <div
              key={stat.title}
              className={`animate-fade-in-up delay-${index + 1}`}
            >
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      )}

      <div className="charts-grid animate-fade-in-up delay-3">
        <PopulationChart />
        <PopulationGrowthChart />
      </div>

      <div className="charts-grid-single animate-fade-in-up delay-4">
        <ContinentsChart />
        <CountriesTable />
      </div>

    </div>
  )
}

export default HomePage