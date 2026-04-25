import React from "react";
import { Link } from "react-router";
import bookNowImg from "../assets/Book-Now.png";
import readMoreImg from "../assets/Read More.png";

function Homepage() {
  return (
    <div className="min-h-screen bg-[#3a6ea5] flex flex-col items-center pt-8 pb-8">
      <div
        className="bg-[#ece9d8] md:w-200 w-100"
        style={{ border: "2px outset #d4d0c8" }}
      >
        <div
          className="flex items-center justify-between px-2 py-1"
          style={{
            background:
              "linear-gradient(180deg,#1c74d4 0%,#1560c0 40%,#1458b8 100%)",
            borderBottom: "1px solid #1a3a6a",
          }}
        >
          <span className="text-white font-bold text-sm">KhalijiGo</span>
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

        <div className="flex flex-col items-center px-8 py-6 gap-4">
          <h1
            className="text-[22px] font-bold text-[#0a246a] text-center"
            style={{ textShadow: "1px 1px 0 #fff" }}
          >
            Welcome to KhalijiGo
          </h1>

          <h2 className="text-[15px] text-[#444] text-center" dir="rtl">
            استمتع بتجربة مميزة مع خدماتنا
          </h2>

          <div className="w-full" style={{ borderTop: "1px inset #d4d0c8" }} />

          <img src={bookNowImg} alt="Book Now" className="md:w-200 w-100" />

          <Link to="/book-now">
            <button
              className="px-6 py-1 text-[13px] font-bold text-black bg-[#ece9d8] cursor-pointer active:scale-95"
              style={{ border: "2px outset #d4d0c8" }}
            >
              Book Now
            </button>
          </Link>

          <div className="w-full" style={{ borderTop: "1px inset #d4d0c8" }} />

          <img src={readMoreImg} alt="Read More" className="md:w-200 w-100" />

          <Link to="/blogs">
            <button
              className="px-6 py-1 text-[13px] font-bold text-black bg-[#ece9d8] cursor-pointer active:scale-95"
              style={{ border: "2px outset #d4d0c8" }}
            >
              Read more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
