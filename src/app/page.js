"use client";
import { useState } from "react";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "fcfafdc38749742de0009711d835be26";

  const getWeatherData = async (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Could not fetch weather data");
    } else {
      return await response.json();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const city = event.target.city.value;
    if (city) {
      try {
        const data = await getWeatherData(city);
        setWeatherData(data);
        setError(null);
      } catch (error) {
        console.error(error);
        setWeatherData(null);
        setError(error.message);
      }
    } else {
      setError("Please enter a city");
      setWeatherData(null);
    }
  };

  const displayWeatherInfo = (data) => {
    return (
      <div>
        <h2>Weather in {data.name}</h2>
        <p>Temperature: {(data.main.temp - 273.15).toFixed(2)} °C</p>
        <p>Feels Like: {(data.main.feels_like - 273.15).toFixed(2)} °C</p>
        <p>Conditions: {data.weather[0].description}</p>
      </div>
    );
  };

  return (
    <div>
      <form className="weatherForm" onSubmit={handleSubmit}>
        <input type="text" name="city" className="cityInput" placeholder="Enter city" />
        <button type="submit">Submit</button>
      </form>

      <div className="card">
        {error && (
          <p className="errorDisplay">{error}</p>
        )}
        {weatherData && displayWeatherInfo(weatherData)}
      </div>
    </div>
  );
}