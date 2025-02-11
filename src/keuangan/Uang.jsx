import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Search } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { API_KEUANGAN } from "../utils/BaseUrl";

const Uang = () => {
  const [keuanganData, setKeuanganData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_KEUANGAN}/all`)
      .then((response) => response.json())
      .then((data) => setKeuanganData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-uang/${id}`);
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
        fetch(`${API_KEUANGAN}/delete/${id}`, { method: "DELETE" })
          .then((response) => {
            if (response.ok) {
              setKeuanganData(keuanganData.filter((item) => item.id !== id));
              Swal.fire("Dihapus!", "Data keuangan telah dihapus.", "success");
            } else {
              Swal.fire("Gagal!", "Gagal menghapus data keuangan.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
          });
      }
    });
  };

  const filteredKeuangan = keuanganData.filter((item) =>
    `${item.nama} ${item.kategoriPembiayaan} ${item.catatan}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 ml-64">
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Cari berdasarkan nama, kategori, atau catatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 pl-10 pr-4 text-sm border-2 border-gray-600 rounded-md 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => navigate("/tambah-uang")}
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
                <th className="px-6 py-3 text-center">Nama</th>
                <th className="px-6 py-3 text-center">Harga</th>
                <th className="px-6 py-3 text-center">Jumlah</th>
                <th className="px-6 py-3 text-center">Total Harga</th>
                <th className="px-6 py-3 text-center">Kategori</th>
                <th className="px-6 py-3 text-center">Catatan</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {filteredKeuangan.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4">{item.nama}</td>
                  <td className="px-6 py-4">Rp {item.harga.toLocaleString()}</td>
                  <td className="px-6 py-4">{item.jumlah}</td>
                  <td className="px-6 py-4">Rp {item.totalHarga.toLocaleString()}</td>
                  <td className="px-6 py-4">{item.kategoriPembiayaan}</td>
                  <td className="px-6 py-4">{item.catatan}</td>
                  <td className="px-6 py-4 flex gap-3 justify-center">
                    <button onClick={() => handleEdit(item.id)} className="bg-blue-500 text-white
                     px-3 py-1 rounded-md hover:bg-blue-600 transition">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white
                     px-3 py-1 rounded-md hover:bg-red-600 transition">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredKeuangan.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center border border-gray-400">
                    Tidak ada data keuangan yang sesuai.
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

export default Uang;