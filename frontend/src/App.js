import React, { useState, useEffect } from "react";
import "./App.css";
import SignIn from "./components/auth/SignIn";
import firebase from "./firebase";
import Navigator from "./navigator";
import { Provider } from 'react-redux';
import store from './components/redux/store';

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const handleLogin = () => {
    setIsLogged(true);
  };
  return (
    <Provider store={store}>
      <div className="App">
        {isLogged ? <Navigator /> : <SignIn onLogin={handleLogin}/>}
      </div>
    </Provider>
  );
}
