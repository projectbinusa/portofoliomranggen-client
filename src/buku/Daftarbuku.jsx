import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Pencil, Trash2, Search, Eye, FileText } from "lucide-react";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import axios from "axios";
import { API_BUKU } from "../utils/BaseUrl";
import Sidebar from "../components/Sidebar";
import Navbar from "../tampilan/Navbar";
import { useNotification } from "../context/NotificationContext";

const DaftarBuku = () => {
  const [bukuList, setBukuList] = useState([]);
  const { sendNotification } = useNotification();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuku();
  }, []);

  const fetchBuku = async () => {
    try {
      const response = await axios.get(`${API_BUKU}/all`);
      setBukuList(response.data);
    } catch (error) {
      Swal.fire("Error!", "Gagal mengambil data buku", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Buku?",
      text: "Apakah Anda yakin ingin menghapus buku ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_BUKU}/delete/${id}`);
        Swal.fire("Terhapus!", "Buku berhasil dihapus.", "success");
        fetchBuku();
        sendNotification("📚 Buku telah dihapus");
      } catch (error) {
        Swal.fire("Gagal!", "Gagal menghapus buku", "error");
      }
    }
  };

  const generateInvoice = (buku) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Invoice Buku", 105, 15, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.line(10, 20, 200, 20);

    doc.text(`Judul Buku  : ${buku.judulBuku}`, 10, 30);
    doc.text(`Pengarang   : ${buku.pengarang}`, 10, 40);
    doc.text(`Tahun Terbit: ${buku.tahunTerbit}`, 10, 50);
    doc.text(`Halaman     : ${buku.jumlahHalaman}`, 10, 60);

    doc.line(10, 70, 200, 70);
    doc.save(`Invoice_${buku.judulBuku}.pdf`);
  };

  return (
    <div className="flex">
      <Sidebar />
      <Navbar />
      <div className="flex-1 p-6 ml-48 pl-4">
        <div className="flex justify-between items-center mb-4 mt-6">
          <div className="relative w-1/3">
            <Search
              className="absolute ml-3 text-gray-500 top-3 left-3"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari buku..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-2 w-full text-sm border-2 border-gray-600 rounded-md"
            />
          </div>
          <button
            onClick={() => navigate("/tambah-buku")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            <FaPlus size={16} />
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-center">No</th>
                <th className="px-6 py-3 text-center">Judul Buku</th>
                <th className="px-6 py-3 text-center">Pengarang</th>
                <th className="px-6 py-3 text-center">Tahun</th>
                <th className="px-6 py-3 text-center">Halaman</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {bukuList.map((buku, index) => (
                <tr key={buku.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-center">{index + 1}</td>
                  <td className="px-6 py-4">{buku.judulBuku}</td>
                  <td className="px-6 py-4">{buku.pengarang}</td>
                  <td className="px-6 py-4">{buku.tahunTerbit}</td>
                  <td className="px-6 py-4">{buku.jumlahHalaman}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/detail-buku/${buku.id}`)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => navigate(`/edit-buku/${buku.id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(buku.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={() => generateInvoice(buku)}
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

export default DaftarBuku;
