// src/Login.js
import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInAnonymously } from 'firebase/auth';
import { auth } from './firebase';
import './styles/elements.css'; 

function Login({ onShowSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      await signInAnonymously(auth);
      console.log('Logged in anonymously');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="brutal-container">
      <div className="brutal-content">
        <div className="brutal-header">
          <h1 className="brutal-title">LOGIN</h1>
        </div>

        <div className="brutal-form">
          <form onSubmit={handleLogin}>
            <div className="brutal-form-group">
              <label className="brutal-label" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="brutal-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email..."
                required
                disabled={loading}
              />
            </div>

            <div className="brutal-form-group">
              <label className="brutal-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="brutal-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password..."
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="brutal-alert brutal-alert-danger">
                <strong>ERROR:</strong> {error}
              </div>
            )}

            <div className="brutal-btn-group">
              <button
                type="submit"
                className="brutal-btn brutal-btn-primary"
                disabled={loading || !email || !password}
              >
                {loading ? 'LOGGING IN...' : 'LOG IN'}
              </button>

              <button
                type="button"
                className="brutal-btn brutal-btn-warning"
                onClick={handleAnonymousLogin}
                disabled={loading}
              >
                {loading ? 'CONNECTING...' : 'GUEST LOGIN'}
              </button>
            </div>

            <div className="brutal-mt-4 brutal-text-center">
              <p style={{ marginBottom: '16px', fontWeight: '700' }}>
                DON'T HAVE AN ACCOUNT?
              </p>
              <button
                type="button"
                className="brutal-btn brutal-btn-success"
                onClick={onShowSignup}
                disabled={loading}
              >
                CREATE ACCOUNT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;