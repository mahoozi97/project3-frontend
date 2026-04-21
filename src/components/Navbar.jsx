import { Link, useNavigate } from "react-router";

function Navbar({ user, setUser, admin, setAdmin }) {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    // FIX: also clear userId, otherwise the next person who uses the browser
    // inherits the previous user's identity for comment ownership
    localStorage.removeItem("userId");
    setUser(null);
    setAdmin(null);
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link className="nav-item" to="/">Homepage</Link>
      <Link className="nav-item" to="/blogs">Blogs</Link>

      {user ? (
        <>
          {admin ? (
            <Link className="nav-item" to="/admin-dashboard">Admin Dashboard</Link>
          ) : (
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
          <Link className="nav-item" to="/sign-up">Sign up</Link>
          <Link className="nav-item" to="/sign-in">Sign in</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;