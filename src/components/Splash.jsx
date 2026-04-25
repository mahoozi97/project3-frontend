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
        <div className="fixed inset-0 overflow-hidden">
  <img
    src="src/assets/windowsXp.gif"
    alt="Splash"
    className="w-full h-full object-fill block"
  />
</div>
      ) : (
        <Navigate to="/start-up" />
      )}
    </>
  );
};

{
  /* <div className="fixed inset-0 overflow-hidden">
  <img
    src="src/assets/windowsXp.gif"
    alt="Splash"
    className="w-full h-full object-fill block"
  />
</div> */
}
