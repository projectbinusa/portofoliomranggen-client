// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/Auth";

const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) {
    console.log("Pengguna belum login, mengarahkan ke /login");
    return <Navigate to="/login" replace />;
  }

  console.log("Pengguna terautentikasi, mengakses halaman");
  return children;
};

export default PrivateRoute;
