import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { API_BUKU } from "../utils/BaseUrl";
import { useNotification } from "../context/NotificationContext";

const uploadToS3 = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://s3.lynk2.co/api/s3/Edit", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Gagal mengupload gambar ke S3");
    }

    const data = await response.json();
    if (data.data && data.data.url_file) {
      return data.data.url_file;
    } else {
      throw new Error("URL gambar tidak tersedia dalam respons S3");
    }
  } catch (error) {
    console.error("Error upload ke S3:", error);
    throw error;
  }
};

const EditBuku = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const [buku, setBuku] = useState({
    judulBuku: "",
    penerbit: "",
    pengarang: "",
    tahunTerbit: "",
    jumlahHalaman: "",
    idAdmin: "",
    fotoUrl: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buku.judulBuku || !buku.penerbit || !buku.pengarang || !buku.tahunTerbit || !buku.jumlahHalaman || !buku.idAdmin) {
      Swal.fire({
        title: "Gagal!",
        text: "Semua field harus diisi.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      let imageUrl = buku.fotoUrl;

      if (selectedFile) {
        setIsUploading(true);
        Swal.fire({
          title: "Mengupload gambar...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        imageUrl = await uploadToS3(selectedFile);

        Swal.close();
        setIsUploading(false);
      }

      await axios.put(`${API_BUKU}/editById/${id}`, { ...buku, fotoUrl: imageUrl });

      addNotification("Data buku berhasil diperbarui", "success");

      Swal.fire({
        title: "Sukses!",
        text: "Data buku berhasil diperbarui.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/buku");
      });
    } catch (error) {
      setIsUploading(false);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat memperbarui data buku.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center pl-64 p-4">
        <div className="bg-white shadow-md p-6 w-full max-w-4xl border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Edit Buku</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Judul Buku", name: "judulBuku", type: "text" },
                { label: "Penerbit", name: "penerbit", type: "text" },
                { label: "Pengarang", name: "pengarang", type: "text" },
                { label: "Tahun Terbit", name: "tahunTerbit", type: "number" },
                { label: "Jumlah Halaman", name: "jumlahHalaman", type: "number" },
                { label: "ID Admin", name: "idAdmin", type: "number" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium text-left capitalize">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={buku[field.name]}
                    onChange={handleChange}
                    placeholder={`Masukkan ${field.label}`}
                    className="p-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col mt-4">
              <label className="text-gray-700 text-sm font-medium text-left">Upload Gambar</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 border" />
              {buku.fotoUrl && (
                <img src={buku.fotoUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover border" />
              )}
            </div>

            <div className="flex justify-between space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/buku")}
                className="px-4 py-2 bg-gray-500 text-white hover:bg-gray-600 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition"
                disabled={isUploading}
              >
                {isUploading ? "Mengupload..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBuku;
