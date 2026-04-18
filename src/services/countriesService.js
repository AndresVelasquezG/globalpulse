import axios from 'axios'

const BASE_URL = 'https://restcountries.com/v3.1'

// Petición liviana — para listas y gráficos generales
export async function getCountries() {
  const { data } = await axios.get(`${BASE_URL}/all`, {
    params: {
      fields: 'name,population,region,subregion,flags,cca2,capital,area,independent,unMember',
    },
  })
  return data
}

// Petición completa — para el detalle de un país específico
export async function getCountryByCode(code) {
  const { data } = await axios.get(`${BASE_URL}/alpha/${code}`)
  return data[0]
}