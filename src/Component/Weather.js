import axios from 'axios';
import React, { useState } from 'react';
import './Weather.css';  
export default function Weather() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const API_KEY = "d65154eede7d2403fcbef41bab2b97bb";

    const handler = (e) => {
        setCity(e.target.value);
    };

    const handlebutton = () => {
        if (city === "") {
            setError("Please enter a city.");
            return;
        }
        setError(null);  // Reset error message if any
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then((response) => setWeatherData(response.data))
            .catch((error) => setError("Error in fetching data"));
    };

    return (
        <div className="weather-container">
            <input 
                type="text"
                value={city}
                placeholder="Enter city"
                onChange={handler}
            />
            <button onClick={handlebutton}>Check Weather</button>
            {error && <p className="error">{error}</p>}
            <div className="weather-info">
                {weatherData && (
                    <div>
                        <h2>Weather in {weatherData.name}</h2>
                        <p>Temperature: {weatherData.main.temp}°C</p>
                        <p>Weather: {weatherData.weather[0].description}</p>
                        <p>Humidity: {weatherData.main.humidity}%</p>
                    </div>
                )}
            </div>
        </div>
    );
}
