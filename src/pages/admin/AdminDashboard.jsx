import React , {useEffect, useState} from "react";
import { getAllBlogs, deleteBlog } from "../../services/blogService";
import { Link } from "react-router";

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    loadBlogs()
  }, [])

  const loadBlogs = async () => {
    try {
      const response = await getAllBlogs()
      setBlogs(response.data)
    } catch (error) {
      console.error("Error fetching blogs:", error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id)
        loadBlogs()
      } catch (error) {
        console.error("Error deleting blog:", error)
      }
    }
  }
  
  return (
    <div className="admin-container">
      <h2>Admin Management</h2>
      {/* This link is OUTSIDE the loop, it doesn't need an ID */}
      <Link to="/admin/blogs/create">
        <button>Create New Blog Post</button>
      </Link>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td><img src={blog.image} width="50" alt="thumbnail" /></td>
              <td>{blog.description.substring(0, 30)}...</td>
              <td>
                {/* For the inside of this loop, "blog" refers to the specific item.
                   This is where ${blog._id} is recognized
                */}
                <Link 
                  to={`/admin/blogs/edit/${blog._id}`} 
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </Link>
                
                <button onClick={() => handleDelete(blog._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AdminDashboard;