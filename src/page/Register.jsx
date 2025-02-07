import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { API_REGISTER } from "../utils/BaseUrl";
import "font-awesome/css/font-awesome.min.css"; // Import font-awesome

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false); // State untuk mengatur visibilitas password

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle visibility
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_REGISTER}/register`, {
        email: formData.email,
        password: formData.password,
        username: formData.name,
        role: "ADMIN",
      });

      if (response.status === 201) {
        Swal.fire({
          title: "Pendaftaran Berhasil!",
          text: "Akun Anda telah berhasil didaftarkan.",
          icon: "success",
          confirmButtonText: "OK",
        });

        setFormData({ name: "", email: "", password: "" });
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        title: "Pendaftaran Gagal",
        text: error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full border-2 border-gray-600">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">REGISTER</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start relative">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Masukkan nama lengkap Anda"
              className="w-full px-4 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pl-10"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <i className="fa fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 mt-3"></i>
          </div>
          <div className="flex flex-col items-start relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Masukkan email Anda"
              className="w-full px-4 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pl-10"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <i className="fa fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 mt-3"></i>
          </div>
          <div className="flex flex-col items-start relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"} // Toggle input type
              id="password"
              name="password"
              placeholder="Masukkan password Anda"
              className="w-full px-4 py-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 pl-10"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <i className="fa fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 mt-3"></i>
            <i
              onClick={handlePasswordVisibility}
              className={`fa ${passwordVisible ? "fa-eye" : "fa-eye-slash"} absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer mt-3`}
            ></i>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-400 transition duration-300"
          >
            REGISTER
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">
            Sudah punya akun? {" "}
            <a href="/login" className="text-teal-500 hover:underline">
              Login di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
