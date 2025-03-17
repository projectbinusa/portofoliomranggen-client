import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { API_ORGANISASI } from "../utils/BaseUrl";
import { useNotification } from "../context/NotificationContext"; // 🔔 Import Notifikasi

const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const TambahOrganisasi = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // 🔔 Inisialisasi Notifikasi

  const [organisasi, setOrganisasi] = useState({
    namaOrganisasi: "",
    lokasi: "",
    email: "",
    telepon: "",
  });

  const handleChange = (e) => {
    setOrganisasi({ ...organisasi, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\d+$/.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(organisasi).some((val) => val.trim() === "")) {
      Swal.fire("Gagal!", "Semua field harus diisi.", "error");
      return;
    }

    if (!validateEmail(organisasi.email)) {
      Swal.fire("Gagal!", "Format email tidak valid.", "error");
      return;
    }

    if (!validatePhone(organisasi.telepon)) {
      Swal.fire(
        "Gagal!",
        "Nomor telepon harus berupa angka 10-15 digit.",
        "error"
      );
      return;
    }

    const formattedData = {
      ...organisasi,
      namaOrganisasi: toCamelCase(organisasi.namaOrganisasi),
      lokasi: toCamelCase(organisasi.lokasi),
    };

    try {
      const response = await fetch(`${API_ORGANISASI}/tambah`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan organisasi. Silakan coba lagi.");
      }

      addNotification("Organisasi baru berhasil ditambahkan", "success"); // 🔔 Kirim Notifikasi

      Swal.fire("Sukses!", "Organisasi berhasil ditambahkan.", "success").then(
        () => {
          navigate("/organisasi");
        }
      );
    } catch (error) {
      Swal.fire("Gagal!", error.message, "error");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">
            Tambah Organisasi
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(organisasi).map((key) => (
              <div key={key} className="flex flex-col">
                <label className="text-gray-700 text-sm font-medium text-left capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={
                    key === "email"
                      ? "email"
                      : key === "telepon"
                      ? "tel"
                      : "text"
                  }
                  name={key}
                  value={organisasi[key]}
                  onChange={handleChange}
                  placeholder={`Masukkan ${key
                    .replace(/([A-Z])/g, " $1")
                    .trim()}`}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            ))}
            <div className="flex justify-between space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/organisasi")}
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

export default TambahOrganisasi;
