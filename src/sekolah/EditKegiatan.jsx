import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";

const kegiatanSekolah = [
  {
    id: 1,
    nama: "Lomba Sains",
    deskripsi: "Kompetisi sains tingkat sekolah",
    tingkat: "Sekolah",
    penyelenggara: "OSIS",
    penanggungJawab: "Pak Budi",
    hasil: "Piala & Sertifikat",
  },
  {
    id: 2,
    nama: "Lomba Basket",
    deskripsi: "Turnamen basket antar kelas",
    tingkat: "Sekolah",
    penyelenggara: "Ekstrakurikuler Basket",
    penanggungJawab: "Bu Siti",
    hasil: "Medali",
  },
  {
    id: 3,
    nama: "Olimpiade Matematika",
    deskripsi: "Kompetisi matematika tingkat nasional",
    tingkat: "Nasional",
    penyelenggara: "Dinas Pendidikan",
    penanggungJawab: "Pak Joko",
    hasil: "Sertifikat & Beasiswa",
  },
];

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
    const selectedKegiatan = kegiatanSekolah.find((kegiatan) => kegiatan.id === parseInt(id));
    if (selectedKegiatan) {
      setKegiatan(selectedKegiatan);
    } else {
      Swal.fire({
        title: "Tidak Ditemukan",
        text: "Kegiatan dengan ID tersebut tidak ditemukan.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      navigate("/kegiatan-sekolah");
    }
  }, [id, navigate]);

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
        title: "Error",
        text: "Semua kolom harus diisi!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      title: "Sukses!",
      text: "Kegiatan berhasil diperbarui.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/kegiatan-sekolah");
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center ml-20"> {/* Geser form ke kanan */}
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
            Edit Kegiatan Sekolah
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { label: "Nama Kegiatan", name: "nama" },
              { label: "Deskripsi", name: "deskripsi" },
              { label: "Tingkat", name: "tingkat" },
              { label: "Penyelenggara", name: "penyelenggara" },
              { label: "Penanggung Jawab", name: "penanggungJawab" },
              { label: "Hasil", name: "hasil" },
            ].map((field) => (
              <div key={field.name} className="grid grid-cols-3 items-center gap-4">
                <label htmlFor={field.name} className="text-gray-700 font-medium text-right pr-4">
                  {field.label}
                </label>
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={kegiatan[field.name]}
                  onChange={handleChange}
                  className="col-span-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            ))}

            <div className="flex justify-end mt-6 space-x-4">
              <button
                type="button"
                onClick={() => navigate("/kegiatan-sekolah")}
                className="px-6 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-200 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
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
