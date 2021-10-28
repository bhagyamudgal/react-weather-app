const fetch = require("node-fetch");
require("dotenv").config();

async function getWeather(
  latitude = undefined,
  longitude = undefined,
  callback
) {
  const open_weather_api_key = process.env.open_weather_api_key;

  const open_weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=en&appid=${open_weather_api_key}`;

  try {
    const weather = await fetch(open_weather_url);

    let response = await weather.json();

    if (response.cod !== 200) {
      callback(response.message, null);
    } else {
      const output = {
        weather: response.weather[0].main,
        weather_icon: response.weather[0].icon,
        temperature: response.main.temp,
        temperature_min: response.main.temp_min,
        temperature_max: response.main.temp_max,
        percepetation: response.clouds.all,
        pressure: response.main.pressure,
        humidity: response.main.humidity,
        visibility: response.main.visibility,
        wind: response.wind.speed,
        wind_deg: response.wind.deg,
      };
      // const output = response;

      callback(null, output);
    }
  } catch (error) {
    callback("Unable to connect to weather service!", null);
  }
}

module.exports = getWeather;
