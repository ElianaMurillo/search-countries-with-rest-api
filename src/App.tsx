import * as React from 'react';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { Country } from './countries/models';
library.add(faMoon);
import { GetCountriesListService } from './countries/services';
import { SearchCountriesByNameService } from './countries/services';
import DropDown from './countries/views/components/dropdown';
import { SearchCountriesByRegionService } from './countries/services/SearchCountriesByRegion.service';

function App() {
  const [search, setSearch] = React.useState('');
  const [countries, setCountries] = React.useState<Country[]>([]);

  const getCountriesListService = new GetCountriesListService();
  const searchCountriesByNameService = new SearchCountriesByNameService();
  const searchCountriesByRegionService = new SearchCountriesByRegionService

  const [showDropDown, setShowDropDown] = React.useState<boolean>(false);
  const [selectRegion, setSelectRegion] = React.useState<string>('');

  React.useEffect(() => {
    (async () => {
      const myData = await getCountriesListService.execute()
      setCountries(myData)
    })()
  }, [])

  const searchCountries = async () => {
    if (search === '') {
      const myData = await getCountriesListService.execute()
      setCountries(myData)
    } else {
      const searchNameCountry = await searchCountriesByNameService.execute(search)
      setCountries(searchNameCountry)
      setSelectRegion('');
    }
  }

  const regions = () => {
    return ['America', 'Asia', 'Africa', 'Oceania', 'Antarctic'];
  };

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  }

  const searchCountriesByRegion = async () => {
    if (selectRegion === '') {
      const myData = await getCountriesListService.execute()
      setCountries(myData)
    } else {
      const searchRegionCountries = await searchCountriesByRegionService.execute(selectRegion)
      setCountries(searchRegionCountries)
      setSearch('')
    }
  }

  const regionSelection = (region: string): void => {
    setSelectRegion(region);
  };

  return (
    <>
      <div className='navbar'>
        <h1>Where in the world?</h1>
        <div className='switchTheme'>
          <FontAwesomeIcon icon={["fas", "moon"]} />
        </div>
      </div>

      <div className='search-and-filter'>
        <input type="search" value={search} placeholder="Search the country..." onChange={(e) => setSearch(e.target.value)}></input>
        <button onClick={searchCountries}>Search Country</button>

        <div>
          {selectRegion
            ? `You select ${selectRegion} for your search`
            : 'Search by regions'}

          <button onClick={() => {toggleDropDown(); searchCountriesByRegion()}} onBlur={(e: React.FocusEvent<HTMLButtonElement>): void => dismissHandler(e)}>
            <div>
              {selectRegion ? 'Select: ' + selectRegion : 'Select...'}
            </div>
            {showDropDown && (
              <DropDown
                regions={regions()}
                showDropDown={false}
                toggleDropDown={(): void => toggleDropDown()}
                regionSelection={regionSelection}
              />
            )}
          </button>
        </div>

        {countries.map((country, indexCountry) => {
          return (
            <div key={indexCountry}>
              <img src={country.flag} alt={country.officialName} />
              <p>{country.officialName}</p>
            </div>
          )
        })
        }
      </div>
    </>
  )
}

export default App
