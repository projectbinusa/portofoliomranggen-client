import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { API_STAFF, API_NOTIFICATION } from "../utils/BaseUrl";
import { useNotification } from "../context/NotificationContext"; // ✅ Disamakan

const TambahStaff = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // ✅ Gunakan notifikasi WebSocket
  const [staff, setStaff] = useState({
    nama: "",
    alamat: "",
    noTelepon: "",
    awalBekerja: "",
    lamaKerja: "",
    createDate: "",
  });

  const userLogin = sessionStorage.getItem("username") || "Admin"; // ✅ Sama seperti TambahSiswa.js

  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!staff.nama.trim() || !staff.alamat.trim() || !staff.noTelepon.trim()) {
      Swal.fire("Peringatan", "Nama, Alamat, dan No Telepon wajib diisi!", "warning");
      return;
    }

    if (!/^\d+$/.test(staff.noTelepon)) {
      Swal.fire("Peringatan", "No Telepon harus berupa angka!", "warning");
      return;
    }

    if (staff.lamaKerja && (isNaN(staff.lamaKerja) || staff.lamaKerja < 0)) {
      Swal.fire("Peringatan", "Lama kerja harus berupa angka positif!", "warning");
      return;
    }

    const formattedData = {
      ...staff,
      awalBekerja: staff.awalBekerja ? `${staff.awalBekerja}T00:00:00` : new Date().toISOString(),
      createDate: staff.createDate ? `${staff.createDate}T00:00:00` : new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_STAFF}/tambah`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menambahkan staff");
      }

      // 🔥 Notifikasi real-time (Disamakan dengan TambahSiswa.js)
      if (addNotification) {
        addNotification(`${userLogin} menambahkan staff baru: ${formattedData.nama}`, "success");
      } else {
        await fetch(`${API_NOTIFICATION}/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            message: `${userLogin} menambahkan staff baru: ${formattedData.nama}`, 
            type: "success" 
          }),
        });
      }

      Swal.fire("Sukses", "Data staf berhasil ditambahkan!", "success");
      setTimeout(() => navigate("/staff"), 1000);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Tambah Staff</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(staff).map((key) => (
              <div key={key} className="flex flex-col">
                <label className="text-gray-700 text-sm font-medium text-left capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={
                    key === "lamaKerja"
                      ? "number"
                      : key.includes("Date") || key.includes("awalBekerja")
                      ? "date"
                      : "text"
                  }
                  name={key}
                  value={staff[key]}
                  onChange={handleChange}
                  placeholder={`Masukkan ${key.replace(/([A-Z])/g, " $1").trim()}`}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={() => navigate("/staff")}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
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

export default TambahStaff;
