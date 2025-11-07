import axios from 'axios';

const API_BASE =
 "https://to-do-app-e81b.onrender.com" || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setAuthToken(token) {
  if (token) axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common['Authorization'];
}

export default axiosInstance;
