import React, { useEffect, useState } from "react";
import {
  deleteBooking,
  editBooking,
  getAllBooking,
} from "../../services/bookingService";
import { Button, Spin } from "antd";
import { Link } from "react-router";
import { BookingCard } from "../../components/BookingCard";

export const AllBooking = ({ admin }) => {
  const [booking, setBooking] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchAllBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      const booking = await getAllBooking(token);
      setBooking(booking);
    } catch (error) {
      console.log("Error:", error.response?.data?.error || error.message);
      setErrorMessage(error.response?.data?.error || error.message);
    }
  };

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleString("en-GB", {
      timeZone: "Asia/Bahrain",
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handelDeleteBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await deleteBooking(token, id);
      fetchAllBooking();
    } catch (error) {
      console.log("Error:", error.response?.data?.error || error.message);
      setErrorMessage(error.response?.data?.error || error.message);
    }
  };

  const toggleStatus = async (id, btn) => {
    try {
      const token = localStorage.getItem("token");
      if (btn === "cancel") {
        await editBooking(token, id, { status: "Cancelled ❌" });
      } else if (btn === "accept") {
        await editBooking(token, id, { status: "Accepted ✅" });
      }
      fetchAllBooking();
    } catch (error) {
      console.log("Error:", error.response?.data?.error || error.message);
      setErrorMessage(error.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    fetchAllBooking();
  }, []);
  return (
    <div className="mx-2.5 flex flex-col gap-1.5 mb-2 mt-4">
      <div
        className="flex items-center justify-between px-2 py-1"
        style={{
          background:
            "linear-gradient(180deg,#1c74d4 0%,#1560c0 40%,#1458b8 100%)",
          borderBottom: "1px solid #1a3a6a",
        }}
      >
        <span className="text-white font-bold text-sm">📅 All Booking</span>
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

      {errorMessage && (
        <div className="bg-red-100 text-red-700 px-3 py-1 text-xs font-bold border border-red-400">
          {errorMessage}
        </div>
      )}

      {!booking ? (
        <div
          className="bg-white px-3 py-4 text-center"
          style={{ border: "2px outset #d4d0c8" }}
        >
          <Spin description="Loading bookings..." size="large" />
        </div>
      ) : booking.length === 0 ? (
        <div
          className="bg-white px-3 py-2 text-xs"
          style={{ border: "2px outset #d4d0c8" }}
        >
          No bookings found!
        </div>
      ) : (
        booking.map((book) => (
          <div key={book._id}>
            <BookingCard
              admin={admin}
              id={book._id}
              name={book.name}
              cpr={book.cpr}
              destination={book.destination}
              date={book.date}
              phoneNumber={book.phoneNumber}
              driver={book.driver}
              status={book.status}
              formatDate={formatDate}
              handelDeleteBooking={handelDeleteBooking}
              toggleStatus={toggleStatus}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default AllBooking;
