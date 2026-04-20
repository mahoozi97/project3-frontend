import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const newBlog = async (token, data) => {
    await axios.post(`${BASE_URL}/api/blog`, data, {
        headers: { Authorization: `Bearer ${token}`},
    })
}

const getAllBlogs = async (token) => {
    const res = await axios.get(`${BASE_URL}/api/blog`, {
        headers: { Authorization: `Bearer ${token}`},
    })
    return res.data
} 
 const getASingleBlogByUserId = async (token) => {
    const res = await.get(`${BASE_URL}/api/blog/:id`, {
        headers: { Authorization: `Bearer ${token}`}, 
    })
    return res.data
 }