import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../client"; // Use the shared axios instance

function Edit() {
  const [data, setData] = useState(null); // null = loading
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
        navigate("/"); // Redirect to home
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
      <div className="container-fluid bg-primary vh-100 vw-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return <div className="alert alert-danger m-4">{error}</div>;
  }

  // Form UI
  return (
    <div className="container-fluid vw-100 vh-100 bg-primary text-white p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Edit Student {id}</h2>
        <Link to="/" className="btn btn-light">Back</Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white text-dark p-4 rounded">
        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            value={data.name}
            type="text"
            name="name"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            value={data.email}
            type="email"
            name="email"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="gender">Gender</label>
          <select
            className="form-control"
            name="gender"
            value={data.gender}
            required
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group my-3">
          <label htmlFor="age">Age</label>
          <input
            className="form-control"
            value={data.age}
            type="number"
            name="age"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-3">
          <button type="submit" className="btn btn-success" disabled={saving}>
            {saving ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
