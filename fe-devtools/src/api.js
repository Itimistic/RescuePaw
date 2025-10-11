import axios from "axios";

// Base axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Automatically attach token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login function
export const login = async (username, password) => {
  const res = await api.post("/auth/login", { username, password });
  const token = res.data.token;

  if (!token) throw new Error("Login failed");

  localStorage.setItem("token", token);

  // Decode token payload (base64)
  const decoded = JSON.parse(atob(token.split(".")[1]));
  return decoded; // { username, role, iat, exp }
};

// Logout function
export const logout = () => {
  localStorage.removeItem("token");
};

// Get current user info from token
export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

export default api;
