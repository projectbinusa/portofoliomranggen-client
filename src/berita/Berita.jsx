import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Pencil, Trash2, Search, Eye, FileText } from "lucide-react";
import Swal from "sweetalert2";
import { API_BERITA } from "../utils/BaseUrl";
import Sidebar from "../components/Sidebar";
import Navbar from "../tampilan/Navbar";
import { useNotification } from "../context/NotificationContext";
import { jsPDF } from "jspdf";

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
        const response = await fetch(`${API_BERITA}/delete/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Gagal menghapus berita");
        }
        Swal.fire("Terhapus!", "Berita berhasil dihapus.", "success");
        addNotification("data berita dihapus", "warning");
        fetchBerita();
      } catch (error) {
        Swal.fire("Gagal!", error.message, "error");
      }
    }
  };

  const generatePDF = (berita) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Detail Berita", 105, 15, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.line(10, 20, 200, 20);
    doc.text(`Judul Berita  : ${berita.nama}`, 10, 30);
    doc.text(`Penulis       : ${berita.penulis}`, 10, 40);
    doc.text(`Tanggal Terbit: ${berita.tanggalTerbit}`, 10, 50);
    doc.line(10, 60, 200, 60);
    doc.save(`Berita_${berita.nama}.pdf`);
  };

  return (
    <div className="flex">
      <Sidebar />
      <Navbar />
      <div className="flex-1 p-6 ml-48 pl-4">
        <div className="flex justify-between items-center mb-4 mt-6">
          <button
            onClick={() => {
              sendNotification("Menambah berita baru", "info");
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
                <th className="px-6 py-3 text-center">Judul</th>
                <th className="px-6 py-3 text-center">Penulis</th>
                <th className="px-6 py-3 text-center">Tanggal Terbit</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {beritaList.map((berita, index) => (
                <tr key={berita.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4">{berita.nama}</td>
                  <td className="px-6 py-4">{berita.penulis}</td>
                  <td className="px-6 py-4 text-center">
                    {berita.tanggalTerbit}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/detail-berita/${berita.id}`)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => navigate(`/edit-berita/${berita.id}`)}
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
                    <button
                      onClick={() => generatePDF(berita)}
                      className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600"
                    >
                      <FileText size={18} />
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
