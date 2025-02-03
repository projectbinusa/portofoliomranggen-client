import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";

const KategoriKelas = () => {
  const [kelasData, setKelasData] = useState([
    { id: 1, nama: "Kelas A" },
    { id: 2, nama: "Kelas B" },
    { id: 3, nama: "Kelas C" },
  ]);

  const navigate = useNavigate();

  // Fungsi untuk mengarahkan ke halaman edit kategori kelas dengan ID
  const handleEdit = (id) => {
    navigate(`/edit-kategori-kelas/${id}`);
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
        const updatedKelasData = kelasData.filter((kelas) => kelas.id !== id);
        setKelasData(updatedKelasData);
        Swal.fire("Dihapus!", "Kategori kelas telah dihapus.", "success");
      }
    });
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-6 flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Kategori Kelas</h1>
          <button
            onClick={() => navigate("/tambah-kategori-kelas")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Tambah Kelas
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Kelas</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {kelasData.map((kelas, index) => (
                <tr
                  key={kelas.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium">{kelas.nama}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => handleEdit(kelas.id)} // Menambahkan onClick untuk Edit
                      className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(kelas.id)}
                      className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KategoriKelas;
