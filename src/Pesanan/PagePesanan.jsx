import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const TabelPesanan = () => {
  const [pesanan, setPesanan] = useState([]);
  const navigate = useNavigate();

  const handleDelete = (index) => {
    const newPesanan = pesanan.filter((_, i) => i !== index);
    setPesanan(newPesanan);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 max-w-4xl ml-auto mr-10">
        <div className="flex mb-4">
          <button
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
            onClick={() => navigate("/tambah-pesanan")}
          >
            Tambah Pesanan
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-600 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-600 p-1">No</th>
              <th className="border border-gray-600 p-1">Nama Pesanan</th>
              <th className="border border-gray-600 p-1">Jumlah</th>
              <th className="border border-gray-600 p-1">Harga</th>
              <th className="border border-gray-600 p-1">Kondisi</th>
              <th className="border border-gray-600 p-1">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pesanan.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-600 p-1">{index + 1}</td>
                <td className="border border-gray-600 p-1">{item.produk}</td>
                <td className="border border-gray-600 p-1">{item.jumlah}</td>
                <td className="border border-gray-600 p-1">{item.harga}</td>
                <td className="border border-gray-600 p-1">{item.kondisi}</td>
                <td className="border border-gray-600 p-1 space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600"
                    onClick={() => navigate(`/edit-pesanan/${index}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                    onClick={() => handleDelete(index)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelPesanan;
