import './Loader.css'

function Loader({ message = 'Cargando datos...' }) {
  return (
    <div className="loader">
      <div className="loader-spinner"></div>
      <p className="loader-message">{message}</p>
    </div>
  )
}

export default Loader