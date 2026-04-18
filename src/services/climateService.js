import axios from 'axios'

const BASE_URL = 'https://api.open-meteo.com/v1'

// Capitales principales con sus coordenadas
export const MAJOR_CITIES = [
  { city: 'Bogotá', country: 'Colombia', lat: 4.71, lon: -74.07, flagCode: 'co' },
  { city: 'Buenos Aires', country: 'Argentina', lat: -34.61, lon: -58.37, flagCode: 'ar' },
  { city: 'Ciudad de México', country: 'México', lat: 19.43, lon: -99.13, flagCode: 'mx' },
  { city: 'Madrid', country: 'España', lat: 40.42, lon: -3.70, flagCode: 'es' },
  { city: 'Londres', country: 'Reino Unido', lat: 51.51, lon: -0.13, flagCode: 'gb' },
  { city: 'París', country: 'Francia', lat: 48.85, lon: 2.35, flagCode: 'fr' },
  { city: 'Tokio', country: 'Japón', lat: 35.69, lon: 139.69, flagCode: 'jp' },
  { city: 'Nueva York', country: 'EE.UU', lat: 40.71, lon: -74.01, flagCode: 'us' },
  { city: 'Sídney', country: 'Australia', lat: -33.87, lon: 151.21, flagCode: 'au' },
  { city: 'Dubái', country: 'Emiratos', lat: 25.20, lon: 55.27, flagCode: 'ae' },
  { city: 'Nairobi', country: 'Kenia', lat: -1.29, lon: 36.82, flagCode: 'ke' },
  { city: 'Pekín', country: 'China', lat: 39.91, lon: 116.39, flagCode: 'cn' },
]

// Trae el clima actual para una ciudad
export async function getCityWeather(lat, lon) {
  const { data } = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      latitude: lat,
      longitude: lon,
      current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
      timezone: 'auto',
    },
  })
  return data.current
}

// Trae el clima de todas las ciudades en paralelo
export async function getAllCitiesWeather() {
  const results = await Promise.all(
    MAJOR_CITIES.map(async (city) => {
      const weather = await getCityWeather(city.lat, city.lon)
      return { ...city, weather }
    })
  )
  return results
}

// Convierte el código de clima a emoji e descripción
export function getWeatherInfo(code) {
  if (code === 0) return { icon: '☀️', label: 'Despejado' }
  if (code <= 2) return { icon: '🌤️', label: 'Parcialmente nublado' }
  if (code <= 3) return { icon: '☁️', label: 'Nublado' }
  if (code <= 49) return { icon: '🌫️', label: 'Niebla' }
  if (code <= 59) return { icon: '🌦️', label: 'Llovizna' }
  if (code <= 69) return { icon: '🌧️', label: 'Lluvia' }
  if (code <= 79) return { icon: '❄️', label: 'Nieve' }
  if (code <= 84) return { icon: '🌨️', label: 'Aguanieve' }
  if (code <= 99) return { icon: '⛈️', label: 'Tormenta' }
  return { icon: '🌡️', label: 'Desconocido' }
}