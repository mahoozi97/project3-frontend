import React from "react";
import { Link } from "react-router";

export const NotFound = () => {
  return (
    <div
      className="flex-1 flex items-center justify-center py-8 px-4"
    >
      {/* XP Window */}
      <div
        className="w-120"
        style={{
          border: "2px solid #0054e3",
          borderRadius: "8px 8px 0 0",
          boxShadow: "4px 4px 12px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}
      >
        {/* Title Bar */}
        <div
          className="flex items-center justify-between px-2 py-1"
          style={{
            background:
              "linear-gradient(180deg,#1c74d4 0%,#1560c0 40%,#1458b8 100%)",
            borderBottom: "1px solid #1a3a6a",
          }}
        >
          <span className="text-white font-bold text-sm">
            ⚠️ KhalijiGo — Page Not Found
          </span>
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

        

        {/* Content */}
        <div className="flex gap-4 p-5" style={{ background: "#ece9d8" }}>
          {/* Error Icon */}
          <div className="shrink-0 flex items-start pt-1">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-3xl"
              style={{
                background: "linear-gradient(135deg,#f0c840,#e0a000)",
                border: "3px solid #c08000",
                boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              ✈
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-3 flex-1">
            <div>
              <div
                className="font-bold text-[13px] text-black mb-1"
                style={{ fontFamily: "Tahoma, sans-serif" }}
              >
                404 — Page Not Found
              </div>
              <div
                className="text-[11px] text-[#333] leading-relaxed"
                style={{ fontFamily: "Tahoma, sans-serif" }}
              >
                KhalijiGo cannot find the page you are looking for. The page
                may have been moved, deleted, or never existed.
              </div>
            </div>

            {/* Inset info box */}
            <div
              className="text-[11px] text-[#333] p-2 leading-relaxed"
              style={{
                background: "#fff",
                border: "2px inset #808080",
              }}
            >
              <div className="mb-1 font-bold text-[#000066]">
                What you can do:
              </div>
              <div>• Check the URL for typing errors</div>
              <div>• Go back to the previous page</div>
              <div>• Return to the homepage</div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => window.history.back()}
                className="text-[11px] px-4 py-1 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(180deg,#f5f4ee 0%,#d8d5c8 40%,#c8c5b8 100%)",
                  borderTop: "1px solid #fff",
                  borderLeft: "1px solid #fff",
                  borderRight: "2px solid #808080",
                  borderBottom: "2px solid #808080",
                  fontFamily: "Tahoma, sans-serif",
                }}
              >
                ← Go Back
              </button>
              <Link
                to="/homepage"
                className="text-[11px] px-4 py-1 cursor-pointer text-white font-bold no-underline flex items-center"
                style={{
                  background:
                    "linear-gradient(180deg,#5090f0 0%,#1060d0 40%,#0850c0 100%)",
                  borderTop: "1px solid #80b0ff",
                  borderLeft: "1px solid #80b0ff",
                  borderRight: "2px solid #003090",
                  borderBottom: "2px solid #003090",
                  fontFamily: "Tahoma, sans-serif",
                }}
              >
                🏠 Go to Homepage
              </Link>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div
          className="flex items-center gap-2 px-2 py-0.5"
          style={{ background: "#d4d0c8", borderTop: "2px inset #808080" }}
        >
          <span
            className="text-[11px] px-1.5"
            style={{ border: "1px inset #808080" }}
          >
            Error 404
          </span>
          <span
            className="text-[11px] px-1.5 ml-auto"
            style={{ border: "1px inset #808080" }}
          >
            🔒 KhalijiGo.com
          </span>
        </div>
      </div>
    </div>
  );
};
