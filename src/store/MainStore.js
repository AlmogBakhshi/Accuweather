import { decorate, observable, action, configure } from 'mobx'
import * as Keys from './Keys'

configure({ enforceActions: 'observed' });

class MainStore {
    selectedCity = null;
    selectedCityTemperature = null;
    selectedCityTemperature5Day = []

    setSelectedCity = city => {
        this.selectedCity = city;
        this.getAsyncSelectedCityTemperatureDetails()
            .then(() => { this.getAsynceSelectedCityTemperature5DayDetails() })
    }

    setSelectedCityTemperature = value => {
        this.selectedCityTemperature = value
    }

    setSelectedCityTemperature5Day = value => {
        this.selectedCityTemperature5Day = value;
    }

    getAsyncSelectedCityTemperatureDetails = async () => {
        await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${this.selectedCity.Key}?apikey=${Keys.ApiKey}&language=${Keys.Language}`)
            .then(res => res.json())
            .then(res => this.setSelectedCityTemperature(res[0]))
            .catch(err => console.warn(err))
    }

    getAsynceSelectedCityTemperature5DayDetails = () => {
        fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.selectedCity.Key}?apikey=${Keys.ApiKey}&language=${Keys.Language}`)
            .then(res => res.json())
            .then(res => { this.setSelectedCityTemperature5Day(res.DailyForecasts) })
            .catch(err => console.warn(err))
    }

    getAsyncCityNameByGeoLocation = (Latitude, Longitude) => {
        fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${Keys.ApiKey}&q=${Latitude},${Longitude}&language=${Keys.Language}`)
            .then(res => res.json())
            .then(res => { this.setSelectedCity(res) })
            .catch(err => console.warn(err))
    }
}

decorate(MainStore, {
    selectedCity: observable,
    selectedCityTemperature: observable,
    selectedCityTemperature5Day: observable,
    setSelectedCity: action,
    setSelectedCityTemperature: action,
    setSelectedCityTemperature5Day: action,
    getAsyncSelectedCityTemperatureDetails: action,
    getAsynceSelectedCityTemperature5DayDetails: action
});

export default new MainStore()