import React, { useEffect, useState } from "react";
import {
  deleteBooking,
  editBooking,
  getAllBooking,
} from "../../services/bookingService";
import { Button, Spin } from "antd";
import { Link } from "react-router";

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
    <div>
      <h1>Booking</h1>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {!booking ? (
        <Spin
          style={{ marginTop: "20px" }}
          description="Loading"
          size="large"
        />
      ) : booking.length === 0 ? (
        <p>No bookings found!</p>
      ) : (
        booking.map((book) => (
          <div key={book._id}>
            <p>Name: {book.name}</p>
            <p>CPR: {book.cpr}</p>
            <p>Destination: {book.destination}</p>
            <p>Date: {formatDate(book.date)}</p>
            <p>Driver: {book.driver}</p>
            <p>Status: {book.status}</p>

            {book.status === "Pending ⏳" || book.status === "Rejected ❌" ? (
              <Button onClick={() => toggleStatus(book._id, "accept")}>
                Accept ✅
              </Button>
            ) : book.status === "Accepted ✅" ? (
              <Button onClick={() => toggleStatus(book._id, "cancel")}>
                Cancel ❌
              </Button>
            ) : (
              <h1></h1>
            )}

            {book.status !== "Cancelled ❌" ? (
              <Button
                color="danger"
                variant="solid"
                onClick={() => handelDeleteBooking(book._id)}
              >
                Delete
              </Button>
            ) : null}
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default AllBooking;
