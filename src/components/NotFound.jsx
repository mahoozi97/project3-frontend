import React from "react";

export const NotFound = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#004080" }}
    >
      {/* XP Window */}
      <div
        className="w-[480px]"
        style={{
          border: "2px solid #0054e3",
          borderRadius: "8px 8px 0 0",
          boxShadow: "4px 4px 12px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}
      >
        {/* Title Bar */}
        <div
          className="flex items-center gap-1.5 px-2 h-7"
          style={{
            background:
              "linear-gradient(180deg,#0997ff 0%,#0264e8 6%,#0060e0 30%,#015ed8 100%)",
          }}
        >
          <span className="text-sm">⚠️</span>
          <span
            className="text-white font-bold text-xs flex-1"
            style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.5)" }}
          >
            KhaleejiGo — Page Not Found
          </span>
          <div className="flex gap-0.5">
            <button
              className="w-[19px] h-[19px] rounded text-[10px] font-bold flex items-center justify-center border border-[#888]"
              style={{ background: "linear-gradient(180deg,#f0ede5,#d0ccc0)" }}
            >
              _
            </button>
            <button
              className="w-[19px] h-[19px] rounded text-[10px] font-bold flex items-center justify-center border border-[#888]"
              style={{ background: "linear-gradient(180deg,#f0ede5,#d0ccc0)" }}
            >
              □
            </button>
            <button
              className="w-[19px] h-[19px] rounded text-[10px] font-bold flex items-center justify-center border border-[#901010] text-white"
              style={{ background: "linear-gradient(180deg,#e8604c,#c0301c)" }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div
          className="flex gap-0 px-1 py-0.5 text-[11px]"
          style={{ background: "#d4d0c8", borderBottom: "1px solid #aca899" }}
        >
          {["File", "Edit", "View", "Help"].map((m) => (
            <span
              key={m}
              className="px-2 py-0.5 rounded cursor-pointer hover:bg-[#316ac5] hover:text-white"
            >
              {m}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="flex gap-4 p-5" style={{ background: "#ece9d8" }}>
          {/* Error Icon */}
          <div className="flex-shrink-0 flex items-start pt-1">
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
                KhaleejiGo cannot find the page you are looking for. The page
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
                to="/"
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
            🔒 gcc-travel.com
          </span>
        </div>
      </div>
    </div>
  );
};
