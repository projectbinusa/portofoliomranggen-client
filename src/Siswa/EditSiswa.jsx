import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar"; // Pastikan path ini sesuai dengan lokasi Sidebar Anda

function EditSiswa({ students, setStudents }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { student, index } = location.state || {}; // Ambil data dari state

  const [editedStudent, setEditedStudent] = useState({
    nama: "",
    nisn: "",
    alamat: "",
    namaOrangTua: "",
    nomerHpOrangTua: "",
    nomerHp: "",
    ttl: "",
  });

  useEffect(() => {
    console.log(student); // Debug log untuk melihat apakah data siswa ada
    if (student) {
      setEditedStudent(student); // Set form dengan data siswa yang ingin diedit
    }
  }, [student]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateStudent = () => {
    if (Object.values(editedStudent).some((value) => value.trim() === "")) {
      Swal.fire({ icon: "warning", title: "Semua data harus diisi!" });
      return;
    }

    if (students && setStudents) {
      const updatedStudents = [...students];
      updatedStudents[index] = editedStudent; // Update siswa yang sudah ada
      setStudents(updatedStudents);
    }

    Swal.fire({ icon: "success", title: "Data berhasil diperbarui!" }).then(() => {
      navigate("/siswa");
    });
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Menambahkan Sidebar di sini */}
      <div className="flex-1 p-6">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4">
            Edit Siswa
          </h1>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="nama"
              value={editedStudent.nama}
              onChange={handleInputChange}
              placeholder="Nama"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="nisn"
              value={editedStudent.nisn}
              onChange={handleInputChange}
              placeholder="NISN"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="alamat"
              value={editedStudent.alamat}
              onChange={handleInputChange}
              placeholder="Alamat"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="namaOrangTua"
              value={editedStudent.namaOrangTua}
              onChange={handleInputChange}
              placeholder="Nama Orang Tua"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="nomerHpOrangTua"
              value={editedStudent.nomerHpOrangTua}
              onChange={handleInputChange}
              placeholder="Nomor HP Orang Tua"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="nomerHp"
              value={editedStudent.nomerHp}
              onChange={handleInputChange}
              placeholder="Nomor HP"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="ttl"
              value={editedStudent.ttl}
              onChange={handleInputChange}
              placeholder="Tempat, Tanggal Lahir"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-4">
              <button
                onClick={handleUpdateStudent}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Simpan Perubahan
              </button>
              <button
                onClick={() => navigate("/siswa")}
                className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition"
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

export default EditSiswa;
