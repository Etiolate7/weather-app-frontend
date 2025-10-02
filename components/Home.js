import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

const Home = () => {

  const [cityNameInput, setCityNameInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = async () => {
    try {
      const response = await fetch("http://localhost:3000/weather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cityName: cityNameInput }),
      });

      const data = await response.json();

      if (data.result) {
        setWeatherData(data.weather);
        setError(null);
      } else {
        setError(data.error);
        setWeatherData(null);
      }
    } catch (err) {
      setError("Error");
      setWeatherData(null);
    }
  };

  console.log(cityNameInput);

  return (
    <div className={styles.container}>
      <div className={styles.bgImage}>
        <h3 className={styles.title}>Weather App</h3>
        <div className={styles.centerWrapper}>
          <div className={styles.middle}>
            <input
              className={styles.input}
              id="cityNameInput"
              type="text"
              placeholder="Search City"
              value={cityNameInput} onChange={e => setCityNameInput(e.target.value)}
            />
            <button onClick={handleChange} className={styles.btn} id="addCity">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            {weatherData && (
              <div className={styles.weatherInfo}>
                <h4 className={styles.cityName}>{weatherData.cityName}</h4>
                <p className={styles.description}>{weatherData.description}</p>
                <p className={styles.tempMin}>Min: {weatherData.tempMin}°C</p>
                <p className={styles.tempMax}>Max: {weatherData.tempMax}°C</p>
              </div>
            )}

            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
