import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { API_PRODUK } from "../utils/BaseUrl";
import UploadFoto from "../upload/UploadFoto";
import Sidebar from "../components/Sidebar";

const EditProduk = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produk, setProduk] = useState({
    nama: "",
    deskripsi: "",
    kondisi: "",
    harga: 0,
    fotoUrl: "",
  });

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_PRODUK}/getById/${id}`)
      .then((response) => {
        setProduk({
          nama: response.data.nama || "",
          deskripsi: response.data.deskripsi || "",
          kondisi: response.data.kondisi || "",
          harga: response.data.harga || 0,
          fotoUrl: response.data.fotoUrl || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        Swal.fire("Gagal!", "Terjadi kesalahan saat memuat data produk.", "error");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduk((prev) => ({
      ...prev,
      [name]: name === "harga" ? (value === "" ? 0 : parseInt(value)) : value,
    }));
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

    if (!produk.nama || !produk.deskripsi || !produk.kondisi || produk.harga <= 0 || !produk.fotoUrl) {
      Swal.fire("Gagal!", "Semua field harus diisi dengan benar.", "error");
      return;
    }

    try {
      await axios.put(`${API_PRODUK}/editById/${id}`, produk);
      Swal.fire("Sukses!", "Data produk berhasil diperbarui.", "success").then(() => {
        navigate("/produk");
      });
    } catch (error) {
      console.error("Error updating data:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat memperbarui data produk.", "error");
    }
  };

  return (
   <div className="flex h-screen overflow-hidden">
         <Sidebar />
         <div className="flex-1 flex items-center justify-center pl-64 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Edit Produk</h2>
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

            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium text-left">Upload Foto Produk</label>
              <UploadFoto onUploadSuccess={handleUploadSuccess} setIsUploading={setIsUploading} />
            </div>

            <div className="flex justify-between space-x-4 mt-6">
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                onClick={() => navigate("/produk")}
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

export default EditProduk;
