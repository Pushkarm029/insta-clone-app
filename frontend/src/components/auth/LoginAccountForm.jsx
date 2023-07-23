import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./SignIn.css";
import { getAuth } from "firebase/auth";
import { useState } from "react";

export default function Login(props) {
    const { onCreateForm, onLogin } = props;
    const Auth = getAuth();
    const [loginBox, setLoginBox] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleCreateNewAccount = () => {
        onCreateForm();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(Auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                onLogin();
            })
            .catch((error) => {
                console.log(error);
                // if (error.code === "auth/user-not-found") {
                //   createUserWithEmailAndPassword(Auth, email, password)
                //     .then((userCredential) => {
                //       console.log(userCredential);
                //       onLogin();
                //     })
                //     .catch((error) => {
                //       console.log(error);
                //     });
                // } else {
                //   console.log(error);
                // }
            });
    };
    return (
        <div className="login-container">
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
                    <button type="submit">Log In</button>
                </form>
                <div className="signup-container">
                    <button onClick={handleCreateNewAccount} type="submit">Create New Account</button>
                </div>
            </div>
        </div>
    );
};