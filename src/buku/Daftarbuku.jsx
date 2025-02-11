import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Search } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { API_BUKU } from "../utils/BaseUrl";

const DaftarBuku = () => {
  const [bukuData, setBukuData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BUKU}/all`)
      .then((response) => setBukuData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-buku/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data ini akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_BUKU}/delete/${id}`)
          .then(() => {
            setBukuData(bukuData.filter((buku) => buku.id !== id));
            Swal.fire("Dihapus!", "Data buku telah dihapus.", "success");
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
          });
      }
    });
  };

  const filteredBuku = bukuData.filter((buku) =>
    `${buku.judulBuku} ${buku.penerbit} ${buku.pengarang}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 ml-48 pl-4">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-1/3">
            <Search className="absolute ml-3 text-gray-500 top-3 left-3" size={20} />
            <input
              type="text"
              placeholder="Cari buku..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-2 w-full px-3 py-2 pl-10 pr-4 text-sm border-2 border-gray-600
               rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          
          <button
            onClick={() => navigate("/tambah-buku")}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2
             rounded-md hover:bg-green-600 transition">
            <FaPlus size={16} />
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-center">No</th>
                <th className="px-6 py-3 text-center">Judul Buku</th>
                <th className="px-6 py-3 text-center">Penerbit</th>
                <th className="px-6 py-3 text-center">Pengarang</th>
                <th className="px-6 py-3 text-center">Tahun Terbit</th>
                <th className="px-6 py-3 text-center">Jumlah Halaman</th>
                <th className="px-6 py-3 text-center">Foto Buku (URL)</th>
                <th className="px-6 py-3 text-center">ID Admin</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {filteredBuku.map((buku, index) => (
                <tr key={buku.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4 font-medium">{buku.judulBuku}</td>
                  <td className="px-6 py-4 text-center">{buku.penerbit}</td>
                  <td className="px-6 py-4 text-center">{buku.pengarang}</td>
                  <td className="px-6 py-4 text-center">{buku.tahunTerbit}</td>
                  <td className="px-6 py-4 text-center">{buku.jumlahHalaman}</td>
                  <td className="px-6 py-4 text-center">{buku.fotoUrl} </td>
                  <td className="px-6 py-4 text-center">{buku.idAdmin}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(buku.id)}
                      className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1
                       rounded-md hover:bg-blue-600 transition">
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(buku.id)}
                      className="flex items-center gap-2 bg-red-500 text-white px-3 py-1
                       rounded-md hover:bg-red-600 transition">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredBuku.length === 0 && (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center">
                    Tidak ada data buku yang sesuai.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DaftarBuku;