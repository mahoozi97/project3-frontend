export function XPButton({
  children,
  onClick,
  primary = false,
  className = "",
}) {
  if (primary) {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-1 text-white font-bold text-[13px] cursor-pointer active:brightness-90 ${className}`}
        style={{
          background:
            "linear-gradient(180deg,#5090f0 0%,#1060d0 40%,#0850c0 100%)",
          borderTop: "1px solid #80b0ff",
          borderLeft: "1px solid #80b0ff",
          borderRight: "2px solid #003090",
          borderBottom: "2px solid #003090",
        }}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`px-3 py-0.5 text-[11px] text-black cursor-pointer active:brightness-95 ${className}`}
      style={{
        background:
          "linear-gradient(180deg,#f5f4ee 0%,#d8d5c8 40%,#c8c5b8 100%)",
        borderTop: "1px solid #fff",
        borderLeft: "1px solid #fff",
        borderRight: "2px solid #808080",
        borderBottom: "2px solid #808080",
      }}
    >
      {children}
    </button>
  );
}

export function XPInput({ className = "", ...props }) {
  return (
    <input
      className={`bg-white text-[13px] px-1 py-0.5 font-[Tahoma,sans-serif] outline-none ${className}`}
      style={{ border: "2px inset #808080" }}
      {...props}
    />
  );
}

export function XPSelect({ children, className = "", ...props }) {
  return (
    <select
      className={`bg-white text-[13px] px-1 py-0.5 font-[Tahoma,sans-serif] outline-none ${className}`}
      style={{ border: "2px inset #808080" }}
      {...props}
    >
      {children}
    </select>
  );
}

export function XPStatusBar({ items = [] }) {
  return (
    <div
      className="bg-[#d4d0c8] flex items-center gap-2 px-2 py-0.5"
      style={{ borderTop: "2px inset #808080" }}
    >
      {items.map((item, i) => (
        <span
          key={i}
          className="text-[11px] px-1.5 py-0"
          style={{ border: "1px inset #808080" }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
