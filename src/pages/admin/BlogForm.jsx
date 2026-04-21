import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { createBlog, getBlogById, updateBlog } from "../../services/blogService";

const BlogForm = () => {
  const [formData, setFormData] = useState({ description: "", image: "" });
  const { id } = useParams(); // If ID exists, we are editing
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBlogById(id).then(res => setFormData(res.data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateBlog(id, formData);
      } else {
        await createBlog(formData);
      }
      navigate("/admin");
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Edit Blog" : "Create New Blog"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Image URL</label>
        <input 
          type="text" 
          value={formData.image} 
          onChange={(e) => setFormData({...formData, image: e.target.value})} 
        />
        <label>Description</label>
        <textarea 
          value={formData.description} 
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        <button type="submit">Save Blog</button>
      </form>
    </div>
  );
};

export default BlogForm;