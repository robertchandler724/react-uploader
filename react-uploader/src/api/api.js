// api.js
import axios from "axios";

// Create an Axios instance with the correct configuration
const api = axios.create({
  baseURL: "https://your-api-url.com", // Replace with your API's base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept requests to include the Authorization token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // Attach token to headers
  }
  return config;
});

// Example GET request
export const fetchData = async () => {
  try {
    const response = await api.get("/data");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Example POST request for login
export const login = async (username, password) => {
  try {
    const response = await api.post("/login", { username, password });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export default api;
