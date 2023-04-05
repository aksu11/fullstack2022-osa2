import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({city}) => {

  const [data, setData] = useState(null)

  useEffect(() => {
    const target = city[0].replace('ē', 'e')
    axios.get("http://api.weatherapi.com/v1/current.json?key="+process.env.REACT_APP_WEATHER_API+"&q="+target+"&aqi=no")
      .then((response)=>{
        setData(response.data)
      })
      .catch((error)=>{
        console.log(error)
      })
  }, [city])

  if (data === null) return null
  return (
    <div className='weather'>
      <h2>Weather in {city}</h2>
      <div>
        <img alt="weather-icon" src={data.current.condition.icon}></img>
      </div>
      <div>
        <b>Temperature:</b> {data.current.temp_c} Celsius <b>feels like:</b> {data.current.feelslike_c}
      </div>
      <div>
        <b>Wind: </b>{data.current.wind_kph} km/h <b>Direction:</b> {data.current.wind_dir}
      </div>
      <div>
        <b>humidity: </b>{data.current.humidity} % 
      </div>
      <div>
        <b>pressure: </b>{data.current.pressure_mb} mb 
      </div>
      <div>Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a></div> 
    </div>
  )
}

export default Weather