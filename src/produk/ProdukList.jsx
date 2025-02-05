import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Search } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";

const products = [
  {
    id: 1,
    name: "Laptop",
    description: "Bagus.",
    condition: "Baru",
    price: 15000000,
  },
  {
    id: 2,
    name: "Meja",
    description: "Terbuat dari kayu kuat.",
    condition: "Baru",
    price: 8000000,
  },
  {
    id: 3,
    name: "Kursi",
    description: "Sepasang-nya meja.",
    condition: "Bekas",
    price: 1200000,
  },
];

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.condition.toLowerCase().includes(searchLower) ||
      product.price.toString().includes(searchLower)
    );
  });

  const handleEdit = (id) => {
    navigate(`/edit-produk/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin ingin menghapus produk ini?",
      text: "Data produk yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Dihapus!",
          text: "Produk telah dihapus.",
          icon: "success",
          confirmButtonText: "Ok",
        });
        console.log(`Produk dengan ID ${id} dihapus`);
      }
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 ml-64">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Daftar Produk</h1>
          <button
            onClick={() => navigate("/tambah-produk")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Tambah Produk
          </button>
        </div>

        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Cari produk..."
            className="w-full px-3 py-2 pl-8 pr-4 text-sm border border-gray-400
             rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-gray-700 border border-gray-400">
            <thead className="text-xs uppercase bg-gray-200 border-b-2 border-gray-500">
              <tr>
                <th className="px-6 py-3 border border-gray-500 text-center">No</th>
                <th className="px-6 py-3 border border-gray-500 text-center">Nama Produk</th>
                <th className="px-6 py-3 border border-gray-500 text-center">Deskripsi</th>
                <th className="px-6 py-3 border border-gray-500 text-center">Kondisi</th>
                <th className="px-6 py-3 border border-gray-500 text-center">Harga</th>
                <th className="px-6 py-3 border border-gray-500 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={product.id} className="bg-white border-b border-gray-400 hover:bg-gray-100">
                    <td className="px-6 py-4 border border-gray-400 text-center">{index + 1}</td>
                    <td className="px-6 py-4 font-medium border border-gray-400">{product.name}</td>
                    <td className="px-6 py-4 border border-gray-400">{product.description}</td>
                    <td className="px-6 py-4 border border-gray-400 text-center">{product.condition}</td>
                    <td className="px-6 py-4 border border-gray-400 text-center">
                      Rp {product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 flex gap-3 justify-center border border-gray-400">
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="flex items-center gap-2 bg-blue-500 text-white
                         px-3 py-1 rounded-md hover:bg-blue-600 transition">
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex items-center gap-2 bg-red-500
                         text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center border border-gray-400">
                    Produk tidak ditemukan.
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

export default ProductList;