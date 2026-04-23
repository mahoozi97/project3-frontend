import { NavLink, Link } from "react-router";

function Navbar({ user, setUser, admin, setAdmin }) {
  function logOut() {
    localStorage.removeItem("token");
    if (user) {
      setUser(null);
    } else if (admin) {
      setAdmin(null);
    }
  }

  const navItemClass = ({ isActive }) =>
    `flex items-center px-3 text-[15px] border-r border-white/15 cursor-pointer transition-colors no-underline ${
      isActive
        ? "bg-white/25 text-white font-bold"
        : "text-[#ddeeff] hover:bg-white/20 hover:text-white"
    }`;

  return (
    <div
      className="flex items-stretch h-10"
      style={{
        background:
          "linear-gradient(180deg,#1c74d4 0%,#1560c0 40%,#1458b8 100%)",
      }}
    >
      <Link
        to="/"
        className="flex items-center gap-1.5 px-4 text-white font-bold text-sm border-r-2 border-[#0040a0] no-underline"
        style={{
          background: "linear-gradient(180deg,#2a8af0 0%,#1060d0 100%)",
        }}
      >
        <span className="text-lg">✈</span>
        <span style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
          KhalijiGo
        </span>
      </Link>

      <NavLink className={navItemClass} to="/homepage">
        Homepage
      </NavLink>
      <NavLink className={navItemClass} to="/blogs">
        Blogs
      </NavLink>

      <div className="flex items-stretch">
        {user ? (
          // Links for protected routes only for logged in users
          <>
            <NavLink className={navItemClass} to="/dashboard">
              Dashboard
            </NavLink>
            <NavLink className={navItemClass} to="/book-now">
              Book Now
            </NavLink>
          </>
        ) : admin ? (
          // Links for admins
          <>
            <NavLink className={navItemClass} to="/admin-dashboard">
              Dashboard
            </NavLink>
            <NavLink className={navItemClass} to="/admin-bookings">
              Bookings
            </NavLink>
          </>
        ) : null}
      </div>

      {/* Right tray */}
      <div className="ml-auto flex items-center gap-2 px-3 text-[#ddeeff] text-[15px]">
        {user ? (
          <>
            <span>👤</span>
            <span>{user.username}</span>
            <span className="text-white/30">|</span>
            <button
              onClick={logOut}
              className="text-[#ffcc44] hover:underline cursor-pointer bg-transparent border-none p-0 text-[15px]"
            >
              Log Out
            </button>
          </>
        ) : admin ? (
          <>
            <span>🥷🏼</span>
            <span>{admin.role}</span>
            <span className="text-white/30">|</span>
            <button
              onClick={logOut}
              className="text-[#ffcc44] hover:underline cursor-pointer bg-transparent border-none p-0 text-[15px]"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/sign-in"
              className="text-[#ffcc44] hover:underline cursor-pointer no-underline"
            >
              Sign In
            </Link>
            <span className="text-white/30">•</span>
            <Link
              to="/sign-up"
              className="text-[#ffcc44] hover:underline cursor-pointer no-underline"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
