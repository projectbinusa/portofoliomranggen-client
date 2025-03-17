import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Pencil, Trash2, Search, Eye } from "lucide-react";
import Swal from "sweetalert2";
import { API_BERITA } from "../utils/BaseUrl";
import Sidebar from "../components/Sidebar";
import Navbar from "../tampilan/Navbar";
import { useNotification } from "../context/NotificationContext";

const Berita = () => {
  const [beritaList, setBeritaList] = useState([]);
  const { sendNotification } = useNotification();
  const { addNotification } = useNotification();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    try {
      const response = await fetch(`${API_BERITA}/all`);
      if (!response.ok) {
        throw new Error("Gagal mengambil data berita");
      }
      const data = await response.json();
      setBeritaList(data);
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
      title: "Hapus Berita?",
      text: "Apakah Anda yakin ingin menghapus berita ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_BERITA}/delete/${id}`, { method: "DELETE" });

        if (!response.ok) {
          throw new Error("Gagal menghapus berita");
        }

        Swal.fire("Terhapus!", "Berita berhasil dihapus.", "success");
        addNotification("data berita dihapus", "warning"); // 🔔 Kirim notifikasi
        fetchBerita();
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

  const filteredBerita = beritaList.filter((berita) =>
    `${berita.nama} ${berita.penulis}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <Navbar />
      <div className="flex-1 p-6 ml-48 pl-4">
        <div className="flex justify-between items-center mb-4 mt-6">
          <div className="relative w-1/3">
            <Search className="absolute ml-3 text-gray-500 top-3 left-3" size={20} />
            <input
              type="text"
              placeholder="Cari berita..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-2 w-full text-sm border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => {
              sendNotification("Menambah berita baru", "info"); // 🔔 Kirim notifikasi
              navigate("/tambah-berita");
            }}
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
                <th className="px-6 py-3 text-center">Nama</th>
                <th className="px-6 py-3 text-center">Penulis</th>
                <th className="px-6 py-3 text-center">Tanggal Terbit</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {filteredBerita.map((berita, index) => (
                <tr key={berita.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4 text-center w-32 h-32">
                    {berita.fotoUrl && (
                      <img
                        src={berita.fotoUrl}
                        alt="Foto Berita"
                        className="w-full h-full object-cover rounded-md mx-auto"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">{toCamelCase(berita.nama)}</td>
                  <td className="px-6 py-4">{toCamelCase(berita.penulis)}</td>
                  <td className="px-6 py-4 text-center">{formatDate(berita.tanggalTerbit)}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/detail-berita/${berita.id}`)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => {
                        sendNotification("Mengedit data berita", "info"); // 🔔 Kirim notifikasi
                        navigate(`/edit-berita/${berita.id}`);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      <Pencil size={18} />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(berita.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
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

export default Berita;
