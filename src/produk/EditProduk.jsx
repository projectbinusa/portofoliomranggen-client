import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { API_PRODUK } from "../utils/BaseUrl";
import UploadFoto from "../upload/UploadFoto";

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

  const [isUploading, setIsUploading] = useState(false); // Status upload foto

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
    <div className="flex-1 p-8 ml-4 mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Produk</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[{ label: "Nama Produk", name: "nama", type: "text" },
          { label: "Deskripsi", name: "deskripsi", type: "text" },
          { label: "Kondisi", name: "kondisi", type: "text" },
          { label: "Harga", name: "harga", type: "number" },
          { label: "Foto Produk (URL)", name: "fotoUrl", type: "text" },
        ].map((field) => (
          <div key={field.name} className="flex items-center">
            <label className="w-40 text-gray-700 font-medium text-left">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={produk[field.name]}
              onChange={handleChange}
              className="flex-1 border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Komponen Upload Foto */}
        <div className="flex items-center gap-4">
          <label className="w-40 text-gray-700 font-medium text-left">Upload Foto Produk</label>
          <UploadFoto
            onUploadSuccess={handleUploadSuccess}
            setIsUploading={setIsUploading}
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="text-black font-semibold hover:underline"
            onClick={() => navigate("/produk")}>
            Batal
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold px-6 py-2
             rounded-lg hover:bg-green-700 transition">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduk;