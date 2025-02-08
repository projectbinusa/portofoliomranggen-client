import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { API_GURU } from "../utils/BaseUrl";

const TambahGuru = () => {
  const navigate = useNavigate();
  const idAdmin = localStorage.getItem("adminId") || "";

  const [formData, setFormData] = useState({
    namaGuru: "",
    nip: "",
    alamat: "",
    nomerHp: "",
    tahunDiterima: "",
    lamaKerja: "",
  });

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value); // Log perubahan input
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
  
    // Log formData untuk memastikan semuanya terisi
    console.log(formData);
  
    try {
      const response = await fetch(`${API_GURU}/tambah/${idAdmin}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, lamaKerja: parseInt(formData.lamaKerja, 10) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Gagal menambahkan data guru");
      Swal.fire("Sukses", "Data guru berhasil ditambahkan!", "success");
      setTimeout(() => navigate("/guru"), 1000);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };
  

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Tambah Guru</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((key) => (
              <div key={key} className="flex flex-col">
                 <label className="w-1/3 text-gray-700 text-sm font-medium text-left capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={key === "lamaKerja" ? "number" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={`Masukkan ${key.replace(/([A-Z])/g, " $1").trim()}`}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <div className="flex justify-end space-x-2 mt-4">
              <button type="button" onClick={() => navigate("/guru")} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                Batal
              </button>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahGuru;
