import { Link, useNavigate } from "react-router";

function Navbar({ user, setUser, admin, setAdmin }) {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    setUser(null);
    setAdmin(null);
    navigate("/"); // Redirect to home after logout
  }

  return (
    <nav className="navbar">
      <Link className="nav-item" to="/">Homepage</Link>
      <Link className="nav-item" to="/blogs">Blogs</Link>

      {user ? (
        <>
          {/* Admin Specific Links */}
          {admin ? (
            <Link className="nav-item" to="/admin-dashboard">Admin Dashboard</Link>
          ) : (
            /* Regular User Specific Links */
            <>
              <Link className="nav-item" to="/dashboard">Dashboard</Link>
              <Link className="nav-item" to="/book-now">Book Now</Link>
            </>
          )}

          <span className="nav-item" style={{ fontWeight: "bold" }}>
            Hi, {user.username || user.name} ({user.role})
          </span>

          <button className="nav-item" onClick={logOut}>Log Out</button>
        </>
      ) : (
        <>
          {/* Guest Links */}
          <Link className="nav-item" to="/sign-up">Sign up</Link>
          <Link className="nav-item" to="/sign-in">Sign in</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;