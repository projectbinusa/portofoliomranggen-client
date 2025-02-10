import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { API_SISWA } from "../utils/BaseUrl";

const TambahSiswa = () => {
  const [student, setStudent] = useState({
    nama: "",
    nisn: "",
    alamat: "",
    namaOrangtua: "",
    nomerHpOrangtua: "",
    nomerHp: "",
    tanggalLahir: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input kosong
    for (const key in student) {
      if (!student[key]) {
        Swal.fire({
          title: "Gagal!",
          text: "Semua field harus diisi.",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }
    }

    // Validasi NISN dan Nomor HP harus angka
    if (isNaN(student.nisn) || isNaN(student.nomerHp) || isNaN(student.nomerHpOrangtua)) {
      Swal.fire({
        title: "Gagal!",
        text: "NISN dan Nomor HP harus berupa angka.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const studentDTO = {
      ...student,
      nisn: parseInt(student.nisn),
      nomerHp: parseInt(student.nomerHp),
      nomerHpOrangtua: parseInt(student.nomerHpOrangtua),
    };

    try {
      const response = await fetch(`${API_SISWA}/tambah`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentDTO),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menambahkan siswa");
      }

      await response.json();
      Swal.fire({
        title: "Sukses!",
        text: "Data siswa berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => navigate("/siswa"));
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: `Terjadi kesalahan: ${error.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar className="w-64 min-h-screen bg-white shadow-md" />
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Tambah Siswa</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["nama", "nisn", "alamat", "namaOrangtua", "nomerHpOrangtua", "nomerHp", "tanggalLahir"].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="text-sm text-gray-600 font-medium">{field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</label>
                <input
                  type={field.includes("tanggalLahir") ? "date" : "text"}
                  name={field}
                  value={student[field]}
                  onChange={handleChange}
                  className="mt-1 border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-gray-400 text-white font-medium px-4 py-1 rounded-md hover:bg-gray-500 transition text-sm"
                onClick={() => navigate("/siswa")}
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white font-medium px-4 py-1 rounded-md hover:bg-green-600 transition text-sm"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahSiswa;
