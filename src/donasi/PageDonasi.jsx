import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Pencil, Trash2, Search, X } from "lucide-react";
import { API_DONASI } from "../utils/BaseUrl";
import Sidebar from "../components/Sidebar";

const PageDonasi = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [donasi, setDonasi] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4321/api/donasi/all")
      .then((response) => {
        setDonasi(response.data);
      })
      .catch((error) => {
        console.error("Error fetching donasi:", error);
      });
  }, []);

  const handleDeleteDonasi = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data donasi ini akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_DONASI}/delete/${id}`)
          .then(() => {
            setDonasi(donasi.filter((item) => item.id !== id));
            Swal.fire("Dihapus!", "Data donasi telah dihapus.", "success");
          })
          .catch((error) => {
            console.error("Error deleting donasi:", error);
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
          });
      }
    });
  };

  const filteredDonasi = donasi.filter((item) =>
    item.namaDonasi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Konten utama */}
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Daftar Donasi</h2>
        <div className="flex justify-end">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition mb-4"
            onClick={() => navigate("/tambah-donasi")}
          >
            Tambah Donasi
          </button>
        </div>
        <div className="relative w-1/3 mb-4">
          <input
            type="text"
            placeholder="Cari donasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-10 py-2 border border-black rounded-md focus:ring-2 focus:ring-black focus:outline-none"
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
        <table className="w-full text-sm text-left text-gray-700 border border-gray-400">
          <thead className="text-xs font-bold uppercase bg-gray-200 border-b border-gray-500">
            <tr>
              <th className="px-6 py-3 border-r border-gray-400 text-center">No</th>
              <th className="px-6 py-3 border-r border-gray-400 text-center">Nama Donasi</th>
              <th className="px-6 py-3 border-r border-gray-400 text-center">Deskripsi</th>
              <th className="px-6 py-3 border-r border-gray-400 text-center">Jumlah Donasi</th>
              <th className="px-6 py-3 border-r border-gray-400 text-center">Nama Donatur</th>
              <th className="px-6 py-3 border-r border-gray-400 text-center">Foto</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonasi.length > 0 ? (
              filteredDonasi.map((item, index) => (
                <tr
                  key={item.id}
                  className="bg-white border-b border-gray-400 hover:bg-gray-100"
                >
                  <td className="px-6 py-4 border-r border-gray-400 text-center">{index + 1}</td>
                  <td className="px-6 py-4 border-r border-gray-400">{item.namaDonasi}</td>
                  <td className="px-6 py-4 border-r border-gray-400">{item.deskripsi}</td>
                  <td className="px-6 py-4 border-r border-gray-400">Rp {item.jumlahDonasi}</td>
                  <td className="px-6 py-4 border-r border-gray-400">{item.namaDonatur}</td>
                  <td className="px-6 py-4 border-r border-gray-400">
                    <img
                      src={item.fotoUrl}
                      alt="donasi"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => navigate(`/edit-donasi/${item.id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteDonasi(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Tidak ada data donasi yang sesuai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PageDonasi;
