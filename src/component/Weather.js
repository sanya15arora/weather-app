import React, {useState, useEffect} from 'react'
import DayWise from "./DayWise"
import "./style.css"

const Weather = () => {

    const [city, setCity] = useState("delhi")
    const [tempInfo, setTempInfo] = useState([])
    const [searchedCity, setSearchedCity] = useState("DELHI,IN")
    const [cod, setCod] = useState("200")
    const getWeatherInfo = async () => {

        try {
            let url = `https://api.openweathermap.org/data/2.5/forecast?id=524901&q=${city}&cnt=5&units=metric&appid=35974e1311a78db0fd3d7ad31a7d7189`
            let res = await fetch(url)
            let data = await res.json()

            if (city === "") {
                setCod("404")
            } else if (data.cod === "200") {

                let tempArray = []

                let {name, country, sunset} = data.city

                setCod(data.cod)
                setSearchedCity(name + " , " + country)
                for (let i = 0; i < data.cnt; i++) {

                    let dt = data.list[i].dt
                    let weatherType = data.list[i].weather[0].main
                    let {temp, humidity, pressure} = data.list[i].main
                    let {speed} = data.list[i].wind


                    const currentTempInfo = {
                        dt,
                        weatherType,
                        temp,
                        humidity,
                        pressure,
                        speed,
                        sunset
                    }
                    tempArray.push(currentTempInfo)
                }

                setTempInfo(tempArray)
                // console.log(tempInfo)
            } else if (data.cod === "404") {
                setCod(data.cod)
            }


        } catch (error) {
        }
    }


    useEffect(() => {
        getWeatherInfo()
    }, [])

    return (
        <>


            <div className="wrap">
                <div className="search">

                    <input className="serachTerm" placeholder='search city here...' type='search'
                           value={city}
                           onChange={(e) => setCity(e.target.value)}/>

                    <button className="searchButton" onClick={getWeatherInfo}> Search <i className="fas fa-search"></i>
                    </button>

                </div>
            </div>


            <DayWise tempInfo={tempInfo} cod={cod} searchedCity={searchedCity}/>

        </>
    )
}

export default Weather
