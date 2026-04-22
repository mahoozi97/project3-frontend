import axios from "axios";

// FIX: was hardcoded "http://localhost:3000" — now uses the env variable
// to match how SignIn.jsx makes its requests
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/auth`;

export const login = async (formData) => {
  const res = await axios.post(`${API_URL}/sign-in`, formData);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  }
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};