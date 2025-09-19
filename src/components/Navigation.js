// src/components/Navigation.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/elements.css';

function Navigation({ user, canWrite }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      navigate('/auth');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getUserDisplayName = () => {
    if (!user) return 'Guest';
    if (user.isAnonymous) return 'Anonymous User';
    return user.email || user.displayName || 'User';
  };

  const getUserRole = () => {
    if (!user) return '';
    return user.isAnonymous ? '(Read Only)' : '(Full Access)';
  };

  return (
    <nav className="brutal-navbar">
      <div className="brutal-navbar-brand">
        <Link to="/" className="brutal-navbar-logo">
          👌
        </Link>
      </div>
      
      <div className="brutal-navbar-center">
        <div className="brutal-navbar-links">
          <Link to="/" className="brutal-navbar-link">
            HOME
          </Link>
          {canWrite && (
            <Link to="/create" className="brutal-navbar-link">
              CREATE
            </Link>
          )}
        </div>
      </div>

      <div className="brutal-navbar-end">
        <div className="brutal-user-info">
          <span className="brutal-user-name">
            {getUserDisplayName()}
          </span>
          <span className="brutal-user-role">
            {getUserRole()}
          </span>
        </div>
        <button 
          onClick={handleLogout}
          className="brutal-btn brutal-btn-danger brutal-btn-sm"
        >
          LOGOUT
        </button>
      </div>
    </nav>
  );
}

export default Navigation;