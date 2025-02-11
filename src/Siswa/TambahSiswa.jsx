import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format YYYY-MM-DD
  };

  const validateForm = () => {
    for (const key in student) {
      if (!student[key]) {
        Swal.fire("Gagal!", `Field "${key}" harus diisi.`, "error");
        return false;
      }
    }

    if (!/^\d+$/.test(student.nisn)) {
      Swal.fire("Gagal!", "NISN hanya boleh berisi angka.", "error");
      return false;
    }

    if (!/^\d+$/.test(student.nomerHp)) {
      Swal.fire("Gagal!", "Nomor HP hanya boleh berisi angka.", "error");
      return false;
    }

    if (!/^\d+$/.test(student.nomerHpOrangtua)) {
      Swal.fire("Gagal!", "Nomor HP Orangtua hanya boleh berisi angka.", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const studentDTO = {
      id: 0,
      nama: student.nama,
      nisn: parseInt(student.nisn),
      alamat: student.alamat,
      namaOrangtua: student.namaOrangtua,
      nomerHpOrangtua: parseInt(student.nomerHpOrangtua),
      nomerHp: parseInt(student.nomerHp),
      tanggalLahir: formatDate(student.tanggalLahir),
    };

    console.log("Data yang dikirim ke backend:", studentDTO);

    try {
      const response = await fetch(`${API_SISWA}/tambah`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentDTO),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error:", errorText);
        throw new Error(`Gagal menambahkan siswa: ${errorText}`);
      }

      const result = await response.json();
      console.log("Response:", result);

      Swal.fire("Sukses!", "Data siswa berhasil ditambahkan.", "success").then(() =>
        navigate("/siswa")
      );
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      Swal.fire("Gagal!", `Terjadi kesalahan: ${error.message}`, "error");
    }
  };

  return (
    <div className="flex-1 p-8 ml-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-left">Tambah Siswa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["nama", "nisn", "alamat", "namaOrangtua", "nomerHpOrangtua", "nomerHp", "tanggalLahir"].map((field) => (
          <div key={field} className="flex items-center gap-4">
            <label className="w-1/5 text-gray-700 font-medium text-left">
              {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </label>
            <input
              type={field === "tanggalLahir" ? "date" : "text"}
              name={field}
              value={student[field]}
              onChange={handleChange}
              className="w-4/5 border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="bg-gray-400 text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-500 transition"
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
  );
};

export default TambahSiswa;
