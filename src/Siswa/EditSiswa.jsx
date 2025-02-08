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
            tanggalLahir: data.tanggalLahir ? data.tanggalLahir.split("T")[0] : "",
          });
        } else {
          Swal.fire({
            title: "Not Found",
            text: "Siswa dengan ID tersebut tidak ditemukan.",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        Swal.fire({
          title: "Error",
          text: "Terjadi kesalahan saat mengambil data siswa.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${API_SISWA}/editById/${id}`, student);
      if (response.status === 200) {
        Swal.fire({
          title: "Sukses!",
          text: "Data siswa berhasil diperbarui.",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/siswa");
        });
      } else {
        throw new Error("Gagal mengedit siswa");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat mengedit data siswa.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Form */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Siswa</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Grid Label dan Input */}
          <div className="grid grid-cols-2 gap-4 items-center w-full max-w-2xl">
            {[
              { label: "Nama", name: "nama", type: "text" },
              { label: "NISN", name: "nisn", type: "text" },
              { label: "Alamat", name: "alamat", type: "text" },
              { label: "Nama Orangtua", name: "namaOrangtua", type: "text" },
              { label: "Nomor HP Orangtua", name: "nomerHpOrangtua", type: "tel" },
              { label: "Nomor HP", name: "nomerHp", type: "tel" },
              { label: "Tanggal Lahir", name: "tanggalLahir", type: "date" },
            ].map((field) => (
              <>
                <label key={`label-${field.name}`} className="text-gray-700 font-medium">
                  {field.label}
                </label>
                <input
                  key={field.name}
                  type={field.type}
                  name={field.name}
                  value={student[field.name]}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500"
                />
              </>
            ))}
          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              className="bg-gray-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-600 transition"
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

export default EditSiswa;
