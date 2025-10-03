import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [cityNameInput, setCityNameInput] = useState("");
  const [weatherList, setWeatherList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/weather")
      .then(res => res.json())
      .then(data => {
        setWeatherList(data.weather || []);
      });
  }, []);

  const handleSearch = async () => {
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
        setWeatherList(prev => [...prev, data.weather]);
        setError(null);
        setCityNameInput("");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Error fetching weather data.");
    }
  };

  function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


  const handleDelete = async (cityName) => {
    try {
      const response = await fetch(`http://localhost:3000/weather/${cityName}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.result) {
        setWeatherList(data.weather);
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Error deleting city.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bgImage}>
        <h3 className={styles.title}>Weather App</h3>
        <div className={styles.centerWrapper}>
          <div
            className={`${styles.middle} ${weatherList.length === 0 ? styles.middleCentered : ""
              }`}
          >
            <div className={styles.search}>
            <input
              className={styles.input}
              type="text"
              placeholder="Search City"
              value={cityNameInput}
              onChange={(e) => setCityNameInput(e.target.value)}
            />
            <button onClick={handleSearch} className={styles.btn}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.weatherList}>
              {weatherList.map((weather, index) => (
                <div key={index} className={styles.weatherInfo}>
                  <div className={styles.weatherHeader}>
                    <h4 className={styles.cityName}>{weather.cityName}</h4>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(weather.cityName)}>
                      <FontAwesomeIcon style={{
                        filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.38))'
                      }} icon={faTrash} />
                    </button>
                  </div>
                  <p className={styles.description}>{capitalizeFirstLetter(weather.description)}</p>
                  <p className={styles.tempMin}>Min: {weather.tempMin}°C</p>
                  <p className={styles.tempMax}>Max: {weather.tempMax}°C</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
