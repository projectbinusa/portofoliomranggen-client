import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { API_KELAS } from "../utils/BaseUrl";
import { useNotification } from "../context/NotificationContext"; // ✅ Import notifikasi
import Sidebar from "../components/Sidebar";

const EditKategori = () => {
  const { id } = useParams();
  const [namaKelas, setNamaKelas] = useState("");
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // ✅ Tambahkan notifikasi

  useEffect(() => {
    const fetchKelas = async () => {
      try {
        const response = await fetch(`${API_KELAS}/${id}`);

        if (response.status === 404) {
          Swal.fire("Error", "Kategori kelas tidak ditemukan!", "error");
          navigate("/kategori-kelas");
          return;
        }

        if (!response.ok) {
          throw new Error("Gagal mengambil data kelas");
        }

        const data = await response.json();
        setNamaKelas(data.namaKelas);
      } catch (error) {
        console.error("Error:", error);
        Swal.fire(
          "Error",
          "Terjadi kesalahan saat mengambil data kelas.",
          "error"
        );
      }
    };

    fetchKelas();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { namaKelas };

    try {
      const response = await fetch(`${API_KELAS}/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        addNotification("Kategori kelas berhasil diperbarui", "success"); // ✅ Kirim notifikasi sukses

        Swal.fire({
          title: "Berhasil!",
          text: "Kategori kelas berhasil diperbarui.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/kategori-kelas");
        });
      } else {
        throw new Error("Gagal memperbarui kategori kelas");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire(
        "Error",
        "Terjadi kesalahan saat memperbarui kategori kelas.",
        "error"
      );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Form Container */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full border border-gray-300">
          <h1 className="text-xl font-semibold mb-4 text-center">
            Edit Kategori Kelas
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="namaKelas"
                className="block text-sm font-medium text-gray-700"
              >
                Nama Kelas
              </label>
              <input
                type="text"
                id="namaKelas"
                name="namaKelas"
                value={namaKelas}
                onChange={(e) => setNamaKelas(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md
                 shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Masukkan nama kelas"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm 
              text-sm font-medium text-white bg-green-600 hover:bg-green-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Simpan Kategori Kelas
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditKategori;
