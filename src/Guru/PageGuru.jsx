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

const API_GURU = "http://localhost:4321/api/admin/guru";

const PageGuru = () => {
  const navigate = useNavigate();
  const { sendNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState("");
  const [gurus, setGurus] = useState([]);

  useEffect(() => {
    fetchGuru();
  }, []);

  const fetchGuru = () => {
    axios
      .get(`${API_GURU}/all`)
      .then((response) => setGurus(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleDeleteGuru = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data guru akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_GURU}/delete/${id}`)
          .then(() => {
            sendNotification("Data guru berhasil dihapus", "success");
            fetchGuru();
          })
          .catch((error) => {
            sendNotification("Gagal menghapus data guru", "error");
            console.error("Error deleting data:", error);
          });
      }
    });
  };

  const generatePDF = (guru) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Detail Guru", 105, 15, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.line(10, 20, 200, 20);

    doc.text(`Nama         : ${guru.namaGuru}`, 10, 30);
    doc.text(`Alamat       : ${guru.alamat}`, 10, 40);
    doc.text(`Tahun Diterima: ${guru.tahunDiterima}`, 10, 50);
    doc.text(`Lama Kerja   : ${guru.lamaKerja}`, 10, 60);

    doc.line(10, 70, 200, 70);
    doc.save(`Guru_${guru.namaGuru}.pdf`);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Navbar />
      <div className="flex-1 p-6 ml-40">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar Guru</h2>
            <button
              onClick={() => {
                navigate("/tambah-guru");
                sendNotification("Menambahkan data guru baru", "success");
              }}
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
                    "Nama",
                    "Alamat",
                    "Tahun Diterima",
                    "Lama Kerja",
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
                {gurus.length ? (
                  gurus.map((guru, index) => (
                    <tr
                      key={guru.id}
                      className="bg-white border-b border-gray-400 hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 border-r text-center">
                        {index + 1}
                      </td>
                      {[
                        guru.namaGuru,
                        guru.alamat,
                        guru.tahunDiterima,
                        guru.lamaKerja,
                      ].map((field, i) => (
                        <td key={i} className="px-6 py-4 border-r text-center">
                          {field}
                        </td>
                      ))}
                      <td className="px-6 py-4 flex gap-2 justify-center">
                        <Link to={`/detail-guru/${guru.id}`}>
                          <button className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                            <Eye size={18} />
                          </button>
                        </Link>
                        <button
                          onClick={() => {
                            sendNotification(
                              `Mengedit data guru "${guru.namaGuru}"`,
                              "info"
                            );
                            navigate(`/edit-guru/${guru.id}`);
                          }}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteGuru(guru.id)}
                          className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => generatePDF(guru)}
                          className="flex items-center gap-2 bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600"
                        >
                          <FileText size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      Tidak ada data guru yang sesuai.
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

export default PageGuru;
