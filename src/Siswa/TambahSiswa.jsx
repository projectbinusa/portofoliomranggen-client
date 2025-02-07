import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { API_SISWA } from "../utils/BaseUrl";

const TambahSiswa = () => {
  const [student, setStudent] = useState({
    nama: "",
    nisn: "",
    tempatTinggal: "",
    namaOrangtua: "",
    nomerHpOrangtua: "",
    nomerHp: "",
    tanggalLahir: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !student.nama ||
      !student.nisn ||
      !student.tempatTinggal ||
      !student.namaOrangtua ||
      !student.nomerHpOrangtua ||
      !student.nomerHp ||
      !student.tanggalLahir
    ) {
      Swal.fire({
        title: "Gagal!",
        text: "Semua field harus diisi.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const studentDTO = {
      nama: student.nama,
      nisn: parseInt(student.nisn),  // Convert NISN to integer
      alamat: student.tempatTinggal, // Update field to 'alamat'
      namaOrangtua: student.namaOrangtua,
      nomerHp: parseInt(student.nomerHp),  // Convert nomor HP to integer
      nomerHpOrangtua: parseInt(student.nomerHpOrangtua),  // Convert nomor HP orangtua to integer
      tanggalLahir: student.tanggalLahir,  // Date format (ensure it matches the backend format)
    };

    console.log("Payload yang dikirim:", studentDTO);

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
        console.error("Response error:", errorData);
        throw new Error(`Error: ${errorData.message || "Gagal menambahkan siswa"}`);
      }

      const data = await response.json();
      console.log("Data yang berhasil disimpan:", data);

      Swal.fire({
        title: "Sukses!",
        text: "Data siswa berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/siswa");
      });
    } catch (error) {
      console.error("Error:", error.message);
      Swal.fire({
        title: "Gagal!",
        text: `Terjadi kesalahan: ${error.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="flex">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-1 p-8 ml-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tambah Siswa</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Nama", name: "nama", type: "text" },
            { label: "NISN", name: "nisn", type: "text" },
            { label: "Tempat Tinggal", name: "tempatTinggal", type: "text" },
            { label: "Nama Orangtua", name: "namaOrangtua", type: "text" },
            { label: "Nomor HP Orangtua", name: "nomerHpOrangtua", type: "text" },
            { label: "Nomor HP", name: "nomerHp", type: "text" },
            { label: "Tanggal Lahir", name: "tanggalLahir", type: "date" },
          ].map((field) => (
            <div key={field.name} className="flex items-center gap-4">
              <label className="w-1/5 text-gray-700 font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={student[field.name]}
                onChange={handleChange}
                className="w-4/5 border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="text-black font-semibold hover:underline"
              onClick={() => navigate("/siswa")}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahSiswa;
