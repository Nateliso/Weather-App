import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const apiKey = '10be16aa546b9453bdd820e626c3a630';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather({
        city: data.name,
        temp: data.main.temp,
        condition: data.weather[0].main
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="App">
      <h1>Weather</h1>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={getWeather}>Get Forcast</button>
      {weather && (
        <div className="weather">
          <h2>Current Weather</h2>
          <div className="weather-item">
            <span className="label">City:</span>
            <span className="value">{weather.city}</span>
          </div>
          <div className="weather-item">
            <span className="label">Temperature:</span>
            <span className="value">{weather.temp}°C</span>
          </div>
          <div className="weather-item">
            <span className="label">Condition:</span>
            <span className="value">{weather.condition}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App
