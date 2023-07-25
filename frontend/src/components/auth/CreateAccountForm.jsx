import React, { useState } from 'react';
import './CreateAccountForm.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const CreateAccountForm = ({ onCreateForm }) => {
  const [Name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const setError = (message) => {
    setErrorMessage(message);
  };

  const handleClick = () => {
    onCreateForm();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const db = getFirestore();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('New user created:', user);
      const docRef = await addDoc(collection(db, "users"), {
        Name,
        username,
        email,
        dob,
        uid: user.uid
      });
      console.log("Document written with ID: ", docRef.id);
      setError("Created account successfully. Please Login.")
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        setError("User already exists. Please Login Instead.");
      } else {
        setError("An error occurred " + error.code);
      }
    }
  };
  return (
    <div className="create-account-container">
      <div className="create-account-form-container">
        <h2>Create Account</h2>
        {errorMessage && <div className="auth-error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
        <button onClick={handleClick} type="button">
          Log In
        </button>
        <p className='termsandconditionauth'>By signing up, you agree to our Terms and Privacy Policy.</p>
      </div>
    </div>
  );
};
export default CreateAccountForm;