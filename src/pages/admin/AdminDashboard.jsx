import React from "react";

export const AdminDashboard = ({ admin }) => {
  return (
    <div>
      <h1>Welcome {admin.role}</h1>
    </div>
  );
};
