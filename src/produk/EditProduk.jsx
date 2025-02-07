import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_PRODUK } from "../utils/BaseUrl";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";

const EditProduk = () => {
  const [product, setProduct] = useState({
    nama: "",
    deskripsi: "",
    kondisi: "",
    harga: "",
    foto: null,
  });
  const [fotoUrl, setFotoUrl] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_PRODUK}/getById/${id}`);
        if (!response.ok) throw new Error("Gagal mengambil data produk.");
        const data = await response.json();

        setProduct({
          nama: data.nama || "",
          deskripsi: data.deskripsi || "",
          kondisi: data.kondisi || "",
          harga: data.harga !== undefined ? data.harga : "",
          foto: null,
        });

        setFotoUrl(data.fotoUrl || "");
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
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct((prev) => ({ ...prev, foto: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!product.nama || !product.deskripsi || !product.kondisi || !product.harga) {
      Swal.fire({
        title: "Gagal!",
        text: "Semua field harus diisi.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
  
    let fotoUrlBaru = fotoUrl;
  
    if (product.foto) {
      const formDataFoto = new FormData();
      formDataFoto.append("file", product.foto);
  
      try {
        const uploadResponse = await fetch(`${API_PRODUK}/uploadFoto`, {
          method: "POST",
          body: formDataFoto,
        });
  
        if (!uploadResponse.ok) throw new Error("Gagal mengunggah foto.");
  
        const uploadData = await uploadResponse.json();
        fotoUrlBaru = uploadData.fotoUrl; // URL hasil upload dari backend
      } catch (error) {
        Swal.fire({
          title: "Gagal!",
          text: `Terjadi kesalahan saat mengunggah foto: ${error.message}`,
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }
    }
  
    const updatedProduct = {
      nama: product.nama,
      deskripsi: product.deskripsi,
      kondisi: product.kondisi,
      harga: product.harga,
      fotoUrl: fotoUrlBaru,
    };
  
    try {
      const response = await fetch(`${API_PRODUK}/editById/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
  
      if (!response.ok) throw new Error("Gagal mengupdate produk");
  
      Swal.fire({
        title: "Sukses!",
        text: "Produk berhasil diperbarui.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/produk");
      });
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
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Produk</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[{
            label: "Nama Produk", name: "nama", type: "text"
          }, {
            label: "Deskripsi", name: "deskripsi", type: "text"
          }, {
            label: "Kondisi", name: "kondisi", type: "text"
          }, {
            label: "Harga", name: "harga", type: "number"
          }].map((field) => (
            <div key={field.name} className="flex items-center gap-4">
              <label className="w-1/5 text-gray-700 font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={product[field.name] || ""}
                onChange={handleChange}
                className="w-4/5 border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="flex items-center gap-4">
            <label className="w-1/5 text-gray-700 font-medium">Foto Produk</label>
            <input
              type="file"
              name="foto"
              onChange={handleFileChange}
              className="w-4/5 border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {fotoUrl && (
            <div className="mt-4">
              <img src={fotoUrl} alt="Foto Produk" className="w-32 h-32 object-cover rounded-md" />
            </div>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="text-black font-semibold hover:underline"
              onClick={() => navigate("/produk")}>
              Batal
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white font-semibold px-6 py-2
               rounded-lg hover:bg-green-700 transition">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduk;