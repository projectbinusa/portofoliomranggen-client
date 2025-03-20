import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search, X, Eye, FileText } from "lucide-react";
import { useNotification } from "../context/NotificationContext";
import Navbar from "../tampilan/Navbar";
import { API_ORGANISASI } from "../utils/BaseUrl";
import { jsPDF } from "jspdf";

const PageOrganisasi = () => {
  const navigate = useNavigate();
  const { sendNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState("");
  const [organisasiList, setOrganisasiList] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_ORGANISASI}/all`)
      .then((response) => setOrganisasiList(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleHapus = (id, namaOrganisasi) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: `Data organisasi "${namaOrganisasi}" akan dihapus!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_ORGANISASI}/delete/${id}`)
          .then(() => {
            setOrganisasiList(organisasiList.filter((org) => org.id !== id));
            sendNotification(
              `Organisasi "${namaOrganisasi}" berhasil dihapus`,
              "warning"
            );
            Swal.fire(
              "Dihapus!",
              `Organisasi "${namaOrganisasi}" telah dihapus.`,
              "success"
            );
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

  const generatePDF = (organisasi) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Detail Organisasi", 105, 15, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.line(10, 20, 200, 20);

    doc.text(`Nama Organisasi: ${organisasi.namaOrganisasi}`, 10, 30);
    doc.text(`Lokasi        : ${organisasi.lokasi}`, 10, 40);
    doc.text(`Email         : ${organisasi.email}`, 10, 50);
    doc.text(`Telepon       : ${organisasi.telepon}`, 10, 60);

    doc.line(10, 70, 200, 70);
    doc.save(`Organisasi_${organisasi.namaOrganisasi}.pdf`);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Navbar />
      <div className="p-6 ml-40 pt-20 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Daftar Organisasi</h2>
          <Link to="/tambah-organisasi">
            <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              <FaPlus size={18} /> Tambah Organisasi
            </button>
          </Link>
        </div>
        <div className="relative overflow-x-auto shadow-md ml-1">
          <table className="w-full text-sm text-left text-gray-700 border border-gray-400">
            <thead className="text-xs font-bold uppercase bg-gray-200 border-b border-gray-500">
              <tr>
                {[
                  "No",
                  "Nama Organisasi",
                  "Lokasi",
                  "Email",
                  "Telepon",
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
              {organisasiList.length ? (
                organisasiList.map((organisasi, index) => (
                  <tr
                    key={organisasi.id}
                    className="bg-white border-b border-gray-400 hover:bg-gray-100"
                  >
                    <td className="px-6 py-4 border-r text-center">
                      {index + 1}
                    </td>
                    {[
                      organisasi.namaOrganisasi,
                      organisasi.lokasi,
                      organisasi.email,
                      organisasi.telepon,
                    ].map((field, i) => (
                      <td key={i} className="px-6 py-4 border-r text-center">
                        {field}
                      </td>
                    ))}
                    <td className="px-6 py-4 flex gap-2 justify-center">
                      <Link to={`/detail-organisasi/${organisasi.id}`}>
                        <button className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                          <Eye size={18} />
                        </button>
                      </Link>
                      <Link to={`/edit-organisasi/${organisasi.id}`}>
                        <button
                          onClick={() =>
                            sendNotification(
                              `Mengedit organisasi "${organisasi.namaOrganisasi}"`,
                              "info"
                            )
                          }
                          className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        >
                          <Pencil size={18} />
                        </button>
                      </Link>
                      <button
                        onClick={() =>
                          handleHapus(organisasi.id, organisasi.namaOrganisasi)
                        }
                        className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        onClick={() => generatePDF(organisasi)}
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
                    Tidak ada data organisasi yang sesuai.
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

export default PageOrganisasi;
