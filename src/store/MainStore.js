import { decorate, observable, action, configure } from 'mobx'
import * as Keys from './Keys'

configure({ enforceActions: 'observed' });

class MainStore {
    selectedCity = null;
    selectedCityTemperature = null;
    selectedCityTemperature5Day = [];
    favorites = [];
    loading = false;

    setSelectedCity = city => {
        this.setLoading();
        this.selectedCity = city;
        this.getAsyncSelectedCityTemperatureDetails()
            .then(() => { this.setLoading(); this.getAsynceSelectedCityTemperature5DayDetails() })
    }

    setSelectedCityTemperature = value => {
        this.selectedCityTemperature = value
    }

    setSelectedCityTemperature5Day = value => {
        this.selectedCityTemperature5Day = value;
    }

    setFavorites = async value => {
        if (value !== null) this.favorites = value;
    }

    setLoading = () => {
        this.loading = !this.loading;
    }

    getAsyncSelectedCityTemperatureDetails = async () => {
        await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${this.selectedCity.Key}?apikey=${Keys.ApiKey}&language=${Keys.Language}`)
            .then(res => res.json())
            .then(res => this.setSelectedCityTemperature(res[0]))
            .catch(err => console.warn(err))
    }

    getAsynceSelectedCityTemperature5DayDetails = () => {
        fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.selectedCity.Key}?apikey=${Keys.ApiKey}&language=${Keys.Language}`)
            .then(res => res.json())
            .then(res => { this.setSelectedCityTemperature5Day(res.DailyForecasts) })
            .catch(err => console.warn(err))
    }

    getAsyncCityNameByGeoLocation = (Latitude, Longitude) => {
        fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${Keys.ApiKey}&q=${Latitude},${Longitude}&language=${Keys.Language}`)
            .then(res => res.json())
            .then(res => { this.setSelectedCity(res) })
            .catch(err => console.warn(err))
    }
}

decorate(MainStore, {
    selectedCity: observable,
    selectedCityTemperature: observable,
    selectedCityTemperature5Day: observable,
    favorites: observable,
    loading: observable,
    setSelectedCity: action,
    setSelectedCityTemperature: action,
    setSelectedCityTemperature5Day: action,
    setFavorites: action,
    setLoading: action,
    getAsyncSelectedCityTemperatureDetails: action,
    getAsynceSelectedCityTemperature5DayDetails: action
});

export default new MainStore()