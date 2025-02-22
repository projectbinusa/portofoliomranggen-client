import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css"; // Import FontAwesome
import Sidebar from "../components/Sidebar";
import { useNotification } from "../context/NotificationContext"; // ✅ Import Notifikasi

const API_USER = "http://localhost:4321/api/user"; // Pastikan backend berjalan

const TambahUser = () => {
  const navigate = useNavigate();
  const { sendNotification } = useNotification(); // ✅ Ganti dari sendNotification ke addNotification
  const [user, setUser] = useState({
    adminId: "", // Bisa diisi otomatis dari session jika perlu
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🚀 Data yang dikirim:", user); // Debugging

    // Validasi input
    if (!user.adminId || !user.username || !user.email || !user.password) {
      Swal.fire("Gagal!", "Semua field harus diisi.", "error");
      return;
    }

    try {
      const response = await axios.post(`${API_USER}/tambah`, user);
      console.log("✅ Response API:", response); // Debugging

      if (response.status === 200 || response.status === 201) {
        // ✅ Kirim notifikasi setelah berhasil menambahkan user
        sendNotification(`User ${user.username} berhasil ditambahkan`, "success");

        Swal.fire("Sukses!", "User berhasil ditambahkan.", "success").then(() => {
          navigate("/user");
        });
      }
    } catch (error) {
      console.error("❌ Error API:", error.response?.data || error.message || error); // Debugging
      Swal.fire("Gagal!", error.response?.data?.message || "Terjadi kesalahan di server.", "error");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">Tambah User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[{ label: "Admin ID", name: "adminId", type: "number" },
              { label: "Username", name: "username", type: "text" },
              { label: "Email", name: "email", type: "email" }].map(({ label, name, type }) => (
              <div key={name} className="flex flex-col items-start">
                <label className="text-sm text-gray-600 font-medium mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={user[name]}
                  onChange={handleChange}
                  className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            ))}

            {/* Input Password dengan Icon Mata */}
            <div className="flex flex-col items-start relative">
              <label className="text-sm text-gray-600 font-medium mb-1">Password</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 w-full pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`} />
                </button>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                onClick={() => navigate("/user")}
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahUser;
