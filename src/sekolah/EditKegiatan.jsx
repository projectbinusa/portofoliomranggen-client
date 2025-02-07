import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { API_KEGIATAN } from "../utils/BaseUrl"; // Import API URL

const EditKegiatan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [kegiatan, setKegiatan] = useState({
    nama: "",
    deskripsi: "",
    tingkat: "",
    penyelenggara: "",
    penanggungJawab: "",
    hasil: "",
  });

  // Fetch kegiatan data when the component mounts
  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        const response = await fetch(`${API_KEGIATAN}/getById/${id}`);
        const data = await response.json();
        if (response.ok) {
          setKegiatan(data);
        } else {
          throw new Error("Kegiatan tidak ditemukan");
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
        navigate("/kegiatan-sekolah");
      }
    };

    fetchKegiatan();
  }, [id, navigate]);

  const handleChange = (e) => {
    setKegiatan({ ...kegiatan, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !kegiatan.nama ||
      !kegiatan.deskripsi ||
      !kegiatan.tingkat ||
      !kegiatan.penyelenggara ||
      !kegiatan.penanggungJawab ||
      !kegiatan.hasil
    ) {
      Swal.fire({
        title: "Error",
        text: "Semua kolom harus diisi!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const response = await fetch(`${API_KEGIATAN}/editById/${id}`, {
        method: "PUT", // Use PUT method to update data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kegiatan),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Sukses!",
          text: "Kegiatan berhasil diperbarui.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/kegiatan-sekolah");
        });
      } else {
        throw new Error(data.message || "Gagal memperbarui data kegiatan");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center ml-20"> {/* Geser form ke kanan */}
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
            Edit Kegiatan Sekolah
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[ 
              { label: "Nama Kegiatan", name: "nama" },
              { label: "Deskripsi", name: "deskripsi" },
              { label: "Tingkat", name: "tingkat" },
              { label: "Penyelenggara", name: "penyelenggara" },
              { label: "Penanggung Jawab", name: "penanggungJawab" },
              { label: "Hasil", name: "hasil" },
            ].map((field) => (
              <div key={field.name} className="grid grid-cols-3 items-center gap-4">
                <label htmlFor={field.name} className="text-gray-700 font-medium text-right pr-4">
                  {field.label}
                </label>
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={kegiatan[field.name]}
                  onChange={handleChange}
                  className="col-span-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            ))}

            <div className="flex justify-end mt-6 space-x-4">
              <button
                type="button"
                onClick={() => navigate("/kegiatan-sekolah")}
                className="px-6 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-200 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
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

export default EditKegiatan;
