import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { API_BERITA } from "../utils/BaseUrl";
import Sidebar from "../components/Sidebar";
import { useNotification } from "../context/NotificationContext"; // 🔔 Import notifikasi

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

const EditBerita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // 🔔 Notifikasi

  const [berita, setBerita] = useState({
    nama: "",
    penulis: "",
    deskripsi: "",
    fotoUrl: "",
    tanggalTerbit: "",
    idAdmin: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await axios.get(`${API_BERITA}/getById/${id}`);
        if (response.status === 200) {
          const data = response.data;

          const formattedTanggal = Array.isArray(data.tanggalTerbit)
            ? `${data.tanggalTerbit[0]}-${String(data.tanggalTerbit[1]).padStart(2, "0")}-${String(data.tanggalTerbit[2]).padStart(2, "0")}`
            : data.tanggalTerbit.split("T")[0];

          setBerita({
            nama: data.nama || "",
            penulis: data.penulis || "",
            deskripsi: data.deskripsi || "",
            fotoUrl: data.fotoUrl || "",
            tanggalTerbit: formattedTanggal,
            idAdmin: data.idAdmin || "",
          });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        Swal.fire("Error", "Terjadi kesalahan saat mengambil data berita.", "error");
      }
    };
    fetchBerita();
  }, [id]);

  const handleChange = (e) => {
    setBerita({ ...berita, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!berita.nama || !berita.penulis || !berita.deskripsi || !berita.tanggalTerbit || !berita.idAdmin) {
      Swal.fire("Gagal!", "Semua field harus diisi.", "error");
      return;
    }

    try {
      let imageUrl = berita.fotoUrl;

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

      await axios.put(`${API_BERITA}/editById/${id}`, { ...berita, fotoUrl: imageUrl });

      Swal.fire("Sukses!", "Data berita berhasil diperbarui.", "success").then(() => {
        addNotification(`Berita ${berita.nama} telah diperbarui`, "success"); // 🔔
        navigate("/berita");
      });
    } catch (error) {
      console.error("Update error:", error);
      setIsUploading(false);
      Swal.fire("Gagal!", "Terjadi kesalahan saat mengedit data berita.", "error");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center pl-64 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Edit Berita</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Nama", name: "nama", type: "text" },
                { label: "Penulis", name: "penulis", type: "text" },
                { label: "Deskripsi", name: "deskripsi", type: "text" },
                { label: "Tanggal Terbit", name: "tanggalTerbit", type: "date" },
                { label: "ID Admin", name: "idAdmin", type: "number" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium text-left capitalize">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={berita[field.name] || ""}
                    onChange={handleChange}
                    placeholder={`Masukkan ${field.label}`}
                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium text-left">Upload Foto</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 border rounded" />
              {berita.fotoUrl && (
                <img src={berita.fotoUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover border rounded" />
              )}
            </div>

            <div className="flex justify-between space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/berita")}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
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

export default EditBerita;
