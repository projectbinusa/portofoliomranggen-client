import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search, X, Eye, FileText } from "lucide-react";
import { useNotification } from "../context/NotificationContext";
import Navbar from "../tampilan/Navbar";
import { jsPDF } from "jspdf";
import { API_KEGIATAN } from "../utils/BaseUrl";

const KegiatanSekolah = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState("");
  const [kegiatanSekolah, setKegiatanSekolah] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_KEGIATAN}/all`)
      .then((response) => setKegiatanSekolah(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDeleteKegiatan = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data kegiatan ini akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_KEGIATAN}/delete/${id}`).then(() => {
          addNotification("Data kegiatan berhasil dihapus", "success");
          setKegiatanSekolah(kegiatanSekolah.filter((k) => k.id !== id));
        });
      }
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Navbar />
      <div className="flex-1 p-6 ml-40">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar Kegiatan Sekolah</h2>
            <button
              onClick={() => navigate("/tambah-kegiatan")}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
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
                  {[
                    "No",
                    "Nama Kegiatan",
                    "Tingkat",
                    "Penyelenggara",
                    "Penanggung Jawab",
                    "Aksi",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 border-r border-gray-400 text-center"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {kegiatanSekolah.length ? (
                  kegiatanSekolah.map((kegiatan, index) => (
                    <tr
                      key={kegiatan.id}
                      className="bg-white border-b border-gray-400 hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 border-r text-center">
                        {index + 1}
                      </td>
                      {[
                        kegiatan.nama,
                        kegiatan.tingkat,
                        kegiatan.penyelenggara,
                        kegiatan.penanggungJawab,
                      ].map((field, i) => (
                        <td key={i} className="px-6 py-4 border-r text-center">
                          {field}
                        </td>
                      ))}
                      <td className="px-6 py-4 flex gap-2 justify-center">
                        <Link to={`/detail-sekolah/${kegiatan.id}`}>
                          <button className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                            <Eye size={18} />
                          </button>
                        </Link>
                        <button
                          onClick={() =>
                            navigate(`/edit-kegiatan/${kegiatan.id}`)
                          }
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteKegiatan(kegiatan.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => generatePDF(kegiatan)}
                          className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600"
                        >
                          <FileText size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
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
