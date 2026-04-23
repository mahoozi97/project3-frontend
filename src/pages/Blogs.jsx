import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../services/blogService";
import { Link } from "react-router";
import { Spin } from "antd";

const Blogs = () => {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs();
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div className="home-container">
      <h1>Latest Blogs</h1>
      {!blogs ? (
        <Spin
          style={{ marginTop: "20px" }}
          description="Loading"
          size="large"
        />
      ) : blogs.length === 0 ? (
        <p>No blogs found!</p>
      ) : (
        <div className="blogs-list">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <img src={blog.image} alt="Blog cover" />
              <h2>{blog.title}</h2>
              <p>{blog.description.substring(0, 100)}...</p>
              <Link to={`/blog/${blog._id}`}>Read More</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
