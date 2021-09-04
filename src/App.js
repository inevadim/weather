import axios from 'axios';
import { useState } from 'react';
import style from './App.module.scss';
const api = {
  key: 'd340ddd7f500656b21b6a44403c2b480',
  base: 'https://api.openweathermap.org/data/2.5/',
};
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === 'Enter') {
      axios
        .get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(result => {
          setWeather(result);
          setQuery('');
        })
        .catch(err => {
          // what now?
          alert('input correct city');
        });
    }
  };

  const dateBuilder = () => {
    let date = String(
      new Date().toLocaleString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    ).slice(0, 17);
    return date;
  };
  return (
    <div className={style.app}>
      <div className={style.wrapInput}>
        <input
          type="text"
          placeholder="search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>

      {typeof weather.data !== 'undefined' ? (
        <div>
          <div className={style.item}>
            city:{weather.data.name}, {weather.data.sys.country}
          </div>
          <div className={style.item}>
            weather: {Math.round(weather.data.main.temp)} c°
            {/* {weather.data.weather[0].main} */}
            <img
              src={'http://openweathermap.org/img/w/' + weather.data.weather[0].icon + '.png'}
              alt="weather"
            />
          </div>
          <div className={style.item}>date:{dateBuilder()}</div>

          <div className={style.item}></div>
          <div className={style.item}>wind speed:{weather.data.wind.speed} m/s</div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default App;
