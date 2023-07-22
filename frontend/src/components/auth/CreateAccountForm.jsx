import React, { useState } from 'react';
import './CreateAccountForm.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const CreateAccountForm = ({ onCreateForm }) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');

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
        fullName,
        username,
        email,
        dob,
        uid: user.uid
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  return (
    <div className="create-account-container">
      <div className="create-account-form-container">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
        <p>By signing up, you agree to our Terms and Privacy Policy.</p>
      </div>
    </div>
  );
};
export default CreateAccountForm;