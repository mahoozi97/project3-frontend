import { Link, useNavigate } from "react-router";

function Navbar({ user, setUser, admin, setAdmin }) {
  const navigate = useNavigate();

  // FIX: added navigate("/") after clearing state.
  // Previously, logout left the user on whatever page they were on. If that
  // page was protected (e.g. /dashboard, /admin-dashboard) they'd be
  // immediately bounced to /sign-in, which looked like a broken loop.
  function logOut() {
    localStorage.removeItem("token");
    if (user) {
      setUser(null);
    } else if (admin) {
      setAdmin(null);
    }
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link className="nav-item" to="/">Homepage</Link>
      <Link className="nav-item" to="/blogs">Blogs</Link>

      {user ? (
        <>
          <Link className="nav-item" to="/dashboard">Dashboard</Link>
          <Link className="nav-item" to="/book-now">Book Now</Link>
          <span className="nav-item">{user.username}</span>
          <button className="nav-item" onClick={logOut}>Log Out</button>
        </>
      ) : admin ? (
        <>
          <Link className="nav-item" to="/admin-dashboard">Dashboard</Link>
          <Link className="nav-item" to="/admin-bookings">Bookings</Link>
          <Link className="nav-item" to="/admin/blogs/create">New Blog</Link>
          <span className="nav-item">admin: {admin.username}</span>
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