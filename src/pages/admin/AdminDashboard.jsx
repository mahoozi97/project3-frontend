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
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <Link to="/admin/create"><button>Create New Blog</button></Link>
      
      <table>
        <thead>
          <tr> {/* table rows + table headers- took reference from external sources to conduct this process*/}
            <th>ID</th>
            <th>Description Snippet</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>{blog._id}</td>
              <td>{blog.description.substring(0, 50)}...</td>
              <td>
                <Link to={`/admin/edit/${blog._id}`}>Edit</Link>
                <button onClick={() => handleDelete(blog._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;