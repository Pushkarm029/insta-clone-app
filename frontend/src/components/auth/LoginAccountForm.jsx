import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./SignIn.css";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

export default function Login(props) {
    const { onCreateForm, onLogin } = props;
    const Auth = getAuth();
    const [email, setEmail] = useState("");
    const userEmail = useSelector((state) => state.user.userEmail);
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const handleSignIn = () => {
        dispatch({ type: 'SET_EMAIL', payload: email });
    };
    const setError = (message) => {
        setErrorMessage(message);
    };

    const handleCreateNewAccount = () => {
        onCreateForm();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(Auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                onLogin();
                handleSignIn();
            })
            .catch((error) => {
                console.log(error);
                if (error.code === "auth/user-not-found") {
                    setError("User not found. Please create a new account.");
                } else if (error.code === "auth/wrong-password") {
                    setError("Wrong password. Please try again.");
                }
                else {
                    setError("An error occurred " + error.code);
                }
            });
    };
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <img src="https://i.imgur.com/MOv9vX3.png" alt="Insta-Clone" />
                </div>
                {errorMessage && <div className="auth-error-message">
                    <p className="auth-error-text">{errorMessage}</p>
                </div>}
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
                    <button type="submit">Log In</button>
                </form>
                <div className="signup-container">
                    <button onClick={handleCreateNewAccount} type="submit">Create New Account</button>
                </div>
            </div>
        </div>
    );
};