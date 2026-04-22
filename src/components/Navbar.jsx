import { Link, useNavigate } from "react-router";

function Navbar({ user, setUser, admin, setAdmin }) {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    if (user) {
      setUser(null);
    } else if (admin) {
      setAdmin(null);
    }
  }

  return (
    <nav className="navbar">
      <Link className="nav-item" to="/">Homepage</Link>
      <Link className="nav-item" to="/blogs">Blogs</Link>

      {user ? (
        // Links for protected routes only for logged in users
        <>
          <Link className="nav-item" to="/dashboard">
            Dashboard
          </Link>

          <Link className="nav-item" to="/book-now">
            Book Now
          </Link>

          <span className="nav-item">{user.username}</span>

          <button className="nav-item" onClick={logOut}>
            Log Out
          </button>
        </>
      ) : admin ? (
        <>
          <Link className="nav-item" to="/admin-dashboard">
            Dashboard
          </Link>

          <Link className="nav-item" to="/admin-bookings">
            Bookings
          </Link>

          <span className="nav-item">admin: {admin.role}</span>

          <button className="nav-item" onClick={logOut}>Log Out</button>
        </>
      ) : (
        <>
          <Link className="nav-item" to="/sign-up">
            Sign up
          </Link>
          <Link className="nav-item" to="/sign-in">
            Sign in
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;