import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search, X, Eye } from "lucide-react";
import { useNotification } from "../context/NotificationContext";

const API_SISWA = "http://localhost:4321/api/siswa";

const PageSiswa = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_SISWA}/all`)
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDeleteStudent = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data siswa ini akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_SISWA}/delete/${id}`);
        setStudents(students.filter((student) => student.id !== id));
        addNotification("Data siswa berhasil dihapus", "warning");
        Swal.fire("Dihapus!", "Data siswa telah dihapus.", "success");
      } catch (error) {
        console.error("Error deleting student:", error);
        Swal.fire("Error", "Gagal menghapus data.", "error");
      }
    }
  };

  const filteredStudents = students.filter((student) =>
    student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nisn.toString().includes(searchTerm) ||
    student.alamat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 ml-40">
        <div className="container mx-auto">
          <h2 className="text-xl font-bold mb-4 text-left">Daftar Siswa</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full md:w-1/3">
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
            <button
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              onClick={() => {
                addNotification("Menambahkan data siswa baru", "success");
                navigate("/tambah-siswa");
              }}
            >
              <FaPlus size={16} />
            </button>
          </div>

          <div className="relative overflow-x-auto shadow-md">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-gray-200 text-gray-700">
                <tr>
                  {["No", "Nama", "NISN", "Alamat", "Nama Orang Tua", "No HP Orang Tua", "No HP", "Tanggal Lahir", "Aksi"].map((header, index) => (
                    <th key={index} className="px-6 py-3 text-center">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-gray-100">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={student.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-center">{index + 1}</td>
                      <td className="px-6 py-4 text-center">{student.nama}</td>
                      <td className="px-6 py-4 text-center">{student.nisn}</td>
                      <td className="px-6 py-4 text-center">{student.alamat}</td>
                      <td className="px-6 py-4 text-center">{student.namaOrangtua}</td>
                      <td className="px-6 py-4 text-center">{student.nomerHpOrangtua}</td>
                      <td className="px-6 py-4 text-center">{student.nomerHp}</td>
                      <td className="px-6 py-4 text-center">{student.tanggalLahir}</td>
                      <td className="px-6 py-4 flex gap-3 justify-center">
                        <Link to={`/detail-siswa/${student.id}`}>
                          <button className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition">
                            <Eye size={18} />
                          </button>
                        </Link>
                        <Link to={`/edit-siswa/${student.id}`}>
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                            onClick={() => addNotification("Mengedit data siswa", "info")}
                          >
                            <Pencil size={18} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">Tidak ada data siswa yang sesuai.</td>
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
