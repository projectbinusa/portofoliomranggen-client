import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const TambahPesanan = () => {
  const [formData, setFormData] = useState({
    produk: "",
    jumlah: "",
    foto: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      setFormData({ ...formData, foto: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pesanan Ditambahkan:", formData);
  };

  return (
    <div className="bg-gradient-to-b from-[#00b894] via-[#00b894] to-[#00b894] flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Tambah Pesanan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600">Nama Produk</label>
            <input
              type="text"
              name="produk"
              value={formData.produk}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan nama produk"
            />
          </div>
          <div>
            <label className="block text-gray-600">Jumlah</label>
            <input
              type="number"
              name="jumlah"
              value={formData.jumlah}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan jumlah produk"
            />
          </div>
          <div>
            <label className="block text-gray-600">Upload Foto Produk</label>
            <input
              type="file"
              name="foto"
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="submit-left bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
              onClick={() => navigate('/dasboard')}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button type="submit" className="submit-button bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
              <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahPesanan;
