import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../tampilan/Navbar";
import ProfileCard from "../profil/ProfileCard";
import ProfileSidebar from "../profil/ProfileSidebar";
import { API_ADMIN } from "../utils/BaseUrl";

export default function ChangePasswordPage() {
  const [fotoProfil, setFotoProfil] = useState("https://via.placeholder.com/150");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    designation: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    note: "",
  });

  useEffect(() => {
    const savedFoto = localStorage.getItem("fotoProfil");
    if (savedFoto) setFotoProfil(savedFoto);

    const fetchAdminData = async () => {
      try {
        const response = await fetch(`${API_ADMIN}/admin/1`);
        if (!response.ok) throw new Error("Gagal mengambil data admin");
        const data = await response.json();
        setFormData({
          username: data.username,
          email: data.email,
          phone: data.phone || "",
          dateOfBirth: data.dateOfBirth || "",
          designation: data.designation || "",
          address1: data.address1 || "",
          address2: data.address2 || "",
          country: data.country || "",
          state: data.state || "",
          note: data.note || "",
        });
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchAdminData();
  }, []);

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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 py-10 px-8 ml-64">
          <div className="flex gap-6 max-w-6xl mx-auto">
            {/* Kiri: Profil */}
            <div className="w-1/3 bg-white p-6 rounded-lg shadow">
              <ProfileCard fotoProfil={fotoProfil} formData={formData} onFotoChange={handleFotoChange} />
              <div className="mt-4">
                <ProfileSidebar />
              </div>
            </div>

            {/* Kanan: Change Password */}
            <div className="w-2/3 bg-white rounded-lg shadow p-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-10 text-center">
                Change Password
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <form className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-1">Old Password</label>
                    <input
                      type="password"
                      placeholder="Enter Old Password"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter New Password"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Enter Confirm Password"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </form>

                <div>
                  <h3 className="text-gray-700 font-semibold mb-4">
                    New password must contain:
                  </h3>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>— At least 8 characters</li>
                    <li>— At least 1 lower letter (a-z)</li>
                    <li>— At least 1 uppercase letter (A-Z)</li>
                    <li>— At least 1 number (0–9)</li>
                    <li>— At least 1 special characters</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-10">
                <button
                  type="button"
                  className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
