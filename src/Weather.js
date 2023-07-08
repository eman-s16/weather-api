import React, { useState } from "react";
const API_KEY = "f593bc618e6e4c53a5f190329230807";
const Weather = () => {
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [condition, setCondition] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error.message);
        setTemperature("");
        setCondition("");
      } else {
        setError("");
        setTemperature(data.current.temp_c);
        setCondition(data.current.condition.text);
      }
    } catch (error) {
      setError("Error retrieving weather data. Please try again later.");
      setTemperature("");
      setCondition("");
    }
  };

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <h5>Done by Eman AL-Mandhari</h5>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error">{error}</p>}
      {temperature && condition && (
        <div>
          <p className="temp">
            Country: <span>{location}</span>
          </p>
          <p className="temp">
            Current temperature: <span>{temperature}°C</span>
          </p>
          <p className="temp">
            Condition: <span>{condition}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
