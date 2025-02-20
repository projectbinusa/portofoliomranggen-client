import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search, X, Eye } from "lucide-react";
import { useNotification } from "../context/NotificationContext";
import Navbar from "../tampilan/Navbar";
import { API_ORGANISASI } from "../utils/BaseUrl";

const PageOrganisasi = () => {
  const navigate = useNavigate();
  const { sendNotification } = useNotification(); // ✅ Ganti dari addNotification ke sendNotification
  const [searchTerm, setSearchTerm] = useState("");
  const [organisasiList, setOrganisasiList] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_ORGANISASI}/all`)
      .then((response) => setOrganisasiList(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleHapus = (id, namaOrganisasi) => { // ✅ Tambahin nama organisasi di parameter
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: `Data organisasi "${namaOrganisasi}" akan dihapus!`, // ✅ Biar lebih spesifik
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_ORGANISASI}/delete/${id}`)
          .then(() => {
            setOrganisasiList(organisasiList.filter((org) => org.id !== id));
            sendNotification(`Organisasi "${namaOrganisasi}" berhasil dihapus`, "warning"); // ✅ Pakai sendNotification
            Swal.fire("Dihapus!", `Organisasi "${namaOrganisasi}" telah dihapus.`, "success");
          })
          .catch(() =>
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error")
          );
      }
    });
  };

  const filteredOrganisasi = organisasiList.filter((organisasi) =>
    [organisasi.namaOrganisasi, organisasi.lokasi, organisasi.email].some(
      (field) => field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Navbar />
      <div className="p-6 ml-40 pt-20 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Daftar Organisasi</h1>
          <button
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            onClick={() => {
              navigate("/tambah-organisasi");
              sendNotification("Menambahkan organisasi baru", "success"); // ✅ Pakai sendNotification
            }}
          >
            <FaPlus size={16} />
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
                {["No", "Nama Organisasi", "Lokasi", "Email", "Telepon", "Aksi"].map((header) => (
                  <th key={header} className="px-6 py-3 border-r border-gray-400 text-center">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrganisasi.length ? (
                filteredOrganisasi.map((organisasi, index) => (
                  <tr key={organisasi.id} className="bg-white border-b border-gray-400 hover:bg-gray-100">
                    <td className="px-6 py-4 border-r text-center">{index + 1}</td>
                    {[organisasi.namaOrganisasi, organisasi.lokasi, organisasi.email, organisasi.telepon].map(
                      (field, i) => (
                        <td key={i} className="px-6 py-4 border-r text-center">
                          {field}
                        </td>
                      )
                    )}
                    <td className="px-6 py-4 flex gap-2 justify-center">
                      <Link to={`/detail-organisasi/${organisasi.id}`}>
                        <button className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                          <Eye size={18} />
                        </button>
                      </Link>
                      <Link to={`/edit-organisasi/${organisasi.id}`}>
                        <button
                          onClick={() => sendNotification(`Mengedit organisasi "${organisasi.namaOrganisasi}"`, "info")} // ✅ Pakai sendNotification
                          className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        >
                          <Pencil size={18} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleHapus(organisasi.id, organisasi.namaOrganisasi)} // ✅ Tambah nama organisasi
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
                    Tidak ada data organisasi yang sesuai.
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

export default PageOrganisasi;
