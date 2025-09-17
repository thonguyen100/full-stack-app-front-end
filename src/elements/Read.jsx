import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import api from '../client'; // Use the configured Axios instance


function Read() {
  const [data, setData] = useState(null); // Using null initially to represent loading state
  const [error, setError] = useState(null); // For error handling
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/read/${id}`)
      .then((res) => {
        if (res.data) {
          setData(res.data); // Assuming backend returns a single student object
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
    <div className="container-fluid bg-primary vh-100 vw-100 d-flex justify-content-center align-items-center">
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}


  // Show error message if there's an issue fetching the data
  if (error) {
    return <div className="alert alert-danger m-4">{error}</div>;
  }

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary text-white p-4">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h2>Student Details</h2>
        <Link to="/" className="btn btn-light">Back</Link>
      </div>
      <ul className="list-group">
        <li className="list-group-item"><b>ID:</b> {data.id}</li>
        <li className="list-group-item"><b>Name:</b> {data.name}</li>
        <li className="list-group-item"><b>Email:</b> {data.email}</li>
        <li className="list-group-item"><b>Age:</b> {data.age}</li>
        <li className="list-group-item"><b>Gender:</b> {data.gender}</li>
      </ul>
    </div>
  );
}

export default Read;