import { decorate, observable, action, configure } from 'mobx'
import * as Keys from './Keys'

configure({ enforceActions: "observed" });

class CitySearchStore {
    searchText = '';
    autoComplete = [];

    setSearchText = value => {
        this.searchText = value;
        value.trim() === '' ? this.setAutoComplete([]) :
            fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${Keys.ApiKey}&q=${value}&language=${Keys.Language}`)
                .then(res => res.json())
                .then(res => { this.setAutoComplete(res) })
                .catch(err => console.warn(err))
    }

    setAutoComplete = value => {
        this.autoComplete = value;
    }

    setSelectedCityText = value => {
        this.searchText = value;
        this.setAutoComplete([]);
    }
}

decorate(CitySearchStore, {
    searchText: observable,
    autoComplete: observable,
    setSearchText: action,
    setAutoComplete: action,
    setSelectedCityText: action,
});

export default new CitySearchStore()