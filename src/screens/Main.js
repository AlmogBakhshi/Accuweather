import React, { useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import '../styles/Main.css'
import CitySearch from '../components/CitySearch'
import TodayWeatherDetail from '../components/TodayWeatherDetail'
import { WiCelsius } from "react-icons/wi";
import { MdFavoriteBorder } from "react-icons/md";

const Main = (props) => {
    const { mainStore } = props.rootStore;

    useEffect(() => {
        if (props.coords !== null) {
            mainStore.getAsyncCityNameByGeoLocation(props.coords.latitude, props.coords.longitude);
            props.rootStore.citySearchStore.setSearchText('');
        }
    }, [props.coords])

    const HandleAddToFavorite = async () => {
        const favorite = await localStorage.getItem('favorite')
        if (favorite === null)
            localStorage.setItem('favorite', JSON.stringify([mainStore.selectedCity]))
        else if (!favorite.includes(JSON.stringify(mainStore.selectedCity)))
            localStorage.setItem('favorite', JSON.stringify([...(JSON.parse(favorite)), mainStore.selectedCity]))
    }

    return (
        <div id='page' className='mainPage'>
            <div className="mainSearch">
                <CitySearch />
            </div>
            {mainStore.selectedCityTemperature !== null &&
                <div className="mainWeatherDetails">
                    <div className="mainWeatherDetailsHeader">
                        <div className="mainFontSize">
                            <div>{mainStore.selectedCity.LocalizedName}</div>
                            {mainStore.selectedCityTemperature.Temperature.Metric.Value}<WiCelsius size='5vmin' />
                        </div>
                        <div onClick={HandleAddToFavorite} className="mainAddToFavorite" >
                            <MdFavoriteBorder size='5vmin' />
                            <div className="mainAddToFavoriteButton">Add to Favorites</div>
                        </div>
                    </div>
                    <div className="mainWeatherDetailsCenter">{mainStore.selectedCityTemperature.WeatherText}</div>
                    <div className="mainWeatherDetailsBottom">
                        {mainStore.selectedCityTemperature5Day.map((item, index) => <TodayWeatherDetail key={index} item={item} />)}
                    </div>
                </div>}
        </div>
    );
}

export default inject('rootStore')(observer(Main));