import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { API_SISWA } from "../utils/BaseUrl";

const TambahSiswa = () => {
  const navigate = useNavigate();
  const [siswa, setSiswa] = useState({
    nama: "",
    nisn: "",
    alamat: "",
    namaOrangtua: "",
    nomerHpOrangtua: "",
    nomerHp: "",
    tanggalLahir: "",
  });

  const toCamelCase = (text) => {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSiswa((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Jika bukan tanggal valid, return string kosong
    return date.toISOString().split("T")[0]; // Format YYYY-MM-DD
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi semua field harus diisi
    if (Object.values(siswa).some((value) => !value)) {
      Swal.fire("Error", "Semua kolom harus diisi!", "error");
      return;
    }

    // Validasi NISN (harus angka dan 10 digit)
    if (isNaN(Number(siswa.nisn)) || siswa.nisn.length !== 10) {
      Swal.fire("Error", "NISN harus berupa angka 10 digit!", "error");
      return;
    }

    // Validasi Nomor HP (minimal 10 digit)
    if (isNaN(Number(siswa.nomerHp)) || siswa.nomerHp.length < 10) {
      Swal.fire("Error", "Nomor HP harus minimal 10 digit!", "error");
      return;
    }

    if (isNaN(Number(siswa.nomerHpOrangtua)) || siswa.nomerHpOrangtua.length < 10) {
      Swal.fire("Error", "Nomor HP Orangtua harus minimal 10 digit!", "error");
      return;
    }

    const siswaDTO = {
      id: 0,
      nama: toCamelCase(siswa.nama),
      nisn: siswa.nisn, // Biarkan sebagai string untuk mencegah kehilangan digit
      alamat: toCamelCase(siswa.alamat),
      namaOrangtua: toCamelCase(siswa.namaOrangtua),
      nomerHpOrangtua: siswa.nomerHpOrangtua, // Biarkan sebagai string
      nomerHp: siswa.nomerHp, // Biarkan sebagai string
      tanggalLahir: formatDate(siswa.tanggalLahir),
    };

    console.log("Data yang dikirim ke backend:", siswaDTO); // Debugging

    try {
      const response = await fetch(`${API_SISWA}/tambah`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(siswaDTO),
      });

      const data = await response.json();
      console.log("Response API:", data); // Debugging

      if (!response.ok) throw new Error(data.message || "Gagal menambahkan siswa");

      Swal.fire("Sukses", "Data siswa berhasil ditambahkan!", "success");
      setTimeout(() => navigate("/siswa"), 1000);
    } catch (error) {
      console.error("Error saat menambahkan siswa:", error); // Debugging
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Tambah Siswa</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(siswa).map((key) => (
              <div key={key} className="flex flex-col">
                <label className="text-gray-700 text-sm font-medium text-left capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={key === "tanggalLahir" ? "date" : "text"}
                  name={key}
                  value={siswa[key]}
                  onChange={handleChange}
                  placeholder={`Masukkan ${key.replace(/([A-Z])/g, " $1").trim()}`}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <div className="flex justify-between space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/siswa")}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
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
