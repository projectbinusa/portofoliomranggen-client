import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar";
import { useNotification } from "../context/NotificationContext"; // 🔔 Import Notifikasi

const EditKategoriA = () => {
  const { id } = useParams();
  const [namaKategori, setNamaKategori] = useState("");
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // 🔔 Inisialisasi Notifikasi

  useEffect(() => {
    fetch(`http://localhost:4321/api/kategori/${id}`)
      .then((response) => response.json())
      .then((data) => setNamaKategori(data.namaKategori))
      .catch(() => Swal.fire("Error", "Gagal mengambil data kategori", "error"));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!namaKategori.trim()) {
      Swal.fire("Error", "Nama kategori tidak boleh kosong!", "error");
      return;
    }

    fetch(`http://localhost:4321/api/kategori/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Number(id), namaKategori })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject();
        }
      })
      .then(() => {
        addNotification("Kategori berhasil diperbarui", "info"); // 🔔 Kirim Notifikasi
        Swal.fire("Sukses", "Kategori berhasil diperbarui", "success").then(() => navigate("/page-kategori"));
      })
      .catch(() => {
        Swal.fire("Error", "Terjadi kesalahan saat memperbarui kategori", "error");
      });
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden fixed inset-0">
      <Sidebar />
      <div className="bg-white p-6 shadow-md rounded-lg w-1/2 border-2 border-gray-700">
        <form onSubmit={handleSubmit} className="overflow-hidden">
          <label className="block text-gray-600 mb-2 text-left">NAMA KATEGORI</label>
          <input
            type="text"
            value={namaKategori}
            onChange={(e) => setNamaKategori(e.target.value)}
            className="w-full p-2 border-2 border-gray-700 rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
            placeholder="Masukkan kategori"
            required
          />
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2"
              onClick={() => navigate("/page-kategori")}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditKategoriA;
