import * as React from 'react';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { type Country } from './countries/models';
library.add( faMoon );

import { GetCountriesListService } from './countries/services'

function App() {
  /*const [count, setCount] = useState(0)*/
  const [search, setSearch] = React.useState('');
  const [countries, setCountries] = React.useState<Country[]>([])

  const getCountriesListService = new GetCountriesListService()

  React.useEffect(() => {
    (async() => {
      const myData = await getCountriesListService.execute()
      setCountries(myData)
    })()
  }, [])

  return (
    <>
      {/*<div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>*/}

      <div className='navbar'>
        <h1>Where in the world?</h1>
        <div className='switchTheme'>
          <FontAwesomeIcon icon={["fas", "moon"]} />
        </div>
      </div>

      <div className='search-and-filter'>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}></input>
      </div>

      <div>
        {countries.map(country => (
          <div>
            <img src={country.flag} alt={country.officialName} />
            <p>{country.officialName}</p>
          </div>
        ))}
      </div>

    </>
  )
}

export default App
