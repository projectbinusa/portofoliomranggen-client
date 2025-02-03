import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search, X } from "lucide-react";

const PageSiswa = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([
    {
      id: 1,
      nama: "Ahmad Zaki",
      nisn: "123456789",
      alamat: "Jl. Merdeka No. 10",
      namaOrangTua: "Budi Santoso",
      nomerHpOrangTua: "08123456789",
      nomerHp: "08567890123",
      ttl: "Bandung, 1 Januari 2005",
    },
    {
      id: 2,
      nama: "Zahra",
      nisn: "987654321",
      alamat: "Jl. Raya No. 5",
      namaOrangTua: "Joko Widodo",
      nomerHpOrangTua: "08234567890",
      nomerHp: "08765432101",
      ttl: "Jakarta, 15 Februari 2006",
    },
    // Data siswa lainnya
  ]);

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
        setStudents(students.filter((student) => student.id !== id));
        Swal.fire("Dihapus!", "Data siswa telah dihapus.", "success");
      }
    });
  };

  // Filter berdasarkan input pencarian
  const filteredStudents = students.filter((student) => {
    return (
      student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nisn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.alamat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.namaOrangTua.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nomerHpOrangTua.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nomerHp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.ttl.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-6 ml-64">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar Siswa</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              onClick={() => navigate("/tambahsiswa")}
            >
              Tambah Siswa
            </button>
          </div>

          {/* Input Pencarian */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="cari berdasarkan semua..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {/* Ikon kaca pembesar (search) */}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

            {/* Ikon silang untuk menghapus input */}
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 border-collapse">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="px-6 py-3 border-b border-gray-300">No</th>
                  <th className="px-6 py-3 border-b border-gray-300">Nama</th>
                  <th className="px-6 py-3 border-b border-gray-300">NISN</th>
                  <th className="px-6 py-3 border-b border-gray-300">Alamat</th>
                  <th className="px-6 py-3 border-b border-gray-300">Nama Orang Tua</th>
                  <th className="px-6 py-3 border-b border-gray-300">Nomor HP Orang Tua</th>
                  <th className="px-6 py-3 border-b border-gray-300">Nomor HP</th>
                  <th className="px-6 py-3 border-b border-gray-300">TTL</th>
                  <th className="px-6 py-3 border-b border-gray-300">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={student.id} className="bg-white hover:bg-gray-50">
                      <td className="px-6 py-4 border-b border-gray-300">{index + 1}</td>
                      <td className="px-6 py-4 border-b border-gray-300">{student.nama}</td>
                      <td className="px-6 py-4 border-b border-gray-300">{student.nisn}</td>
                      <td className="px-6 py-4 border-b border-gray-300">{student.alamat}</td>
                      <td className="px-6 py-4 border-b border-gray-300">{student.namaOrangTua}</td>
                      <td className="px-6 py-4 border-b border-gray-300">{student.nomerHpOrangTua}</td>
                      <td className="px-6 py-4 border-b border-gray-300">{student.nomerHp}</td>
                      <td className="px-6 py-4 border-b border-gray-300">{student.ttl}</td>
                      <td className="px-6 py-4 border-b border-gray-300 flex space-x-2">
                        <Link to={`/editsiswa/${student.id}`}>
                          <button className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                            <Pencil size={18} />
                          </button>
                        </Link>

                        <button
                          className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
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
        </div>
      </div>
    </div>
  );
};

export default PageSiswa;
