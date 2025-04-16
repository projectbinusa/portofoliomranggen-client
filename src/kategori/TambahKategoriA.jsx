import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { useNotification } from "../context/NotificationContext"; // 🔔 Import Notifikasi

const TambahKategoriA = () => {
  const [namaKategori, setNamaKategori] = useState("");
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // 🔔 Inisialisasi Notifikasi

  const toCamelCase = (str) =>
    str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaKategori.trim()) {
      Swal.fire("Error", "Nama kategori tidak boleh kosong!", "error");
      return;
    }

    const formattedKategori = toCamelCase(namaKategori);

    try {
      const response = await fetch("http://localhost:4321/api/kategori/tambah", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: 0, namaKategori: formattedKategori }),
      });

      if (response.ok) {
        const result = await response.json();

        addNotification(
          `Kategori "${result.namaKategori}" berhasil ditambahkan`,
          "success"
        ); // 🔔 Kirim Notifikasi

        Swal.fire({
          title: "Kategori Ditambahkan!",
          text: `Kategori "${result.namaKategori}" berhasil ditambahkan.`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => navigate("/page-kategori"));

        console.log("Kategori Ditambahkan:", result);
      } else {
        throw new Error("Gagal menambahkan kategori.");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat menambahkan kategori.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Form Container */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full border border-gray-300">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-center w-full">
              Tambah Kategori
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="namaKategori"
                className="block text-sm font-medium text-gray-700"
              >
                Nama Kategori
              </label>
              <input
                type="text"
                id="namaKategori"
                name="namaKategori"
                value={namaKategori}
                onChange={(e) => setNamaKategori(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md
                 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Masukkan nama kategori"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm 
              text-sm font-medium text-white bg-green-600 hover:bg-green-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Simpan Kategori
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahKategoriA;
