import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (user === undefined) {
    return <div>Loading...</div>;  // ✅ Show loading instead of redirecting too soon
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
