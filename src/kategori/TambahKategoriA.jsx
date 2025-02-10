import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const TambahKategoriA = () => {
  const [namaKategori, setNamaKategori] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!namaKategori.trim()) {
      Swal.fire("Error", "Nama kategori tidak boleh kosong!", "error");
      return;
    }

    fetch("http://localhost:4321/api/kategori/tambah", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: 0, namaKategori }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Gagal menambahkan kategori");
        }
      })
      .then((data) => {
        Swal.fire("Sukses", "Kategori berhasil ditambahkan", "success").then(() => {
          navigate("/page-kategori");
        });
      })
      .catch((error) => {
        console.error("Error adding data:", error);
        Swal.fire("Error", "Terjadi kesalahan saat menambahkan kategori", "error");
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 shadow-md rounded-lg w-1/2 border-4 border-gray-700">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start mb-4">
            <label className="block text-gray-600">NAMA KATEGORI</label>
            <input
              type="text"
              value={namaKategori}
              onChange={(e) => setNamaKategori(e.target.value)}
              className="w-full p-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan kategori"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 border-4 border-gray-700 flex items-center gap-2"
              onClick={() => navigate("/page-kategori")}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 border-4 border-gray-700 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faFloppyDisk} className="text-lg" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahKategoriA;
