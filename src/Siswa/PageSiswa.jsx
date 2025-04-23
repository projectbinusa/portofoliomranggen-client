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

const API_SISWA = "http://localhost:4321/api/siswa";

const PageSiswa = () => {
  const navigate = useNavigate();
  const { sendNotification } = useNotification();
  const { addNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get(`${API_SISWA}/all`)
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleDeleteStudent = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data siswa ini akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_SISWA}/delete/${id}`)
          .then(() => {
            fetchStudents();
            sendNotification("Data siswa berhasil dihapus", "warning");
            addNotification(`Admin telah menghapus data siswa`, "info");
            sendNotification("Admin telah menghapus data siswa", "info");
            Swal.fire("Dihapus!", "Data siswa telah dihapus.", "success");
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

  const generatePDF = (student) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Detail Siswa", 105, 15, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.line(10, 20, 200, 20);

    doc.text(`Nama         : ${student.nama}`, 10, 30);
    doc.text(`Alamat       : ${student.alamat}`, 10, 40);
    doc.text(`NISN         : ${student.nisn}`, 10, 50);
    doc.text(`Tanggal Lahir: ${student.tanggalLahir}`, 10, 60);

    doc.line(10, 70, 200, 70);
    doc.save(`Siswa_${student.nama}.pdf`);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Navbar />
      <div className="flex-1 p-6 ml-40">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar Siswa</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={() => {
                navigate("/tambah-siswa");
                sendNotification("Menambahkan data siswa baru", "success");
              }}
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
                    "NISN",
                    "Tanggal Lahir",
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
                {students.length ? (
                  students.map((student, index) => (
                    <tr
                      key={student.id}
                      className="bg-white border-b border-gray-400 hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 border-r text-center">
                        {index + 1}
                      </td>
                      {[
                        student.nama,
                        student.alamat,
                        student.nisn,
                        student.tanggalLahir,
                      ].map((field, i) => (
                        <td key={i} className="px-6 py-4 border-r text-center">
                          {field}
                        </td>
                      ))}
                      <td className="px-6 py-4 flex gap-2 justify-center">
                        <Link to={`/detail-siswa/${student.id}`}>
                          <button className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                            <Eye size={18} />
                          </button>
                        </Link>
                        <button
                          onClick={() => generatePDF(student)}
                          className="flex items-center gap-2 bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600"
                        >
                          <FileText size={18} />
                        </button>

                        <Link to={`/edit-siswa/${student.id}`}>
                          <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                            <Pencil size={18} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      Tidak ada data siswa yang sesuai.
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

export default PageSiswa;
