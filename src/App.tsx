import * as React from 'react';
import useLocalStorage from 'use-local-storage';
import './reset.css';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMoon, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Country } from './countries/models';
library.add(faMoon, faSearch);
import { GetCountriesListService } from './countries/services';
import { SearchCountriesByNameService } from './countries/services';
import { SearchCountriesByRegionService } from './countries/services/SearchCountriesByRegion.service';

function App() {

  const defaultLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultLight ? 'dark' : 'light');

  console.log(theme);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    console.log(theme);
  }

  const [search, setSearch] = React.useState('');
  const [countries, setCountries] = React.useState<Country[]>([]);

  const getCountriesListService = new GetCountriesListService();
  const searchCountriesByNameService = new SearchCountriesByNameService();
  const searchCountriesByRegionService = new SearchCountriesByRegionService

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
      reloadRegionSelected('regionSelected', '')
    }
  }

  function reloadRegionSelected(id: string, valueToSelect: string) {
    let elementToSelect = document.getElementById(id) as HTMLSelectElement;
    elementToSelect.value = valueToSelect;
  }

  const handleChangeFilterRegion = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regionSelected = e.target.value;
    if (regionSelected === '') {
      const myData = await getCountriesListService.execute()
      setCountries(myData)
    } else {
      const searchRegionCountries = await searchCountriesByRegionService.execute(regionSelected)
      setCountries(searchRegionCountries)
      setSearch('')
    }
  }

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchCountries();
  }

  return (
    <div className='app' data-theme={theme}>
      <div className='navbar'>
        <h1>Where in the world?</h1>
        <div className='switch-theme'>
          <button  onClick={switchTheme} className='btn-switch-theme'>
            <FontAwesomeIcon icon={["fas", "moon"]} className='iconSwitchTheme' />
            {theme === 'light' ? 'dark' : 'light'} mode
          </button>
        </div>
      </div>

      <div className='search-and-filter'>
        <div className='box-search'>
          <form onSubmit={onFormSubmit}>
            <input type="search" value={search} placeholder="Search the country..." className='input-search' onChange={(e) => setSearch(e.target.value)}></input>
          </form>
          <span><FontAwesomeIcon icon={["fas", "search"]} className='icon-search' /></span>
        </div>

        <div className='filter-by-region'>
          <select name="optionsRegions" id="regionSelected" onChange={handleChangeFilterRegion} className='select-filter-by-region' defaultValue={'default'}>
            <option value="default" disabled>Filter by region</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
            <option value="Antarctic">Antartida</option>
          </select>
        </div>
      </div>

      <div className='container-cards'>
        {countries.map((country, indexCountry) => {
          return (
            <div key={indexCountry} className='card-country'>
              <img src={country.flag} alt={country.officialName} className='card-flag-country' />
              <div className='card-text-information-country'>
                <p className='card-name-country'>{country.officialName}</p>
                <div>
                  <p className='card-items-information-country'>Population: <span className='card-information-country'>{country.population.toLocaleString()}</span></p>
                  <p className='card-items-information-country'>Region: <span className='card-information-country'>{country.region}</span></p>
                  <p className='card-items-information-country'>Capital: <span className='card-information-country'>{country.capital}</span></p>
                </div>
              </div>
            </div>
          )
        })
        }
      </div>
    </div>
  )
}

export default App;
