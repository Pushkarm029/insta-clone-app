import React from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import CreateAccountForm from './CreateAccountForm';
import './SignIn.css';

const Login = ({ onLogin }) => {
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch({ type: 'SET_EMAIL', payload: email });
  };

  const Auth = getAuth();
  const [loginBox, setLoginBox] = useState(true);
  const [email, setEmail] = useState("");
  const userEmail = useSelector((state) => state.user.userEmail);
  const [password, setPassword] = useState("");

  const handleCreateNewAccount = () => {
    setLoginBox(!loginBox); // Set the loginBox state to false to show the CreateAccountForm
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(Auth, email, password)
      .then((userCredential) => {
        // console.log(userCredential);
        onLogin();
      })
      .catch((error) => {console.log(error)});
  };

  
  const LoginBox = () => (
    <div className="login-box">
      <div className="login-header">
        <img src="https://i.imgur.com/MOv9vX3.png" alt="Insta-Clone" />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignIn} type="submit">Log In</button>
      </form>
      <div className="signup-container">
        <button onClick={handleCreateNewAccount} type="submit">Create New Account</button>
      </div>
    </div>
  );

  return (
    <div className="login-container">
      {loginBox ? <LoginBox /> : <CreateAccountForm onCreateForm={handleCreateNewAccount}/>}
    </div>
  );
};

export default Login;
