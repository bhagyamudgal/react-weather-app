const getCordinates = require("./utils/getCordinates");
const getWeather = require("./utils/getWeather");
const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "You must provide a location.",
    });
  }

  getCordinates(req.query.location, (error, cordinatesData) => {
    if (error) {
      return res.send({ error });
    }

    const { latitude, longitude, location } = cordinatesData;

    getWeather(latitude, longitude, (error, weatherData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: weatherData,
        location: location,
        locationSearched: req.query.location,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
