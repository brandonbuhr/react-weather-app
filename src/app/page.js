"use client";
import { useState } from "react";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "fcfafdc38749742de0009711d835be26";

  const getWeatherData = async (city, state) => {
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
      setError("Please enter a city, state, or country");
      setWeatherData(null);
    }
  };

  const displayWeatherInfo = (data) => {
    return (
      <div>
        <p>Location: {data.name}</p>
        <p>Temperature:  {(data.main.temp - 273.15).toFixed(0)} °C</p>
        <p>Feels Like:   {(data.main.feels_like - 273.15).toFixed(0)} °C</p>
        <p>Minimum Temp: {(data.main.temp_min - 273.15).toFixed(0)} °C</p>
        <p>Maximum Temp: {(data.main.temp_max - 273.15).toFixed(0)} °C</p>
        <p>Humidity: {data.main.humidity} %</p>
        <p>Wind Speed: {data.wind.speed} m/s</p>
        <p>Conditions:   {data.weather[0].description}</p>
      </div>
    );
  };

  return (
    <div>
      <form className="weatherForm" onSubmit={handleSubmit}>
        <input type="text" name="city" className="cityInput" placeholder="Enter city, state, or country" />
        <button type="submit">Submit</button>
      </form>

      <div className="card">
        <h1>Weather App</h1>
       <img src= "https://basmilius.github.io/weather-icons/production/fill/all/overcast-day.svg" />
        {error && (
          <p className="errorDisplay">{error}</p>
        )}
        {weatherData && displayWeatherInfo(weatherData)}
      </div>
    </div>
  );
}