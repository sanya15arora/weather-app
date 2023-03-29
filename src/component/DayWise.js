import React from 'react'

const DayWise = ({tempInfo, cod, searchedCity}) => {

    const getWeatherMood = (weathermood) => {

        switch (weathermood) {
            case "Clouds":
                return ("wi-day-cloudy")
            case "Haze":
                return ("wi-fog");
            case "Clear":
                return ("wi-day-sunny");
            case "Mist":
                return ("wi-dust");
            case "Rain":
                return ("wi-rain")
            case "Snow":
                return ("wi-snow")
            default:
                return ("wi-day-sunny");

        }
    }
    const changeDate = (dt, type) => {


        let sec = dt
        let date = new Date(sec * 1000)


        if (type === "gdate") {
            let dateNum = date.getDate()
            let month = date.getMonth()
            var options = {month: 'long'}
            let monthString = new Intl.DateTimeFormat('en-US', options).format(month)
            let day = date.getDay()
            options = {weekday: 'long'}
            let dayString = new Intl.DateTimeFormat('en-US', options).format(day)
            return (dayString + " , " + dateNum + " " + monthString)
        }
        if (type === "time") {
            let timeStr = `${date.getHours()}:${date.getMinutes()}`;
            return (timeStr)
        }


    }


    if (cod === "200") {

        return (
            <>

                <div className="city">
                    <p>{searchedCity}</p>
                </div>
                <section className="main-card--cointainer">


                    {tempInfo.map((curEle) => {
                            return (

                                <div className='card-container'>

                                    <div className="card ">
                                        <div className="card-body">

                                            <div className='dateInfo'>
                                                <p>{changeDate(curEle.dt, "gdate")}</p>
                                                <p>&nbsp;{changeDate(curEle.dt, "time")}</p>
                                            </div>


                                            <div className="temperature">
                                                <div>
                                                    <p>{curEle.temp}°C</p>
                                                </div>
                                            </div>


                                            <div className="weatherIcon">
                                                <i className={`wi ${getWeatherMood(curEle.weatherType)}`}> </i>
                                            </div>

                                            <div class="weatherCondition">
                                                <div>{curEle.weatherType}</div>
                                            </div>

                                            <div>
                                                <div>
                                                    <p>
                                                        <i className={"wi wi-humidity"}
                                                           style={{color: '#02adc4'}}></i> {curEle.humidity}% Humidity
                                                    </p>
                                                </div>

                                                <div>

                                                    <p>
                                                        <i className={"wi wi-rain"}
                                                           style={{color: '#02adc4'}}> </i> {curEle.pressure} Pressure
                                                    </p>
                                                </div>
                                                <div>
                                                    <p>
                                                        <i className={"wi wi-strong-wind"}
                                                           style={{color: '#02adc4'}}></i> {curEle.speed} Speed
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        }
                    )
                    }
                </section>
            </>
        )


    } else if (cod === "404") {
        return (
            <>
                <div className="city">
                    <p> Please enter valid city
                    </p>
                </div>
            </>
        )
    }
}

export default DayWise

