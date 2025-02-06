import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { API_GURU } from "../utils/BaseUrl";

const TambahGuru = () => {
  const navigate = useNavigate();

  // Get admin data from localStorage
  const idAdmin = (localStorage.getItem("adminId"));
 
  useEffect(() => {
    console.log("idAdmin:", idAdmin);
  }, [idAdmin]);

  const [formData, setFormData] = useState({
    namaGuru: "",
    nip: "",
    alamat: "",
    nomerHp: "",
    tahunDiterima: "",
    lamaKerja: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

    const formDataWithLamaKerja = {
      ...formData,
      lamaKerja: parseInt(formData.lamaKerja, 10),
    };

    try {
      const response = await fetch(`${API_GURU}/tambah/${idAdmin}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithLamaKerja),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Gagal menambahkan data guru");
      }

      Swal.fire("Sukses", "Data guru berhasil ditambahkan!", "success");
      setTimeout(() => navigate("/guru"), 1000);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-5 flex justify-center items-start ml-60">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl border border-gray-300">
          <h2 className="text-2xl font-bold mb-6 text-center">Tambah Guru</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {Object.keys(formData).map((key) => {
                const label = key.replace(/([A-Z])/g, " $1").toLowerCase().replace(/^./, (str) => str.toUpperCase());
                return (
                  <div key={key} className="flex items-center">
                    <label className="w-48 text-gray-700 capitalize">{label}</label>
                    <input
                      type={key === "lamaKerja" ? "number" : "text"}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      placeholder={`Masukkan ${label}`}
                      className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/guru")}
                className="w-32 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="w-32 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
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

export default TambahGuru;
