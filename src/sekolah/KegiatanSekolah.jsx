import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate here
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search, X } from "lucide-react";

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

const KegiatanSekolah = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate here

  const handleDeleteKegiatan = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data kegiatan ini akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // Filter out the deleted kegiatan
        const newKegiatanList = kegiatanSekolah.filter((kegiatan) => kegiatan.id !== id);
        Swal.fire("Dihapus!", "Data kegiatan telah dihapus.", "success");
        console.log(newKegiatanList); // This will log the updated array to the console.
      }
    });
  };

  const filteredKegiatan = kegiatanSekolah.filter((kegiatan) => {
    return (
      kegiatan.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kegiatan.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kegiatan.tingkat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kegiatan.penyelenggara.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kegiatan.penanggungJawab.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kegiatan.hasil.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-6 ml-64">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar Kegiatan Sekolah</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              onClick={() => navigate("/tambah-kegiatan")} // Navigate to the tambah kegiatan page
            >
              Tambah Kegiatan
            </button>
          </div>

          {/* Input Pencarian */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Cari berdasarkan semua data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2 border border-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5" />

            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Tabel Daftar Kegiatan */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-700 border border-gray-400">
              <thead className="text-xs font-bold uppercase bg-gray-200 border-b border-gray-500">
                <tr>
                  <th className="px-6 py-3 border-r border-gray-400">No</th>
                  <th className="px-6 py-3 border-r border-gray-400">Nama Kegiatan</th>
                  <th className="px-6 py-3 border-r border-gray-400">Deskripsi</th>
                  <th className="px-6 py-3 border-r border-gray-400">Tingkat</th>
                  <th className="px-6 py-3 border-r border-gray-400">Penyelenggara</th>
                  <th className="px-6 py-3 border-r border-gray-400">Penanggung Jawab</th>
                  <th className="px-6 py-3 border-r border-gray-400">Hasil</th>
                  <th className="px-6 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredKegiatan.length > 0 ? (
                  filteredKegiatan.map((kegiatan, index) => (
                    <tr
                      key={kegiatan.id}
                      className="bg-white border-b border-gray-400 hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 border-r border-gray-400">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 font-medium border-r border-gray-400">
                        {kegiatan.nama}
                      </td>
                      <td className="px-6 py-4 border-r border-gray-400">
                        {kegiatan.deskripsi}
                      </td>
                      <td className="px-6 py-4 border-r border-gray-400">
                        {kegiatan.tingkat}
                      </td>
                      <td className="px-6 py-4 border-r border-gray-400">
                        {kegiatan.penyelenggara}
                      </td>
                      <td className="px-6 py-4 border-r border-gray-400">
                        {kegiatan.penanggungJawab}
                      </td>
                      <td className="px-6 py-4 border-r border-gray-400">
                        {kegiatan.hasil}
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-3">
                        <Link to={`/edit-kegiatan/${kegiatan.id}`}>
                          <button className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                            <Pencil size={20} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteKegiatan(kegiatan.id)}
                          className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      Tidak ada data kegiatan yang sesuai.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KegiatanSekolah;
