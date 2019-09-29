import React from 'react';
import '../styles/TodayWeatherDetail.css'
import { WiCelsius } from "react-icons/wi";

const TodayWeatherDetail = ({ item }) => {

    const ConvertToC = temperature => {
        return Math.floor((temperature - 32) / 1.8);
    }

    const ConvertYearToDay = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let year = item.Date.slice(0, item.Date.indexOf('T'));
        let date = new Date(year);
        return days[date.getDay()]
    }

    return (
        <div className="todayWeatherDetail">
            <div>{ConvertYearToDay()}</div>
            <div className="todayWeatherDetailTemperature">
                {`${ConvertToC(item.Temperature.Minimum.Value)} - ${ConvertToC(item.Temperature.Maximum.Value)}`}
                <WiCelsius size='5vmin' />
            </div>
        </div>
    );
}

export default TodayWeatherDetail