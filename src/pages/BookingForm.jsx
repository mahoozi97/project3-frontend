import { useForm } from "react-hook-form";
import { newBooking } from "../services/bookingService";
import { useNavigate } from "react-router";
import { useState } from "react";
import { XPButton, XPInput, XPSelect } from "../components/XPControls";

export const BookingForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const drivers = ["Ahmed", "Ali", "Husain", "Taha"];
  const destinations = [
    "KSA (Dammam)",
    "KSA (Riyadh)",
    "KSA (Mecca)",
    "KSA (Madinah)",
    "KSA (Jeddah)",
    "UAE (Abu Dhabi)",
    "UAE (Dubai)",
    "UAE (Sharjah)",
    "UAE (Al Ain)",
    "Kuwait (Kuwait City)",
    "Kuwait (Al Ahmadi)",
    "Kuwait (Hawally)",
    "Qatar (Doha)",
    "Oman (Muscat)",
    "Oman (Salalah)",
  ];

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await newBooking(token, data);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-8 px-4">
      <div
        className="w-full max-w-2xl"
        style={{ background: "#ece9d8", border: "2px inset #808080" }}
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
            🚕 Book Your Trip
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

        {/* Menu Bar */}
        <div
          className="flex gap-0 px-1 py-0.5 text-[11px]"
          style={{ background: "#d4d0c8", borderBottom: "1px solid #aca899" }}
        >
          <span
            className="px-2 py-0.5 rounded cursor-pointer hover:bg-[#316ac5] hover:text-white"
          >
            One-way
          </span>

          <span
            className="px-2 py-0.5 rounded"
          >
            Round-trip
          </span>

          <span
            className="px-2 py-0.5 rounded"
          >
            Multi-city
          </span>
        </div>

        {/* Form Body */}
        <div className="p-3">
          {(errorMessage || Object.keys(errors).length > 0) && (
            <div className="bg-[#fff0f0] border border-red-400 p-2 mb-3 text-[13px] text-red-700">
              {errorMessage && <div>• {errorMessage}</div>}
              {Object.values(errors).map((error, i) => (
                <div key={i}>• {error.message}</div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

            {/* Row 1 — Name & CPR */}
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <div className="flex items-center flex-1 min-w-50 justify-center">
                <span className="text-[12px] font-bold w-14">Name:</span>
                <XPInput
                  type="text"
                  className="flex-1 max-w-60 min-w-0"
                  {...register("name", { required: "Name is required" })}
                />
              </div>
              <div className="flex items-center gap-4 flex-1 min-w-50 justify-center">
                <span className="text-[12px] font-bold w-10">CPR:</span>
                <XPInput
                  type="number"
                  className="flex-1 max-w-60 min-w-0"
                  {...register("cpr", {
                    required: "CPR is required",
                    pattern: {
                      value: /^\d{9}$/,
                      message: "CPR must be exactly 9 digits",
                    },
                  })}
                />
              </div>
            </div>

            {/* Row 2 — Destination & Mobile */}
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <div className="flex items-center flex-1 min-w-50 justify-center">
                <span className="text-[12px] font-bold w-14">To:</span>
                <XPSelect
                  className="flex-1 max-w-60 min-w-0"
                  {...register("destination", { required: "Select destination" })}
                >
                  <option value="">-- Select Destination --</option>
                  {destinations.map((des) => (
                    <option key={des} value={des}>{des}</option>
                  ))}
                </XPSelect>
              </div>
              <div className="flex items-center gap-4 flex-1 min-w-50 justify-center">
                <span className="text-[12px] font-bold w-10">Mobile:</span>
                <XPInput
                  type="number"
                  className="flex-1 max-w-60 min-w-0"
                  {...register("phoneNumber", {
                    required: "Mobile No. is required",
                    pattern: {
                      value: /^\d{8}$/,
                      message: "Mobile No. must be exactly 8 digits",
                    },
                  })}
                />
              </div>
            </div>

            {/* Row 3 — Date & Driver */}
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <div className="flex items-center flex-1 min-w-50 justify-center">
                <span className="text-[12px] font-bold w-14">Date:</span>
                <XPInput
                  type="datetime-local"
                  className="flex-1 max-w-60 min-w-0"
                  min={new Date().toISOString().slice(0, 16)}
                  {...register("date", { required: "Select date and time" })}
                />
              </div>
              <div className="flex items-center gap-4 flex-1 min-w-50 justify-center">
                <span className="text-[12px] font-bold w-10">Driver:</span>
                <XPSelect
                  className="flex-1 max-w-60 min-w-0"
                  {...register("driver", { required: "Select driver" })}
                >
                  <option value="">-- Preferred Driver --</option>
                  {drivers.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </XPSelect>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end mt-2 pt-2 border-t border-black/10">
              <XPButton primary type="submit" className="py-1.5 px-6 text-sm">
                Confirm Booking ➔
              </XPButton>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
