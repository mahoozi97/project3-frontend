import { useEffect, useState } from "react";
import {
  deleteBooking,
  getAllBookingByUserId,
} from "../services/bookingService";
import { Spin } from "antd";
import { Link } from "react-router";
import { BookingCard } from "../components/BookingCard";

function Dashboard({ user }) {
  const [booking, setBooking] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      const bookingData = await getAllBookingByUserId(token);
      setBooking(bookingData);
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

  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await deleteBooking(token, id);
      fetchBooking();
    } catch (error) {
      console.log("Error:", error.response?.data?.error || error.message);
      setErrorMessage(error.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <div className="mx-2.5 flex flex-col gap-1.5 mb-2 mt-4">
      <div
        className="text-white font-bold text-[15px] px-2 py-1"
        style={{ background: "#1458b8" }}
      >
        📅 My Bookings
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
              id={book._id}
              name={book.name}
              cpr={book.cpr}
              destination={book.destination}
              date={book.date}
              phoneNumber={book.phoneNumber}
              driver={book.driver}
              status={book.status}
              formatDate={formatDate}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
