import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa"; // Import ikon Trash
import kodeImage from "../assets/kode.jpg";
import { API_SAMBUTAN } from "../utils/BaseUrl";

const Sambutan = () => {
  const navigate = useNavigate();
  const [sambutan, setSambutan] = useState([]); // Menggunakan array untuk menampung banyak data
  const [loading, setLoading] = useState(true);

  const fetchSambutan = async () => {
    try {
      const response = await fetch(`${API_SAMBUTAN}/all`);
      if (!response.ok) {
        throw new Error("Sambutan tidak ditemukan.");
      }
      const data = await response.json();
      console.log("Data yang diterima dari API:", data); // Debugging API
      setSambutan(data); // Set state dengan array dari API
    } catch (error) {
      console.error("Error fetching sambutan:", error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat mengambil sambutan.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSambutan();
    
    // Opsional: polling setiap 10 detik agar data selalu terbaru
    const interval = setInterval(() => {
      fetchSambutan();
    }, 10000);

    return () => clearInterval(interval); // Membersihkan interval saat komponen unmount
  }, []);

  // Fungsi untuk menghapus sambutan berdasarkan ID
  const deleteSambutan = async (id) => {
    Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_SAMBUTAN}/delete/${id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Gagal menghapus sambutan.");
          }

          // Hapus sambutan dari state tanpa perlu reload halaman
          setSambutan(sambutan.filter((item) => item.id !== id));

          Swal.fire({
            title: "Terhapus!",
            text: "Sambutan berhasil dihapus.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting sambutan:", error);
          Swal.fire({
            title: "Error",
            text: "Gagal menghapus sambutan.",
            icon: "error",
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-4 sm:px-8"
      style={{
        backgroundImage: `url(${kodeImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black p-6 sm:p-12 rounded-2xl shadow-2xl max-w-lg sm:max-w-3xl text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 sm:mb-6 drop-shadow-lg">
          Selamat Datang Di Bootcamp 2025
        </h1>
        
        {/* Menampilkan semua sambutan */}
        {sambutan.length > 0 ? (
          sambutan.map((item) => (
            <div key={item.id} className="mb-6 flex justify-between items-center  p-4 rounded-lg">
              <div className="text-left">
                <p className="text-gray-300">{item.deskripsi}</p>
              </div>
              
              {/* Tombol Delete dengan Icon */}
              <button
                className="text-red-500 hover:text-red-700 transition text-2xl ml-4"
                onClick={() => deleteSambutan(item.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-300">Tidak ada sambutan.</p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            className="bg-gradient-to-r from-red-500 to-red-800 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:opacity-90 transition"
            onClick={() => navigate(-1)}
          >
            Kembali 🔙
          </button>
          
          <button
            className="bg-gradient-to-r from-green-500 to-green-800 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:opacity-90 transition"
            onClick={() => navigate("/addSambutan")}
          >
            ➕ 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sambutan;
