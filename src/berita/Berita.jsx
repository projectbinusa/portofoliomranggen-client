import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Search } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { API_BERITA } from "../utils/BaseUrl";
import Navbar from "../tampilan/Navbar";

const Berita = () => {
  const [beritaData, setBeritaData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const idAdmin = localStorage.getItem("idAdmin");

  useEffect(() => {
    if (idAdmin) {
      fetch(`${API_BERITA}/all`)
        .then((response) => response.json())
        .then((data) => setBeritaData(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [idAdmin]);

  const handleEdit = (id) => {
    navigate(`/edit-berita/${id}/${idAdmin}`);
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
        fetch(`${API_BERITA}/delete/${id}`, { method: "DELETE" })
          .then((response) => {
            if (response.ok) {
              setBeritaData(beritaData.filter((berita) => berita.id !== id));
              Swal.fire("Dihapus!", "Data berita telah dihapus.", "success");
            } else {
              Swal.fire("Gagal!", "Gagal menghapus data berita.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
          });
      }
    });
  };

  const toCamelCase = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const dateObj = new Date(dateString);
      return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(dateObj);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "-";
    }
  };

  const filteredBerita = beritaData.filter((berita) =>
    `${berita.nama} ${berita.penulis} ${berita.deskripsi}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <Navbar />
      <div className="flex-1 p-6 ml-48 pl-4">
        <div className="flex justify-between items-center mb-4  mt-6">
          <div className="relative w-1/3">
            <Search className="absolute ml-3 text-gray-500 top-3 left-3" size={20} />
            <input
              type="text"
              placeholder="Cari berita..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-2 w-full text-sm border-2 border-gray-600 rounded-md 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => navigate(`/tambah-berita`)}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2
           rounded-md hover:bg-green-600 transition"
          >
            <FaPlus size={16} />
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-center">No</th>
                <th className="px-6 py-3 text-center">Nama</th>
                <th className="px-6 py-3 text-center">Penulis</th>
                <th className="px-6 py-3 text-center">Deskripsi</th>
                <th className="px-6 py-3 text-center">Foto</th>
                <th className="px-6 py-3 text-center">Tanggal Terbit</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {filteredBerita.map((berita, index) => (
                <tr key={berita.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4">{toCamelCase(berita.nama)}</td>
                  <td className="px-6 py-4">{toCamelCase(berita.penulis)}</td>
                  <td className="px-6 py-4">{toCamelCase(berita.deskripsi)}</td>
                  <td className="px-6 py-4 flex justify-center">{toCamelCase(berita.fotoUrl)}</td>
                  <td className="px-6 py-4 text-center">{formatDate(berita.tanggalTerbit)}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(berita.id)}
                      className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1
                       rounded-md hover:bg-blue-600 transition">
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(berita.id)}
                      className="flex items-center gap-2 bg-red-500 text-white px-3 py-1
                       rounded-md hover:bg-red-600 transition">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredBerita.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    Tidak ada berita yang sesuai.
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

export default Berita;