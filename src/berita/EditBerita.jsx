import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { API_BERITA } from "../utils/BaseUrl";
import { useParams, useNavigate } from "react-router-dom";

const EditBerita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const idAdmin = localStorage.getItem("idAdmin");
  const [berita, setBerita] = useState({
    nama: "",
    penulis: "",
    deskripsi: "",
    fotoUrl: "",
    tanggalTerbit: "",
  });

  useEffect(() => {
    if (!idAdmin) {
      Swal.fire({
        title: "Error",
        text: "Admin tidak ditemukan. Silakan login ulang.",
        icon: "error",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    const fetchBerita = async () => {
      try {
        const response = await axios.get(`${API_BERITA}/getById/${id}`);
        if (response.status === 200) {
          const data = response.data;
          console.log("Data Berita diterima: ", data);

          const formattedData = {
            ...data,
            tanggalTerbit: data.tanggalTerbit
              ? new Date(data.tanggalTerbit).toISOString().split("T")[0]
              : "",
          };

          setBerita(formattedData);
        } else {
          Swal.fire({
            title: "Not Found",
            text: "Berita dengan ID tersebut tidak ditemukan.",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      } catch (error) {
        console.error("Error fetching berita data:", error);
        Swal.fire({
          title: "Error",
          text: "Terjadi kesalahan saat mengambil data berita.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    };

    fetchBerita();
  }, [id, idAdmin, navigate]);

  const handleChange = (e) => {
    setBerita({ ...berita, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idAdmin) {
      Swal.fire({
        title: "Error",
        text: "Admin tidak ditemukan. Silakan login ulang.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const formattedTanggalTerbit = berita.tanggalTerbit.includes("T") 
      ? berita.tanggalTerbit 
      : `${berita.tanggalTerbit}T00:00:00`;

    const beritaDTO = {
      nama: berita.nama,
      penulis: berita.penulis,
      deskripsi: berita.deskripsi,
      fotoUrl: berita.fotoUrl,
      tanggalTerbit: formattedTanggalTerbit,
    };

    console.log("Payload yang dikirim:", beritaDTO);

    try {
      const response = await axios.put(`${API_BERITA}/edit/${id}/${idAdmin}`, beritaDTO);
      if (response.status === 200) {
        Swal.fire({
          title: "Sukses!",
          text: "Data berita berhasil diperbarui.",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/berita");
        });
      } else {
        throw new Error("Gagal mengedit berita");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat mengedit data berita.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="flex-1 p-8 ml-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Berita</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Judul Berita", name: "nama", type: "text" },
          { label: "Penulis", name: "penulis", type: "text" },
          { label: "Deskripsi", name: "deskripsi", type: "text" },
          { label: "URL Foto", name: "fotoUrl", type: "text" },
          { label: "Tanggal Terbit", name: "tanggalTerbit", type: "date" },
        ].map((field) => (
          <div key={field.name} className="flex items-center gap-4">
            <label className="w-40 text-gray-700 font-medium text-left">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={berita[field.name] || ""}
              onChange={handleChange}
              className="flex-1 border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            className="text-black font-semibold hover:underline"
            onClick={() => navigate("/berita")}>
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
  );
};

export default EditBerita;