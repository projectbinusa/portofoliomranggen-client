import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { API_VISIMISI, API_NOTIFICATION } from "../utils/BaseUrl"; // ✅ Tambah API Notifikasi
import { useNotification } from "../context/NotificationContext"; // ✅ Import Context Notifikasi

const VisiMisi = () => {
  const navigate = useNavigate();
  const [visiMisi, setVisiMisi] = useState(null);
  const { sendNotification, isConnected } = useNotification(); // ✅ Ambil fungsi WebSocket

  useEffect(() => {
    fetch(`${API_VISIMISI}/all`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data Visi & Misi.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setVisiMisi(data[0]); // Ambil data pertama jika ada
        }
      })
      .catch((error) => console.error("❌ Error fetching visi & misi:", error));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_VISIMISI}/delete/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Gagal menghapus data.");
            }
            setVisiMisi(null); // Hapus dari state setelah sukses

            // ✅ Kirim Notifikasi ke WebSocket
            if (isConnected) {
              sendNotification("Visi & Misi telah dihapus!", "error");
            } else {
              // ✅ Fallback ke API kalau WebSocket gagal
              fetch(`${API_NOTIFICATION}/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  message: "Visi & Misi telah dihapus!",
                  type: "error",
                }),
              });
            }

            Swal.fire("Dihapus!", "Visi & Misi telah dihapus.", "success");
          })
          .catch((error) => {
            console.error("❌ Error deleting visi & misi:", error);
            Swal.fire("Error", "Terjadi kesalahan saat menghapus.", "error");
          });
      }
    });
  };

  return (
    <div className="bg-gradient-to-br from-green-600 to-green-900 min-h-screen flex items-center justify-center px-6 py-10 text-gray-100">
      <div className="max-w-4xl w-full bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-lg p-8 sm:p-12">
        {/* Header */}
        <div className="text-center fade-in">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-yellow-300 mb-4 drop-shadow-lg">
            Visi & Misi Task Bootcamp 2025
          </h1>
        </div>

        {/* Grid untuk Visi & Misi */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Visi */}
          <div className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-green-300 fade-in transform transition duration-500 hover:scale-105 hover:border-yellow-400">
            <h2 className="text-2xl font-bold text-green-400 mb-3">Visi</h2>
            <p className="text-gray-100">
              {visiMisi ? visiMisi.visi : "Belum ada visi yang tersedia."}
            </p>
          </div>

          {/* Card Misi */}
          <div className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-teal-300 fade-in transform transition duration-500 hover:scale-105 hover:border-yellow-400 max-h-64 overflow-y-auto">
            <h2 className="text-2xl font-bold text-teal-400 mb-3">Misi</h2>
            {visiMisi ? (
              <ul className="list-disc list-inside text-gray-100 text-base space-y-2">
                {visiMisi.misi.split("\n").map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-100">Belum ada misi yang tersedia.</p>
            )}
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="mt-12 flex justify-between">
          {/* Tombol Kembali */}
          <button
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-700 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="text-lg" /> Kembali
          </button>

          <div className="flex gap-4">
            {/* Tombol Hapus */}
            {visiMisi && (
              <button
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition"
                onClick={() => handleDelete(visiMisi.id)}
              >
                <FaTrash className="text-lg" /> 
              </button>
            )}

            {/* Tombol Tambah Visi & Misi */}
            <button
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition"
              onClick={() => navigate("/addvisi-misi")}
            >
              <FaPlus className="text-lg" /> 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisiMisi;
