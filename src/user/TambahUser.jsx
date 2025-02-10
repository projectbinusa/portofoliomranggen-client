import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const API_USER = "http://localhost:4321/api/user";

const TambahUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    adminId: "",
    username: "",
    email: "",
    password: "",
    id: 0, // Sesuai dengan curl request
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.adminId || !user.username || !user.email || !user.password) {
      Swal.fire("Gagal!", "Semua field harus diisi.", "error");
      return;
    }

    try {
      const response = await axios.post(`${API_USER}/tambah`, user);
      console.log("Response Data:", response.data);

      if (response.status === 200 || response.status === 201) {
        Swal.fire("Sukses!", "User berhasil ditambahkan.", "success").then(() => {
          navigate("/user");
        });
      }
    } catch (error) {
      console.error("Error:", error);
      console.error("Response Data:", error.response?.data);
      Swal.fire("Gagal!", error.response?.data?.message || "Terjadi kesalahan di server.", "error");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Tambah User</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Admin ID", name: "adminId", type: "number" },
              { label: "Username", name: "username", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" },
            ].map(({ label, name, type }) => (
              <div key={name} className="flex flex-col">
                <label className="text-sm text-gray-600 font-medium">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={user[name]}
                  onChange={handleChange}
                  className="mt-1 border rounded-md p-2 focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            ))}
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
