import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../tampilan/Navbar";
import UserProfileBackLeft from "../profil/UserProfileBackLeft";
import UserProfileBackRight from "../profil/UserProfileBackRight";
import ProfileCard from "../profil/ProfileCard";
import ProfileForm from "../profil/ProfileForm";
import SkillsSection from "../profil/SkillsSection";
import ProfileSidebar from "../profil/ProfileSidebar";
import { API_ADMIN } from "../utils/BaseUrl";

export default function ProfilePage() {
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
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex space-x-4 p-6">
          <div className="relative flex-1 p-8">
            <UserProfileBackLeft className="absolute top-0 left-0 z-0" />
            <UserProfileBackRight className="absolute bottom-0 right-0 z-0" />

            {/* Card Utama */}
            <div className="relative z-10 w-full max-w-6xl shadow-lg p-8 flex gap-10 mx-auto bg-white rounded-lg">
              {/* Sidebar Profil dan ProfileCard dijadikan satu */}
              <div className="w-1/3 flex flex-col items-center">
                <ProfileCard fotoProfil={fotoProfil} formData={formData} onFotoChange={handleFotoChange} />
                <ProfileSidebar />
              </div>

              {/* Formulir dan Skills */}
              <div className="w-2/3">
                <ProfileForm formData={formData} onChange={handleChange} />
                <SkillsSection />
                <div className="mt-6">
                  <h3 className="text-lg font-semibold">Note</h3>
                  <textarea
                    id="note"
                    className="w-full p-3 rounded-lg border"
                    rows="4"
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Tambahkan catatan..."
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
