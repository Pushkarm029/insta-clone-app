import React, { useState, useEffect } from "react";
import "./App.css";
import SignIn from "./components/auth/SignIn";
import firebase from "./firebase";
import Navigator from "./navigator";

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const handleLogin = () => {
    setIsLogged(true);
  };

  // useEffect(() => {
  //   setIsLogged(localStorage.getItem("isLoggedIn") === "true");
  //   setLoading(false);
  // }, []);

  return (
    <div className="App">
      {isLogged ? <Navigator /> : <SignIn onLogin={handleLogin}/>}
    </div>
  );
}
