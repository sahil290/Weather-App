import React, { useState, useEffect } from "react";
const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const search = (evt) => {
    if (evt.key === "Enter") {
       fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&unit=metrics&appid=ad23c51b9cd73b5d4dd20f555b6664d4`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setWeather(result);
          setQuery("");
        });
    } 
  };

  const [currentTime, setTime] = useState(new Date().toLocaleString());
  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);
  });
  return (
    <div
      className=
        {(typeof weather.main != "undefined")
          ?((weather.main.temp > 20)
            ? "app warm"
            : "app")
        : "app"
          }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>
              <div className="date">{currentTime}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default App;
