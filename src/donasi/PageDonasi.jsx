import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search, X } from "lucide-react";
import axios from "axios";
import { API_DONASI } from "../utils/BaseUrl";
import Navbar from "../tampilan/Navbar";

const PageDonasi = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pageDonasi, setPageDonasi] = useState([]);
  const idAdmin = localStorage.getItem("adminId") || "";

  useEffect(() => {
    axios
      .get(`${API_DONASI}/getAllByAdmin/${idAdmin}`)
      .then((response) => setPageDonasi(response.data))
      .catch((error) => console.error("Error fetching data:", error));
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
          .catch(() =>
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error")
          );
      }
    });
  };

  const toCamelCase = (text) => {
    if (!text || typeof text !== "string") return text;
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const filteredDonasi = pageDonasi.filter((donasi) =>
    [donasi.namaDonasi, donasi.namaDonatur, donasi.jumlahDonasi, donasi.deskripsi]
      .some((field) => field && field.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Navbar />
      <div className="flex-1 p-6 ml-40">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar Donasi</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={() => navigate("/tambah-donasi")}
            >
              Tambah Donasi
            </button>
          </div>
          <div className="relative w-1/3 mb-4">
            <input
              type="text"
              placeholder="Cari berdasarkan semua data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2 border border-black rounded-md focus:ring-1 focus:ring-gray-400"
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
          <div className="relative overflow-x-auto shadow-md ml-1">
            <table className="w-full text-sm text-left text-gray-700 border border-gray-400">
              <thead className="text-xs font-bold uppercase bg-gray-200 border-b border-gray-500">
                <tr>
                  {["No", "Nama Donasi", "Nama Donatur", "Jumlah Donasi", "Deskripsi", "Aksi"].map(
                    (header) => (
                      <th key={header} className="px-6 py-3 border-r border-gray-400 text-center">
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredDonasi.length ? (
                  filteredDonasi.map((donasi, index) => (
                    <tr key={donasi.id} className="bg-white border-b border-gray-400 hover:bg-gray-100">
                      <td className="px-6 py-4 border-r text-center">{index + 1}</td>
                      <td className="px-6 py-4 border-r text-center">{toCamelCase(donasi.namaDonasi ?? "")}</td>
                      <td className="px-6 py-4 border-r text-center">{toCamelCase(donasi.namaDonatur ?? "")}</td>
                      <td className="px-6 py-4 border-r text-center">{donasi.jumlahDonasi ?? "-"}</td>
                      <td className="px-6 py-4 border-r text-center">{toCamelCase(donasi.deskripsi ?? "")}</td>
                      <td className="px-6 py-4 flex gap-2 justify-center">
                        <Link to={`/edit-donasi/${donasi.id}`}>
                          <button className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                            <Pencil size={18} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeletePageDonasi(donasi.id)}
                          className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
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
