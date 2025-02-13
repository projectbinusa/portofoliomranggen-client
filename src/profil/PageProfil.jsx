import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import { API_ADMIN } from "../utils/BaseUrl"; 
import Sidebar from "../components/Sidebar";

export default function ProfilePage() {
  const [fotoProfil, setFotoProfil] = useState("https://via.placeholder.com/150");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  // Ambil foto dari localStorage saat halaman dimuat
  useEffect(() => {
    const savedFoto = localStorage.getItem("fotoProfil");
    if (savedFoto) {
      setFotoProfil(savedFoto);
    }

    const fetchAdminData = async () => {
      try {
        const response = await fetch(`${API_ADMIN}/admin/1`);
        if (!response.ok) throw new Error("Failed to fetch admin data");
        const data = await response.json();
        setFormData({
          username: data.username,
          email: data.email,
          password: data.password,
          role: data.role,
        });
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchAdminData();
  }, []);

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Fungsi untuk menangani perubahan foto
  const handleFotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fotoUrl = reader.result;
        setFotoProfil(fotoUrl);
        localStorage.setItem("fotoProfil", fotoUrl); // Simpan ke localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Konten Profil */}
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">Profile</h1>
          
          {/* Foto Profil */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <img 
                src={fotoProfil} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover border-2 border-gray-300" 
              />
              <label htmlFor="profilePicUpload" className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer">
                <Camera className="w-5 h-5 text-green-600" />
              </label>
              <input type="file" id="profilePicUpload" className="hidden" onChange={handleFotoChange} />
            </div>
          </div>

          {/* Form Profil */}
          <form className="space-y-4">
            {["username", "email", "password", "role"].map((id) => (
              <div key={id} className="flex items-center space-x-4">
                <label htmlFor={id} className="w-24 text-sm font-medium text-green-700 text-right">
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </label>
                <input 
                  id={id} 
                  type="text" 
                  className="flex-1 p-2 border border-green-300 rounded-lg shadow-sm w-full" 
                  value={formData[id]} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
}
