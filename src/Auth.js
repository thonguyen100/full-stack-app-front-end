// src/Auth.js (or you can put this directly in App.js)
import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import { auth } from './firebase';
import './styles/elements.css';

function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long!');
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Account created successfully! You can now log in.');
      setError('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message);
      setSuccess('');
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

  const switchMode = () => {
    setIsSignup(!isSignup);
    setError('');
    setSuccess('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="brutal-container">
      <div className="brutal-content">
        <div className="brutal-header">
          <h1 className="brutal-title">{isSignup ? 'SIGN UP' : 'LOGIN'}</h1>
        </div>

        <div className="brutal-form">
          <form onSubmit={isSignup ? handleSignup : handleLogin}>
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
                minLength={6}
              />
            </div>

            {isSignup && (
              <div className="brutal-form-group">
                <label className="brutal-label" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className="brutal-input"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password..."
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>
            )}

            {error && (
              <div className="brutal-alert brutal-alert-danger">
                <strong>ERROR:</strong> {error}
              </div>
            )}

            {success && (
              <div className="brutal-alert brutal-alert-success">
                <strong>SUCCESS:</strong> {success}
              </div>
            )}

            <div className="brutal-btn-group">
              <button
                type="submit"
                className="brutal-btn brutal-btn-primary"
                disabled={loading || !email || !password || (isSignup && !confirmPassword)}
              >
                {loading 
                  ? (isSignup ? 'CREATING ACCOUNT...' : 'LOGGING IN...') 
                  : (isSignup ? 'CREATE ACCOUNT' : 'LOG IN')
                }
              </button>

              {!isSignup && (
                <button
                  type="button"
                  className="brutal-btn brutal-btn-warning"
                  onClick={handleAnonymousLogin}
                  disabled={loading}
                >
                  {loading ? 'CONNECTING...' : 'GUEST LOGIN'}
                </button>
              )}
            </div>

            <div className="brutal-mt-4 brutal-text-center">
              <p style={{ marginBottom: '16px', fontWeight: '700' }}>
                {isSignup ? "ALREADY HAVE AN ACCOUNT?" : "DON'T HAVE AN ACCOUNT?"}
              </p>
              <button
                type="button"
                className={`brutal-btn ${isSignup ? 'brutal-btn-info' : 'brutal-btn-success'}`}
                onClick={switchMode}
                disabled={loading}
              >
                {isSignup ? 'BACK TO LOGIN' : 'CREATE ACCOUNT'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;