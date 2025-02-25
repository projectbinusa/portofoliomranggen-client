import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { API_USER } from "../utils/BaseUrl";
import { useNotification } from "../context/NotificationContext"; // ✅ Import yang benar

const TambahUser = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // ✅ Gunakan useNotification
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    adminId: "",
    username: "",
    email: "",
    password: "",
  });

  const userLogin = sessionStorage.getItem("username") || "Admin"; // 🔥 Ambil user login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🚨 Validasi input
    if (Object.values(user).some((value) => !value)) {
      Swal.fire("Error", "Semua kolom harus diisi!", "error");
      setLoading(false);
      return;
    }

    if (!isValidEmail(user.email)) {
      Swal.fire("Error", "Format email tidak valid!", "error");
      setLoading(false);
      return;
    }

    if (user.password.length < 6) {
      Swal.fire("Error", "Password minimal 6 karakter!", "error");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_USER}/tambah`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log("✅ Response API:", data);

      if (!response.ok) throw new Error(data.message || "Gagal menambahkan user");

      // 🔥 Kirim notifikasi ke backend
      if (addNotification) {
        addNotification(`${userLogin} menambahkan user baru: ${user.username}`, "success");
      }

      Swal.fire("Sukses", "User berhasil ditambahkan!", "success").then(() => {
        navigate("/user");
      });
    } catch (error) {
      console.error("❌ Error saat menambahkan user:", error);
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Tambah User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Admin ID", name: "adminId", type: "number" },
              { label: "Username", name: "username", type: "text" },
              { label: "Email", name: "email", type: "email" },
            ].map(({ label, name, type }) => (
              <div key={name} className="flex flex-col">
                <label className="text-gray-700 text-sm font-medium text-left">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={user[name]}
                  onChange={handleChange}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            {/* Input Password */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium text-left">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-between space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/user")}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                disabled={loading}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahUser;
