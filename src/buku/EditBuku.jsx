import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { API_BUKU } from "../utils/BaseUrl";
import UploadFoto from "../upload/UploadFoto";
import { useNotification } from "../context/NotificationContext"; // ✅ Import notifikasi

const EditBuku = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // ✅ Tambahkan sendNotification

  const [buku, setBuku] = useState({
    judulBuku: "",
    penerbit: "",
    pengarang: "",
    tahunTerbit: "",
    jumlahHalaman: "",
    idAdmin: "",
    fotoUrl: "",
  });

  const [isUploading, setIsUploading] = useState(false); // Status upload foto

  useEffect(() => {
    const fetchBuku = async () => {
      try {
        const response = await axios.get(`${API_BUKU}/getById/${id}`);
        setBuku(response.data);
      } catch (error) {
        Swal.fire("Gagal!", "Terjadi kesalahan saat memuat data buku.", "error");
      }
    };
    fetchBuku();
  }, [id]);

  const handleChange = (e) => {
    setBuku({ ...buku, [e.target.name]: e.target.value });
  };

  const handleUploadSuccess = (imageUrl) => {
    setBuku({ ...buku, fotoUrl: imageUrl });
    setIsUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUploading) {
      Swal.fire({
        title: "Gagal!",
        text: "Silakan tunggu hingga foto selesai di-upload.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (
      !buku.judulBuku ||
      !buku.penerbit ||
      !buku.pengarang ||
      !buku.tahunTerbit ||
      !buku.jumlahHalaman ||
      !buku.idAdmin ||
      !buku.fotoUrl
    ) {
      Swal.fire({
        title: "Gagal!",
        text: "Semua field harus diisi.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      await axios.put(`${API_BUKU}/editByid/${id}`, buku);

      addNotification("Data buku berhasil diperbarui", "success"); // ✅ Kirim notifikasi sukses

      Swal.fire({
        title: "Sukses!",
        text: "Data buku berhasil diperbarui.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/buku");
      });
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat memperbarui data buku.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center pl-64 p-4">
        <div className="bg-white shadow-md p-6 w-full max-w-4xl border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Edit Buku</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Judul Buku", name: "judulBuku", type: "text" },
                { label: "Penerbit", name: "penerbit", type: "text" },
                { label: "Pengarang", name: "pengarang", type: "text" },
                { label: "Tahun Terbit", name: "tahunTerbit", type: "number" },
                { label: "Jumlah Halaman", name: "jumlahHalaman", type: "number" },
                { label: "ID Admin", name: "idAdmin", type: "number" },
                { label: "Foto Buku (URL)", name: "fotoUrl", type: "text" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium text-left capitalize">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={buku[field.name]}
                    onChange={handleChange}
                    placeholder={`Masukkan ${field.label}`}
                    className="p-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            {/* Komponen Upload Foto */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium text-left">Upload Foto</label>
              <UploadFoto
                onUploadSuccess={handleUploadSuccess}
                setIsUploading={setIsUploading}
              />
            </div>

            <div className="flex justify-between space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/buku")}
                className="px-4 py-2 bg-gray-500 text-white hover:bg-gray-600 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition"
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

export default EditBuku;
