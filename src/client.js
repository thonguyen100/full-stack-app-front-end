// client.js - Axios client configuration for backend API
import axios from 'axios';

// Get base URL from environment variable
const baseURL = process.env.REACT_APP_API_URL;

if (!baseURL) {
  console.warn('[Axios] ⚠️ REACT_APP_API_URL is not defined. Please check your .env file.');
} else {
  console.log('[Axios] Using API base URL:', baseURL);
}

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: baseURL || 'http://localhost:8080', // fallback for development
  timeout: 10000, // optional: 10s timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
