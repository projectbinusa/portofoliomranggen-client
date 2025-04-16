import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { useNotification } from "../context/NotificationContext"; // 🔔 Import Notifikasi

const toTitleCase = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const EditKategoriA = () => {
  const { id } = useParams();
  const [namaKategori, setNamaKategori] = useState("");
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // 🔔 Inisialisasi Notifikasi

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await fetch(`http://localhost:4321/api/kategori/${id}`);

        if (response.status === 404) {
          Swal.fire("Error", "Kategori tidak ditemukan!", "error");
          navigate("/page-kategori");
          return;
        }

        if (!response.ok) {
          throw new Error("Gagal mengambil data kategori");
        }

        const data = await response.json();
        setNamaKategori(data.namaKategori);
      } catch (error) {
        console.error("Error:", error);
        Swal.fire("Error", "Terjadi kesalahan saat mengambil data kategori.", "error");
      }
    };

    fetchKategori();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { id: Number(id), namaKategori };

    try {
      const response = await fetch(`http://localhost:4321/api/kategori/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        addNotification("Kategori berhasil diperbarui", "info");

        Swal.fire({
          title: "Berhasil!",
          text: "Kategori berhasil diperbarui.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/page-kategori");
        });
      } else {
        throw new Error("Gagal memperbarui kategori");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "Terjadi kesalahan saat memperbarui kategori.", "error");
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
            Edit Kategori
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="namaKategori"
                className="block text-sm font-medium text-gray-700"
              >
                Nama Kategori
              </label>
              <input
                type="text"
                id="namaKategori"
                name="namaKategori"
                value={namaKategori}
                onChange={(e) => setNamaKategori(toTitleCase(e.target.value))}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md
                 shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Masukkan nama kategori"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm 
              text-sm font-medium text-white bg-green-600 hover:bg-green-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Simpan Kategori
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditKategoriA;
