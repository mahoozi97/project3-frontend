import { useForm } from "react-hook-form";
import { editBooking } from "../services/bookingService";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Button } from "antd";



// const editBooking = async (token, id, data) => {
//   await axios.put(`${BASE_URL}/booking/${id}`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

export const BookingForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const drivers = ["Ahmed", "Ali", "Husain", "Taha"];

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      await newBooking(token, data);
      navigate("/dashboard");
    } catch (error) {
      console.log("Error:", error.response?.data?.error || error.message);
      setErrorMessage(error.response?.data?.error || error.message);
    }
  };

  return (
    <>
      <h1>Booking Form</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* form error */}
        {Object.values(errors).map((error, index) => (
          <p key={index} style={{ color: "red" }}>
            {error.message}
          </p>
        ))}

        <label>
          Name:
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
          />
        </label>

        <br /> <br />

        <label>
          CPR:
          <input
            type="text"
            {...register("cpr", {
              required: "CPR is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "CPR must be numbers only",
              },
            })}
          />
        </label>

        <br /> <br />

        <label>
          Destination:
          <input
            type="text"
            {...register("destination", {
              required: "Destination is required",
            })}
          />
        </label>

        <br /> <br />

        <label>
          Mobile No.:
          <input
            type="number"
            {...register("phoneNumber", { required: "Mobile No. is required" })}
          />
        </label>

        <br /> <br />

        <label>
          Date:
          <input
            type="datetime-local"
            min={new Date().toISOString().slice(0, 16)}
            {...register("date", { required: "Select date and time" })}
          />
        </label>

        <br /> <br />

        <label>
          Driver:
          <select {...register("driver", { required: "Select driver" })}>
            <option value="">-- Select --</option>
            {drivers.map((driver) => (
              <option key={driver} value={driver}>
                {driver}
              </option>
            ))}
          </select>
        </label>

        <br /> <br />

        <Button htmlType="submit">Book</Button>
      </form>
    </>
  );
};
