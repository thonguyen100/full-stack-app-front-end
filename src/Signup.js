// src/Signup.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import './styles/elements.css';

function Signup({ onShowLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate password confirmation
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long!');
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Account created successfully! You can now log in.');
      setError('');
      
      // Clear form
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

  return (
    <div className="brutal-container">
      <div className="brutal-content">
        <div className="brutal-header">
          <h1 className="brutal-title">SIGN UP</h1>
        </div>

        <div className="brutal-form">
          <form onSubmit={handleSignup}>
            <div className="brutal-form-group">
              <label className="brutal-label" htmlFor="signup-email">
                Email Address
              </label>
              <input
                id="signup-email"
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
              <label className="brutal-label" htmlFor="signup-password">
                Password
              </label>
              <input
                id="signup-password"
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
                disabled={loading || !email || !password || !confirmPassword}
              >
                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </button>
            </div>

            <div className="brutal-mt-4 brutal-text-center">
              <p style={{ marginBottom: '16px', fontWeight: '700' }}>
                ALREADY HAVE AN ACCOUNT?
              </p>
              <button
                type="button"
                className="brutal-btn brutal-btn-info"
                onClick={onShowLogin}
                disabled={loading}
              >
                BACK TO LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;