import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { API_LOGIN } from "../utils/BaseUrl";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_LOGIN}/login`, 
        { email, password }, 
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (response.status === 200) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        
        // Optionally, store user data (e.g., admin data)
        localStorage.setItem("adminData", JSON.stringify(response.data));

        Swal.fire("Success!", "Login berhasil.", "success");
        navigate("/dashboard");
      }
    } catch (error) {
      Swal.fire("Error", error.response?.data || "Login gagal. Coba lagi.", "error");
    }
  };

  return (
    <section className="dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow-lg border-2 border-gray-600 dark:border-gray-700 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
              LOGIN
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div className="flex flex-col items-start">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="border-2 border-gray-600 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500"
                  placeholder="Masukkan email Anda" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="Masukkan password Anda" 
                  className="border-2 border-gray-600 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-400"
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
