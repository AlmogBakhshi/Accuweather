import React from 'react'
import { observer, inject } from 'mobx-react'
import '../styles/Favorites.css';
import FavoriteCity from '../components/FavoriteCity';

const Favorites = (props) => {
    return (
        <div className={`favoritesPage`}>
            {localStorage.getItem('favorite') !== null &&
                JSON.parse(localStorage.getItem('favorite')).map(item => <FavoriteCity key={item.Key} city={item} />)}
        </div>
    );
}

export default inject('rootStore')(observer(Favorites));