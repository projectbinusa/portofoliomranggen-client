import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { API_ORGANISASI } from "../utils/BaseUrl";

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

    if (!organisasi.namaOrganisasi || !organisasi.lokasi || !organisasi.email || !organisasi.telepon) {
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
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 min-h-screen bg-white shadow-md">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Tambah Organisasi</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["namaOrganisasi", "lokasi", "email", "telepon"].map((field) => (
              <div key={field} className="grid grid-cols-1 text-left">
                <label className="text-gray-700 font-medium mb-1">{
                  field === "namaOrganisasi" ? "Nama Organisasi" :
                  field === "lokasi" ? "Lokasi" :
                  field === "email" ? "Email" : "Nomor Telepon"
                }</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={organisasi[field]}
                  onChange={handleChange}
                  className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 w-full text-left"
                />
              </div>
            ))}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="text-gray-600 font-semibold hover:underline"
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
    </div>
  );
};

export default TambahOrganisasi;
