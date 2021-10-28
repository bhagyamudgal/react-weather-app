import React, { useRef, useState } from "react";
import Layout from "./components/layout/Layout";

function App() {
  const locationRef = useRef("");
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [icon, setIcon] = useState("");
  const [temperature, setTemperature] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setloading] = useState(false);

  function searchHandler(e) {
    e.preventDefault();
    const location = locationRef.current.value;
    locationRef.current.value = "";
    setloading(true);
    fetch(`/weather?location=${location}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setLocation("");
          setError(true);
          setErrorMsg(data.error);
        } else {
          setError(false);
          setErrorMsg("");
          setLocation(data.location);
          console.log(data.forecast);
          setIcon(
            `http://openweathermap.org/img/wn/${data.forecast.weather_icon}@4x.png`
          );
          setTemperature(parseInt(data.forecast.temperature));
          setWeather(data.forecast.weather);
        }
        setloading(false);
      });
  }

  return (
    <div className="App">
      <div className="">
        <Layout>
          <div className="container">
            <div className="bg-blue-400 bg-opacity-20 text-lg text-black rounded py-10 px-5 mt-10 mx-4 sm:mx-7">
              <form
                className="flex flex-col items-center justify-between sm:flex-row"
                onSubmit={searchHandler}
              >
                <input
                  type="text"
                  placeholder="Enter Location to Search"
                  className="p-5 rounded w-4/5 outline-none focus:ring-2 focus:ring-blue-400 font-mono mb-4 sm:w-3/5 sm:mb-0"
                  ref={locationRef}
                />
                <button
                  className="p-3 bg-blue-400 text-white rounded hover:bg-blue-500 font-medium text-xl font-mono w-4/5 sm:w-1/5"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
            {!error && loading && (
              <div className="p-10 mt-5 rounded mx-4 flex justify-center sm:mx-7">
                <span className="text-4xl text-mono text-semibold text-blue-600">
                  Loading...
                </span>
              </div>
            )}
            {error && (
              <div className="p-10 mt-5 rounded mx-4 flex justify-center sm:mx-7">
                <span className="text-4xl text-mono text-semibold text-red-600 text-center">
                  {errorMsg}
                </span>
              </div>
            )}
            {!error && !loading && icon !== "" && temperature !== "" && (
              <div className="bg-blue-400 bg-opacity-20 text-lg text-black rounded p-10 mt-10 flex flex-col items-center mx-4 select-none sm:mx-7 mb-12">
                <p className="text-3xl font-mono font-semibold p-2 text-center">
                  {location}
                </p>

                <div className="container flex flex-col items-center justify-between max-w-lg sm:flex-row sm:p-10">
                  {icon !== "" && <img src={icon} alt="weather-icon" />}
                  {temperature !== "" && (
                    <span className="text-3xl font-mono font-semibold p-5">
                      {temperature} °C
                    </span>
                  )}
                </div>
                <div className="">
                  {weather !== "" && (
                    <span className="text-3xl font-mono font-semibold p-10">
                      {weather}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </Layout>
      </div>
    </div>
  );
}

export default App;
