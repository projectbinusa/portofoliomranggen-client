import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { API_SISWA } from "../utils/BaseUrl";
import { useParams, useNavigate } from "react-router-dom";

const EditSiswa = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    nama: "",
    nisn: "",
    alamat: "",
    namaOrangtua: "",
    nomerHpOrangtua: "",
    nomerHp: "",
    tanggalLahir: "",
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${API_SISWA}/getById/${id}`);
        if (response.status === 200) {
          const data = response.data;
          setStudent({
            ...data,
            tanggalLahir: data.tanggalLahir
              ? data.tanggalLahir.split("T")[0]
              : "",
          });
        } else {
          Swal.fire(
            "Not Found",
            "Siswa dengan ID tersebut tidak ditemukan.",
            "error"
          );
        }
      } catch (error) {
        Swal.fire(
          "Error",
          "Terjadi kesalahan saat mengambil data siswa.",
          "error"
        );
      }
    };

    if (id) fetchStudent();
  }, [id]);

  const handleChange = (e) =>
    setStudent({ ...student, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_SISWA}/editById/${id}`, student);
      if (response.status === 200) {
        Swal.fire("Sukses!", "Data siswa berhasil diperbarui.", "success").then(
          () => navigate("/siswa")
        );
      } else {
        throw new Error("Gagal mengedit siswa");
      }
    } catch (error) {
      Swal.fire(
        "Gagal!",
        "Terjadi kesalahan saat mengedit data siswa.",
        "error"
      );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Edit Siswa</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              "nama",
              "nisn",
              "alamat",
              "namaOrangtua",
              "nomerHpOrangtua",
              "nomerHp",
              "tanggalLahir",
            ].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="text-gray-700 text-sm font-medium text-left capitalize">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={field === "tanggalLahir" ? "date" : "text"}
                  name={field}
                  value={student[field] || ""}
                  onChange={handleChange}
                  placeholder={`Masukkan ${field
                    .replace(/([A-Z])/g, " $1")
                    .trim()}`}
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

export default EditSiswa;
