import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import { setAuthToken } from "./api/api";
import ParticlesBackground from "./components/ParticlesBackground";

export default function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      {/* Animated particles background */}
      <ParticlesBackground darkMode={darkMode} />

      {/* Toggle button */}
      <div className="absolute top-5 right-6 z-10">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="btn btn-secondary"
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Glass effect overlay */}
      <div className="bg-overlay min-h-screen p-4 relative z-10">
        <Routes>
          <Route path="/" element={<PrivateRoute><Tasks /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
