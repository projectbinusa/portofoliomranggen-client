import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../tampilan/Navbar";
import PaymentMethods from "../payment/PaymentMethods";
import PaymentCard from "../payment/PaymentCard";
import ProfileCard from "../profil/ProfileCard";
import ProfileSidebar from "../profil/ProfileSidebar";
import { API_ADMIN } from "../utils/BaseUrl";

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("Card");
  const [paymentCards, setPaymentCards] = useState([
    { id: 1, name: "Selena Litten", last4: "3456", type: "MasterCard" },
    { id: 2, name: "Stebin Ben", last4: "7654", type: "Visa" },
  ]);
  const [selectedCard, setSelectedCard] = useState(paymentCards[1]?.id || null);

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
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-72">
        <Navbar />
        <div className="flex-1 overflow-y-auto px-8 py-10">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Kiri: Profil */}
            <div className="lg:w-[35%] w-full bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center space-y-6">
              <ProfileCard
                fotoProfil={fotoProfil}
                formData={formData}
                onFotoChange={handleFotoChange}
              />
              <ProfileSidebar />
            </div>

            {/* Kanan: Pembayaran */}
            <div className="lg:w-[65%] w-full bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Settings</h2>

              <PaymentMethods
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
              />

              <div className="mt-6 space-y-4">
                {paymentCards.map((card) => (
                  <PaymentCard
                    key={card.id}
                    card={card}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                  />
                ))}
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition">
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
