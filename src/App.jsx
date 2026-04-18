import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/HomePage'
import CountriesPage from './pages/CountriesPage'
import CountryDetailPage from './pages/CountryDetailPage'
import PopulationPage from './pages/PopulationPage'
import EconomyPage from './pages/EconomyPage'
import ClimatePage from './pages/ClimatePage'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/countries" element={<CountriesPage />} />
            <Route path="/countries/:code" element={<CountryDetailPage />} />
            <Route path="/population" element={<PopulationPage />} />
            <Route path="/economy" element={<EconomyPage />} />
            <Route path="/climate" element={<ClimatePage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App