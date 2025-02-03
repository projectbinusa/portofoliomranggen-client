// src/pages/PageSiswa.jsx

import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react"; // Mengimpor ikon
import Sidebar from "../components/Sidebar"; // Impor Sidebar

function PageSiswa() {
  const [students, setStudents] = useState([
    {
      nama: "Ahmad Zaki",
      nisn: "123456789",
      alamat: "Jl. Merdeka No. 10",
      namaOrangTua: "Budi Santoso",
      nomerHpOrangTua: "08123456789",
      nomerHp: "08567890123",
      ttl: "Bandung, 1 Januari 2005",
    },
    {
      nama: "Zahra",
      nisn: "987654321",
      alamat: "Jl. Raya No. 5",
      namaOrangTua: "Joko Widodo",
      nomerHpOrangTua: "08234567890",
      nomerHp: "08765432101",
      ttl: "Jakarta, 15 Februari 2006",
    },
  ]);

  const [newStudent, setNewStudent] = useState({
    nama: "",
    nisn: "",
    alamat: "",
    namaOrangTua: "",
    nomerHpOrangTua: "",
    nomerHp: "",
    ttl: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = () => {
    if (
      !newStudent.nama ||
      !newStudent.nisn ||
      !newStudent.alamat ||
      !newStudent.namaOrangTua ||
      !newStudent.nomerHpOrangTua ||
      !newStudent.nomerHp ||
      !newStudent.ttl
    ) {
      Swal.fire({ icon: "warning", title: "Semua data harus diisi!" });
      return;
    }

    setStudents([...students, newStudent]);
    setNewStudent({
      nama: "",
      nisn: "",
      alamat: "",
      namaOrangTua: "",
      nomerHpOrangTua: "",
      nomerHp: "",
      ttl: "",
    });
    navigate("/siswa");
  };

  const handleDeleteStudent = (index) => {
    Swal.fire({
      title: "Anda yakin?",
      text: "Data ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setStudents(students.filter((_, i) => i !== index));
        Swal.fire({
          icon: "success",
          title: "Data berhasil dihapus!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="p-6 ml-64 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Daftar Siswa</h1>
          <Link
            to="/tambah-siswa"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Tambah Siswa
          </Link>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">NISN</th>
                <th className="px-6 py-3">Alamat</th>
                <th className="px-6 py-3">Nama Orang Tua</th>
                <th className="px-6 py-3">Nomor HP Orang Tua</th>
                <th className="px-6 py-3">Nomor HP</th>
                <th className="px-6 py-3">TTL</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{student.nama}</td>
                    <td className="px-6 py-4">{student.nisn}</td>
                    <td className="px-6 py-4">{student.alamat}</td>
                    <td className="px-6 py-4">{student.namaOrangTua}</td>
                    <td className="px-6 py-4">{student.nomerHpOrangTua}</td>
                    <td className="px-6 py-4">{student.nomerHp}</td>
                    <td className="px-6 py-4">{student.ttl}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <Link
                        to={`/EditStudent/${index}`}
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                      >
                        <Pencil size={20} />
                      </Link>
                      <button
                        onClick={() => handleDeleteStudent(index)}
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center">
                    Data siswa tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PageSiswa;
