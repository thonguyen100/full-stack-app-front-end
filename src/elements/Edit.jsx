import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [data, setData] = useState(null); // Use null to represent loading state
  const [error, setError] = useState(null); // For error handling
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/read/${id}`) // Fixed endpoint for getting the student data
      .then((res) => {
        setData(res.data); // Assuming the backend returns a single student object
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load student data.");
      });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    
    // Send updated student data to the backend
    axios
      .put(`/api/edit/${id}`, data) // Assuming you're using PUT to edit
      .then((res) => {
        navigate("/"); // Redirect to the home page after successful update
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to update student data.");
      });
  }

  // Show loading or error state while fetching data
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!data) return <div>Loading...</div>; // Or show a loading spinner

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>Edit Student {id}</h1>
      <Link to="/" className="btn btn-success">
        Back
      </Link>

      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input
            value={data.name}
            type="text"
            name="name"
            required
            onChange={(e) =>
              setData({ ...data, name: e.target.value }) // Update state without using map
            }
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email</label>
          <input
            value={data.email}
            type="email"
            name="email"
            required
            onChange={(e) =>
              setData({ ...data, email: e.target.value }) // Update state without using map
            }
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="gender">Gender</label>
          <input
            value={data.gender}
            type="text"
            name="gender"
            required
            onChange={(e) =>
              setData({ ...data, gender: e.target.value }) // Update state without using map
            }
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="age">Age</label>
          <input
            value={data.age}
            type="number"
            name="age"
            required
            onChange={(e) =>
              setData({ ...data, age: e.target.value }) // Update state without using map
            }
          />
        </div>
        <div className="form-group my-3">
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
