import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const TambahPesanan = () => {
  const [formData, setFormData] = useState({
    namaPesanan: "",
    jumlah: "",
    harga: "",
    kondisi: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4321/api/pesanan/tambah", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          namaPesanan: formData.namaPesanan,
          jumlah: parseInt(formData.jumlah),
          harga: parseInt(formData.harga),
          kondisi: formData.kondisi,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Pesanan berhasil ditambahkan:", result);

        // Menampilkan SweetAlert
        Swal.fire({
          title: "Berhasil!",
          text: "Pesanan berhasil ditambahkan",
          icon: "success",
        }).then(() => {
          navigate("/pesanan"); // Redirect setelah klik OK
        });
      } else {
        console.error("Gagal menambahkan pesanan");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border-2 border-gray-600">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Tambah Pesanan</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-start">
              <label className="block text-gray-600">Nama Pesanan</label>
              <input
                type="text"
                name="namaPesanan"
                value={formData.namaPesanan}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Masukkan nama pesanan"
                required
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="block text-gray-600">Jumlah Pesanan</label>
              <input
                type="number"
                name="jumlah"
                value={formData.jumlah}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Masukkan jumlah pesanan"
                required
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="block text-gray-600">Harga Pesanan</label>
              <input
                type="number"
                name="harga"
                value={formData.harga}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Masukkan harga pesanan"
                required
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="block text-gray-600">Kondisi Pesanan</label>
              <select
                name="kondisi"
                value={formData.kondisi}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Pilih kondisi</option>
                <option value="Baru">Baru</option>
                <option value="Bekas">Bekas</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="submit-left bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 border-2 border-gray-500 flex items-center gap-2"
                onClick={() => navigate("/page-pesanan")}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
              </button>
              <button
                type="submit"
                className="submit-button bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 border-2 border-gray-500 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faFloppyDisk} className="text-lg" />
                Tambah
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahPesanan;
