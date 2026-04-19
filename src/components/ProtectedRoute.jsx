import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = ({ user }) => {
  // if no user → redirect to sign-in, otherwise render the page
  return user ? <Outlet /> : <Navigate to="/sign-in" replace />;
};
