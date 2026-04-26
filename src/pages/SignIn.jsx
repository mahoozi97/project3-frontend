import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { XPButton, XPInput } from "../components/XPControls";

function SignIn({ setUser, setAdmin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/sign-in`,
        formData,
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      const userInfo = JSON.parse(atob(token.split(".")[1])).payload;
      if (userInfo.role === "user") {
        setUser(userInfo);
        navigate("/dashboard");
      } else {
        setAdmin(userInfo);
        navigate("/admin-dashboard");
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.err || "An error occurred during sign in",
      );
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-8">
      <div
        className="w-full max-w-sm"
        style={{ background: "#ece9d8", border: "2px inset #808080" }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-2 py-1"
          style={{
            background:
              "linear-gradient(180deg,#1c74d4 0%,#1560c0 40%,#1458b8 100%)",
            borderBottom: "1px solid #1a3a6a",
          }}
        >
          <span className="text-white font-bold text-sm">Sign In</span>
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

        {/* Form */}
        <div className="p-5">
          {errorMessage && (
            <p
              className="flex justify-center mb-3 text-[14px]"
              style={{ color: "red" }}
              role="alert"
            >
              ⚠️ {errorMessage}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[12px] font-bold w-20">Username:</span>
              <XPInput
                type="text"
                className="flex-1"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold w-20">Password:</span>
              <XPInput
                type="password"
                className="flex-1"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex justify-center mt-4 pt-3 border-t border-black/10">
              <XPButton primary type="submit" className="py-1.5 px-6 text-sm">
                Sign In ➔
              </XPButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;