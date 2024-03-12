import { CountryAdapter } from './adapters'

export class SearchCountriesByRegionService {
  async execute(region: string) {
    const response = await fetch(
      'https://restcountries.com/v3.1/region/'+region,
      {headers: {'Content-Type': 'json'}}
    )
    const data = await response.json()
    const countriesRegionData = CountryAdapter.toDomainList(data)
    return countriesRegionData
  }
}
