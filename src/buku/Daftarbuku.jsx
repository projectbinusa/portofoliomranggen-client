import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Search } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { API_BUKU } from "../utils/BaseUrl";

const DaftarBuku = () => {
  const [bukuData, setBukuData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BUKU}/all`)
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
        axios.delete(`${API_BUKU}/delete/${id}`)
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
    `${buku.judulBuku} ${buku.isbn} ${buku.penerbit} ${buku.pengarang}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
          <Sidebar />
          <div className="ml-48 p-6 flex-1">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Daftar Buku</h1>
        <button
          onClick={() => navigate("/tambah-buku")}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          Tambah Buku
        </button>
      </div>

      <div className="relative flex items-center mb-4">
        <Search className="absolute ml-3 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Cari buku berdasarkan judul, ISBN, penerbit, atau pengarang..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-700 border border-gray-400">
          <thead className="text-xs uppercase bg-gray-200 border-b-2 border-gray-500">
            <tr>
              <th className="px-6 py-3 border border-gray-500 text-center">No</th>
              <th className="px-6 py-3 border border-gray-500 text-center">Judul Buku</th>
              <th className="px-6 py-3 border border-gray-500 text-center">ISBN</th>
              <th className="px-6 py-3 border border-gray-500 text-center">Penerbit</th>
              <th className="px-6 py-3 border border-gray-500 text-center">Pengarang</th>
              <th className="px-6 py-3 border border-gray-500 text-center">Tahun Terbit</th>
              <th className="px-6 py-3 border border-gray-500 text-center">Jumlah Halaman</th>
              <th className="px-6 py-3 border border-gray-500 text-center">Foto</th>
              <th className="px-6 py-3 border border-gray-500 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredBuku.map((buku, index) => (
              <tr key={buku.id} className="bg-white border-b border-gray-400 hover:bg-gray-100">
                <td className="px-6 py-4 border border-gray-400 text-center">{index + 1}</td>
                <td className="px-6 py-4 font-medium border border-gray-400">{buku.judulBuku}</td>
                <td className="px-6 py-4 border border-gray-400">{buku.isbn}</td>
                <td className="px-6 py-4 border border-gray-400">{buku.penerbit}</td>
                <td className="px-6 py-4 border border-gray-400">{buku.pengarang}</td>
                <td className="px-6 py-4 border border-gray-400 text-center">{buku.tahunTerbit}</td>
                <td className="px-6 py-4 border border-gray-400 text-center">{buku.jumlahHalaman}</td>
                <td className="px-6 py-4 border border-gray-400 text-center">
                  <img
                    src={buku.fotoUrl}
                    alt={buku.judulBuku}
                    className="w-16 h-20 object-cover mx-auto"/>
                </td>
                <td className="px-6 py-11 flex gap-3">
                  <button
                    onClick={() => handleEdit(buku.id)}
                    className="flex items-center gap-2 bg-blue-500
                     text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(buku.id)}
                    className="flex items-center gap-2 bg-red-500
                     text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredBuku.length === 0 && (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center border border-gray-400">
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