import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router"; // or "react-router-dom"
import Homepage from "./pages/Homepage";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard"; // Removed brackets if exported as default
import { BookingForm } from "./pages/BookingForm";
import { Spin } from "antd";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Blog Imports
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import BlogForm from "./pages/admin/BlogForm";
import AllBooking from "./pages/admin/AllBooking";

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [isToken, setIsToken] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userInfo = JSON.parse(atob(token.split(".")[1])).payload;

        if (userInfo.role === "admin") {
          setAdmin(userInfo);
        } else if (userInfo.role === "user") {
          setUser(userInfo);
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
      }
    }
    setIsToken(false);
  }, []);

  if (isToken) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin description="Loading" size="large" />
      </div>
    );
  }

  return (
    <div>
      <Navbar user={user} setUser={setUser} admin={admin} setAdmin={setAdmin} />
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Homepage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetail user={user} />} />

        <Route
          path="/sign-up"
          element={!user ? <SignUp /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/sign-in"
          element={
            !user ? (
              <SignIn setUser={setUser} setAdmin={setAdmin} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        {/* --- Protected User Routes --- */}
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/book-now" element={<BookingForm />} />
        </Route>

        {/* --- Protected Admin Routes --- */}
        <Route
          path="/admin-dashboard"
          element={
            admin ? (
              <AdminDashboard admin={admin} />
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />

        <Route
          path="/admin-bookings"
          element={
            admin ? <AllBooking admin={admin} /> : <Navigate to="/sign-in" />
          }
        />

        {/* Blog Management Routes */}
        <Route
          path="/admin/blogs/create"
          element={admin ? <BlogForm /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/admin/blogs/edit/:id"
          element={admin ? <BlogForm /> : <Navigate to="/sign-in" />}
        />
      </Routes>
    </div>
  );
}

export default App;
