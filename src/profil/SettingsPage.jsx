import React, { useState, useEffect } from "react";
import Navbar from "../tampilan/Navbar";
import Sidebar from "../components/Sidebar";
import { Bell, Mail, RefreshCcw, Globe } from "lucide-react";
import ProfileCard from "../profil/ProfileCard";
import ProfileSidebar from "../profil/ProfileSidebar";
import { API_ADMIN } from "../utils/BaseUrl";

export default function SettingsPage() {
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
    <div className="min-h-screen  bg-gray-100">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-8 ml-64">
          <div className="flex gap-6 max-w-6xl mx-auto">
            {/* Kiri: Profil dan Sidebar */}
            <div className="w-1/3 bg-white p-10 rounded-lg shadow">
              <ProfileCard
                fotoProfil={fotoProfil}
                formData={formData}
                onFotoChange={handleFotoChange}
              />
              <div className="mt-4">
                <ProfileSidebar />
              </div>
            </div>

            {/* Kanan: Pengaturan */}
            <div className="w-2/3 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">Settings</h2>

              {/* Notification List */}
              <div className="space-y-6">
                <SettingItem
                  icon={<Bell className="text-blue-600 w-6 h-6" />}
                  title="Order Confirmation"
                  description="You will be notified when customer order any product"
                  checked
                />
                <SettingItem
                  icon={<Mail className="text-blue-600 w-6 h-6" />}
                  title="Setup Email Notification"
                  description="Turn on email notification to get updates through email"
                />
                <SettingItem
                  icon={<RefreshCcw className="text-blue-600 w-6 h-6" />}
                  title="Update System Notification"
                  description="You will be notified when customer order any product"
                  checked
                />
                <SettingItem
                  icon={<Globe className="text-blue-600 w-6 h-6" />}
                  title="Language Change"
                  description="You will be notified when customer order any product"
                  checked
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-10">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition">
                  Cancel
                </button>
                <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
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

// Komponen untuk setiap item pengaturan
function SettingItem({ icon, title, description, checked }) {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-blue-100 rounded-md">{icon}</div>
        <div>
          <h4 className="font-semibold text-gray-800">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      {/* Toggle dengan animasi */}
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked={checked} />
        <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-colors duration-300" />
        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform duration-300" />
      </label>
    </div>
  );
}
