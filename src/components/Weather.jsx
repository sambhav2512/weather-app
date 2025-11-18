import React, {useEffect, useRef, useState} from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {
    
    const inputref= useRef()
    const [weatherData , setWeatherData] = useState(false);
    const search = async (city)=>{
        if(city===""){
            alert("Enter City Name");
            document.getElementById("input").value="";
            return;
        }
        try {
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
              alert(data.message);
              document.getElementById("input").value="";
              return;
            }

            setWeatherData({
                humidity : data.main.humidity,
                windSpeed : data.wind.speed,
                temp: Math.floor(data.main.temp),
                loc: data.name,
            })
        } catch (error) {
            
        }
    }

    useEffect(()=>{
      search("Delhi");
    } ,[])

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputref} type="text" placeholder='Search' id='input'/>
        <img src={search_icon } alt="" onClick={()=>search(inputref.current.value)}/>
      </div>
      <img src={clear_icon} alt="" className='weather-icon' />
      <p className='temp'>{weatherData.temp}*C</p>
      <p className='loc'>{weatherData.loc}</p>
      <div className="weather-data">
        <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
            </div> 
        </div>
        <div className="col">
            <img src={wind_icon} alt="" />
            <div>
                <p>{weatherData.windSpeed}km/h</p>
                <span>Wind</span>
            </div>
      </div>
    </div>
    </div>
  )
}

export default Weather
