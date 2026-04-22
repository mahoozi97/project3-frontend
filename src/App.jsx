import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { BookingForm } from "./pages/BookingForm";
import { Spin } from "antd";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Blog Imports
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import BlogForm from "./pages/admin/BlogForm";
import AllBooking from "./pages/admin/AllBooking";

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [isToken, setIsToken] = useState(true);
  const navigate = useNavigate();

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

  // FIX: Admin dashboard race condition.
  // SignIn.jsx calls setAdmin() then navigate() in the same tick. React Router
  // processes the navigation before the state update flushes, so the route sees
  // admin=null and bounces back to /sign-in. Watching admin/user here and
  // navigating AFTER the state is committed fixes the race reliably.
  useEffect(() => {
    if (isToken) return; // don't redirect during the initial token check
    if (admin) {
      navigate("/admin-dashboard");
    } else if (user) {
      navigate("/dashboard");
    }
    // Only fire when user/admin actually change (i.e. after login/logout),
    // not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, admin]);

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
        <Route path="/blogs" element={<Home />} />

        {/* FIX: was "/blog/:id" (no 's') but Home.jsx links to "/blogs/:id".
            Changed to "/blogs/:id" so "Read More" actually navigates. */}
        <Route path="/blogs/:id" element={<BlogDetail />} />

        {/* FIX: guard sign-in with !user && !admin.
            Previously only !user was checked, so a logged-in admin would land
            on the sign-in page (because user=null) instead of their dashboard. */}
        <Route
          path="/sign-up"
          element={
            !user && !admin ? <SignUp /> : <Navigate to={admin ? "/admin-dashboard" : "/dashboard"} />
          }
        />
        <Route
          path="/sign-in"
          element={
            !user && !admin ? (
              <SignIn setUser={setUser} setAdmin={setAdmin} />
            ) : (
              <Navigate to={admin ? "/admin-dashboard" : "/dashboard"} />
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
          element={admin ? <AdminDashboard admin={admin} /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/admin-bookings"
          element={admin ? <AllBooking admin={admin} /> : <Navigate to="/sign-in" />}
        />
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