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
      <div className="flex-1 flex flex-col pl-72">
        <Navbar />
        <div className="flex-1 overflow-y-auto px-10 mt-6">
          <div className="relative max-w-7xl mx-auto">
            <UserProfileBackLeft className="absolute top-0 left-0 z-0" />
            <UserProfileBackRight className="absolute bottom-0 right-0 z-0" />

            {/* Card Utama */}
            <div className="relative z-10 w-full bg-white shadow-2xl p-12 rounded-3xl flex flex-col lg:flex-row gap-10">
              {/* Bagian Kiri */}
              <div className="lg:w-[35%] flex flex-col items-center space-y-6">
                <ProfileCard
                  fotoProfil={fotoProfil}
                  formData={formData}
                  onFotoChange={handleFotoChange}
                />
                <ProfileSidebar />
              </div>

              {/* Bagian Kanan */}
              <div className="lg:w-[65%] w-full space-y-8">
                <ProfileForm formData={formData} onChange={handleChange} />
                <SkillsSection />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Note</h3>
                  <textarea
                    id="note"
                    className="w-full p-4 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="5"
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
