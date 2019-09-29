import React, { useState, useEffect } from 'react'
import * as Keys from '../store/Keys'
import { WiCelsius } from "react-icons/wi";

const FavoriteCity = (props) => {
    const [getCityTemperatureDetails, setCityTemperatureDetails] = useState(null)

    useEffect(() => {
        fetch(`http://dataservice.accuweather.com/currentconditions/v1/${props.city.Key}?apikey=${Keys.ApiKey}&language=${Keys.Language}`)
            .then(res => res.json())
            .then(res => setCityTemperatureDetails(res[0]))
            .catch(err => console.warn(err))
    }, [])

    return (
        getCityTemperatureDetails !== null &&
        <div className='favoritesCity'>
            <div>
                <div>{props.city.LocalizedName}</div>
                {getCityTemperatureDetails.Temperature.Metric.Value}
                <WiCelsius size='5vmin' />
            </div>
            {getCityTemperatureDetails.WeatherText}
        </div>
    );
}

export default FavoriteCity;