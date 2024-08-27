import React from "react";
import { Navigate } from "react-router-dom";
import { getItem } from "../utils/helperfuntions";
import { ADMIN_TOKEN } from "../utils/constants";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const token = getItem(ADMIN_TOKEN);
  return token ? children : <Navigate to="/admin-login" replace />;
};

export default ProtectedRoute;
