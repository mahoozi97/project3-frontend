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
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import BlogForm from "./pages/admin/BlogForm";

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [isToken, setIsToken] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decoding the JWT payload
        const userInfo = JSON.parse(atob(token.split(".")[1]));
        // Note: Check if your payload is nested under .payload or directly in the object
        const actualUser = userInfo.payload || userInfo; 
        setUser(actualUser);
        
        // If your token logic includes role-based info, set admin here
        if (actualUser.role === "admin") {
          setAdmin(actualUser);
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
        <Route path="/blogs" element={<Home />} />
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
            admin ? <AdminDashboard admin={admin} /> : <Navigate to="/sign-in" />
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