import React from "react";
import "./SignIn.css";
import CreateAccountForm from './CreateAccountForm';
import { useState } from "react";
import LoginBox from './LoginAccountForm';

export default function SignIn({onLogin}) {
  const [loginBox, setLoginBox] = useState(true);
  const handleCreateNewAccount = () => {
    setLoginBox(!loginBox); // Set the loginBox state to false to show the CreateAccountForm
  }
  return (
    <div className="login-container">
      {loginBox ? <LoginBox onCreateForm={handleCreateNewAccount} onLogin={onLogin}/> : <CreateAccountForm onCreateForm={handleCreateNewAccount} />}
    </div>
  );
}