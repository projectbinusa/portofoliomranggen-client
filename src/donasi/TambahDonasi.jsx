import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { API_DONASI } from "../utils/BaseUrl";

const TambahDonasi = () => {
  const navigate = useNavigate();
  const idAdmin = localStorage.getItem("adminId") || "";

  const [formData, setFormData] = useState({
    namaDonasi: "",
    namaDonatur: "",
    jumlahDonasi: "",
    deskripsi: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idAdmin) {
      Swal.fire("Error", "ID Admin tidak ditemukan!", "error");
      return;
    }
    if (Object.values(formData).some((value) => !value)) {
      Swal.fire("Error", "Semua kolom harus diisi!", "error");
      return;
    }

    try {
      const response = await fetch(`${API_DONASI}/tambah/${idAdmin}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Gagal menambahkan donasi");
      Swal.fire("Sukses", "Data donasi berhasil ditambahkan!", "success");
      setTimeout(() => navigate("/donasi"), 1000);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Tambah Donasi</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col">
                <label className="w-1/3 text-gray-700 text-sm font-medium text-left capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={key === "jumlahDonasi" ? "number" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={`Masukkan ${key.replace(/([A-Z])/g, " $1").trim()}`}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <div className="flex justify-between space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/donasi")}
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

export default TambahDonasi;
