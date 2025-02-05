import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const url = "http://localhost:4321/api";
export const API_SISWA = `${url}/siswa`;

function TambahSiswa() {
  const [newStudent, setNewStudent] = useState({
    nama: "",
    nisn: "",
    tempatTinggal: "",
    namaOrangtua: "",
    nomerHpOrangtua: "",
    nomerHp: "",
    tanggalLahir: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = async () => {
    if (Object.values(newStudent).some((value) => !value)) {
      Swal.fire({ icon: "warning", title: "Semua data harus diisi!" });
      return;
    }

    try {
      await axios.post(`${API_SISWA}/tambah`, {
        ...newStudent,
        nisn: parseInt(newStudent.nisn),
        nomerHp: parseInt(newStudent.nomerHp),
        nomerHpOrangtua: parseInt(newStudent.nomerHpOrangtua),
      });
      Swal.fire({ icon: "success", title: "Siswa berhasil ditambahkan!" }).then(() => {
        navigate("/siswa");
      });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Terjadi kesalahan", text: error.message });
    }
  };

  const handleCancel = () => {
    navigate("/siswa");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4">Tambah Siswa</h1>
          <div className="space-y-4">
            {Object.keys(newStudent).map((key) => (
              <input
                key={key}
                type="text"
                name={key}
                value={newStudent[key]}
                onChange={handleInputChange}
                placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
            <div className="flex gap-4 justify-between">
              <button onClick={handleAddStudent} className="w-48 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">Tambah Siswa</button>
              <button onClick={handleCancel} className="w-48 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition">Batal</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TambahSiswa;
