import React, { useEffect, useState } from "react";
import AllBooking from "./AllBooking";
import { useLocation, useNavigate } from "react-router";
import BlogsPanel from "./BlogsPanel";

export const AdminDashboard = ({admin}) => {
  const navigate = useNavigate()
  const location = useLocation();
  const [toggle, setToggle] = useState(() => {
    if (location.state?.tab === "blogs") return false;
    const saved = localStorage.getItem("dash-toggle");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const handleToggle = (value) => {
    setToggle(value);
    localStorage.setItem("dash-toggle", JSON.stringify(value));
  };

  return (
    <div className="mx-2.5 flex flex-col mb-2 mt-4">
      <div
        className="flex items-center justify-between px-2 py-1"
        style={{
          background:
            "linear-gradient(180deg,#1c74d4 0%,#1560c0 40%,#1458b8 100%)",
          borderBottom: "1px solid #1a3a6a",
        }}
      >
        <span className="text-white font-bold text-[15px]">Dashboard</span>
        <div className="flex gap-1">
          {["─", "□", "✕"].map((s, i) => (
            <button
              key={i}
              className="w-5 h-5 text-white text-[11px] flex items-center justify-center"
              style={{
                border: "1px outset #7a9ac8",
                background: "linear-gradient(180deg,#4a7ab5,#2a5a95)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div
        className="flex gap-0 px-1 text-[12px]"
        style={{ background: "#d4d0c8", borderBottom: "1px solid #aca899" }}
      >
        <span
          className="px-2 rounded cursor-pointer hover:bg-[#316ac5] hover:text-white"
          onClick={() => handleToggle(true)}
        >
          Bookings
        </span>

        <span
          className="px-2 rounded cursor-pointer hover:bg-[#316ac5] hover:text-white"
          onClick={() => handleToggle(false)}
        >
          Blogs
        </span>

        <span
          className="px-2 rounded cursor-pointer hover:bg-[#316ac5] hover:text-white"
          onClick={() => navigate("/admin/blogs/create")}
        >
          Add Blogs
        </span>
      </div>

      {/*  */}
      {toggle ? <AllBooking admin= {admin} /> : <BlogsPanel />}
    </div>
  );
};
