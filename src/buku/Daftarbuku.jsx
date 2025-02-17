import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BUKU } from "../utils/BaseUrl";
import Swal from "sweetalert2";

const DaftarBuku = () => {
  const [bukuList, setBukuList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuku();
  }, []);

  const fetchBuku = async () => {
    try {
      const response = await fetch(`${API_BUKU}/all`);
      if (!response.ok) {
        throw new Error("Gagal mengambil data buku");
      }
      const data = await response.json();
      console.log(data); // Menampilkan data yang diterima dari API
      setBukuList(data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Buku?",
      text: "Apakah Anda yakin ingin menghapus buku ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_BUKU}/delete/${id}`, { method: "DELETE" });

        if (!response.ok) {
          throw new Error("Gagal menghapus buku");
        }

        Swal.fire("Terhapus!", "Buku berhasil dihapus.", "success");
        fetchBuku(); // Refresh daftar buku
      } catch (error) {
        Swal.fire("Gagal!", error.message, "error");
      }
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Daftar Buku</h2>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={() => navigate("/tambah-buku")}
      >
        + Tambah Buku
      </button>

      <div className="overflow-x-auto mt-6">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3">No</th>
              <th className="border p-3">Foto</th>
              <th className="border p-3">Judul Buku</th>
              <th className="border p-3">Penerbit</th>
              <th className="border p-3">Pengarang</th>
              <th className="border p-3">Tahun</th>
              <th className="border p-3">Halaman</th>
              <th className="border p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bukuList.length > 0 ? (
              bukuList.map((buku, index) => (
                <tr key={buku.id} className="text-center">
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3 w-20 h-28 object-cover rounded-md mx-auto">
                    {/* Menampilkan foto jika ada */}
                    {buku.fotoUrl && (
                      <img
                        src={buku.fotoUrl}
                        alt="Foto Buku"
                        className="w-full h-full object-cover rounded-md"
                      />
                    )}
                  </td>
                  <td className="border p-3">{buku.judulBuku}</td>
                  <td className="border p-3">{buku.penerbit}</td>
                  <td className="border p-3">{buku.pengarang}</td>
                  <td className="border p-3">{buku.tahunTerbit}</td>
                  <td className="border p-3">{buku.jumlahHalaman}</td>
                  <td className="border p-3 space-x-2">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      onClick={() => navigate(`/edit-buku/${buku.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(buku.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="border p-3 text-center text-gray-500">
                  Tidak ada data buku.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DaftarBuku;
