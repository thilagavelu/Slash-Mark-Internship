import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";



const API_KEY = "7de62b6b4cfde40b9d99743550c2e134";

const WeatherApp = () => {
  const [city, setCity] = useState("Boston");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const fetchWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError("Error fetching weather data. Please check the city name or API key.");
    }
  };

  const handleSearch = () => {
    fetchWeather(city);
  };

  return (
    <div className="weather-container">
      <h1>Weather Forecast</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.city.name}, {weatherData.city.country}</h2>
          <p>Temperature: {weatherData.list[0].main.temp}°C</p>
          <p>Weather: {weatherData.list[0].weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
