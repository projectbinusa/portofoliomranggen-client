import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search, X, Eye } from "lucide-react";
import axios from "axios";
import { API_GURU } from "../utils/BaseUrl";

const PageGuru = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pageguru, setPageGuru] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4321/api/admin/guru/all")
      .then(response => setPageGuru(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleDeletePageGuru = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data guru ini akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`${API_GURU}/delete/${id}`)
          .then(() => {
            setPageGuru(pageguru.filter(guru => guru.id !== id));
            Swal.fire("Dihapus!", "Data guru telah dihapus.", "success");
          })
          .catch(() => Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error"));
      }
    });
  };

  const filteredGuru = pageguru.filter(guru =>
    [guru.namaGuru, guru.nip, guru.alamat, guru.nomerHp, guru.tahunDiterima, guru.lamaKerja]
      .some(field => field.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 ml-40">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar Guru</h2>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600" onClick={() => navigate("/tambah-guru")}>Tambah Guru</button>
          </div>
          <div className="relative w-1/3 mb-4">
            <input
              type="text"
              placeholder="Cari berdasarkan semua data..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2 border border-black rounded-md focus:ring-1 focus:ring-gray-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5" />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="relative overflow-x-auto shadow-md ml-1">
            <table className="w-full text-sm text-left text-gray-700 border border-gray-400">
              <thead className="text-xs font-bold uppercase bg-gray-200 border-b border-gray-500">
                <tr>
                  {['No', 'Nama', 'NIP', 'Alamat', 'Nomor HP', 'Tahun Diterima', 'Lama Kerja', 'Aksi'].map(header => (
                    <th key={header} className="px-6 py-3 border-r border-gray-400 text-center">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredGuru.length ? (
                  filteredGuru.map((guru, index) => (
                    <tr key={guru.id} className="bg-white border-b border-gray-400 hover:bg-gray-100">
                      <td className="px-6 py-4 border-r text-center">{index + 1}</td>
                      {[guru.namaGuru, guru.nip, guru.alamat, guru.nomerHp, guru.tahunDiterima, guru.lamaKerja]
                        .map((field, i) => (
                          <td key={i} className="px-6 py-4 border-r text-center">{field}</td>
                        ))}
                      <td className="px-6 py-4 flex gap-2 justify-center">
                        <Link to={`/detail-guru/${guru.id}`}>
                          <button className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                            <Eye size={18} />
                          </button>
                        </Link>
                        <Link to={`/edit-guru/${guru.id}`}>
                          <button className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                            <Pencil size={18} />
                          </button>
                        </Link>
                        <button onClick={() => handleDeletePageGuru(guru.id)} className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">Tidak ada data guru yang sesuai.</td>
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
