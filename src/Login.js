// src/Login.js
import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInAnonymously } from 'firebase/auth';
import { auth } from './firebase';
import './styles/elements.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Log In</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default Login;
