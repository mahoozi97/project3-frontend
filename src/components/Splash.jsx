import { useEffect, useState } from "react";
import { Navigate } from "react-router";

export const Splash = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setInterval(() => setIsLoading(false), 5000);
  }, []);
  return (
    <>
      {isLoading ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
          }}
        >
          <img
            src="src/assets/windowsXp.gif"
            alt="Splash"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ) : (
        <Navigate to="/start-up" />
      )}
    </>
  );
};
