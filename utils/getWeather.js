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
      const temperature = response.main.temp;
      const percepetation = response.clouds.all;

      const output = `It is currently ${temperature} degree celcius out there. There is ${percepetation}% chance of rain.`;

      callback(null, output);
    }
  } catch (error) {
    callback("Unable to connect to weather service!", null);
  }
}

module.exports = getWeather;
