import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { BookingForm } from "./pages/BookingForm";
import { Spin } from "antd";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [isToken, setIsToken] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userInfo = JSON.parse(atob(token.split(".")[1])).payload;
        setUser(userInfo);
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
      }
    }
    setIsToken(false);
  }, []);

  if (isToken) {
    return (
      <>
        <Spin
          style={{ marginTop: "20px" }}
          description="Loading"
          size="large"
        />
      </>
    );
  }

  return (
    <div>
      <Navbar user={user} setUser={setUser} admin={admin} setAdmin={setAdmin} />
      <Routes>
        <Route path="/" element={<Homepage />} />
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
        {/* Protected Routes */}
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/book-now" element={<BookingForm />} />
        </Route>

        <Route
          path="/admin-dashboard"
          element={
            admin ? (
              <AdminDashboard admin={admin} />
            ) : (
              <Navigate to={"/sign-in"} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
