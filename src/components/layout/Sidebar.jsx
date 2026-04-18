import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const menuItems = [
  { icon: '🌍', label: 'Dashboard', path: '/' },
  { icon: '🗺️', label: 'Países', path: '/countries' },
  { icon: '👥', label: 'Población', path: '/population' },
  { icon: '💰', label: 'Economía', path: '/economy' },
  { icon: '🌡️', label: 'Clima', path: '/climate' },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon">🌎</span>
        <span className="sidebar-logo-text">Andrés Velásquez, GlobalPulse.</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end
            className={({ isActive }) =>
              isActive ? 'sidebar-nav-item active' : 'sidebar-nav-item'
            }
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            <span className="sidebar-nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar