import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { API_SISWA } from "../utils/BaseUrl";

function EditSiswa() {
  const navigate = useNavigate();
  const location = useLocation();
  const { student } = location.state || {}; // Ambil data dari state atau default {}

  const [editedStudent, setEditedStudent] = useState({
    id: "",
    nama: "",
    nisn: "",
    tempatTinggal: "",
    namaOrangtua: "",
    nomerHpOrangtua: "",
    nomerHp: "",
    tanggalLahir: "",
  });

  useEffect(() => {
    if (student) {
      console.log("Student data received:", student);
      setEditedStudent((prev) => ({ ...prev, ...student }));
    }
  }, [student]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateStudent = async () => {
    if (!editedStudent.id) {
      Swal.fire({
        icon: "error",
        title: "Data tidak valid!",
        text: "ID siswa tidak ditemukan.",
      });
      return;
    }

    // Cek jika ada input yang kosong (khusus untuk string, agar tidak error di number)
    if (Object.entries(editedStudent).some(([key, value]) => key !== "id" && value === "")) {
      Swal.fire({ icon: "warning", title: "Semua data harus diisi!" });
      return;
    }

    try {
      const response = await fetch(`${API_SISWA}/editById/${editedStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editedStudent,
          nisn: editedStudent.nisn ? Number(editedStudent.nisn) : null,
          nomerHp: editedStudent.nomerHp ? Number(editedStudent.nomerHp) : null,
          nomerHpOrangtua: editedStudent.nomerHpOrangtua ? Number(editedStudent.nomerHpOrangtua) : null,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Gagal memperbarui data");

      Swal.fire({ icon: "success", title: "Data berhasil diperbarui!" }).then(() => {
        navigate("/siswa");
      });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Gagal memperbarui data", text: error.message });
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-4">
          <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4">Edit Siswa</h1>
          <div className="space-y-4">
            {[
              { name: "nama", type: "text", placeholder: "Nama" },
              { name: "nisn", type: "number", placeholder: "NISN" },
              { name: "tempatTinggal", type: "text", placeholder: "Tempat Tinggal" },
              { name: "namaOrangtua", type: "text", placeholder: "Nama Orang Tua" },
              { name: "nomerHpOrangtua", type: "number", placeholder: "Nomor HP Orang Tua" },
              { name: "nomerHp", type: "number", placeholder: "Nomor HP" },
              { name: "tanggalLahir", type: "date", placeholder: "Tanggal Lahir" },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                value={editedStudent[field.name] || ""}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                className="w-full p-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
            <div className="flex gap-4">
              <button
                onClick={handleUpdateStudent}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Simpan Perubahan
              </button>
              <button
                onClick={() => navigate("/siswa")}
                className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
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
