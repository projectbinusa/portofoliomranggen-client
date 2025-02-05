import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";

const TambahProduk = () => {
  const [produk, setProduk] = useState({
    nama: "",
    deskripsi: "",
    kondisi: "",
    harga: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduk({ ...produk, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!produk.nama || !produk.deskripsi || !produk.kondisi || !produk.harga) {
      Swal.fire({
        title: "Gagal!",
        text: "Semua field harus diisi.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const produkDTO = {
      nama: produk.nama,
      deskripsi: produk.deskripsi,
      kondisi: produk.kondisi,
      harga: produk.harga,
    };

    console.log("Payload yang dikirim:", produkDTO);

    try {
      const response = await fetch("/api/produk/tambah", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produkDTO),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Response error:", errorData);
        throw new Error(`Error: ${errorData.message || "Gagal menambahkan produk"}`);
      }

      const data = await response.json();
      console.log("Data yang berhasil disimpan:", data);

      Swal.fire({
        title: "Sukses!",
        text: "Produk berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/produk");
      });
    } catch (error) {
      console.error("Error:", error.message);
      Swal.fire({
        title: "Gagal!",
        text: `Terjadi kesalahan: ${error.message}`,
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
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tambah Produk</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[ 
            { label: "Nama Produk", name: "nama", type: "text" },
            { label: "Deskripsi", name: "deskripsi", type: "text" },
            { label: "Kondisi", name: "kondisi", type: "text" },
            { label: "Harga", name: "harga", type: "number" },
          ].map((field) => (
            <div key={field.name} className="flex items-center gap-4">
              <label className="w-1/5 text-gray-700 font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={produk[field.name]}
                onChange={handleChange}
                className="w-4/5 border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
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
    </div>
  );
};

export default TambahProduk;