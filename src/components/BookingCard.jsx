import { Link } from "react-router";

export const BookingCard = ({
  admin,
  id,
  name,
  cpr,
  destination,
  date,
  phoneNumber,
  driver,
  status,
  formatDate,
  handelDeleteBooking,
  toggleStatus,
}) => {
  const flag = () => {
    if (destination.includes("KSA")) {
      return "🇸🇦";
    } else if (destination.includes("UAE")) {
      return "🇦🇪";
    } else if (destination.includes("Kuwait")) {
      return "🇰🇼";
    } else if (destination.includes("Oman")) {
      return "🇴🇲";
    } else if (destination.includes("Qatar")) {
      return "🇶🇦";
    } else {
      return "🌍";
    }
  };

  return (
    <div
      className="bg-white flex items-center gap-2 px-3 py-4 hover:bg-[#fffae8]"
      style={{ border: "2px outset #d4d0c8" }}
    >
      <span className="text-2xl">{flag()}</span>

      {/* Main Details */}
      <div className="flex-1">
        <div className="font-bold text-[15px]">{destination}</div>
        <div className="text-[15px] text-[#444]">
          {formatDate(date)} &nbsp;|&nbsp; Driver: {driver || "Unassigned"}
        </div>
        <div className="text-[15px] text-[#444] mt-0.5">
          Passenger: {name} &nbsp;|&nbsp; CPR: {cpr}
        </div>
      </div>

      {/* Status */}
      <div
        className="text-center px-3 py-1 min-w-30"
        style={
          status === "Pending ⏳"
            ? {
                background: "linear-gradient(180deg,#fff0e0,#ffe0b0)",
                border: "1px solid #cc7700",
                color: "#663300",
              }
            : status === "Accepted ✅"
              ? {
                  background: "linear-gradient(180deg,#e8f5e8,#c8e8c8)",
                  border: "1px solid #40a040",
                  color: "#004000",
                }
              : status === "Completed ✔️"
                ? {
                    background: "linear-gradient(180deg, #e8e8e8, #c8c8c8)",
                    border: "1px solid #606060",
                    color: "#202020",
                  }
                : {
                    background: "linear-gradient(180deg, #f5e8e8, #e8c8c8)",
                    border: "1px solid #a04040",
                    color: "#400000",
                  }
        }
      >
        <div className="font-bold text-sm capitalize">{status}</div>
        <div className="text-[10px]">Status</div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-1 ml-2 min-w-17.5">
        {!admin ? null : (
          <>
            {status === "Pending ⏳" ? (
              <>
                <button
                  className="text-center font-bold text-[13px] px-2 py-0.5 bg-green-100 text-green-500 cursor-pointer hover:bg-green-200 active:bg-green-300"
                  style={{ border: "2px outset #d4d0c8" }}
                  onClick={() => toggleStatus(id, "accept")}
                >
                  Accept ✅
                </button>

                <button
                  className="text-center font-bold text-[13px] px-2 py-0.5 bg-orange-100 text-orange-700 cursor-pointer hover:bg-orange-200 active:bg-orange-300"
                  style={{ border: "2px outset #d4d0c8" }}
                  onClick={() => toggleStatus(id, "cancel")}
                >
                  Cancel ❌
                </button>
              </>
            ) : status === "Accepted ✅" ? (
              <>
                <button
                  className="text-center font-bold text-[13px] px-2 py-0.5 bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300 active:bg-gray-400"
                  style={{ border: "2px outset #d4d0c8" }}
                  onClick={() => toggleStatus(id, "complete")}
                >
                  Completed ✔️
                </button>

                <button
                  className="text-center font-bold text-[13px] px-2 py-0.5 bg-orange-100 text-orange-700 cursor-pointer hover:bg-orange-200 active:bg-orange-300"
                  style={{ border: "2px outset #d4d0c8" }}
                  onClick={() => toggleStatus(id, "cancel")}
                >
                  Cancel ❌
                </button>
              </>
            ) : null}

            {status !== "Cancelled ❌" && status !== "Completed ✔️" ? (
              <button
                onClick={() => handelDeleteBooking(id)}
                className="text-center font-bold text-[13px] px-2 py-0.5 bg-red-100 text-red-900 cursor-pointer hover:bg-red-50 active:bg-red-200"
                style={{ border: "2px outset #d4d0c8" }}
              >
                Delete
              </button>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};
