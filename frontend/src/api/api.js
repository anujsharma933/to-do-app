import axios from 'axios';

const API_BASE = import.meta.env.MODE === "development"
  ? "http://localhost:5000/api"
  : import.meta.env.VITE_API_BASE || "https://to-do-app-sepia-ten.vercel.app";

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
