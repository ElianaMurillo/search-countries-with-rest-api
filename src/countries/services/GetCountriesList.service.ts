import { CountryAdapter } from '../services/adapters'

export class GetCountriesListService {
  async execute() {
    const response = await fetch(
      'https://restcountries.com/v3.1/all',
      {headers: {'Content-Type': 'json'}}
    )
    const data = await response.json()
    const countriesData = CountryAdapter.toDomainList(data)
    return countriesData
  }
}
