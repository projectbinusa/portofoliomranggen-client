import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search, X } from "lucide-react";

const API_SISWA = "http://localhost:4321/api/siswa";

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
    return [
      student.nama,
      student.nisn,
      student.tempatTinggal,
      student.namaOrangtua,
      student.nomerHpOrangtua,
      student.nomerHp,
      student.tanggalLahir,
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 ml-64">
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

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Cari siswa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2 border rounded-md"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {isLoading ? (
            <p className="text-center py-4">Loading data...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                  <tr>
                    {["No", "Nama", "NISN", "Tempat Tinggal", "Nama Orang Tua", "No HP Orang Tua", "No HP", "Tanggal Lahir", "Aksi"].map((header, index) => (
                      <th key={index} className="px-6 py-3 border border-gray-300 text-center">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <tr key={student.id} className="bg-white hover:bg-gray-100">
                        <td className="px-6 py-3 border border-gray-300 text-center">{index + 1}</td>
                        <td className="px-6 py-3 border border-gray-300">{student.nama}</td>
                        <td className="px-6 py-3 border border-gray-300">{student.nisn}</td>
                        <td className="px-6 py-3 border border-gray-300">{student.tempatTinggal}</td>
                        <td className="px-6 py-3 border border-gray-300">{student.namaOrangtua}</td>
                        <td className="px-6 py-3 border border-gray-300">{student.nomerHpOrangtua}</td>
                        <td className="px-6 py-3 border border-gray-300">{student.nomerHp}</td>
                        <td className="px-6 py-3 border border-gray-300">{student.tanggalLahir}</td>
                        <td className="px-6 py-3 border border-gray-300 flex justify-center space-x-2">
                          <Link to={`/edit-siswa/${student.id}`}>
                            <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                              <Pencil size={18} />
                            </button>
                          </Link>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            onClick={() => handleDeleteStudent(student.id)}
                          >
                            <Trash2 className="w-4 h-4" />
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
          )}
        </div>
      </div>
    </div>
  );
};

export default PageSiswa;