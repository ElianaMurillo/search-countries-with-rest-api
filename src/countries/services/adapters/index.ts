import { Country, Regions } from "../../models"

export interface ICountryDTO {
  name: {
    common: string
    official: string
  },
  region: string
  population: number
  flags: {
    png: string
  }
}

export class CountryAdapter {

  static regionAdapterMap = {
    'Europe': Regions.EUROPE,
    'Americas': Regions.AMERICA,
    'Asia': Regions.ASIA,
    'Africa': Regions.AFRICA,
    'Oceania': Regions.OCEANIA,
    'Antarctic': Regions.ANTARCTIC
  }

  static toDomain(countryDto: ICountryDTO): Country {
    const regionAdapted = this.regionAdapterMap[countryDto.region as keyof typeof this.regionAdapterMap]
    return new Country(
      countryDto.name.official,
      countryDto.name.common,
      countryDto.population,
      regionAdapted,
      countryDto.flags.png
    )
  }

  static toDomainList(countryListDto: ICountryDTO[]) {
    return countryListDto.map(country => CountryAdapter.toDomain(country))
  }
}
