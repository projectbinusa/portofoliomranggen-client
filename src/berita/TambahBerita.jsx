import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BERITA } from "../utils/BaseUrl";
import Swal from "sweetalert2";

const TambahBerita = () => {
  const [berita, setBerita] = useState({
    nama: "",
    penulis: "",
    deskripsi: "",
    fotoUrl: "",
    tanggalTerbit: "",
  });

  const navigate = useNavigate();
  const idAdmin = localStorage.getItem("idAdmin");

  if (!idAdmin) {
    Swal.fire({
      title: "Gagal!",
      text: "Admin tidak ditemukan. Silakan login ulang.",
      icon: "error",
      confirmButtonText: "Ok",
    }).then(() => {
      navigate("/login"); 
    });
    return null;
  }

  const handleChange = (e) => {
    setBerita({ ...berita, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!berita.nama || !berita.penulis || !berita.deskripsi || !berita.fotoUrl || !berita.tanggalTerbit) {
      Swal.fire({
        title: "Gagal!",
        text: "Semua field harus diisi.",
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
      const response = await fetch(`${API_BERITA}/tambah/${idAdmin}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(beritaDTO),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Response error:", errorData);
        throw new Error(errorData.message || "Gagal menambahkan berita");
      }

      const data = await response.json();
      console.log("Data yang berhasil disimpan:", data);

      Swal.fire({
        title: "Sukses!",
        text: "Data berita berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/berita");
      });
    } catch (error) {
      console.error("Error:", error.message);
      Swal.fire({
        title: "Gagal!",
        text: `Terjadi kesalahan: ${error.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="flex-1 p-8 ml-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tambah Berita</h2>
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
              value={berita[field.name]}
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

export default TambahBerita;