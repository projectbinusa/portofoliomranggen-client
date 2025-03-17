import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { API_SISWA } from "../utils/BaseUrl";
import { useNotification } from "../context/NotificationContext"; // ✅ Gunakan useNotification

const EditSiswa = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // ✅ Pakai useNotification
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({
    nama: "",
    nisn: "",
    alamat: "",
    namaOrangtua: "",
    nomerHpOrangtua: "",
    nomerHp: "",
    tanggalLahir: "",
  });

  const userLogin = sessionStorage.getItem("username") || "Admin"; // 🔥 Ambil user login
  // const userLogin = sessionStorage.getItem("username") || "Admin"; // 🔥 Ambil user login

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`${API_SISWA}/getById/${id}`);
        if (!response.ok) throw new Error("Data tidak ditemukan");

        const data = await response.json();
        setStudent({
          ...data,
          tanggalLahir: data.tanggalLahir
            ? data.tanggalLahir.split("T")[0]
            : "",
        });
      } catch (error) {
        Swal.fire("Error", "Terjadi kesalahan saat mengambil data siswa.", "error");
      }
    };

    if (id) fetchStudent();
  }, [id]);

  const toCamelCase = (text) => {
    return text
      .trim()
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 🚨 Validasi input
    if (Object.values(student).some((value) => !value)) {
      Swal.fire("Error", "Semua kolom harus diisi!", "error");
      setLoading(false);
      return;
    }

    if (!/^\d+$/.test(student.nisn)) {
      Swal.fire("Error", "NISN hanya boleh berisi angka!", "error");
      setLoading(false);
      return;
    }

    if (!/^\d+$/.test(student.nomerHp) || !/^\d+$/.test(student.nomerHpOrangtua)) {
      Swal.fire("Error", "Nomor HP hanya boleh berupa angka!", "error");
      setLoading(false);
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (student.tanggalLahir > today) {
      Swal.fire("Error", "Tanggal lahir tidak boleh di masa depan!", "error");
      setLoading(false);
      return;
    }

    const updatedStudent = {
      nama: toCamelCase(student.nama),
      nisn: student.nisn,
      alamat: toCamelCase(student.alamat),
      namaOrangtua: toCamelCase(student.namaOrangtua),
      nomerHpOrangtua: student.nomerHpOrangtua,
      nomerHp: student.nomerHp,
      tanggalLahir: formatDate(student.tanggalLahir),
    };

    try {
      const response = await fetch(`${API_SISWA}/editById/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudent),
      });

      if (!response.ok) throw new Error("Gagal mengedit siswa");

      // 🔥 Kirim Notifikasi
      if (addNotification) {
        addNotification(`${userLogin} mengedit data siswa: ${updatedStudent.nama}`, "info");
        addNotification(`Admin memperbarui data siswa: ${updatedStudent.nama}`, "info");
      }

      Swal.fire("Sukses!", "Data siswa berhasil diperbarui.", "success").then(() => {
        navigate("/siswa");
      });
    } catch (error) {
      Swal.fire("Gagal!", "Terjadi kesalahan saat mengedit data siswa.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Edit Siswa</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(student).map((key) => (
              <div key={key} className="flex flex-col">
                <label className="text-gray-700 text-sm font-medium text-left capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={key === "tanggalLahir" ? "date" : "text"}
                  name={key}
                  value={student[key] || ""}
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
                disabled={loading}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSiswa;
