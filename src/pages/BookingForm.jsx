import { useForm } from "react-hook-form";
import { newBooking } from "../services/bookingService";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Button } from "antd";

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

      const dateWithOffset = `${data.date}:00+03:00`;

      const payload = {
        ...data,
        date: dateWithOffset,
      };

      await newBooking(token, payload);
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

        <label>
          Destination:
          <input
            type="text"
            {...register("destination", {
              required: "Destination is required",
            })}
          />
        </label>

        <label>
          Mobile No.:
          <input
            type="number"
            {...register("phoneNumber", { required: "Mobile No. is required" })}
          />
        </label>

        <label>
          Date:
          <input
            type="datetime-local"
            // min={new Date().toISOString().slice(0, 16)}
            {...register("date", { required: "Select date and time" })}
          />
        </label>

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

        <Button htmlType="submit">Book</Button>
      </form>
    </>
  );
};
