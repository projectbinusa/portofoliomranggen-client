import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Search } from "lucide-react";
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
      <div className="ml-48 p-6 flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Daftar Keuangan</h1>
          <button
            onClick={() => navigate("/tambah-uang")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
            Tambah Data
          </button>
        </div>

        <div className="relative flex items-center mb-4">
          <Search className="absolute ml-3 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Cari berdasarkan nama, kategori, atau catatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 border border-gray-500">
            <thead className="text-xs uppercase bg-gray-200 border-b-2 border-gray-500">
              <tr>
                <th className="px-6 py-3 border border-gray-500 text-center">No</th>
                <th className="px-6 py-3 border border-gray-500 text-center">Nama</th>
                <th className="px-6 py-3 border border-gray-500 text-center">Harga</th>
                <th className="px-6 py-3 border border-gray-500 text-center">Jumlah</th>
                <th className="px-6 py-3 border border-gray-500 text-center">Total Harga</th>
                <th className="px-6 py-3 border border-gray-500 text-center">Kategori</th>
                <th className="px-6 py-3 border border-gray-500 text-center">Catatan</th>
                <th className="px-6 py-3 border border-gray-500 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredKeuangan.map((item, index) => (
                <tr key={item.id} className="bg-white border-b border-gray-400 hover:bg-gray-100">
                  <td className="px-6 py-4 border border-gray-400 text-center">{index + 1}</td>
                  <td className="px-6 py-4 border border-gray-400">{item.nama}</td>
                  <td className="px-6 py-4 border border-gray-400">{item.harga}</td>
                  <td className="px-6 py-4 border border-gray-400">{item.jumlah}</td>
                  <td className="px-6 py-4 border border-gray-400">{item.totalHarga}</td>
                  <td className="px-6 py-4 border border-gray-400">{item.kategoriPembiayaan}</td>
                  <td className="px-6 py-4 border border-gray-400">{item.catatan}</td>
                  <td className="px-6 py-4 flex gap-3 justify-center">
                    <button onClick={() => handleEdit(item.id)} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
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
