import { CountryAdapter } from './adapters'

export class SearchCountriesByNameService {
  async execute(name: string) {
    const response = await fetch(
      'https://restcountries.com/v3.1/name/'+name,
      {headers: {'Content-Type': 'json'}}
    )
    const data = await response.json()
    const countriesNameData = CountryAdapter.toDomainList(data)
    return countriesNameData
  }
}
