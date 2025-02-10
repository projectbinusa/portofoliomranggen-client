import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search, X } from "lucide-react";

const API_SISWA = "http://localhost:4321/api/siswa";

const idAdmin = JSON.parse(localStorage.getItem("adminId"));

const PageSiswa = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_SISWA}/all`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
        Swal.fire("Dihapus!", "Data siswa telah dihapus.", "success");
      } catch (error) {
        console.error("Error deleting student:", error);
        Swal.fire("Error", "Gagal menghapus data.", "error");
      }
    }
  };

  const filteredStudents = students.filter((student) => {
    return (
      student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nisn.toString().includes(searchTerm) ||
      student.alamat.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-1 ml-40">
        <div className="container mx-auto shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700">Daftar Siswa</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={() => navigate("/tambah-siswa")}
            >
              Tambah Siswa
            </button>
          </div>

          <div className="relative mb-4 w-1/3">
            <input
              type="text"
              placeholder="Cari siswa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 pl-10 pr-4 text-sm border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-3 text-gray-500" size={14} />
          </div>

          {isLoading ? (
            <p className="text-center py-4">Loading data...</p>
          ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-700 border border-gray-400">
                <thead className="text-xs font-bold uppercase bg-gray-200 border-b border-gray-500">
                  <tr>
                    {["No", "Nama", "NISN", "Alamat", "Nama Orang Tua", "No HP Orang Tua", "No HP", "Tanggal Lahir", "Aksi"].map((header, index) => (
                      <th key={index} className="px-6 py-3 border-r border-gray-400 text-center">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <tr key={student.id} className="bg-white border-b border-gray-400 hover:bg-gray-100">
                        <td className="px-6 py-4 border-r border-gray-400 text-center">{index + 1}</td>
                        <td className="px-6 py-4 border-r border-gray-400 text-center">{student.nama}</td>
                        <td className="px-6 py-4 border-r border-gray-400 text-center">{student.nisn}</td>
                        <td className="px-6 py-4 border-r border-gray-400 text-center">{student.alamat}</td>
                        <td className="px-6 py-4 border-r border-gray-400 text-center">{student.namaOrangtua}</td>
                        <td className="px-6 py-4 border-r border-gray-400 text-center">{student.nomerHpOrangtua}</td>
                        <td className="px-6 py-4 border-r border-gray-400 text-center">{student.nomerHp}</td>
                        <td className="px-6 py-4 border-r border-gray-400 text-center">{student.tanggalLahir}</td>
                        <td className="px-4 py-4 flex justify-center gap-3">
                          <Link to={`/edit-siswa/${student.id}`}>
                            <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                              <Pencil size={18} />
                            </button>
                          </Link>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            onClick={() => handleDeleteStudent(student.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-4 text-gray-500">
                        Tidak ada data siswa yang sesuai.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageSiswa;
