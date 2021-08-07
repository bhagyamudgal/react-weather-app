const fetch = require("node-fetch");
require("dotenv").config();

async function getCordinates(address = undefined, callback) {
  const map_box_api_key = process.env.map_box_api_key;

  const map_box_url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
    encodeURIComponent(address) +
    `.json?limit=1&access_token=${map_box_api_key}`;

  try {
    const cordinates = await fetch(map_box_url);

    let response = await cordinates.json();

    if (response.features.length === 0) {
      callback(
        "Unable to find location. Try searching another location.",
        null
      );
    } else {
      const latitude = response.features[0].center[1];
      const longitude = response.features[0].center[0];
      const location = response.features[0].place_name;

      callback(null, {
        latitude: latitude,
        longitude: longitude,
        location: location,
      });
    }
  } catch (error) {
    callback("Unable to connect to mapbox geocoding service!", null);
  }
}

module.exports = getCordinates;
