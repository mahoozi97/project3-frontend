import axios from "axios";

// FIX: was hardcoded "http://localhost:5000/api/blogs" — now uses the env variable
// to be consistent with authService and avoid port mismatch issues
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/blogs`;

const authHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getAllBlogs = () => axios.get(`${API_URL}`);
export const getBlogById = (id) => axios.get(`${API_URL}/${id}`);
export const createBlog = (blogData) =>
  axios.post(`${API_URL}`, blogData, authHeader());
export const updateBlog = (id, blogData) =>
  axios.put(`${API_URL}/${id}`, blogData, authHeader());
export const deleteBlog = (id) =>
  axios.delete(`${API_URL}/${id}`, authHeader());

export const addComment = (blogId, commentData) =>
  axios.post(`${API_URL}/${blogId}/comments`, commentData, authHeader());
export const deleteComment = (blogId, commentId) =>
  axios.delete(`${API_URL}/${blogId}/comments/${commentId}`, authHeader());
