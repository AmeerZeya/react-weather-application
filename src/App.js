import React, { useState , useEffect} from "react";

const api = {
  key: "d788055f7d1ffc45d7f68a0e8dc15a20",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(function(){
      fetch(`${api.base}weather?q=puducherry&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
          console.log(result.rain);
        });
  },[])

  const search = (evt) => {
    if (evt.key == "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
          console.log(result.rain);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp < 16
            ? typeof weather.rain != "undefined"
              ? "app rain"
              : typeof weather.snow != "undefined"
              ? "app snow"
              : "app cold"
            : "app warm"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name} , {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°</div>
              <div className="weather">
                <h1>
                  {weather.weather[0].description.charAt(0).toUpperCase() +
                    weather.weather[0].description.slice(1)}
                </h1>
              </div>
              <div className="weather">
                <h2>Humidity : {weather.main.humidity}</h2>
              </div>
              <div className="weather">
                <h3>Pressure : {weather.main.pressure}</h3>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="location-box">
              <div className="location">Region not found</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
