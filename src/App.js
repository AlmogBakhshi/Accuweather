import React from 'react';
import './App.css';
import { withRouter, Route } from "react-router-dom";
import NavBar from './components/NavBar'
import Main from './screens/Main'
import Favorites from './screens/Favorites'
import { geolocated } from "react-geolocated";

const App = (props) => {
  return (
    <React.Fragment>
      <NavBar {...props} />
      <Route exact path='/' render={() => <Main coords={props.coords} />} />
      <Route path='/Favorites' render={() => <Favorites />} />
    </React.Fragment>
  );
}

const AppWithGeoloc = geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(withRouter(App));

export default AppWithGeoloc;
