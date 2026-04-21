<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { getAllBooking } from "../../services/bookingService";
import { Button, Spin } from "antd";
import { Link } from "react-router";

export const AdminDashboard = ({ admin }) => {
  const [booking, setBooking] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchAllBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      const booking = await getAllBooking(token);
      setBooking(booking);
    } catch (error) {
      console.log("Error:", error.response?.data?.error || error.message);
      setErrorMessage(error.response?.data?.error || error.message);
    }
  };

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleString("en-GB", {
      timeZone: "Asia/Bahrain",
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await deleteBooking(token, id);
      fetchAllBooking();
    } catch (error) {
      console.log("Error:", error.response?.data?.error || error.message);
      setError(error.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    fetchAllBooking();
  }, []);
  return (
    <div>
      <h1>Booking</h1>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {!booking ? (
        <Spin
          style={{ marginTop: "20px" }}
          description="Loading"
          size="large"
        />
      ) : booking.length === 0 ? (
        <p>No bookings found!</p>
      ) : (
        booking.map((book) => (
          <div key={book._id}>
            <p>Name: {book.name}</p>
            <p>CPR: {book.cpr}</p>
            <p>Destination: {book.destination}</p>
            <p>Date: {formatDate(book.date)}</p>
            <p>Driver: {book.driver}</p>
            <p>Status: {book.status}</p>

            <Button>
              <Link to={""}>Edit</Link>
            </Button>

            <Button
              color="danger"
              variant="solid"
              onClick={() => cancelBooking(book._id)}
            >
              Cancel
            </Button>

            {book.status === "Pending ⏳" ? <Button></Button> : <h1></h1>}
            <hr />
          </div>
        ))
      )}
=======
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
>>>>>>> origin/main
    </div>
  );
};
export default AdminDashboard;