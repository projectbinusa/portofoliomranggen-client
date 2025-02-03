import { useState, useEffect } from "react";
import Swal from "sweetalert2"; // SweetAlert untuk konfirmasi
import axios from "axios"; // Pastikan axios sudah diinstall
import Sidebar from "../components/Sidebar"; // Pastikan Sidebar ada
import { API_STAFF } from "../utils/BaseUrl"; // API base URL yang sudah didefinisikan
import { useParams, useNavigate } from "react-router-dom"; // Mengimpor useNavigate untuk redirect

const EditStaff = () => {
  const { id } = useParams(); // Menyusun ulang untuk mendapatkan 'id' dengan benar
  const navigate = useNavigate(); // Hook untuk redirect setelah update
  const [staff, setStaff] = useState({
    nama: "",
    alamat: "",
    noTelepon: "",
    awalBekerja: "",
    lamaKerja: "",
    createDate: "",
  });

  // Menarik data staff berdasarkan ID saat komponen dimuat
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(`${API_STAFF}/getById/${id}`); // Gunakan id di sini
        if (response.status === 200) {
          const data = response.data;
          console.log("Data Staff diterima: ", data);
          setStaff(data); // Menyimpan data staff ke state
        } else {
          Swal.fire({
            title: "Not Found",
            text: "Staff dengan ID tersebut tidak ditemukan.",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      } catch (error) {
        console.error("Error fetching staff data:", error);
        Swal.fire({
          title: "Error",
          text: "Terjadi kesalahan saat mengambil data staff.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    };

    if (id) {
      fetchStaff(); // Fetch data hanya jika id ada
    }
  }, [id]); // Mengambil data saat `id` berubah

  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${API_STAFF}/editById/${id}`, staff); // Gunakan id di sini
      if (response.status === 200) {
        Swal.fire({
          title: "Sukses!",
          text: "Data staf berhasil diperbarui.",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/daftar-staff"); // Mengarahkan kembali ke halaman daftar staff setelah berhasil
        });
      } else {
        throw new Error("Gagal mengedit staff");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat mengedit data staf.",
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
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Staff</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[ 
            { label: "Nama", name: "nama", type: "text" },
            { label: "Alamat", name: "alamat", type: "text" },
            { label: "Nomor Telepon", name: "noTelepon", type: "text" },
            { label: "Awal Bekerja", name: "awalBekerja", type: "date" },
            { label: "Lama Kerja (Tahun)", name: "lamaKerja", type: "text" },
            { label: "Tanggal Dibuat", name: "createDate", type: "date" },
          ].map((field) => (
            <div key={field.name} className="flex items-center gap-4">
              <label className="w-1/5 text-gray-700 font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={staff[field.name] || ""}
                onChange={handleChange}
                className="w-4/5 border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" className="text-black font-semibold hover:underline">
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

export default EditStaff;
