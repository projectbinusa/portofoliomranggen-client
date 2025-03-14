import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Search, Eye } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import axios from "axios";
import { API_PRODUK } from "../utils/BaseUrl";
import Navbar from "../tampilan/Navbar";
import { useNotification } from "../context/NotificationContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { sendNotification } = useNotification();

  const toCamelCase = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_PRODUK}/all`);
        const mappedProducts = response.data.map((product) => ({
          id: product.id,
          nama: toCamelCase(product.nama),
          harga: product.harga || 0,
          fotoUrl: product.fotoUrl,
          kondisi: toCamelCase(product.kondisi),
        }));
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data produk:", error);
        sendNotification("Gagal mengambil data produk.", "error");
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (id, namaProduk) => {
    navigate(`/edit-produk/${id}`);
    sendNotification(`Mengedit produk \"${namaProduk}\"`, "info");
  };

  const handleDetail = (id, namaProduk) => {
    navigate(`/detail-produk/${id}`);
    sendNotification(`Melihat detail produk \"${namaProduk}\"`, "info");
  };

  const handleDelete = async (id, namaProduk) => {
    Swal.fire({
      title: "Yakin ingin menghapus produk ini?",
      text: `Produk \"${namaProduk}\" akan dihapus!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_PRODUK}/delete/${id}`);
          Swal.fire("Dihapus!", `Produk \"${namaProduk}\" telah dihapus.`, "success");
          sendNotification(`Produk \"${namaProduk}\" telah dihapus`, "warning");
          setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
          sendNotification("Gagal menghapus produk.", "error");
          Swal.fire("Gagal!", "Tidak dapat menghapus produk.", "error");
        }
      }
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Navbar />

      <div className="flex-1 p-6 ml-48 pl-4">
        <div className="flex justify-between items-center mb-4 mt-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full px-3 py-2 pl-10 pr-4 text-sm border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              navigate("/tambah-produk");
              sendNotification("Menambahkan produk baru", "success");
            }}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
            <FaPlus size={16} />
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-center">No</th>
                <th className="px-6 py-3 text-center">Foto</th>
                <th className="px-6 py-3 text-center">Nama Produk</th>
                <th className="px-6 py-3 text-center">Kondisi</th>
                <th className="px-6 py-3 text-center">Harga</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 text-center">{index + 1}</td>
                    <td className="px-6 py-4 text-center w-32 h-32">
                      {product.fotoUrl && (
                        <img src={product.fotoUrl} alt="Foto Produk" className="w-full h-full object-cover rounded-md mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium">{product.nama}</td>
                    <td className="px-6 py-4 text-center">{product.kondisi}</td>
                    <td className="px-6 py-4 text-center">Rp {product.harga.toLocaleString()}</td>
                    <td className="px-6 py-4 flex gap-3 justify-center">
                      <button onClick={() => handleDetail(product.id, product.nama)} className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => handleEdit(product.id, product.nama)} className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDelete(product.id, product.nama)} className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">Produk tidak ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
