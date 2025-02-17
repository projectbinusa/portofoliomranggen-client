import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Pencil, Trash2, Search } from "lucide-react";
import Swal from "sweetalert2";
import { API_BUKU } from "../utils/BaseUrl";
import Sidebar from "../components/Sidebar";

const DaftarBuku = () => {
  const [bukuList, setBukuList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuku();
  }, []);

  const fetchBuku = async () => {
    try {
      const response = await fetch(`${API_BUKU}/all`);
      if (!response.ok) {
        throw new Error("Gagal mengambil data buku");
      }
      const data = await response.json();
      setBukuList(data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Buku?",
      text: "Apakah Anda yakin ingin menghapus buku ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_BUKU}/delete/${id}`, { method: "DELETE" });

        if (!response.ok) {
          throw new Error("Gagal menghapus buku");
        }

        Swal.fire("Terhapus!", "Buku berhasil dihapus.", "success");
        fetchBuku();
      } catch (error) {
        Swal.fire("Gagal!", error.message, "error");
      }
    }
  };

  const toCamelCase = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const filteredBuku = bukuList.filter((buku) =>
    `${buku.judulBuku} ${buku.penerbit} ${buku.pengarang}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1 p-6 ml-48 pl-4">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-1/3">
            <Search className="absolute ml-3 text-gray-500 top-3 left-3" size={20} />
            <input
              type="text"
              placeholder="Cari buku..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-2 w-full text-sm border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => navigate("/tambah-buku")}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            <FaPlus size={16} />
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-center">No</th>
                <th className="px-6 py-3 text-center">Foto</th>
                <th className="px-6 py-3 text-center">Judul Buku</th>
                <th className="px-6 py-3 text-center">Penerbit</th>
                <th className="px-6 py-3 text-center">Pengarang</th>
                <th className="px-6 py-3 text-center">Tahun</th>
                <th className="px-6 py-3 text-center">Halaman</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {filteredBuku.map((buku, index) => (
                <tr key={buku.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4 text-center w-32 h-32">
                    {buku.fotoUrl && (
                      <img
                        src={buku.fotoUrl}
                        alt="Foto Buku"
                        className="w-full h-full object-cover rounded-md mx-auto"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">{toCamelCase(buku.judulBuku)}</td>
                  <td className="px-6 py-4">{toCamelCase(buku.penerbit)}</td>
                  <td className="px-6 py-4">{toCamelCase(buku.pengarang)}</td>
                  <td className="px-6 py-4">{buku.tahunTerbit}</td>
                  <td className="px-6 py-4">{buku.jumlahHalaman}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/edit-buku/${buku.id}`)}
                      className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(buku.id)}
                      className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredBuku.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center">Tidak ada data buku yang sesuai.</td>
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
