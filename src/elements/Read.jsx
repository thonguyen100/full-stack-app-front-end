import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
  const [data, setData] = useState(null); // Using null initially to represent loading state
  const [error, setError] = useState(null); // For error handling
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/read/${id}`)
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
  if (!data && !error) return <div>Loading...</div>;

  // Show error message if there's an issue fetching the data
  if (error) return <div className="alert alert-danger">{error}</div>;

  // Render student data when available
  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>User {id}</h1>
      <Link to="/" className="btn btn-success">
        Back
      </Link>
      
      <ul className="list-group">
        <li className="list-group-item">
          <b>ID: </b>{data.id}
        </li>
        <li className="list-group-item">
          <b>Name: </b>{data.name}
        </li>
        <li className="list-group-item">
          <b>Email: </b>{data.email}
        </li>
        <li className="list-group-item">
          <b>Age: </b>{data.age}
        </li>
        <li className="list-group-item">
          <b>Gender: </b>{data.gender}
        </li>
      </ul>
    </div>
  );
}

export default Read;
