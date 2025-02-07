import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Notifikasi
import Sidebar from "../components/Sidebar";
import { FaPlus } from "react-icons/fa"; // Import ikon plus

const PagePesanan = () => {
  const [pesanan, setPesanan] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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

  // Fungsi untuk memfilter pesanan berdasarkan query pencarian
  const filteredPesanan = pesanan.filter((item) =>
    item.namaPesanan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 max-w-4xl ml-auto mr-10">
        <div className="flex mb-4 items-center">
          <input
            type="text"
            placeholder="Cari Pesanan..."
            className="border-2 border-gray-800 p-2 rounded-lg w-1/3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 ml-auto flex items-center" // `ml-auto` untuk memindahkan ke kanan
            onClick={() => navigate("/tambah-pesanan")}
          >
            <FaPlus className="mr-2" /> {/* Menambahkan ikon di kiri */}
            Tambah Pesanan
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border-2 border-gray-800 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border-2 border-gray-800 p-2">No</th>
                <th className="border-2 border-gray-800 p-2">Nama Pesanan</th>
                <th className="border-2 border-gray-800 p-2">Jumlah</th>
                <th className="border-2 border-gray-800 p-2">Harga</th>
                <th className="border-2 border-gray-800 p-2">Kondisi</th>
                <th className="border-2 border-gray-800 p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPesanan.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td className="border-2 border-gray-800 p-2">{index + 1}</td>
                  <td className="border-2 border-gray-800 p-2">{item.namaPesanan}</td>
                  <td className="border-2 border-gray-800 p-2">{item.jumlah}</td>
                  <td className="border-2 border-gray-800 p-2">{item.harga}</td>
                  <td className="border-2 border-gray-800 p-2">{item.kondisi}</td>
                  <td className="border-2 border-gray-800 p-2 space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600"
                      onClick={() => navigate(`/edit-pesanan/${item.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPesanan.length === 0 && (
                <tr>
                  <td colSpan="6" className="border-2 border-gray-800 p-2 text-center text-gray-500">
                    Tidak ada data pesanan yang sesuai.
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
