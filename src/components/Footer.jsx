import React from "react";
import { Link } from "react-router";

export const Footer = () => {
  const links = [
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Privacy", to: "/privacy" },
    { label: "Terms", to: "/terms" },
  ];
  return (
    <div
      className="flex items-center justify-between px-4 py-1.5 mt-auto"
      style={{
        background:
          "linear-gradient(180deg,#1c74d4 0%,#1560c0 40%,#1458b8 100%)",
      }}
    >
      {/* Left — Logo */}
      <div className="flex items-center gap-1.5">
        <span className="text-base text-white">✈</span>
        <span
          className="text-white font-bold text-xs"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
        >
          KhaleejiGo
        </span>
        <span
          className="text-[10px] text-white/50 ml-1"
          style={{
            borderLeft: "1px solid rgba(255,255,255,0.2)",
            paddingLeft: 6,
          }}
        >
          © {new Date().getUTCFullYear()}
        </span>
      </div>

      {/* Center — Links */}
      <div className="flex items-center gap-0">
        {links.map((link, i, arr) => (
          <span key={link.label} className="flex items-center">
            <Link
              // to={link.to}
              className="text-[#aaccff] text-[10px] cursor-pointer hover:text-white hover:underline px-2 no-underline"
            >
              {link.label}
            </Link>
            {i < arr.length - 1 && (
              <span className="text-white/20 text-[10px]">|</span>
            )}
          </span>
        ))}
      </div>

      {/* Right — Status */}
      <div
        className="flex items-center gap-1.5 text-[10px] text-white/70 px-2 py-0.5"
        style={{ border: "1px inset #0030a0", background: "rgba(0,0,0,0.15)" }}
      >
        <span className="text-green-400">●</span>
        <span>🔒 Secure Connection</span>
      </div>
    </div>
  );
};
