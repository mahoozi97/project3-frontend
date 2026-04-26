import { useState } from "react";
import { NavLink, Link } from "react-router";

function Navbar({ user, setUser, admin, setAdmin }) {
  const [isOpen, setIsOpen] = useState(false);

  function logOut() {
    localStorage.removeItem("token");
    if (user) {
      setUser(null);
    } else if (admin) {
      setAdmin(null);
    }
    setIsOpen(false);
  }

  const navItemClass = ({ isActive }) =>
    `flex items-center px-3 h-10 md:h-full text-[15px] border-b md:border-b-0 md:border-r border-white/15 cursor-pointer transition-colors no-underline ${
      isActive
        ? "bg-white/25 text-white font-bold"
        : "text-[#ddeeff] hover:bg-white/20 hover:text-white"
    }`;

  return (
    <nav
      className="relative flex flex-col md:flex-row items-stretch min-h-10"
      style={{
        background:
          "linear-gradient(180deg,#1c74d4 0%,#1560c0 40%,#1458b8 100%)",
      }}
    >
      <div className="flex items-stretch justify-between h-10">
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

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden px-4 text-white text-xl bg-transparent border-none outline-none"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Main Nav Links - Hidden on mobile unless isOpen */}
      <div
        className={`${isOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-stretch grow`}
      >
        <NavLink
          className={navItemClass}
          to="/homepage"
          onClick={() => setIsOpen(false)}
        >
          Homepage
        </NavLink>
        <NavLink
          className={navItemClass}
          to="/blogs"
          onClick={() => setIsOpen(false)}
        >
          Blogs
        </NavLink>

        <div className="flex flex-col md:flex-row items-stretch">
          {user ? (
            <>
              <NavLink
                className={navItemClass}
                to="/dashboard"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                className={navItemClass}
                to="/book-now"
                onClick={() => setIsOpen(false)}
              >
                Book Now
              </NavLink>
            </>
          ) : admin ? (
            <>
              <NavLink
                className={navItemClass}
                to="/admin-dashboard"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
            </>
          ) : null}
        </div>

        {/* Right tray */}
        <div className="md:ml-auto flex flex-row items-center gap-2 px-3 h-10 text-[#ddeeff] text-[15px] border-t border-white/10 md:border-t-0">
          {user ? (
            <>
              <span>👤</span>
              <span className="truncate max-w-20">{user.username}</span>
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
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <span className="text-white/30">•</span>
              <Link
                to="/sign-up"
                className="text-[#ffcc44] hover:underline cursor-pointer no-underline"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
