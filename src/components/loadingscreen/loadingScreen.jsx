// components/LoadingScreen.js
import React, { useEffect, useState } from "react";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (!loading) return null;

  return (
    <div className="loading-screen">
      <div className="dots-loader">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
      <div className="loading-text">Loading</div>
    </div>
  );
};

export default LoadingScreen;
