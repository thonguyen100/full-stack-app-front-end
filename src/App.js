import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/elements.css"; // Add this for brutalism theme

import Home from "./elements/Home";
import Create from "./elements/Create";
import Edit from "./elements/Edit";
import Read from "./elements/Read";
import Auth from "./Auth"; // Single auth component instead of Login/Signup

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

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

  // Helper function to check if user can write (only email users)
  const canWrite = () => {
    return user && !user.isAnonymous;
  };

  // Helper function to check if user can read (all authenticated users)
  const canRead = () => {
    return user !== null;
  };

  if (authLoading) {
    return (
      <div className="brutal-loading">
        <div className="brutal-spinner"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={canRead() ? <Home canWrite={canWrite()} user={user} /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/create"
          element={canWrite() ? <Create user={user} /> : canRead() ? <Navigate to="/" replace /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/edit/:id"
          element={canWrite() ? <Edit user={user} /> : canRead() ? <Navigate to="/" replace /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/read/:id"
          element={canRead() ? <Read user={user} /> : <Navigate to="/auth" replace />}
        />
        {/* Single auth route that handles both login and signup */}
        <Route
          path="/auth"
          element={!user ? <Auth /> : <Navigate to="/" replace />}
        />
        {/* Redirect old routes to new auth route */}
        <Route
          path="/login"
          element={<Navigate to="/auth" replace />}
        />
        <Route
          path="/signup"
          element={<Navigate to="/auth" replace />}
        />
        {/* Catch all other routes */}
        <Route
          path="*"
          element={canRead() ? <Navigate to="/" replace /> : <Navigate to="/auth" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;