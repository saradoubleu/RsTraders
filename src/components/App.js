import React, { Component } from 'react';
import {Router, Link} from "@reach/router"
//import components
import Home from "./Home/Home.jsx"
import Login from "./Login/Login.jsx"
import Register from "./Register/Register.jsx"
import NavBar from "./NavBar/NavBar.jsx"
import Charts from "./Chart/Charts.jsx"
import Crypto from "./CryptoAPI/Crypto.jsx"
import Favourites from "./Favourites/Favourites.jsx"
import Profile from "./Profile/Profile.jsx";
import Stripe from "./Stripe/Stripe.jsx"
import UserSettings from "./UserSettings/UserSettings.jsx";
//import CSS
import './App.css'; 

class App extends Component {
  render() {
    return (
      <div className="App">
      <NavBar />
        <Router>
          <Charts path="/chart" />
          <Home path="/" />
          <Login path="login" />
          <Register path="register" />
          <Favourites path="favourites" />
          <Profile path="profile" />
          <Stripe path="stripe" />
          <UserSettings path="usersettings" />
        </Router>
      </div>
    );
  }
}

export default App;
