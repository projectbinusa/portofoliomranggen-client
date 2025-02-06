import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar";

const EditPesanan = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    produk: "",
    jumlah: "",
    harga: "",
    kondisi: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data pesanan berdasarkan ID (dummy data)
    const fetchPesanan = async () => {
      const data = {
        produk: "Contoh Produk",
        jumlah: "10",
        harga: "50000",
        kondisi: "Baru",
      };
      setFormData(data);
    };
    fetchPesanan();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pesanan Diperbarui:", formData);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border-2 border-gray-600">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Edit Pesanan</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-start">
              <label className="block text-gray-600">Nama Pesanan</label>
              <input
                type="text"
                name="produk"
                value={formData.produk}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Masukkan nama pesanan"
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
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="block text-gray-600">Kondisi Pesanan</label>
              <select
                name="kondisi"
                value={formData.kondisi}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Pilih kondisi</option>
                <option value="Baru">Baru</option>
                <option value="Bekas">Bekas</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="submit-left bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 border-2 border-gray-600"
                onClick={() => navigate("/dashboard")}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                type="submit"
                className="submit-button bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 border-2 border-gray-600"
              >
                <FontAwesomeIcon icon={faFloppyDisk} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPesanan;