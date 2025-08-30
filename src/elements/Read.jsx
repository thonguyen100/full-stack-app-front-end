import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
  const [data, setData] = useState(null); // Using null initially
  const [error, setError] = useState(null); // For error handling
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/read/${id}`)
      .then((res) => {
        setData(res.data); // Assuming backend returns a single student object
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load student data.");
      });
  }, [id]);

  // Show loading or error state while fetching data
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!data) return <div>Loading...</div>; // Or show a loading spinner

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>User {id}</h1>
      <Link to="/" className="btn btn-success">Back</Link>
      
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
