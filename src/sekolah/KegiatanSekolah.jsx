import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search, X, Eye } from "lucide-react";
import axios from "axios";
import { API_KEGIATAN } from "../utils/BaseUrl";
import { useNotification } from "../context/NotificationContext";
import Navbar from "../tampilan/Navbar";

const KegiatanSekolah = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addNotification } = useNotification();
  const [kegiatanSekolah, setKegiatanSekolah] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_KEGIATAN}/all`)
      .then((response) => {
        setKegiatanSekolah(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleDeleteKegiatan = (id) => {
    const kegiatan = kegiatanSekolah.find((k) => k.id === id); // ✅ Ambil kegiatan berdasarkan ID

    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data kegiatan ini akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_KEGIATAN}/delete/${id}`)
          .then(() => {
            Swal.fire("Dihapus!", "Data kegiatan telah dihapus.", "success");
            addNotification(`Admin menghapus data kegiatan sekolah: ${kegiatan ? kegiatan.nama : "Tidak Diketahui"}`, "info"); // ✅ Gunakan nama kegiatan yang benar
            setKegiatanSekolah(kegiatanSekolah.filter((k) => k.id !== id));
          })
          .catch(() => {
            Swal.fire("Error", "Gagal menghapus data kegiatan.", "error");
          });
      }
    });
  };

  const filteredKegiatan = kegiatanSekolah.filter((kegiatan) => {
    return (
      kegiatan.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kegiatan.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kegiatan.tingkat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kegiatan.penyelenggara.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kegiatan.penanggungJawab.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kegiatan.hasil.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Navbar />
      <div className="flex-1 p-6 ml-40">
        <div className="container mx-auto p-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar Kegiatan Sekolah</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              onClick={() => {
                addNotification("Admin menambahkan data kegiatan sekolah", "info"); // ✅ Perbaiki agar tidak menampilkan undefined
                navigate("/tambah-kegiatan");
              }}
            >
              Tambah Kegiatan
            </button>
          </div>

          <div className="relative w-1/3 mb-4">
            <input
              type="text"
              placeholder="Cari berdasarkan semua data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2 border border-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

          <div className="relative overflow-x-auto shadow-md">
            <table className="w-full text-sm text-left text-gray-700 border border-black">
              <thead className="text-xs font-bold uppercase bg-gray-200 border-b border-gray-500">
                <tr>
                  <th className="px-6 py-3 border-r border-gray-800 text-center">No</th>
                  <th className="px-6 py-3 border-r border-gray-800 text-center">Nama Kegiatan</th>
                  <th className="px-6 py-3 border-r border-gray-800 text-center">Tingkat</th>
                  <th className="px-6 py-3 border-r border-gray-800 text-center">Penyelenggara</th>
                  <th className="px-6 py-3 border-r border-gray-800 text-center">Penanggung Jawab</th>
                  <th className="px-6 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredKegiatan.length > 0 ? (
                  filteredKegiatan.map((kegiatan, index) => (
                    <tr
                      key={kegiatan.id}
                      className="bg-white border-b border-gray-400 hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 border-r border-gray-800">{index + 1}</td>
                      <td className="px-6 py-4 font-medium border-r border-gray-400">{kegiatan.nama}</td>
                      <td className="px-6 py-4 border-r border-gray-800">{kegiatan.tingkat}</td>
                      <td className="px-6 py-4 border-r border-gray-800">{kegiatan.penyelenggara}</td>
                      <td className="px-6 py-4 border-r border-gray-800">{kegiatan.penanggungJawab}</td>
                      <td className="px-6 py-4 flex justify-center gap-3">
                        <Link to={`/detail-sekolah/${kegiatan.id}`}>
                          <button className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition">
                            <Eye size={20} />
                          </button>
                        </Link>
                        <Link to={`/edit-kegiatan/${kegiatan.id}`}>
                          <button
                            className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                            onClick={() => addNotification(`Admin memperbarui data kegiatan sekolah: ${kegiatan.nama}`, "info")} // ✅ Gunakan `kegiatan.nama`
                          >
                            <Pencil size={20} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteKegiatan(kegiatan.id)}
                          className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      Tidak ada data kegiatan yang sesuai.
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

export default KegiatanSekolah;
