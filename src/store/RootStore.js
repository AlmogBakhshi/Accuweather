import MainStore from './MainStore'
import FavoritesStore from './FavoritesStore'
import CitySearchStore from './CitySearchStore'

const RootStore = {
    mainStore: MainStore,
    favoritesStore: FavoritesStore,
    citySearchStore: CitySearchStore
}
export default RootStore;