import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, FileText } from "lucide-react";
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { API_KELAS } from "../utils/BaseUrl";
import Navbar from "../tampilan/Navbar";
import { useNotification } from "../context/NotificationContext";
import { jsPDF } from "jspdf";

const toTitleCase = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const KategoriKelas = () => {
  const [kelasData, setKelasData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { sendNotification } = useNotification();

  useEffect(() => {
    fetch(`${API_KELAS}/all`)
      .then((response) => response.json())
      .then((data) => setKelasData(data))
      .catch((error) => console.error("Error fetching kelas data:", error));
  }, []);

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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`${API_KELAS}/delete/${id}`, { method: "DELETE" });
          setKelasData((prevData) =>
            prevData.filter((kelas) => kelas.id !== id)
          );
          sendNotification("Kategori kelas berhasil dihapus", "error");
          Swal.fire("Dihapus!", "Kategori kelas telah dihapus.", "success");
        } catch (error) {
          console.error("Error deleting kelas:", error);
          Swal.fire(
            "Gagal!",
            "Terjadi kesalahan saat menghapus data.",
            "error"
          );
        }
      }
    });
  };

  const generateInvoice = (kelas) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Invoice Kategori Kelas", 105, 15, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.line(10, 20, 200, 20);

    doc.text(`Nama Kelas: ${kelas.namaKelas}`, 10, 30);
    doc.text(`Tanggal Dibuat: ${kelas.createdAt}`, 10, 40);
    doc.text(`Deskripsi: ${kelas.deskripsi || "-"}`, 10, 50);

    doc.line(10, 60, 200, 60);
    doc.save(`Invoice_${kelas.namaKelas}.pdf`);
  };

  const filteredData = kelasData.filter((kelas) =>
    kelas.namaKelas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Navbar />
      <div className="flex-1 p-6 ml-40">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar Kategori Kelas</h2>
            <button
              onClick={() => navigate("/tambah-kategori-kelas")}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              <FaPlus size={16} />
            </button>
          </div>

          <div className="relative w-1/3 mb-4">
            <input
              type="text"
              placeholder="Cari kelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2 border border-black rounded-md focus:ring-1 focus:ring-gray-400"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="relative overflow-x-auto shadow-md">
            <table className="w-full text-sm text-left text-gray-700 border border-gray-400">
              <thead className="text-xs font-bold uppercase bg-gray-200 border-b border-gray-500">
                <tr>
                  <th className="px-6 py-3 border-r text-center">No</th>
                  <th className="px-6 py-3 border-r text-center">Nama Kelas</th>
                  <th className="px-6 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((kelas, index) => (
                    <tr
                      key={kelas.id}
                      className="bg-white border-b border-gray-400 hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 border-r text-center">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 border-r text-center">
                        {toTitleCase(kelas.namaKelas)}
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/edit-kategori-kelas/${kelas.id}`)
                          }
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(kelas.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => generateInvoice(kelas)}
                          className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600"
                        >
                          <FileText size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                      Tidak ada data ditemukan
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

export default KategoriKelas;
