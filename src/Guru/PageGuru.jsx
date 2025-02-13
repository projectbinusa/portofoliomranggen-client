import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search, X } from "lucide-react";
import axios from "axios";
import { API_GURU } from "../utils/BaseUrl";

const PageGuru = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pageguru, setPageGuru] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4321/api/admin/guru/all")
      .then((response) => {
        setPageGuru(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDeletePageGuru = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data guru ini akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_GURU}/delete/${id}`)
          .then(() => {
            setPageGuru(pageguru.filter((guru) => guru.id !== id));
            Swal.fire("Dihapus!", "Data guru telah dihapus.", "success");
          })
          .catch((error) => {
            console.error("Error deleting guru:", error);
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
          });
      }
    });
  };

  const filteredGuru = pageguru.filter((guru) => {
    return (
      guru.namaGuru.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guru.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guru.alamat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guru.nomerHp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guru.tahunDiterima.toString().includes(searchTerm.toLowerCase()) ||
      guru.lamaKerja.toString().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-6 ml-40">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar Guru</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              onClick={() => navigate("/tambah-guru")}
            >
              Tambah Guru
            </button>
          </div>
              {/* Input Pencarian */}
              <div className="relative w-1/3 mb-4">
                  <input
                    type="text"
                    placeholder="Cari berdasarkan semua data..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-10 py-2 border border-black rounded-md focus:ring-1 focus:ring-gray-400 focus:outline-none"
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

          {/* Tabel Daftar Guru dengan border hitam */}
          <div className="relative overflow-x-auto shadow-md ml-1"> {/* Menambahkan margin kiri */}
            <table className="w-full text-sm text-left text-gray-700 border border-gray-400">
              <thead className="text-xs font-bold uppercase bg-gray-200 border-b border-gray-500">
                <tr>
                  <th className="px-6 py-3 border-r border-gray-400 text-center">No</th>
                  <th className="px-6 py-3 border-r border-gray-400 text-center">Nama</th>
                  <th className="px-6 py-3 border-r border-gray-400 text-center">NIP</th>
                  <th className="px-6 py-3 border-r border-gray-400 text-center">Alamat</th>
                  <th className="px-6 py-3 border-r border-gray-400 text-center">Nomor HP</th>
                  <th className="px-6 py-3 border-r border-gray-400 text-center">Tahun Diterima</th>
                  <th className="px-6 py-3 border-r border-gray-400 text-center">Lama Kerja</th>
                  <th className="px-6 py-3 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredGuru.length > 0 ? (
                  filteredGuru.map((guru, index) => (
                    <tr
                      key={guru.id}
                      className="bg-white border-b border-gray-400 hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 border-r border-gray-400">{index + 1}</td>
                      <td className="px-6 py-4 font-medium border-r border-gray-400">{guru.namaGuru}</td>
                      <td className="px-6 py-4 border-r border-gray-400">{guru.nip}</td>
                      <td className="px-6 py-4 border-r border-gray-400">{guru.alamat}</td>
                      <td className="px-6 py-4 border-r border-gray-400">{guru.nomerHp}</td>
                      <td className="px-6 py-4 border-r border-gray-400">{guru.tahunDiterima}</td>
                      <td className="px-6 py-4 border-r border-gray-400">{guru.lamaKerja}</td>
                      <td className="px-6 py-4 flex gap-3">
                        <Link to={`/edit-guru/${guru.id}`}>
                          <button className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                            <Pencil size={18} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeletePageGuru(guru.id)}
                          className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      Tidak ada data guru yang sesuai.
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

export default PageGuru;
