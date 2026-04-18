import Sidebar from './Sidebar'
import TopBar from './TopBar'
import './mainlayout.css'

function MainLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-body">
        <TopBar />
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout