import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { API_KELAS } from "../utils/BaseUrl";

const TambahKategoriKelas = () => {
  const [namaKelas, setNamaKelas] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { namaKelas: namaKelas };

    try {
      const response = await fetch(`${API_KELAS}/tambah`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();

        Swal.fire({
          title: "Kategori Kelas Ditambahkan!",
          text: `Kategori kelas "${result.namaKelas}" berhasil ditambahkan.`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/kategori-kelas");
        });

        console.log("Kategori Kelas Ditambahkan:", result);
      } else {
        throw new Error("Gagal menambahkan kategori kelas.");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat menambahkan kategori kelas.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-10 ml-64 mt-20">
        <div className="max-w-lg mx-auto bg-white p-12 rounded-md shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Tambah Kategori Kelas</h1>
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
                     focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Simpan Kategori Kelas
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahKategoriKelas;