import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_STAFF, API_NOTIFICATION } from "../utils/BaseUrl"; // Pastikan API_NOTIFICATION sudah didefinisikan
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { useNotification } from "../context/NotificationContext"; // Pastikan ini tersedia

// Fungsi untuk mengubah teks menjadi format Camel Case
const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const TambahStaff = () => {
  const [staff, setStaff] = useState({
    nama: "",
    alamat: "",
    noTelepon: "",
    awalBekerja: "",
    lamaKerja: "",
    createDate: "",
  });

  const navigate = useNavigate();
  const { sendNotification, isConnected } = useNotification(); // Gunakan notifikasi WebSocket

  // Handle perubahan input
  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input tidak boleh kosong
    if (Object.values(staff).some((value) => !value)) {
      Swal.fire("Error", "Semua kolom harus diisi!", "error");
      return;
    }

    // Format data sebelum dikirim
    const formattedData = {
      ...staff,
      nama: toCamelCase(staff.nama),
      alamat: toCamelCase(staff.alamat),
      awalBekerja: staff.awalBekerja.includes("T")
        ? staff.awalBekerja
        : `${staff.awalBekerja}T00:00:00`,
      createDate: staff.createDate.includes("T")
        ? staff.createDate
        : `${staff.createDate}T00:00:00`,
    };

    try {
      // Kirim data staff ke backend
      const response = await fetch(`${API_STAFF}/tambah`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menambahkan staff");
      }

      // Jika WebSocket tersambung, kirim notifikasi langsung
      if (isConnected) {
        sendNotification(`Staff ${formattedData.nama} berhasil ditambahkan!`, "success");
      } else {
        // Jika WebSocket gagal, fallback ke request HTTP
        await fetch(`${API_NOTIFICATION}/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: `Staff ${formattedData.nama} telah ditambahkan!`,
            type: "success",
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
