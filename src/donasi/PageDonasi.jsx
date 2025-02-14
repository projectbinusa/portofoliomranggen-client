import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search, X } from "lucide-react";
import axios from "axios";
import { API_DONASI } from "../utils/BaseUrl";

const PageDonasi = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pageDonasi, setPageDonasi] = useState([]);

  const idAdmin = localStorage.getItem("adminId");

  useEffect(() => {
    if (!idAdmin) {
      console.error("ID Admin tidak ditemukan!");
      return;
    }

    axios
      .get(`${API_DONASI}/getAllByAdmin/${idAdmin}`)
      .then((response) => {
        setPageDonasi(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [idAdmin]);

  const handleDeletePageDonasi = (id) => {
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
            setPageDonasi(pageDonasi.filter((donasi) => donasi.id !== id));
            Swal.fire("Dihapus!", "Data donasi telah dihapus.", "success");
          })
          .catch((error) => {
            console.error("Error deleting donasi:", error);
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
          });
      }
    });
  };

  const filteredDonasi = pageDonasi.filter((donasi) =>
    ["namaDonasi", "namaDonatur", "jumlahDonasi", "deskripsi"]
      .some((key) => donasi[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-6 ml-40">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar Donasi</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              onClick={() => navigate("/tambah-donasi")}
            >
              +
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

          {/* Tabel Daftar Donasi */}
          <div className="relative overflow-x-auto shadow-md ml-1">
            <table className="w-full text-sm text-left text-gray-700 border border-gray-400">
              <thead className="text-xs font-bold uppercase bg-gray-200 border-b border-gray-500">
                <tr>
                  <th className="px-6 py-3 border-r border-gray-400 text-center">No</th>
                  <th className="px-6 py-3 border-r border-gray-400 text-center">Nama Donasi</th>
                  <th className="px-6 py-3 border-r border-gray-400 text-center">Nama Donatur</th>
                  <th className="px-6 py-3 border-r border-gray-400 text-center">Jumlah Donasi</th>
                  <th className="px-6 py-3 border-r border-gray-400 text-center">Foto</th>
                  <th className="px-6 py-3 border-r border-gray-400 text-center">Deskripsi</th>
                  <th className="px-6 py-3 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredDonasi.length > 0 ? (
                  filteredDonasi.map((donasi, index) => (
                    <tr key={donasi.id} className="bg-white border-b border-gray-400 hover:bg-gray-100">
                      <td className="px-6 py-4 border-r border-gray-400 text-center">{index + 1}</td>
                      <td className="px-6 py-4 font-medium border-r border-gray-400">{donasi.namaDonasi}</td>
                      <td className="px-6 py-4 border-r border-gray-400">{donasi.namaDonatur}</td>
                      <td className="px-6 py-4 border-r border-gray-400 text-center">{donasi.jumlahDonasi}</td>
                      <td className="px-6 py-4 border-r border-gray-400">
                        <img src={donasi.fotoUrl} alt={donasi.namaDonasi} className="w-12 h-12 object-cover" />
                      </td>
                      <td className="px-6 py-4 border-r border-gray-400">{donasi.deskripsi}</td>
                      <td className="px-6 py-4 flex gap-3 justify-center">
                        <button
                          onClick={() => navigate(`/edit-donasi/${donasi.id}`)}
                          className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeletePageDonasi(donasi.id)}
                          className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
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
      </div>
    </div>
  );
};

export default PageDonasi;
