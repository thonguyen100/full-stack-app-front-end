import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import api from '../client';
import '../styles/elements.css';

function Create({ user }) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // Check if user can write
  const canWrite = user && !user.isAnonymous;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!canWrite) {
      setError('You need to be logged in with an email account to create students.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/add_user', values);
      console.log('Student added:', response.data);
      navigate('/');
    } catch (err) {
      console.error('Add student error:', err);
      setError(err.response?.data?.message || 'Failed to add student');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (error) setError('');
  };

  // Show access denied if user can't write
  if (!canWrite) {
    return (
      <div>
        <Navigation user={user} canWrite={canWrite} />
        <div className="brutal-container">
          <div className="brutal-content">
            <div className="brutal-alert brutal-alert-danger">
              <h2>ACCESS DENIED</h2>
              <p>You need to be logged in with an email account to create students.</p>
              <Link to="/auth" className="brutal-btn brutal-btn-primary" style={{ marginRight: '16px' }}>
                Sign Up / Login
              </Link>
              <Link to="/" className="brutal-btn brutal-btn-light">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation user={user} canWrite={canWrite} />
      
      <div className="brutal-container">
        <div className="brutal-content">
          <div className="brutal-header">
            <h1 className="brutal-title" data-text="Add Student">
              Add Student
            </h1>
            <Link to="/" className="brutal-btn brutal-btn-light">
              Home
            </Link>
          </div>

          {error && (
            <div className="brutal-alert brutal-alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="brutal-form">
            <div className="brutal-form-group">
              <label htmlFor="name" className="brutal-label">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                className="brutal-input"
                type="text"
                value={values.name}
                onChange={handleInputChange}
                disabled={loading}
                required
                placeholder="Enter student name"
              />
            </div>

            <div className="brutal-form-group">
              <label htmlFor="email" className="brutal-label">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                className="brutal-input"
                type="email"
                value={values.email}
                onChange={handleInputChange}
                disabled={loading}
                required
                placeholder="student@example.com"
              />
            </div>

            <div className="brutal-form-group">
              <label htmlFor="gender" className="brutal-label">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="brutal-select"
                value={values.gender}
                onChange={handleInputChange}
                disabled={loading}
                required
              >
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="brutal-form-group">
              <label htmlFor="age" className="brutal-label">
                Age
              </label>
              <input
                id="age"
                name="age"
                className="brutal-input"
                type="number"
                min="1"
                max="150"
                value={values.age}
                onChange={handleInputChange}
                disabled={loading}
                required
                placeholder="Enter age"
              />
            </div>

            <div className="brutal-form-group brutal-mt-4">
              <button
                type="submit"
                className="brutal-btn brutal-btn-success"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="brutal-spinner" style={{ width: '16px', height: '16px', display: 'inline-block', marginRight: '8px' }}></div>
                    Saving Student...
                  </>
                ) : (
                  'Save Student'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;