import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { API_KELAS } from "../utils/BaseUrl";

const EditKategori = () => {
  const { id } = useParams();
  const [namaKelas, setNamaKelas] = useState("");
  const navigate = useNavigate();

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
        Swal.fire("Error", "Terjadi kesalahan saat mengambil data kelas.", "error");
      }
    };

    fetchKelas();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { namaKelas: namaKelas };

    try {
      const response = await fetch(`${API_KELAS}/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
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
      Swal.fire("Error", "Terjadi kesalahan saat memperbarui kategori kelas.", "error");
    }
  };

  return (
      <div className="flex-1 p-10 ml-5 mt-20">
        <div className="max-w-lg mx-auto bg-white p-12 rounded-md shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Edit Kategori Kelas</h1>
              </div>

              <div>
                <label htmlFor="namaKelas" className="block text-base font-medium text-gray-700">
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

              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-3 px-4
                   border border-transparent rounded-md shadow-sm text-sm font-medium
                    text-white bg-green-600 hover:bg-green-700 focus:outline-none
                     focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Simpan Kategori Kelas
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default EditKategori;