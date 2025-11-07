import axios from 'axios';

const API_BASE = import.meta.env.MODE === "development"
  ? "http://localhost:5000/api"
  : import.meta.env.VITE_API_BASE || "https://vercel.com/anujsharma933s-projects/to-do-app/7YVs4qWU66koSntsJxieBBmRuFBj/api";

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
