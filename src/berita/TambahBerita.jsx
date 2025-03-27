import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BERITA } from "../utils/BaseUrl";
import Swal from "sweetalert2";
import UploadFoto from "../upload/UploadFoto";
import Sidebar from "../components/Sidebar";
import { useNotification } from "../context/NotificationContext"; // 🔔 Import notifikasi

const TambahBerita = () => {
  const [berita, setBerita] = useState({
    nama: "",
    penulis: "",
    deskripsi: "",
    fotoUrl: "",
    tanggalTerbit: "",
    idAdmin: "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // 🔔 Gunakan notifikasi

  const handleChange = (e) => {
    setBerita({ ...berita, [e.target.name]: e.target.value });
  };

  const handleUploadSuccess = (imageUrl) => {
    setBerita({ ...berita, fotoUrl: imageUrl });
    setIsUploading(false);
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUploading) {
      Swal.fire("Gagal!", "Silakan tunggu hingga foto selesai di-upload.", "error");
      return;
    }

    if (!berita.nama || !berita.penulis || !berita.deskripsi || !berita.fotoUrl || !berita.tanggalTerbit || !berita.idAdmin) {
      Swal.fire("Gagal!", "Semua field harus diisi.", "error");
      return;
    }

    try {
      const response = await fetch(`${API_BERITA}/tambah`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(berita),
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan berita");
      }

      Swal.fire("Sukses!", "Data berita berhasil ditambahkan.", "success").then(() => {
        addNotification(`Berita ${berita.nama} telah ditambahkan`, "success"); // 🔔 Notifikasi tambah berita sukses
        navigate("/berita");
      });
    } catch (error) {
      Swal.fire("Gagal!", `Terjadi kesalahan: ${error.message}`, "error");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center pl-64 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Tambah Berita</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{ label: "Nama", name: "nama", type: "text" },
                { label: "Penulis", name: "penulis", type: "text" },
                { label: "Deskripsi", name: "deskripsi", type: "text" },
                { label: "Tanggal Terbit", name: "tanggalTerbit", type: "date" },
                { label: "Foto Berita (URL)", name: "fotoUrl", type: "text" },
                { label: "ID Admin", name: "idAdmin", type: "number" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium text-left capitalize">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={berita[field.name] || ""}
                    onChange={handleChange}
                    placeholder={`Masukkan ${field.label}`}
                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium text-left">Upload Foto</label>
              <UploadFoto onUploadSuccess={handleUploadSuccess} setIsUploading={setIsUploading} />
            </div>

            <div className="flex justify-between space-x-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  navigate("/berita");
                 
                }}
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

export default TambahBerita;
