import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { API_KEUANGAN } from "../utils/BaseUrl";
import { useNotification } from "../context/NotificationContext"; // 🔔 Import Notifikasi

const TambahUang = () => {
  const [formData, setFormData] = useState({
    nama: "",
    harga: "",
    jumlah: "",
    kategoriPembiayaan: "",
    catatan: "",
  });

  const navigate = useNavigate();
  const { sendNotification } = useNotification(); // 🔔 Inisialisasi Notifikasi

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nama || !formData.harga || !formData.jumlah || !formData.kategoriPembiayaan) {
      Swal.fire({
        title: "Gagal!",
        text: "Harap isi semua data yang diperlukan.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }

    const dataToSend = {
      ...formData,
      harga: parseFloat(formData.harga),
      jumlah: parseInt(formData.jumlah),
    };

    fetch(`${API_KEUANGAN}/tambah`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then(() => {
        sendNotification("Data keuangan berhasil ditambahkan", "success"); // 🔔 Kirim Notifikasi

        Swal.fire({
          title: "Berhasil!",
          text: "Data keuangan berhasil ditambahkan.",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/uang");
        });
      })
      .catch((error) => {
        console.error("Error adding data:", error);
        Swal.fire({
          title: "Gagal!",
          text: "Terjadi kesalahan saat menambahkan data.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  return (
    <div className="flex">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-1 p-8 ml-4 mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tambah Data Keuangan</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {[
            { label: "Nama", name: "nama", type: "text" },
            { label: "Harga", name: "harga", type: "number" },
            { label: "Jumlah", name: "jumlah", type: "number" },
            { label: "Kategori Pembiayaan", name: "kategoriPembiayaan", type: "text" },
          ].map((field) => (
            <div key={field.name} className="flex items-center">
              <label className="w-40 text-gray-700 font-medium text-left">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="flex-1 border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="flex items-start">
            <label className="w-40 text-gray-700 font-medium text-left mt-2">Catatan</label>
            <textarea
              name="catatan"
              value={formData.catatan}
              onChange={handleChange}
              className="flex-1 border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="text-black font-semibold hover:underline"
              onClick={() => navigate("/uang")}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahUang;
