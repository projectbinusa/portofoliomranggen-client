import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Eye, EyeOff } from "lucide-react";
import { useNotification } from "../context/NotificationContext"; // Import WebSocket Notifikasi

const API_USER = "http://localhost:4321/api/user";
const API_NOTIFICATION = "http://localhost:4321/api/notification"; // Endpoint notifikasi

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [originalUser, setOriginalUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  const { addNotification, isConnected } = useNotification(); // Gunakan WebSocket untuk notifikasi

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_USER}/${id}`);
        setUser(response.data);
        setOriginalUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        Swal.fire("Error", "Gagal mengambil data user.", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const isDataChanged = () => {
    return JSON.stringify(user) !== JSON.stringify(originalUser);
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.username.trim() || !user.email.trim() || !user.password.trim()) {
      Swal.fire("Peringatan", "Semua field harus diisi!", "warning");
      return;
    }

    if (!isValidEmail(user.email)) {
      Swal.fire("Peringatan", "Format email tidak valid!", "warning");
      return;
    }

    if (user.password.length < 6) {
      Swal.fire("Peringatan", "Password minimal 6 karakter!", "warning");
      return;
    }

    if (!isDataChanged()) {
      Swal.fire("Info", "Tidak ada perubahan yang dilakukan.", "info");
      return;
    }

    try {
      const response = await axios.put(`${API_USER}/edit/${id}`, user);

      if (response.status === 200) {
        // Kirim notifikasi jika WebSocket terhubung
        if (isConnected) {
          addNotification(`User ${user.username} berhasil diperbarui!`, "success");
        } else {
          // Jika WebSocket gagal, fallback ke HTTP request
          await axios.post(`${API_NOTIFICATION}/add`, {
            message: `User ${user.username} telah diperbarui!`,
            type: "success",
          });
        }

        Swal.fire("Sukses!", "Data user berhasil diperbarui.", "success").then(() => {
          navigate("/user");
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire("Error", "Gagal memperbarui data.", "error");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Edit User</h2>
          {isLoading ? (
            <p className="text-center text-gray-600">Loading data user...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input Username & Email */}
              {[
                { label: "Username", name: "username", type: "text" },
                { label: "Email", name: "email", type: "email" },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex flex-col">
                  <label className="text-sm text-gray-600 font-medium mb-1">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={user[name]}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              {/* Input Password */}
              <div className="flex flex-col relative">
                <label className="text-sm text-gray-600 font-medium mb-1">Password</label>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full pr-10 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>
              {/* Tombol Simpan & Batal */}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                  onClick={() => navigate("/user")}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Simpan
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUser;
