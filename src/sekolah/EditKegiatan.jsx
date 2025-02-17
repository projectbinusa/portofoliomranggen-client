import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { API_KEGIATAN } from "../utils/BaseUrl";

const EditKegiatan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [kegiatan, setKegiatan] = useState({
    nama: "",
    deskripsi: "",
    tingkat: "",
    penyelenggara: "",
    penanggungJawab: "",
    hasil: "",
  });

  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        const response = await fetch(`${API_KEGIATAN}/getById/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error("Kegiatan tidak ditemukan");
        delete data.id; // Pastikan ID tidak dimasukkan ke dalam state
        setKegiatan(data);
      } catch (error) {
        Swal.fire("Error", error.message, "error");
        navigate("/kegiatan-sekolah");
      }
    };
    fetchKegiatan();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKegiatan((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(kegiatan).some((value) => !value.trim())) {
      Swal.fire("Error", "Semua kolom harus diisi!", "error");
      return;
    }

    try {
      const response = await fetch(`${API_KEGIATAN}/editById/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kegiatan),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Gagal memperbarui kegiatan");

      Swal.fire("Sukses", "Data kegiatan berhasil diperbarui!", "success");
      setTimeout(() => navigate("/kegiatan-sekolah"), 1000);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Edit Kegiatan Sekolah</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(kegiatan).map((key) => (
              key !== "id" && ( // Menghindari rendering input ID
                <div key={key} className="flex flex-col">
                  <label className="w-1/3 text-gray-700 text-sm font-medium text-left capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={kegiatan[key]}
                    onChange={handleChange}
                    placeholder={`Masukkan ${key.replace(/([A-Z])/g, " $1").trim()}`}
                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )
            ))}
            <div className="flex justify-between space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/kegiatan-sekolah")}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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

export default EditKegiatan;
