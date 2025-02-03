// src/pages/EditOrganisasi.jsx

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar"; // Pastikan path ini sesuai dengan lokasi Sidebar Anda

function EditOrganisasi({ organisasiList, setOrganisasiList }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { organisasi, index } = location.state || {}; // Ambil data dari state

  const [editedOrganisasi, setEditedOrganisasi] = useState({
    namaOrganisasi: "",
    lokasi: "",
    email: "",
    telepon: "",
  });

  useEffect(() => {
    if (organisasi) {
      setEditedOrganisasi(organisasi); // Set form dengan data organisasi yang ingin diedit
    }
  }, [organisasi]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOrganisasi((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateOrganisasi = () => {
    if (Object.values(editedOrganisasi).some((value) => value.trim() === "")) {
      Swal.fire({ icon: "warning", title: "Semua data harus diisi!" });
      return;
    }

    if (organisasiList && setOrganisasiList) {
      const updatedOrganisasi = [...organisasiList];
      updatedOrganisasi[index] = editedOrganisasi; // Update organisasi yang sudah ada
      setOrganisasiList(updatedOrganisasi);
    }

    Swal.fire({ icon: "success", title: "Data berhasil diperbarui!" }).then(() => {
      navigate("/organisasi");
    });
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Menambahkan Sidebar di sini */}
      <div className="flex-1 p-6">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4">
            Edit Organisasi
          </h1>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="namaOrganisasi"
              value={editedOrganisasi.namaOrganisasi}
              onChange={handleInputChange}
              placeholder="Nama Organisasi"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lokasi"
              value={editedOrganisasi.lokasi}
              onChange={handleInputChange}
              placeholder="Lokasi"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              value={editedOrganisasi.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="telepon"
              value={editedOrganisasi.telepon}
              onChange={handleInputChange}
              placeholder="Telepon"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-4">
              <button
                onClick={handleUpdateOrganisasi}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Simpan Perubahan
              </button>
              <button
                onClick={() => navigate("/organisasi")}
                className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditOrganisasi;
