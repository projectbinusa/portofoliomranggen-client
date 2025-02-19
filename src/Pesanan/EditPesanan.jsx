import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2"; // Notifikasi

const EditPesanan = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    namaPesanan: "",
    jumlah: "",
    harga: "",
    kondisi: "",
  });

  const navigate = useNavigate();

  // Mencegah scrolling pada halaman ini
  useEffect(() => {
    document.documentElement.classList.add("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    // Fetch data pesanan berdasarkan ID menggunakan GET
    const fetchPesananById = async () => {
      try {
        const response = await fetch(`http://localhost:4321/api/pesanan/getById/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            namaPesanan: data.namaPesanan,
            jumlah: data.jumlah,
            harga: data.harga,
            kondisi: data.kondisi,
          });
        } else {
          console.error("Gagal mengambil data pesanan");
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      }
    };

    fetchPesananById();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4321/api/pesanan/editById/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          id: parseInt(id),
          namaPesanan: formData.namaPesanan,
          jumlah: parseInt(formData.jumlah),
          harga: parseInt(formData.harga),
          kondisi: formData.kondisi,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Pesanan berhasil diperbarui:", result);

        // Notifikasi sukses
        Swal.fire({
          title: "Berhasil!",
          text: "Pesanan berhasil diperbarui",
          icon: "success",
        }).then(() => {
          navigate("/pesanan"); // Kembali ke halaman pesanan
        });
      } else {
        console.error("Gagal memperbarui pesanan");
        Swal.fire({
          title: "Gagal!",
          text: "Terjadi kesalahan saat memperbarui pesanan",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat menghubungi server",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
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
                name="namaPesanan"
                value={formData.namaPesanan}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Masukkan nama pesanan"
                required
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
                required
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
                required
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="block text-gray-600">Kondisi Pesanan</label>
              <select
                name="kondisi"
                value={formData.kondisi}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Pilih kondisi</option>
                <option value="Baru">Baru</option>
                <option value="Bekas">Bekas</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="submit-left bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 border-2 border-gray-600 flex items-center gap-2"
                onClick={() => navigate("/pesanan")}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
              </button>
              <button
                type="submit"
                className="submit-button bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 border-2 border-gray-500 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faFloppyDisk} className="text-lg" />
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPesanan;
