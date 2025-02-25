import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_PRODUK } from "../utils/BaseUrl";
import UploadFoto from "../upload/UploadFoto";
import Sidebar from "../components/Sidebar";
import { useNotification } from "../context/NotificationContext"; // 🔔 Import Notifikasi

const TambahProduk = () => {
  const [produk, setProduk] = useState({
    nama: "",
    deskripsi: "",
    kondisi: "",
    harga: "",
    fotoUrl: "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // 🔔 Inisialisasi Notifikasi

  const handleChange = (e) => {
    setProduk({ ...produk, [e.target.name]: e.target.value });
  };

  const handleUploadSuccess = (imageUrl) => {
    setProduk({ ...produk, fotoUrl: imageUrl });
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

    if (Object.values(produk).some((value) => !value)) {
      Swal.fire({
        title: "Gagal!",
        text: "Semua field harus diisi.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      const response = await fetch(`${API_PRODUK}/tambah`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produk),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menambahkan produk");
      }

      Swal.fire({
        title: "Sukses!",
        text: "Produk berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        addNotification(`Produk "${produk.nama}" telah ditambahkan.`, "success"); // 🔔 Kirim Notifikasi
        navigate("/produk");
      });
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
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center pl-64 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Tambah Produk</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Nama Produk", name: "nama", type: "text" },
                { label: "Deskripsi", name: "deskripsi", type: "text" },
                { label: "Kondisi", name: "kondisi", type: "text" },
                { label: "Harga", name: "harga", type: "number" },
                { label: "Foto Produk (URL)", name: "fotoUrl", type: "text" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium text-left capitalize">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={produk[field.name]}
                    onChange={handleChange}
                    placeholder={`Masukkan ${field.label}`}
                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            {/* Komponen Upload Foto */}
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium text-left">Upload Foto</label>
              <UploadFoto onUploadSuccess={handleUploadSuccess} setIsUploading={setIsUploading} />
            </div>

            <div className="flex justify-between space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/produk")}
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

export default TambahProduk;
