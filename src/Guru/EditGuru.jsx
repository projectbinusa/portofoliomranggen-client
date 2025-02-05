import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar"; // Pastikan path ke Sidebar sesuai
import { API_GURU } from "../utils/BaseUrl"; // Sesuaikan dengan konfigurasi API

const EditGuru = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil ID guru dari URL
  const [formData, setFormData] = useState({
    namaGuru: "",
    nip: "",
    alamat: "",
    nomerHp: "",
    tahunDiterima: "",
    lamaKerja: "",
  });

  // Ambil data guru berdasarkan ID dari API
  useEffect(() => {
    const fetchGuru = async () => {
      try {
        const response = await fetch(`${API_GURU}/getById/${id}`); // Panggil endpoint dengan /getById/{id}
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data guru");
        }

        // Pastikan data yang diterima cocok dengan formData
        setFormData({
          namaGuru: data.namaGuru || "",
          nip: data.nip || "",
          alamat: data.alamat || "",
          nomerHp: data.nomerHp || "",
          tahunDiterima: data.tahunDiterima || "",
          lamaKerja: data.lamaKerja || "",
        });
      } catch (error) {
        console.error("Error saat mengambil data guru:", error);
        Swal.fire("Error", error.message, "error");
      }
    };

    if (id) fetchGuru();
  }, [id]);

  // Handle input form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => !value)) {
      Swal.fire("Error", "Semua kolom harus diisi!", "error");
      return;
    }

    try {
      const response = await fetch(`${API_GURU}/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Gagal memperbarui data guru");
      }

      Swal.fire("Sukses", "Data guru berhasil diperbarui!", "success");

      setTimeout(() => {
        navigate("/guru");
      }, 1000);
    } catch (error) {
      console.error("Error saat memperbarui data guru:", error);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="flex h-full bg-white">
      <Sidebar />

      <div className="flex-1 flex justify-center items-center p-6">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl ml-60 border border-gray-300">
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Guru</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.entries({
              namaGuru: "Nama",
              nip: "NIP",
              alamat: "Alamat",
              nomerHp: "Nomor HP",
              tahunDiterima: "Tahun Diterima",
              lamaKerja: "Lama Kerja (Tahun)",
            }).map(([key, label]) => (
              <div key={key} className="flex items-center border-b border-gray-200 py-2">
                <label className="w-48 text-gray-700">{label}</label>
                <input
                  type={key === "tahunDiterima" || key === "lamaKerja" ? "number" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-[500px] p-2 border rounded-lg"
                />
              </div>
            ))}

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

export default EditGuru;
