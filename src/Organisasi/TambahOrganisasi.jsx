import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import Swal from "sweetalert2"; // Import SweetAlert2
import { API_ORGANISASI } from "../utils/BaseUrl"; // Import API URL

const TambahOrganisasi = () => {
  const [organisasi, setOrganisasi] = useState({
    namaOrganisasi: "",
    lokasi: "",
    email: "",
    telepon: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setOrganisasi({ ...organisasi, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !organisasi.namaOrganisasi ||
      !organisasi.lokasi ||
      !organisasi.email ||
      !organisasi.telepon
    ) {
      Swal.fire({
        title: "Gagal!",
        text: "Semua field harus diisi.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const organisasiDTO = {
      namaOrganisasi: organisasi.namaOrganisasi,
      lokasi: organisasi.lokasi,
      email: organisasi.email,
      telepon: organisasi.telepon,
      id: 1, // This is just an example; modify as necessary
    };

    console.log("Payload yang dikirim:", organisasiDTO);

    try {
      const response = await fetch(`${API_ORGANISASI}/tambah`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(organisasiDTO),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Response error:", errorData);
        throw new Error(`Error: ${errorData.message || "Gagal menambahkan organisasi"}`);
      }

      const data = await response.json();
      console.log("Data yang berhasil disimpan:", data);

      Swal.fire({
        title: "Sukses!",
        text: "Organisasi berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/organisasi");
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
    <div className="flex">
      <div className="w-64">
        <Sidebar /> {/* Sidebar component */}
      </div>
      <div className="flex-1 p-8 ml-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tambah Organisasi</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[ // Mapping fields to simplify the JSX
            { label: "Nama Organisasi", name: "namaOrganisasi", type: "text" },
            { label: "Lokasi", name: "lokasi", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Nomor Telepon", name: "telepon", type: "text" },
          ].map((field) => (
            <div key={field.name} className="flex items-center gap-4">
              <label className="w-1/5 text-gray-700 font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={organisasi[field.name]}
                onChange={handleChange}
                className="w-4/5 border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="text-black font-semibold hover:underline"
              onClick={() => navigate("/organisasi")}
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

export default TambahOrganisasi;
