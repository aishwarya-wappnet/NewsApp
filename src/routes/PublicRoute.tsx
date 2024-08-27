import React from "react";
import { Navigate } from "react-router-dom";
import { getItem } from "../utils/helperfuntions";
import { ADMIN_TOKEN } from "../utils/constants";

const PublicRoute = ({ children }: { children: React.ReactElement }) => {
  const token = getItem(ADMIN_TOKEN);
  return !token ? children : <Navigate to="/admin/dashboard" replace />;
};

export default PublicRoute;
