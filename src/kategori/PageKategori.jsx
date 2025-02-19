import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { FaPlus, FaSearch } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import Navbar from "../tampilan/Navbar";

const DaftarKategori = () => {
  const [kategoriData, setKategoriData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4321/api/kategori/all")
      .then((response) => response.json())
      .then((data) => setKategoriData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (id) => navigate(`/edit-kategori-a/${id}`);

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
        fetch(`http://localhost:4321/api/kategori/delete/${id}`, { method: "DELETE" })
          .then((response) => {
            if (response.ok) {
              setKategoriData(kategoriData.filter((kategori) => kategori.id !== id));
              Swal.fire("Dihapus!", "Data kategori telah dihapus.", "success");
            } else {
              Swal.fire("Gagal!", "Gagal menghapus data kategori.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
          });
      }
    });
  };

  const filteredKategori = kategoriData.filter((kategori) =>
    kategori.namaKategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex fixed inset-0 overflow-hidden">
      <Sidebar />
      <Navbar />
      <div className="flex-1 p-6 ml-56 overflow-hidden"> 
        <div className="flex justify-between items-center mb-4  mt-14">
          <div className="relative w-1/3">
            <FaSearch className="absolute ml-2 text-gray-500 top-3 left-2" size={16} />
            <input
              type="text"
              placeholder="Cari Kategori..."
              className="border-2 border-gray-500 p-2 pl-10 rounded-md w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => navigate("/tambah-kategori-a")}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            <FaPlus size={14} />
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 border-2 border-gray-500">
            <thead className="text-xs uppercase bg-gray-200 border-b border-gray-500">
              <tr>
                <th className="px-6 py-3 border-r border-gray-500 text-center">No</th>
                <th className="px-6 py-3 border-r border-gray-500 text-center">Nama Kategori</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredKategori.map((kategori, index) => (
                <tr key={kategori.id} className="bg-white border-b border-gray-300 hover:bg-gray-100">
                  <td className="px-6 py-4 border-r border-gray-500 text-center">{index + 1}</td>
                  <td className="px-6 py-4 border-r border-gray-500 text-center">{kategori.namaKategori}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button onClick={() => handleEdit(kategori.id)} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(kategori.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredKategori.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center border-2 border-gray-500">Tidak ada data kategori yang sesuai.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DaftarKategori;
