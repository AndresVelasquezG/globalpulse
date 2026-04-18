import { useLocation } from 'react-router-dom'
import { useThemeContext } from '../../context/ThemeContext'
import './topbar.css'

const pageTitles = {
  '/': { title: 'Dashboard Global', subtitle: 'Resumen del mundo en tiempo real' },
  '/countries': { title: 'Países del Mundo', subtitle: 'Explora y filtra todos los países' },
  '/population': { title: 'Población Mundial', subtitle: 'Estadísticas por país y región' },
  '/economy': { title: 'Economía Global', subtitle: 'PIB e indicadores económicos' },
  '/climate': { title: 'Clima Mundial', subtitle: 'Temperaturas y condiciones climáticas' },
}

function TopBar() {
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useThemeContext()
  const current = pageTitles[pathname] || pageTitles['/']

  return (
    <header className="topbar">
      <div className="topbar-title">
        <h1>{current.title}</h1>
        <p>{current.subtitle}</p>
      </div>

      <div className="topbar-right">
        <div className="topbar-badge">
          <span className="topbar-badge-dot"></span>
          Live
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

export default TopBar