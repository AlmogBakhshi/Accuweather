import { decorate, action, configure } from 'mobx'
import * as Keys from './Keys';
configure({ enforceActions: "observed" });

class FavoritesStore {
    getAsyncCityTemperatureDetails = async (key) => {
        return await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${Keys.ApiKey}&language=${Keys.Language}`)
            .then(res => res.json())
            .then(res => res[0])
            .catch(err => console.warn(err))
    }
}

decorate(FavoritesStore, {
    getAsyncCityTemperatureDetails: action
});

export default new FavoritesStore()