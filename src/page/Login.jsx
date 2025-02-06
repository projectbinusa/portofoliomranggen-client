import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_LOGIN } from "../utils/BaseUrl";
import "font-awesome/css/font-awesome.min.css"; // Import font-awesome
import { API_LOGIN } from "../utils/BaseUrl";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility
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
        
        // Store admin data (id and role) in localStorage
        localStorage.setItem("adminId", response.data.data.id);
        localStorage.setItem("adminRole", response.data.data.role);

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
              <div className="flex flex-col items-start relative">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="border-2 border-gray-600 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 pl-10"
                  placeholder="Masukkan email Anda" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* Icon Email */}
                <i className="fa fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 mt-3"></i>
              </div>
              <div className="flex flex-col items-start relative">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input 
                  type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                  id="password" 
                  placeholder="Masukkan password Anda" 
                  className="border-2 border-gray-600 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 pl-10"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Icon Password */}
                <i className="fa fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 mt-3"></i>
                {/* Toggle visibility icon */}
                <i 
                  className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'} absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer mt-3`} 
                  onClick={() => setShowPassword(!showPassword)} 
                ></i>
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
