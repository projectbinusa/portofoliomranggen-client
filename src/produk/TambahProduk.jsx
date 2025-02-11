import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_PRODUK } from "../utils/BaseUrl";

const TambahProduk = () => {
  const [produk, setProduk] = useState({
    nama: "",
    deskripsi: "",
    kondisi: "",
    harga: "",
    foto: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduk({ ...produk, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!produk.nama || !produk.deskripsi || !produk.kondisi || !produk.harga || !produk.foto) {
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
        throw new Error(`Error: ${errorData.message || "Gagal menambahkan produk"}`);
      }

      Swal.fire({
        title: "Sukses!",
        text: "Produk berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
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
    <div className="flex-1 p-8 ml-4 mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tambah Produk</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Nama Produk", name: "nama", type: "text" },
          { label: "Deskripsi", name: "deskripsi", type: "text" },
          { label: "Kondisi", name: "kondisi", type: "text" },
          { label: "Harga", name: "harga", type: "number" },
          { label: "Foto Produk (URL)", name: "foto", type: "text" },
        ].map((field) => (
          <div key={field.name} className="flex items-center gap-4">
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

export default TambahProduk;