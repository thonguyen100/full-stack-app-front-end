import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from '../components/Navigation';
import api from '../client';
import Auth from '../Auth';
import '../styles/elements.css';

function Read({ user }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  
  // Check if user can write
  const canWrite = user && !user.isAnonymous;

  useEffect(() => {
    api.get(`/read/${id}`)
      .then((res) => {
        if (res.data) {
          setData(res.data);
        } else {
          setError("No data found for the provided student ID.");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load student data.");
      });
  }, [id]);

  // Show loading state while data is being fetched
  if (!data && !error) {
    return (
      <div>
        <Navigation user={user} canWrite={canWrite} />
        <div className="brutal-loading">
          <div className="brutal-spinner"></div>
        </div>
      </div>
    );
  }

  // Show error message if there's an issue fetching the data
  if (error) {
    return (
      <div>
        <Navigation user={user} canWrite={canWrite} />
        <div className="brutal-container">
          <div className="brutal-content">
            <div className="brutal-alert brutal-alert-danger">
              {error}
            </div>
            <Link to="/" className="brutal-btn brutal-btn-light">
              Back to Home
            </Link>
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
            <h1 className="brutal-title" data-text="Student Details">
              Student Details
            </h1>
            <div className="brutal-btn-group">
              <Link to="/" className="brutal-btn brutal-btn-light">
                Home
              </Link>
              {canWrite && (
                <Link to={`/edit/${data.id}`} className="brutal-btn brutal-btn-warning">
                  Edit
                </Link>
              )}
            </div>
          </div>

          {!canWrite && user?.isAnonymous && (
            <div className="brutal-alert brutal-alert-info">
              <strong>INFO:</strong> You're viewing as a guest (read-only access). 
              <Link to="/auth" style={{ color: 'inherit', textDecoration: 'underline', marginLeft: '8px' }}>
                Sign up with email
              </Link> to edit students.
            </div>
          )}

          <div className="brutal-card">
            <div className="brutal-card-header">
              <h2 className="brutal-card-title">
                #{data.id} - {data.name}
              </h2>
            </div>
            
            <ul className="brutal-list">
              <li className="brutal-list-item">
                <strong>Student ID:</strong> #{data.id}
              </li>
              <li className="brutal-list-item">
                <strong>Full Name:</strong> {data.name}
              </li>
              <li className="brutal-list-item">
                <strong>Email Address:</strong> {data.email}
              </li>
              <li className="brutal-list-item">
                <strong>Age:</strong> {data.age} years old
              </li>
              <li className="brutal-list-item">
                <strong>Gender:</strong> 
                <span
                  className={`brutal-badge ${
                    data.gender === 'Male'
                      ? 'brutal-badge-male'
                      : data.gender === 'Female'
                      ? 'brutal-badge-female'
                      : 'brutal-badge-other'
                  }`}
                  style={{ marginLeft: '12px' }}
                >
                  {data.gender}
                </span>
              </li>
            </ul>
          </div>

          <div className="brutal-btn-group brutal-mt-4">
            <Link to="/" className="brutal-btn brutal-btn-primary">
              All Students
            </Link>
            {canWrite ? (
              <>
                <Link to={`/edit/${data.id}`} className="brutal-btn brutal-btn-warning">
                  Edit Student
                </Link>
                <Link to="/create" className="brutal-btn brutal-btn-success">
                  Add New Student
                </Link>
              </>
            ) : (
              <span style={{ 
                padding: '16px 24px',
                border: '4px solid #ccc',
                background: '#f5f5f5',
                color: '#666',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.9rem',
                fontWeight: '700',
                textTransform: 'uppercase'
              }}>
                READ ONLY ACCESS
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Read;