import { useNavigate } from "react-router";

export const StartUp = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "relative",
        backgroundImage: 'url("src/assets/wallpaper.jpg")',
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
        position: "fixed",
        inset: 0,
      }}
    >
      <button
        style={{
          position: "absolute",
          top: "15px",
          left: "12px",
        }}
        onClick={() => navigate("/homepage")}
      >
        <img src="src/assets/Group 114.png" alt="" />
      </button>
    </div>
  );
};
