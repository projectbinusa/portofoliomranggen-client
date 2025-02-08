import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { FaPlus, FaSearch } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { API_KELAS } from "../utils/BaseUrl";

const KategoriKelas = () => {
  const [kelasData, setKelasData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_KELAS}/all`)
      .then((response) => response.json())
      .then((data) => setKelasData(data))
      .catch((error) => console.error("Error fetching kelas data:", error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-kategori/${id}`);
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`${API_KELAS}/delete/${id}`, { method: 'DELETE' });
          setKelasData((prevData) => prevData.filter((kelas) => kelas.id !== id));
          Swal.fire("Dihapus!", "Kategori kelas telah dihapus.", "success");
        } catch (error) {
          console.error("Error deleting kelas:", error);
          Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
        }
      }
    });
  };

  const filteredData = kelasData.filter((kelas) =>
    kelas.namaKelas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 ml-64">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Cari kelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 pl-10 pr-4 text-sm border-2 border-gray-600 rounded-md 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" size={14} />
          </div>

          <button
            onClick={() => navigate("/tambah-kategori")}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2
             rounded-md hover:bg-green-600 transition">
            <FaPlus size={16} />
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 border border-gray-400">
            <thead className="text-xs font-bold uppercase bg-gray-200 border-b border-gray-500">
              <tr>
                <th className="px-6 py-3 border-r border-gray-400 text-center">No</th>
                <th className="px-6 py-3 border-r border-gray-400 text-center">Nama Kelas</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((kelas, index) => (
                  <tr
                    key={kelas.id}
                    className="bg-white border-b border-gray-400 hover:bg-gray-100"
                  >
                    <td className="px-6 py-4 border-r border-gray-400 text-center">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium border-r border-gray-400 text-center">
                      {kelas.namaKelas}
                    </td>
                    <td className="px-4 py-4 flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(kelas.id)}
                        className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1
                         rounded-md hover:bg-blue-600 transition">
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(kelas.id)}
                        className="flex items-center gap-2 bg-red-500 text-white px-3 py-1
                         rounded-md hover:bg-red-600 transition">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    Tidak ada data ditemukan
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

export default KategoriKelas;
