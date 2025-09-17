import React, { useState } from 'react';
import api from '../client';
import { Link, useNavigate } from 'react-router-dom';

function Create() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    age: '',
    gender: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/add_user', values); // ✅ Remove redundant `/api`
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

  return (
    <div className="container-fluid vh-100 vw-100 bg-primary text-white p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Add Student</h2>
        <Link to="/" className="btn btn-light">Home</Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white text-dark p-4 rounded shadow">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            className="form-control"
            type="text"
            value={values.name}
            onChange={handleInputChange}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            className="form-control"
            type="email"
            value={values.email}
            onChange={handleInputChange}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            className="form-control"
            value={values.gender}
            onChange={handleInputChange}
            disabled={loading}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group my-3">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            className="form-control"
            type="number"
            min="1"
            max="150"
            value={values.age}
            onChange={handleInputChange}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group mt-4">
          <button
            type="submit"
            className="btn btn-success"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Saving...
              </>
            ) : (
              'Save'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
