import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search, X, Eye, FileText } from "lucide-react";
import axios from "axios";
import { API_KEGIATAN } from "../utils/BaseUrl";
import { useNotification } from "../context/NotificationContext";
import Navbar from "../tampilan/Navbar";
import { jsPDF } from "jspdf";

const KegiatanSekolah = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addNotification } = useNotification();
  const [kegiatanSekolah, setKegiatanSekolah] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_KEGIATAN}/all`)
      .then((response) => {
        setKegiatanSekolah(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleDeleteKegiatan = (id) => {
    const kegiatan = kegiatanSekolah.find((k) => k.id === id);

    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data kegiatan ini akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_KEGIATAN}/delete/${id}`)
          .then(() => {
            Swal.fire("Dihapus!", "Data kegiatan telah dihapus.", "success");
            addNotification(
              `Admin menghapus data kegiatan sekolah: ${
                kegiatan ? kegiatan.nama : "Tidak Diketahui"
              }`,
              "info"
            );
            setKegiatanSekolah(kegiatanSekolah.filter((k) => k.id !== id));
          })
          .catch(() => {
            Swal.fire("Error", "Gagal menghapus data kegiatan.", "error");
          });
      }
    });
  };

  const generatePDF = (kegiatan) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Detail Kegiatan Sekolah", 105, 15, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.line(10, 20, 200, 20);

    doc.text(`Nama Kegiatan   : ${kegiatan.nama}`, 10, 30);
    doc.text(`Deskripsi      : ${kegiatan.deskripsi}`, 10, 40);
    doc.text(`Tingkat        : ${kegiatan.tingkat}`, 10, 50);
    doc.text(`Penyelenggara  : ${kegiatan.penyelenggara}`, 10, 60);
    doc.text(`Penanggung Jawab: ${kegiatan.penanggungJawab}`, 10, 70);
    doc.text(`Hasil          : ${kegiatan.hasil}`, 10, 80);

    doc.line(10, 90, 200, 90);
    doc.save(`Kegiatan_${kegiatan.nama}.pdf`);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Navbar />
      <div className="flex-1 p-6 ml-40">
        <div className="container mx-auto p-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar Kegiatan Sekolah</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              onClick={() => navigate("/tambah-kegiatan")}
            >
              Tambah Kegiatan
            </button>
          </div>

          <div className="relative w-1/3 mb-4">
            <input
              type="text"
              placeholder="Cari berdasarkan semua data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2 border border-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

          <div className="relative overflow-x-auto shadow-md">
            <table className="w-full text-sm text-left text-gray-700 border border-black">
              <thead className="text-xs font-bold uppercase bg-gray-200 border-b border-gray-500">
                <tr>
                  <th>No</th>
                  <th>Nama Kegiatan</th>
                  <th>Tingkat</th>
                  <th>Penyelenggara</th>
                  <th>Penanggung Jawab</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {kegiatanSekolah.map((kegiatan, index) => (
                  <tr key={kegiatan.id} className="hover:bg-gray-100">
                    <td>{index + 1}</td>
                    <td>{kegiatan.nama}</td>
                    <td>{kegiatan.tingkat}</td>
                    <td>{kegiatan.penyelenggara}</td>
                    <td>{kegiatan.penanggungJawab}</td>
                    <td className="flex gap-2 justify-center">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                        <Eye size={18} />
                      </button>
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => generatePDF(kegiatan)}
                        className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600"
                      >
                        <FileText size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteKegiatan(kegiatan.id)}
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
    </div>
  );
};

export default KegiatanSekolah;
