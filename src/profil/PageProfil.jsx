import React, { useState, useEffect } from "react";
import { Camera, Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { API_ADMIN } from "../utils/BaseUrl"; 
import Sidebar from "../components/Sidebar";
import Navbar from "../tampilan/Navbar";

export default function ProfilePage() {
  const [fotoProfil, setFotoProfil] = useState("https://via.placeholder.com/150");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const savedFoto = localStorage.getItem("fotoProfil");
    if (savedFoto) {
      setFotoProfil(savedFoto);
    }

    const fetchAdminData = async () => {
      try {
        const response = await fetch(`${API_ADMIN}/admin/1`);
        if (!response.ok) throw new Error("Gagal mengambil data admin");
        const data = await response.json();
        setFormData({
          username: data.username,
          email: data.email,
          password: data.password,
        });
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchAdminData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fotoUrl = reader.result;
        setFotoProfil(fotoUrl);
        localStorage.setItem("fotoProfil", fotoUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <Navbar />

      <div className="flex-1 flex justify-center items-center p-4 overflow-auto">
        <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-2xl">
          <h1 className="text-3xl font-bold mb-6 text-green-400 text-center">Profile</h1>
          
          {/* Foto Profil */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <img 
                src={fotoProfil} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover border-2 border-gray-400" 
              />
              <label htmlFor="profilePicUpload" className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer">
                <Camera className="w-5 h-5 text-green-600" />
              </label>
              <input type="file" id="profilePicUpload" className="hidden" onChange={handleFotoChange} />
            </div>
          </div>

          {/* Form Profil */}
          <form className="space-y-4">
            {/* Username */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="username" className="text-sm font-medium text-gray-700 text-left">Username</label>
              <div className="flex items-center space-x-3 bg-white p-2 rounded-lg">
                <User className="text-green-400 w-6 h-6" />
                <input 
                  id="username" 
                  type="text" 
                  className="flex-1 bg-transparent text-black p-2 focus:outline-none" 
                  value={formData.username} 
                  onChange={handleChange} 
                  placeholder="Username"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 text-left">Email</label>
              <div className="flex items-center space-x-3 bg-white p-2 rounded-lg">
                <Mail className="text-green-400 w-6 h-6" />
                <input 
                  id="email" 
                  type="email" 
                  className="flex-1 bg-transparent text-black p-2 focus:outline-none" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 text-left">Password</label>
              <div className="flex items-center space-x-3 bg-white p-2 rounded-lg">
                <Lock className="text-green-400 w-6 h-6" />
                <div className="relative flex-1">
                  <input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    className="bg-transparent text-black p-2 w-full focus:outline-none" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Password"
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-3 text-black focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
