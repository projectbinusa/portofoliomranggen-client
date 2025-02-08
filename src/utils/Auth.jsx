// src/utils/Auth.js
export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  console.log("Token dari localStorage:", token);
  return token !== null && token !== undefined && token !== "";
};
