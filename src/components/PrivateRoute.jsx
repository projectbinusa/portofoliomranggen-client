import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/Auth";

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(isAuthenticated());

  useEffect(() => {
    const handleAuthChange = () => {
      setAuth(isAuthenticated());
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  return auth ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
