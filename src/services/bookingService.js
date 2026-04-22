import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const newBooking = async (token, data) => {
  await axios.post(`${BASE_URL}/booking`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getAllBooking = async (token) => {
  const res = await axios.get(`${BASE_URL}/booking`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const getAllBookingByUserId = async (token) => {
  const res = await axios.get(`${BASE_URL}/booking/my-bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const getBookingById = async (token, id) => {
  const res = await axios.get(`${BASE_URL}/booking/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const editBooking = async (token, id, data) => {
  await axios.put(`${BASE_URL}/booking/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const deleteBooking = async (token, id) => {
  await axios.delete(`${BASE_URL}/booking/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// const toggleStatus = async (token, id, btn) => {
//   if (btn === "reject") {
//     editBooking(token, id, { status: "Rejected ❌" });
//   } else if (btn === "accept") {
//     editBooking(token, id, { status: "Accepted ✅" });
//   }
// };

export {
  newBooking,
  getAllBooking,
  getAllBookingByUserId,
  getBookingById,
  editBooking,
  deleteBooking,
};
