import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import Navbar from "../tampilan/Navbar";

const PagePesanan = () => {
  const [pesanan, setPesanan] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.add("overflow-hidden");
    document.body.classList.add("overflow-hidden");
    
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    const fetchPesanan = async () => {
      try {
        const response = await fetch("http://localhost:4321/api/pesanan/all");
        if (response.ok) {
          const data = await response.json();
          setPesanan(data);
        } else {
          console.error("Gagal mengambil data pesanan");
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };
    fetchPesanan();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Pesanan yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:4321/api/pesanan/delete/${id}`, {
          method: "DELETE",
          headers: { "Accept": "*/*" },
        });

        if (response.ok || response.status === 204) {
          setPesanan(pesanan.filter((item) => item.id !== id));
          Swal.fire({
            title: "Dihapus!",
            text: "Pesanan berhasil dihapus.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Gagal!",
            text: "Terjadi kesalahan saat menghapus pesanan.",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Terjadi kesalahan saat menghubungi server.",
          icon: "error",
        });
      }
    }
  };

  const filteredPesanan = pesanan.filter((item) =>
    item.namaPesanan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <Navbar />

      <div className="flex-1 p-6 max-w-6xl mx-auto overflow-hidden">
        {/* Bagian Pencarian dan Tambah Pesanan */}
        <div className="flex mb-4 items-center gap-2">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Cari Pesanan..."
              className="border-2 border-gray-400 p-2 pl-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
          </div>
          <button
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 ml-auto flex items-center"
            onClick={() => navigate("/tambah-pesanan")}
          >
            <FaPlus className="mr-5 ml-5" />
          </button>
        </div>

        {/* Tabel Pesanan */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 w-full">
          <table className="w-full text-xs text-gray-700 border-collapse border border-gray-400">
            <thead className="bg-gray-100">
              <tr className="text-center">
                <th className="p-2 border border-gray-400">No</th>
                <th className="p-2 border border-gray-400">Nama Pesanan</th>
                <th className="p-2 border border-gray-400">Jumlah</th>
                <th className="p-2 border border-gray-400">Harga</th>
                <th className="p-2 border border-gray-400">Kondisi</th>
                <th className="p-2 border border-gray-400">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPesanan.length > 0 ? (
                filteredPesanan.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-400 hover:bg-gray-50 text-center">
                    <td className="p-2 border border-gray-400">{index + 1}</td>
                    <td className="p-2 border border-gray-400">{item.namaPesanan}</td>
                    <td className="p-2 border border-gray-400">{item.jumlah}</td>
                    <td className="p-2 border border-gray-400">{item.harga}</td>
                    <td className="p-2 border border-gray-400">{item.kondisi}</td>
                    <td className="p-2 border border-gray-400">
                      <div className="flex justify-center gap-2">
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600 flex items-center"
                          onClick={() => navigate(`/edit-pesanan/${item.id}`)}
                        >
                          <FaEdit className="mr-1 ml-1" />
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 flex items-center"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrash className="mr-1 ml-1" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    Tidak ada data pesanan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PagePesanan;
