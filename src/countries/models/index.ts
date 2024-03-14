export enum Regions {
  AMERICA = 'America',
  EUROPE = 'Europe',
  ASIA = 'Asia',
  AFRICA = 'Africa',
  OCEANIA = 'Oceania',
  ANTARCTIC = 'Antarctic'
}

export class Country {
  officialName: string
  commonName: string
  capital: string
  population: number
  region: Regions
  flag: string

  constructor(name: string, commonName: string, capital: string, population: number, region: Regions, flag: string) {
    this.officialName = name
    this.commonName = commonName
    this.capital = capital
    this.population = population
    this.region = region
    this.flag = flag
    this.validate()
  }

  private validate() {
    this.validatePopulation()
    this.validateRegion()
  }

  validatePopulation() {
    if (this.population < 0) {
      throw new Error('Invalid population')
    }
  }

  validateRegion() {
    if (!Object.values(Regions).includes(this.region)) {
      throw new Error('Invalid region')
    }
  }
}
