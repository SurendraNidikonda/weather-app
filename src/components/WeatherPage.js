import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';




const WeatherPage = () => {
  const { cityId } = useParams();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=YOUR_API_KEY&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWeather();
  }, [cityId]);

  if (!weather) return <p>Loading weather...</p>;

  return (
    <div>
      <h1>Weather in {weather.name}</h1>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Weather: {weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
      <p>Pressure: {weather.main.pressure} hPa</p>
    </div>
  );
};

export default WeatherPage;
