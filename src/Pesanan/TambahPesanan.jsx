import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { useNotification } from "../context/NotificationContext"; // 🔔 Import Notifikasi

const TambahPesanan = () => {
  const [formData, setFormData] = useState({
    namaPesanan: "",
    jumlah: "",
    harga: "",
    kondisi: "",
  });

  const navigate = useNavigate();
  const { addNotification } = useNotification(); // 🔔 Inisialisasi Notifikasi

  useEffect(() => {
    document.documentElement.classList.add("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const toCamelCase = (str) => {
    return str.replace(/(^|\s)\S/g, (match) => match.toUpperCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        namaPesanan: toCamelCase(formData.namaPesanan),
        jumlah: parseInt(formData.jumlah),
        harga: parseInt(formData.harga),
        kondisi: formData.kondisi,
      };

      const response = await fetch("http://localhost:4321/api/pesanan/tambah", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        addNotification("Pesanan berhasil ditambahkan.", "success"); // 🔔 Kirim Notifikasi saat sukses

        Swal.fire({
          title: "Berhasil!",
          text: "Pesanan berhasil ditambahkan",
          icon: "success",
        }).then(() => {
          navigate("/pesanan");
        });
      } else {
        sendNotification("Terjadi kesalahan saat menambahkan pesanan.", "error"); // 🔔 Kirim Notifikasi saat gagal

        Swal.fire({
          title: "Gagal!",
          text: "Terjadi kesalahan saat menambahkan pesanan.",
          icon: "error",
        });
      }
    } catch (error) {
      addNotification("Terjadi kesalahan saat menghubungi server.", "error"); // 🔔 Kirim Notifikasi saat error

      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat menghubungi server.",
        icon: "error",
      });
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border-2 border-gray-600">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Tambah Pesanan</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {["namaPesanan", "jumlah", "harga"].map((field, index) => (
              <div key={index} className="flex flex-col items-start">
                <label className="block text-gray-600">
                  {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  type={field === "jumlah" || field === "harga" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={`Masukkan ${field}`}
                  required
                />
              </div>
            ))}

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
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 border-2 border-gray-500 flex items-center gap-2"
                onClick={() => navigate("/pesanan")}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 border-2 border-gray-500 flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faFloppyDisk} className="text-lg" />
                Tambah
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahPesanan;
