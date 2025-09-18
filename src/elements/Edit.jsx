import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../client";
// import './elements.css';
import './styles/elements.css'; 


function Edit() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the student data
  useEffect(() => {
    api.get(`/read/${id}`)
      .then((res) => {
        if (res.data && res.data.id) {
          setData(res.data);
        } else {
          setError("Student not found.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load student data.");
      });
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    api.put(`/edit/${id}`, data)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to update student data.");
      })
      .finally(() => {
        setSaving(false);
      });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Loading state
  if (!data && !error) {
    return (
      <div className="brutal-loading">
        <div className="brutal-spinner"></div>
      </div>
    );
  }

  // Error state
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

  // Form UI
  return (
    <div className="brutal-container">
      <div className="brutal-content">
        <div className="brutal-header">
          <h1 className="brutal-title" data-text={`Edit Student #${id}`}>
            Edit Student #{id}
          </h1>
          <Link to="/" className="brutal-btn brutal-btn-light">
            ← Back
          </Link>
        </div>

        {error && (
          <div className="brutal-alert brutal-alert-danger">
            ⚠ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="brutal-form">
          <div className="brutal-form-group">
            <label htmlFor="name" className="brutal-label">
              Full Name
            </label>
            <input
              id="name"
              className="brutal-input"
              value={data.name}
              type="text"
              name="name"
              required
              onChange={handleChange}
              disabled={saving}
            />
          </div>

          <div className="brutal-form-group">
            <label htmlFor="email" className="brutal-label">
              Email Address
            </label>
            <input
              id="email"
              className="brutal-input"
              value={data.email}
              type="email"
              name="email"
              required
              onChange={handleChange}
              disabled={saving}
            />
          </div>

          <div className="brutal-form-group">
            <label htmlFor="gender" className="brutal-label">
              Gender
            </label>
            <select
              id="gender"
              className="brutal-select"
              name="gender"
              value={data.gender}
              required
              onChange={handleChange}
              disabled={saving}
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
              className="brutal-input"
              value={data.age}
              type="number"
              name="age"
              min="1"
              max="150"
              required
              onChange={handleChange}
              disabled={saving}
            />
          </div>

          <div className="brutal-form-group brutal-mt-4">
            <button 
              type="submit" 
              className="brutal-btn brutal-btn-success" 
              disabled={saving}
            >
              {saving ? (
                <>
                  <div className="brutal-spinner" style={{ width: '16px', height: '16px', display: 'inline-block', marginRight: '8px' }}></div>
                  Updating...
                </>
              ) : (
                "💾 Update Student"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;