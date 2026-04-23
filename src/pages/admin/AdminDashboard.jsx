import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { deleteBlog, getAllBlogs } from "../../services/blogService";
import { XPButton, XPStatusBar } from "../../components/XPControls";

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);

  const loadBlogs = async () => {
    try {
      const response = await getAllBlogs();
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id);
        loadBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <div className="mx-2.5 flex flex-col gap-1.5 mb-2 mt-4">
      <div
        className="flex items-center justify-between px-2 py-1"
        style={{
          background:
            "linear-gradient(180deg,#1c74d4 0%,#1560c0 40%,#1458b8 100%)",
          borderBottom: "1px solid #1a3a6a",
        }}
      >
        <span className="text-white font-bold text-sm">Admin Dashboard</span>
        <div className="flex gap-1">
          {["─", "□", "✕"].map((s, i) => (
            <button
              key={i}
              className="w-5 h-5 text-white text-[11px] flex items-center justify-center"
              style={{
                border: "1px outset #7a9ac8",
                background: "linear-gradient(180deg,#4a7ab5,#2a5a95)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div
        className="bg-white px-3 py-2"
        style={{ border: "2px outset #d4d0c8" }}
      >
        <Link to="/admin/blogs/create">
          <XPButton primary>+ Create New Blog Post</XPButton>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div
          className="bg-white px-3 py-2 text-xs"
          style={{ border: "2px outset #d4d0c8" }}
        >
          No blogs found!
        </div>
      ) : (
        <div className="bg-white" style={{ border: "2px outset #d4d0c8" }}>
          <table className="w-full text-xs">
            <thead>
              <tr
                className="text-white font-bold text-left"
                style={{ background: "#1458b8" }}
              >
                <th className="px-3 py-1">Image</th>
                <th className="px-3 py-1">Description</th>
                <th className="px-3 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="border-b border-gray-200 hover:bg-blue-50"
                >
                  <td className="px-3 py-1">
                    <img src={blog.image} width="50" alt="thumbnail" />
                  </td>
                  <td className="px-3 py-1 text-gray-700">
                    {blog.description.substring(0, 30)}...
                  </td>
                  <td className="px-3 py-1">
                    <div className="flex gap-2 items-center">
                      <Link to={`/admin/blogs/edit/${blog._id}`}>
                        <XPButton>Edit</XPButton>
                      </Link>
                      <XPButton onClick={() => handleDelete(blog._id)}>
                        Delete
                      </XPButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <XPStatusBar items={[`${blogs.length} blog(s) found`]} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
