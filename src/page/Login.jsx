import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_LOGIN } from "../utils/BaseUrl";
import "font-awesome/css/font-awesome.min.css";
import { useNotification } from "../context/NotificationContext"; // 🔔 Import Notifikasi

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // 🔔 Inisialisasi Notifikasi

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_LOGIN}`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("adminId", response.data.data.id);
        localStorage.setItem("adminRole", response.data.data.role);
        window.dispatchEvent(new Event("authChange"));

        addNotification("Login berhasil! Selamat datang kembali.", "success"); // 🔔 Kirim Notifikasi

        Swal.fire("Success!", "Login berhasil.", "success");
        navigate("/dashboard");
      }
    } catch (error) {
      addNotification("Login gagal. Periksa kembali email & password.", "error"); // 🔔 Kirim Notifikasi saat gagal
      
      Swal.fire(
        "Error",
        error.response?.data?.message || "Login gagal. Coba lagi.",
        "error"
      );
    }
  };

  return (
    <section className="fixed inset-0 dark:bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg shadow-lg border-2 border-gray-600 dark:border-gray-700 dark:bg-gray-800 p-8">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-center mb-6">LOGIN</h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="flex flex-col items-start relative">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" id="email" className="border-2 border-gray-600 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 pl-10" placeholder="Masukkan email Anda" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <i className="fa fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 mt-3"></i>
          </div>
          <div className="flex flex-col items-start relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type={showPassword ? "text" : "password"} id="password" placeholder="Masukkan password Anda" className="border-2 border-gray-600 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 pl-10" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <i className="fa fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 mt-3"></i>
            <i className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"} absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer mt-3`} onClick={() => setShowPassword(!showPassword)}></i>
          </div>
          <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-400">LOGIN</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
