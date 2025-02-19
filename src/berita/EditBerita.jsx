import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { API_BERITA } from "../utils/BaseUrl";
import UploadFoto from "../upload/UploadFoto";

const EditBerita = () => {
  const { id } = useParams(); // ID Berita dari URL
  const navigate = useNavigate();

  const [berita, setBerita] = useState({
    nama: "",
    penulis: "",
    deskripsi: "",
    fotoUrl: "",
    tanggalTerbit: "",
  });

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await axios.get(`${API_BERITA}/getById/${id}         `);
        if (response.status === 200) {
          const data = response.data;
          setBerita({
            ...data,
            tanggalTerbit: data.tanggalTerbit.split("T")[0], // Format tanggal
          });
        } else {
          Swal.fire("Not Found", "Berita dengan ID tersebut tidak ditemukan.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Terjadi kesalahan saat mengambil data berita.", "error");
      }
    };
    fetchBerita();
  }, [id]);

  const handleChange = (e) => {
    setBerita({ ...berita, [e.target.name]: e.target.value });
  };

  const handleUploadSuccess = (imageUrl) => {
    setBerita({ ...berita, fotoUrl: imageUrl });
    setIsUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUploading) {
      Swal.fire("Gagal!", "Silakan tunggu hingga foto selesai di-upload.", "error");
      return;
    }

    if (!berita.nama || !berita.penulis || !berita.deskripsi || !berita.fotoUrl || !berita.tanggalTerbit) {
      Swal.fire("Gagal!", "Semua field harus diisi.", "error");
      return;
    }

    try {
      await axios.put(`${API_BERITA}/editById/${id}`, berita);
      Swal.fire("Sukses!", "Data berita berhasil diperbarui.", "success").then(() => {
        navigate("/berita");
      });
    } catch (error) {
      Swal.fire("Gagal!", "Terjadi kesalahan saat mengedit data berita.", "error");
    }
  };

  return (
    <div className="flex-1 p-8 ml-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Berita</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Nama", name: "nama", type: "text" },
          { label: "Penulis", name: "penulis", type: "text" },
          { label: "Deskripsi", name: "deskripsi", type: "text" },
          { label: "Tanggal Terbit", name: "tanggalTerbit", type: "date" },
          { label: "Foto URL", name: "fotoUrl", type: "text" },
          { label: "ID Admin", name: "idAdmin", type: "number" },
        ].map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium text-left capitalize">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={berita[field.name] || ""}
              onChange={handleChange}
              className="flex-1 border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Upload Foto */}
        <div className="flex flex-col">
          <UploadFoto onUploadSuccess={handleUploadSuccess} setIsUploading={setIsUploading} />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button type="button" className="text-black font-semibold hover:underline" onClick={() => navigate("/berita")}>
            Batal
          </button>
          <button type="submit" className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700 transition">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBerita;
