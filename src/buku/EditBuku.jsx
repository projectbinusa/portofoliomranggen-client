import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { API_BUKU } from "../utils/BaseUrl";
import UploadFoto from "../upload/UploadFoto";

const EditBuku = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [buku, setBuku] = useState({
    judulBuku: "",
    penerbit: "",
    pengarang: "",
    tahunTerbit: "",
    jumlahHalaman: "",
    idAdmin: "",
    fotoUrl: "",
  });

  const [isUploading, setIsUploading] = useState(false); // Status upload foto
  useEffect(() => {
    const fetchBuku = async () => {
      try {
        const response = await axios.get(`${API_BUKU}/getById/${id}`);
        setBuku(response.data);
      } catch (error) {
        Swal.fire("Gagal!", "Terjadi kesalahan saat memuat data buku.", "error");
      }
    };
    fetchBuku();
  }, [id]);

  const handleChange = (e) => {
    setBuku({ ...buku, [e.target.name]: e.target.value });
  };

  const handleUploadSuccess = (imageUrl) => {
    setBuku({ ...buku, fotoUrl: imageUrl });
    setIsUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUploading) {
      Swal.fire({
        title: "Gagal!",
        text: "Silakan tunggu hingga foto selesai di-upload.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

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
      await axios.put(`${API_BUKU}/editByid/${id}`, buku);
      Swal.fire({
        title: "Sukses!",
        text: "Data buku berhasil diperbarui.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/buku");
      });
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat memperbarui data buku.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex ml-64 w-full max-w">
        <div className="p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Edit Buku</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[{ label: "Judul Buku", name: "judulBuku", type: "text" },
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
                  value={buku[field.name]}
                  onChange={handleChange}
                  className="flex-1 border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            {/* Komponen Upload Foto */}
            <div className="flex items-center">
              <label className="w-40 text-gray-700 font-medium text-left">Upload Foto</label>
              <UploadFoto
                onUploadSuccess={handleUploadSuccess}
                setIsUploading={setIsUploading}
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                className="text-black font-semibold hover:underline"
                onClick={() => navigate("/buku")}>
                Batal
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white font-semibold px-6 py-2
                 rounded-lg hover:bg-green-700 transition">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBuku;
