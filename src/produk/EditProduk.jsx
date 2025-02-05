import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../utils/BaseUrl";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";

const EditProduk = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    condition: "",
    price: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) throw new Error("Gagal mengambil data produk.");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        Swal.fire({
          title: "Gagal!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.description || !product.condition || !product.price) {
      Swal.fire({
        title: "Gagal!",
        text: "Semua field harus diisi.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal mengupdate produk");
      }

      const data = await response.json();
      console.log("Produk berhasil diperbarui:", data);

      Swal.fire({
        title: "Sukses!",
        text: "Produk berhasil diperbarui.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/produk");
      });
    } catch (error) {
      console.error("Error:", error.message);
      Swal.fire({
        title: "Gagal!",
        text: `Terjadi kesalahan: ${error.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 ml-64 pb-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Produk</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Nama Produk", name: "name", type: "text" },
            { label: "Deskripsi", name: "description", type: "text" },
            { label: "Kondisi", name: "condition", type: "text" },
            { label: "Harga", name: "price", type: "number" },
          ].map((field) => (
            <div key={field.name} className="flex items-center gap-4">
              <label className="w-1/5 text-gray-700 font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={product[field.name]}
                onChange={handleChange}
                className="w-4/5 border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="text-black font-semibold hover:underline"
              onClick={() => navigate("/produk")}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-2
               rounded-lg hover:bg-blue-700 transition">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduk;