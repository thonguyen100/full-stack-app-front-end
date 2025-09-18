import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from '../client';
// import './elements.css';
import 'client\src\styles\elements.css'; 

function Read() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

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
      <div className="brutal-loading">
        <div className="brutal-spinner"></div>
      </div>
    );
  }

  // Show error message if there's an issue fetching the data
  if (error) {
    return (
      <div className="brutal-container">
        <div className="brutal-content">
          <div className="brutal-alert brutal-alert-danger">
            ⚠ {error}
          </div>
          <Link to="/" className="brutal-btn brutal-btn-light">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="brutal-container">
      <div className="brutal-content">
        <div className="brutal-header">
          <h1 className="brutal-title" data-text="Student Details">
            Student Details
          </h1>
          <div className="brutal-btn-group">
            <Link to="/" className="brutal-btn brutal-btn-light">
              ← Home
            </Link>
            <Link to={`/edit/${data.id}`} className="brutal-btn brutal-btn-warning">
              ✏ Edit
            </Link>
          </div>
        </div>

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
            📋 All Students
          </Link>
          <Link to={`/edit/${data.id}`} className="brutal-btn brutal-btn-warning">
            ✏ Edit Student
          </Link>
          <Link to="/create" className="brutal-btn brutal-btn-success">
            ➕ Add New Student
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Read;