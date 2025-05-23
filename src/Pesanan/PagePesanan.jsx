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

const API_PESANAN = "http://localhost:4321/api/pesanan";

const PagePesanan = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState("");
  const [pesanan, setPesanan] = useState([]);

  useEffect(() => {
    fetchPesanan();
  }, []);

  const fetchPesanan = () => {
    axios
      .get(`${API_PESANAN}/all`)
      .then((response) => setPesanan(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleDeletePesanan = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Pesanan ini akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_PESANAN}/delete/${id}`)
          .then(() => {
            fetchPesanan();
            addNotification("Pesanan berhasil dihapus", "warning");
            Swal.fire("Dihapus!", "Pesanan telah dihapus.", "success");
          })
          .catch(() =>
            Swal.fire(
              "Gagal!",
              "Terjadi kesalahan saat menghapus data.",
              "error"
            )
          );
      }
    });
  };

  const generateInvoice = (item) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Invoice Pesanan", 105, 15, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.line(10, 20, 200, 20);

    doc.text(`Nama Pesanan: ${item.namaPesanan}`, 10, 30);
    doc.text(`Jumlah: ${item.jumlah}`, 10, 40);
    doc.text(`Harga: ${item.harga}`, 10, 50);
    doc.text(`Kondisi: ${item.kondisi}`, 10, 60);

    doc.line(10, 70, 200, 70);
    doc.save(`Invoice_${item.namaPesanan}.pdf`);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Navbar />
      <div className="flex-1 p-6 ml-40">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar Pesanan</h2>
            <button
              onClick={() => navigate("/tambah-pesanan")}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              <FaPlus size={16} />
            </button>
          </div>

          <div className="relative w-1/3 mb-4">
            <input
              type="text"
              placeholder="Cari pesanan..."
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
                  {[
                    "No",
                    "Nama Pesanan",
                    "Jumlah",
                    "Harga",
                    "Kondisi",
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
                {pesanan.length > 0 ? (
                  pesanan.map((item, index) => (
                    <tr
                      key={item.id}
                      className="bg-white border-b border-gray-400 hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 border-r text-center">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 border-r text-center">
                        {item.namaPesanan}
                      </td>
                      <td className="px-6 py-4 border-r text-center">
                        {item.jumlah}
                      </td>
                      <td className="px-6 py-4 border-r text-center">
                        {item.harga}
                      </td>
                      <td className="px-6 py-4 border-r text-center">
                        {item.kondisi}
                      </td>
                      <td className="px-6 py-4 flex gap-2 justify-center">
                        <button
                          onClick={() => generateInvoice(item)}
                          className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600"
                        >
                          <FileText size={18} />
                        </button>
                        <Link
                          to={`/detail-pesanan/${item.id}`}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                        >
                          <Eye size={18} />
                        </Link>
                        <button
                          onClick={() => navigate(`/edit-pesanan/${item.id}`)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeletePesanan(item.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      Tidak ada pesanan yang tersedia.
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

export default PagePesanan;
