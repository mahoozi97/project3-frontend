import { useEffect, useState } from "react";
import { useContext } from "react";
import {
  deleteBooking,
  getAllBookingByUserId,
} from "../services/bookingService";
import { Button, Spin } from "antd";
import { Link } from "react-router";

function Dashboard({ user }) {
  const [booking, setBooking] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      const booking = await getAllBookingByUserId(token);
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

  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await deleteBooking(token, id);
      fetchBooking();
    } catch (error) {
      console.log("Error:", error.response?.data?.error || error.message);
      setError(error.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    fetchBooking();
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

            <Button>
              <Link to={""}>Edit</Link>
            </Button>

            <Button
              color="danger"
              variant="solid"
              onClick={() => cancelBooking(book._id)}
            >
              Cancel
            </Button>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
