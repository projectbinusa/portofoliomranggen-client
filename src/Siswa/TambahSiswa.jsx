import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Pastikan path ini sesuai dengan lokasi Sidebar Anda

function TambahSiswa() {
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

    Swal.fire({ icon: "success", title: "Siswa berhasil ditambahkan!" }).then(() => {
      navigate("/siswa"); // Kembali ke halaman daftar siswa setelah sukses
    });
  };

  const handleCancel = () => {
    navigate("/siswa"); // Kembali ke halaman daftar siswa jika batal
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Menambahkan Sidebar di sini */}
      <div className="flex-1 p-6">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4">
            Tambah Siswa
          </h1>
          <div className="space-y-4">
            <input
              type="text"
              name="nama"
              value={newStudent.nama}
              onChange={handleInputChange}
              placeholder="Nama"
              className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="nisn"
              value={newStudent.nisn}
              onChange={handleInputChange}
              placeholder="NISN"
              className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="alamat"
              value={newStudent.alamat}
              onChange={handleInputChange}
              placeholder="Alamat"
              className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="namaOrangTua"
              value={newStudent.namaOrangTua}
              onChange={handleInputChange}
              placeholder="Nama Orang Tua"
              className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="nomerHpOrangTua"
              value={newStudent.nomerHpOrangTua}
              onChange={handleInputChange}
              placeholder="Nomor HP Orang Tua"
              className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="nomerHp"
              value={newStudent.nomerHp}
              onChange={handleInputChange}
              placeholder="Nomor HP"
              className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="ttl"
              value={newStudent.ttl}
              onChange={handleInputChange}
              placeholder="Tempat, Tanggal Lahir"
              className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-4 justify-between">
              <button
                onClick={handleAddStudent}
                className="w-48 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Tambah Siswa
              </button>
              <button
                onClick={handleCancel}
                className="w-48 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TambahSiswa;
