import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { API_KEGIATAN } from "../utils/BaseUrl"; // Ensure the correct base URL is imported

const TambahKegiatan = () => {
  const [kegiatan, setKegiatan] = useState({
    nama: "",
    deskripsi: "",
    tingkat: "",
    penyelenggara: "",
    penanggungJawab: "",
    hasil: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKegiatan((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_KEGIATAN}/tambah`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kegiatan),
      });

      const data = await response.json();
      if (response.ok) {
        // If the response is successful
        Swal.fire("Sukses", "Data kegiatan berhasil ditambahkan!", "success");
        setTimeout(() => navigate("/kegiatan-sekolah"), 1000); // Navigate after 1 second
      } else {
        // If response is not ok (status code other than 2xx)
        throw new Error(data.message || "Gagal menambahkan data kegiatan");
      }
    } catch (error) {
      // Show error if any
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="flex">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-1 p-8 ml-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tambah Kegiatan Sekolah</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[ 
            { label: "Nama Kegiatan", name: "nama", type: "text" },
            { label: "Deskripsi", name: "deskripsi", type: "text" },
            { label: "Tingkat", name: "tingkat", type: "text" },
            { label: "Penyelenggara", name: "penyelenggara", type: "text" },
            { label: "Penanggung Jawab", name: "penanggungJawab", type: "text" },
            { label: "Hasil", name: "hasil", type: "text" },
          ].map((field) => (
            <div key={field.name} className="flex items-center gap-4">
              <label className="w-1/5 text-gray-700 font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={kegiatan[field.name]}
                onChange={handleChange}
                className="w-4/5 border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="text-black font-semibold hover:underline"
              onClick={() => navigate("/kegiatan-sekolah")}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahKegiatan;
