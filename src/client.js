// client.js - Axios client configuration for backend API
import axios from 'axios';

// Create an axios instance with default configuration
console.log(process.env.REACT_APP_API_URL, 'REACT_APP_SERVER_URL');
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;