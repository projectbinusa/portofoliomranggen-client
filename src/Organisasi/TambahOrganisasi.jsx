import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Impor Sidebar
import Swal from "sweetalert2"; // Import SweetAlert2

const TambahOrganisasi = () => {
  const [newOrganisasi, setNewOrganisasi] = useState({
    namaOrganisasi: "",
    lokasi: "",
    email: "",
    telepon: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrganisasi((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrganisasi = () => {
    if (
      !newOrganisasi.namaOrganisasi ||
      !newOrganisasi.lokasi ||
      !newOrganisasi.email ||
      !newOrganisasi.telepon
    ) {
      Swal.fire({ icon: "warning", title: "Semua data harus diisi!" });
      return;
    }

    Swal.fire({ icon: "success", title: "Organisasi berhasil ditambahkan!" }).then(() => {
      navigate("/organisasi"); // Kembali ke halaman daftar organisasi setelah sukses
    });
  };

  const handleCancel = () => {
    navigate("/organisasi"); // Kembali ke halaman daftar organisasi jika batal
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Menambahkan Sidebar di sini */}
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 flex-1">
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Tambah Organisasi
        </h1>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="namaOrganisasi"
            value={newOrganisasi.namaOrganisasi}
            onChange={handleInputChange}
            placeholder="Nama Organisasi"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="lokasi"
            value={newOrganisasi.lokasi}
            onChange={handleInputChange}
            placeholder="Lokasi"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={newOrganisasi.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="telepon"
            value={newOrganisasi.telepon}
            onChange={handleInputChange}
            placeholder="Nomor Telepon"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-between">
            <button
              onClick={handleAddOrganisasi}
              className="w-48 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Tambah Organisasi
            </button>
            <button
              onClick={handleCancel}
              className="w-48 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahOrganisasi;
