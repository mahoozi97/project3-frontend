import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { createBlog, getBlogById, updateBlog } from "../../services/blogService";

const BlogForm = () => {
  // FIX: Added `title` field — blogs have titles but it was missing from the form
  const [formData, setFormData] = useState({ title: "", description: "", image: "" });
  const { id } = useParams();
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
      // FIX: was "/admin" but the actual admin dashboard route is "/admin-dashboard"
      navigate("/admin-dashboard");
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Edit Blog" : "Create New Blog"}</h2>
      <form onSubmit={handleSubmit}>
        {/* FIX: Added title field to match blog data model */}
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <label>Image URL</label>
        <input
          type="text"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <button type="submit">Save Blog</button>
      </form>
    </div>
  );
};

export default BlogForm;