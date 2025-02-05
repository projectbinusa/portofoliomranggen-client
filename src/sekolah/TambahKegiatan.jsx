import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";

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
    setKegiatan({ ...kegiatan, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !kegiatan.nama ||
      !kegiatan.deskripsi ||
      !kegiatan.tingkat ||
      !kegiatan.penyelenggara ||
      !kegiatan.penanggungJawab ||
      !kegiatan.hasil
    ) {
      Swal.fire({
        title: "Gagal!",
        text: "Semua field harus diisi.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    // Simulate successful form submission
    Swal.fire({
      title: "Sukses!",
      text: "Kegiatan berhasil ditambahkan.",
      icon: "success",
      confirmButtonText: "Ok",
    }).then(() => {
      navigate("/kegiatan-sekolah");
    });
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
