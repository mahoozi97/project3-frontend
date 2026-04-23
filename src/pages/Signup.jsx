import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { XPButton, XPInput } from "../components/XPControls";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`,
        formData,
      );
      navigate("/sign-in");
    } catch (err) {
      setErrorMessage(
        err.response?.data?.err || "An error occurred during sign up",
      );
    }
  }

  return (
    <div
      className="flex1 justify-end mx-10 mb-2 mt-4 max-w-100"
      style={{ background: "#ece9d8", border: "2px inset #808080" }}
    >
      <div
          className="flex items-center justify-between px-2 py-1"
          style={{
            background: "linear-gradient(180deg, #0a246a, #3a6ea5)",
            borderBottom: "1px solid #1a3a6a",
          }}
        >
          <span className="text-white font-bold text-sm">Sign Up</span>
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

      <div className="p-3">
        {errorMessage && (
          <p
            className="flex justify-center mb-3"
            style={{ color: "red" }}
            role="alert"
          >
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex items-center flex-1 min-w-50 justify-center">
            <span className="text-[14px] font-bold w-20">Username:</span>
            <XPInput
              type="text"
              className="flex-1 max-w-60"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/*  */}

          <div className="flex items-center flex-1 min-w-50 justify-center mt-3">
            <span className="text-[14px] font-bold w-20">Password:</span>
            <XPInput
              type="password"
              className="flex-1 max-w-60"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-center mt-2 pt-2 border-t border-black/10">
            <XPButton primary type="submit" className="py-1.5 px-6 text-sm">
              Sign Up ➔
            </XPButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
