import React, { useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import '../styles/Main.css'
import CitySearch from '../components/CitySearch'
import TodayWeatherDetail from '../components/TodayWeatherDetail'
import { WiCelsius } from "react-icons/wi";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { Spin } from "react-loading-io";

const Main = (props) => {
    const { mainStore } = props.rootStore;

    useEffect(() => {
        mainStore.setFavorites(JSON.parse(localStorage.getItem('favorite')))
    }, [])

    useEffect(() => {
        if (props.coords !== null) {
            mainStore.getAsyncCityNameByGeoLocation(props.coords.latitude, props.coords.longitude);
            props.rootStore.citySearchStore.setSearchText('');
        }
    }, [props.coords])

    const HandleAddToFavorite = () => {
        mainStore.setFavorites([...mainStore.favorites, mainStore.selectedCity]).then(() => {
            localStorage.setItem('favorite', JSON.stringify(mainStore.favorites));
        })
    }

    const HandleRemoveFromFavorite = () => {
        mainStore.setFavorites(mainStore.favorites.filter(city => JSON.stringify(city) !== JSON.stringify(mainStore.selectedCity)))
            .then(() => {
                localStorage.setItem('favorite', JSON.stringify(mainStore.favorites));
            })
    }

    const HandleAddOrRemoveFavorite = () => {
        return (
            (mainStore.favorites.length > 0 && JSON.stringify(mainStore.favorites).includes(JSON.stringify(mainStore.selectedCity)) &&
                <div onClick={HandleRemoveFromFavorite} className="mainAddToFavorite" >
                    <MdFavorite size='5vmin' />
                    <div className="mainAddToFavoriteButton">Remove from Favorites</div>
                </div>) ||
            <div onClick={HandleAddToFavorite} className="mainAddToFavorite" >
                <MdFavoriteBorder size='5vmin' />
                <div className="mainAddToFavoriteButton">Add to Favorites</div>
            </div>
        )

    }

    return (
        <div className='mainPage'>
            <div className="mainSearch">
                <CitySearch />
            </div>
            {mainStore.loading && <Spin size={60} color='grey' style={{ position: 'absolute', top: '50%' }} />}
            {!mainStore.loading && mainStore.selectedCityTemperature !== null &&
                <div className="mainWeatherDetails">
                    <div className="mainWeatherDetailsHeader">
                        <div className="mainFontSize">
                            <div>{mainStore.selectedCity.LocalizedName}</div>
                            {mainStore.selectedCityTemperature.Temperature.Metric.Value}<WiCelsius size='5vmin' />
                        </div>
                        {HandleAddOrRemoveFavorite()}
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