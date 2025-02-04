import axios from 'axios';
import React, { useState } from 'react'

export default function Weather() {
    const[city,setCity]=useState("");
    const[weatherData,setWeatherData]=useState(null)

    const API_KEY = "d65154eede7d2403fcbef41bab2b97bb";
    const handler=(e)=>
    {
        setCity(e.target.value);
    }
    const handlebutton=()=>
    {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then((response)=>setWeatherData(response.data))
        .catch((error)=>console.log("Error in fetching data"+error))
    }    
    return (
    <div>
        <input type="text"
         value={city}
         placeholder="enter city"
         onChange={handler}
         />   
      <button  onClick={handlebutton}>check Weather</button>
      <div>
        {
            weatherData && 
            (
                <div>
                <h2>Weather in {weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    </div>
            )
        }
      </div>
    </div>
  )
}
