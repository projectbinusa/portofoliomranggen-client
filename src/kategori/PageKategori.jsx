import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search, X, FileText } from "lucide-react";
import { useNotification } from "../context/NotificationContext";
import Navbar from "../tampilan/Navbar";
import jsPDF from "jspdf";

const API_KATEGORI = "http://localhost:4321/api/kategori";

const DaftarKategori = () => {
  const navigate = useNavigate();
  const { sendNotification } = useNotification();
  const [searchQuery, setSearchQuery] = useState("");
  const [kategoriData, setKategoriData] = useState([]);

  useEffect(() => {
    fetchKategori();
  }, []);

  const fetchKategori = () => {
    fetch(`${API_KATEGORI}/all`)
      .then(async (response) => {
        if (response.status === 204) {
          setKategoriData([]); // kosongin data
          return;
        }
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setKategoriData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data kategori ini akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_KATEGORI}/delete/${id}`, { method: "DELETE" })
          .then((response) => {
            if (response.ok) {
              fetchKategori();
              sendNotification("Kategori berhasil dihapus", "warning");
              Swal.fire("Dihapus!", "Data kategori telah dihapus.", "success");
            } else {
              Swal.fire("Gagal!", "Gagal menghapus data kategori.", "error");
            }
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

  const generateInvoice = (kategori) => {
    const doc = new jsPDF();
    doc.text("Invoice Kategori", 20, 20);
    doc.text(`Kategori: ${kategori.namaKategori}`, 20, 30);
    doc.save(`invoice_${kategori.namaKategori}.pdf`);
    sendNotification("Invoice berhasil dibuat", "success");
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Navbar />
      <div className="flex-1 p-6 ml-40">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar Kategori</h2>
            <button
              onClick={() => {
                navigate("/tambah-kategori-a");
                sendNotification("Menambahkan kategori baru", "success");
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              <FaPlus size={16} />
            </button>
          </div>

          <div className="relative w-1/3 mb-4">
            <input
              type="text"
              placeholder="Cari kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-10 py-2 border border-black rounded-md focus:ring-1 focus:ring-gray-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
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
                  {["No", "Nama Kategori", "Aksi"].map((header) => (
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
                {kategoriData.length ? (
                  kategoriData.map((kategori, index) => (
                    <tr
                      key={kategori.id}
                      className="bg-white border-b border-gray-400 hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 border-r text-center">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 border-r text-center">
                        {kategori.namaKategori}
                      </td>
                      <td className="px-6 py-4 flex gap-2 justify-center">
                        <button
                          onClick={() =>
                            navigate(`/edit-kategori-a/${kategori.id}`)
                          }
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(kategori.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => generateInvoice(kategori)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                        >
                          <FileText size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                      Tidak ada data kategori yang sesuai.
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

export default DaftarKategori;
