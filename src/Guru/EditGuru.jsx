import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { API_GURU } from "../utils/BaseUrl"; // Import API URL

const EditGuru = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const idAdmin = localStorage.getItem("adminId"); // Ambil idAdmin dari localStorage
  const [formData, setFormData] = useState({
    namaGuru: "",
    nip: "",
    alamat: "",
    nomerHp: "",
    tahunDiterima: "",
    lamaKerja: "",
    idAdmin: idAdmin || "", // Pastikan idAdmin dikirim
  });

  useEffect(() => {
    const fetchGuru = async () => {
      try {
        const response = await fetch(`${API_GURU}/getById/${id}`);
        const data = await response.json();
        if (response.ok) {
          setFormData({ ...data, idAdmin: idAdmin || "" }); // Tambahkan idAdmin ke formData
        } else {
          throw new Error("Guru tidak ditemukan");
        }
      } catch (error) {
        Swal.fire({ title: "Error", text: error.message, icon: "error", confirmButtonText: "OK" });
        navigate("/guru");
      }
    };
    fetchGuru();
  }, [id, navigate, idAdmin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.namaGuru || !formData.nip || !formData.alamat || !formData.nomerHp || !formData.tahunDiterima || !formData.lamaKerja) {
      Swal.fire({ title: "Error", text: "Semua kolom harus diisi!", icon: "error", confirmButtonText: "OK" });
      return;
    }

    try {
      const response = await fetch(`${API_GURU}/edit/${id}/${idAdmin}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tahunDiterima: parseInt(formData.tahunDiterima, 10),
          lamaKerja: parseInt(formData.lamaKerja, 10),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({ title: "Sukses!", text: "Guru berhasil diperbarui.", icon: "success", confirmButtonText: "OK" }).then(() => navigate("/guru"));
      } else {
        throw new Error(data.message || "Gagal memperbarui data guru");
      }
    } catch (error) {
      Swal.fire({ title: "Error", text: error.message, icon: "error", confirmButtonText: "OK" });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center ml-20">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Edit Guru</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {["namaGuru", "nip", "alamat", "nomerHp", "tahunDiterima", "lamaKerja"].map((field) => (
              <div key={field} className="grid grid-cols-3 items-center gap-4">
                <label htmlFor={field} className="text-gray-700 font-medium text-right pr-4">
                  {field === "tahunDiterima" ? "Tahun Diterima" : field === "lamaKerja" ? "Lama Kerja (Tahun)" : field.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type={field === "tahunDiterima" || field === "lamaKerja" ? "number" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="col-span-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            ))}
            <div className="flex justify-end mt-6 space-x-4">
              <button type="button" onClick={() => navigate("/guru")} className="px-6 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-200 transition">Batal</button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditGuru;
