import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { useNotification } from "../context/NotificationContext";

const uploadToS3 = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://s3.lynk2.co/api/s3/Tambah", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Gagal mengupload gambar ke S3");

    const data = await response.json();
    if (data.data && data.data.url_file) {
      return data.data.url_file;
    } else {
      throw new Error("URL gambar tidak tersedia dalam respons S3");
    }
  } catch (error) {
    console.error("Error upload ke S3:", error);
    throw error;
  }
};

const TambahProduk = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    quantity: "",
    status: "",
    imageUrl: ""
  });

  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.brand ||
      !product.category ||
      !product.price ||
      !product.quantity ||
      !product.status ||
      !file
    ) {
      Swal.fire({
        title: "Gagal!",
        text: "Semua field dan foto harus diisi.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      Swal.fire({
        title: "Mengupload gambar...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const imageUrl = await uploadToS3(file);
      const finalProduct = { ...product, imageUrl };

      Swal.close();

      // Simpan data ke localStorage (bisa diganti ke API)
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const newProduct = {
        id: storedProducts.length + 1,
        ...finalProduct,
        price: parseFloat(product.price),
        quantity: parseInt(product.quantity),
        rating: 0,
        discount: 0,
        oldPrice: parseFloat(product.price) * 1.2
      };
      const updatedProducts = [...storedProducts, newProduct];
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      addNotification("Produk berhasil ditambahkan", "success");

      Swal.fire({
        title: "Sukses!",
        text: "Produk berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => navigate("/produk-list"));
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: `Terjadi kesalahan: ${error.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center pl-64 p-4">
        <div className="bg-white shadow-md p-6 w-full max-w-4xl border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Tambah Produk</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Nama Produk", name: "name", type: "text" },
                { label: "Brand", name: "brand", type: "text" },
                { label: "Kategori", name: "category", type: "text" },
                { label: "Harga", name: "price", type: "number" },
                { label: "Jumlah", name: "quantity", type: "number" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium text-left capitalize">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={product[field.name]}
                    onChange={handleChange}
                    placeholder={`Masukkan ${field.label}`}
                    className="p-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <div className="flex flex-col">
                <label className="text-gray-700 text-sm font-medium text-left">Status</label>
                <select
                  name="status"
                  value={product.status}
                  onChange={handleChange}
                  className="p-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih Status</option>
                  <option value="in stock">In Stock</option>
                  <option value="out of stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium text-left">Upload Foto Produk</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="flex justify-between space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/produk-list")}
                className="px-4 py-2 bg-gray-500 text-white hover:bg-gray-600 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahProduk;
