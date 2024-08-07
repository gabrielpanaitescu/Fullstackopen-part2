import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ capital, coords }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherImgURL, setWeatherImgURL] = useState(null);
  const lat = coords[0];
  const lon = coords[1];
  const APIkey = import.meta.env.VITE_OPEN_WEATHER_KEY;
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`
      )
      .then((response) => {
        setWeatherData(response.data);
        console.log(response.data);
      });
  }, [coords]);

  if (weatherData === null) return null;

  const iconCode = weatherData.weather[0].icon;
  const weatherDescription = weatherData.weather[0].description;

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {weatherData.main.temp} Celcius</p>

      <div>
        {weatherDescription}
        <img
          src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
          alt="WIP"
        />
      </div>

      <p>wind {weatherData.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
