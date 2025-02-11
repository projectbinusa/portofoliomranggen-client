import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { API_BUKU } from "../utils/BaseUrl";

const EditBuku = () => {
  const { id } = useParams();
  const [buku, setBuku] = useState({
    judulBuku: "",
    penerbit: "",
    pengarang: "",
    tahunTerbit: "",
    jumlahHalaman: "",
    idAdmin: "",
    fotoUrl: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BUKU}/getById/${id}`)
      .then((response) => {
        setBuku(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        Swal.fire("Gagal!", "Terjadi kesalahan saat memuat data buku.", "error");
      });
  }, [id]);

  const handleChange = (e) => {
    setBuku({ ...buku, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !buku.judulBuku ||
      !buku.penerbit ||
      !buku.pengarang ||
      !buku.tahunTerbit ||
      !buku.jumlahHalaman ||
      !buku.idAdmin ||
      !buku.fotoUrl
    ) {
      Swal.fire({
        title: "Gagal!",
        text: "Semua field harus diisi.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      await axios.put(`${API_BUKU}/edit/${id}`, buku);

      Swal.fire({
        title: "Sukses!",
        text: "Data buku berhasil diperbarui.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/buku");
      });
    } catch (error) {
      console.error("Error updating data:", error);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat memperbarui data buku.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="flex">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-1 p-8 ml-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Buku</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: "Judul Buku", name: "judulBuku", type: "text" },
            { label: "Penerbit", name: "penerbit", type: "text" },
            { label: "Pengarang", name: "pengarang", type: "text" },
            { label: "Tahun Terbit", name: "tahunTerbit", type: "number" },
            { label: "Jumlah Halaman", name: "jumlahHalaman", type: "number" },
            { label: "ID Admin", name: "idAdmin", type: "number" },
            { label: "Foto Buku (URL)", name: "fotoUrl", type: "text" },
          ].map((field) => (
            <div key={field.name} className="flex items-center">
              <label className="w-40 text-gray-700 font-medium text-left">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={buku[field.name] || ""}
                onChange={handleChange}
                className="flex-1 border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="text-black font-semibold hover:underline"
              onClick={() => navigate("/buku")}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBuku;