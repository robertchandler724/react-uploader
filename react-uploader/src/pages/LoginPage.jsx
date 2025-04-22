import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // AuthContext for managing login state
import api from "../api/api"; // Correct import statement

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState(""); // State for username input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // Error message state
  const { setToken } = useAuth(); // Get login state handling from context
  const navigate = useNavigate(); // Navigate hook to redirect after successful login

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submit behavior

    try {
      // Send login credentials to the backend via API
      const response = await api.post("/api/login", { username, password });

      if (response.data.token) {
        // On successful login, save token in localStorage and update context
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token); // Update context with token

        // Trigger callback to notify parent component of successful login
        onLogin(response.data.token);

        // Redirect to the main page
        navigate("/");
      }
    } catch (err) {
      // Handle errors (e.g., wrong username/password)
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>} {/* Display error if login fails */}
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Update state on input change
                    required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update state on input change
                    required />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
  )};

export default LoginPage; // Export the LoginPage component for use in other parts of the app