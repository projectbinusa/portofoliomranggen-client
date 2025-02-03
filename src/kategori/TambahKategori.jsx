import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";

const TambahKategoriKelas = () => {
  const [namaKelas, setNamaKelas] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Kategori Kelas Ditambahkan!",
      text: `Kategori kelas "${namaKelas}" berhasil ditambahkan.`,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/kategori-kelas");
    });

    console.log("Kategori Kelas Ditambahkan:", namaKelas);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-6 flex-1">
        <div className="max-w-lg mx-auto bg-white p-12 rounded-md shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Tambah Kategori Kelas</h1>
              </div>

              <div>
                <label htmlFor="nama" className="block text-base font-medium text-gray-700">
                  Nama Kelas
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={namaKelas}
                  onChange={(e) => setNamaKelas(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md
                   shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Masukkan nama kelas"
                  required
                />
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-3 px-4
                   border border-transparent rounded-md shadow-sm text-sm font-medium
                    text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none
                     focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
