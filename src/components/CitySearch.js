import React from 'react'
import { observer, inject } from 'mobx-react'
import '../styles/AutoComplete.css'
import { FaSearch } from "react-icons/fa";

const CitySearch = (props) => {
    const { citySearchStore } = props.rootStore;

    const HandleSelectedCity = city => {
        citySearchStore.setSelectedCityText(city.LocalizedName);
        props.rootStore.mainStore.setSelectedCity(city);
    }

    const RenderAutoComplete = () => {
        return (
            <ul className="autoCompleteFilterCities">
                {citySearchStore.autoComplete.map(item =>
                    <li key={item.Key} className="autoCompleteFilterCity"
                        onClick={() => HandleSelectedCity(item)}>
                        {item.LocalizedName}
                    </li>)}
            </ul>
        )
    }

    return (
        <div style={{ flex: 1 }}>
            <div className="autoCompleteForm" >
                <span className="autoCompleteSearchButton" ><FaSearch color='black' /></span>
                <input type='text' placeholder='search' className="autoCompleteSearch"
                    value={citySearchStore.searchText}
                    onChange={e => citySearchStore.setSearchText(e.target.value)} />
            </div>
            {RenderAutoComplete()}
        </div>
    );
}

export default inject('rootStore')(observer(CitySearch));