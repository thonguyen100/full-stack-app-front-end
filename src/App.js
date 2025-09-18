import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./elements/Home";
import Create from "./elements/Create";
import Edit from "./elements/Edit";
import Read from "./elements/Read";
import Login from "./Login";
import Signup from "./Signup";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // <-- make sure firebase.js is set up

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return <p>Loading...</p>;
  }

  // 🔒 Protect all routes except /login and /signup
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/create"
          element={user ? <Create /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/edit/:id"
          element={user ? <Edit /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/read/:id"
          element={user ? <Read /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
