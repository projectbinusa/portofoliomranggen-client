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
          console.log("Data Siswa diterima: ", data);
          setStudent(data);
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
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-1 p-8 ml-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Siswa</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Nama", name: "nama", type: "text" },
            { label: "NISN", name: "nisn", type: "text" },
            { label: "Alamat", name: "alamat", type: "text" },
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

export default EditSiswa;
