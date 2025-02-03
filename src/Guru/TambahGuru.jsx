import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";

const TambahGuru = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    nip: "",
    alamat: "",
    nomorHp: "",
    tahunDiterima: "",
    lamaKerja: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.nama ||
      !formData.nip ||
      !formData.alamat ||
      !formData.nomorHp ||
      !formData.tahunDiterima ||
      !formData.lamaKerja
    ) {
      Swal.fire("Error", "Semua kolom harus diisi!", "error");
      return;
    }

    Swal.fire("Sukses", "Data guru berhasil ditambahkan!", "success");

    setTimeout(() => {
      navigate("/pageguru");
    }, 1000);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Konten Form */}
      <div className="flex-1 p-5 flex justify-center items-center ml-16"> {/* Menambahkan margin-left lebih besar */}
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-4xl ml-12 mr-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Tambah Guru</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/** Input Nama */}
              <div className="flex items-center">
                <label className="w-48 text-gray-700">Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Nama"
                  className="w-full p-4 border rounded-lg"
                />
              </div>

              {/** Input NIP */}
              <div className="flex items-center">
                <label className="w-48 text-gray-700">NIP</label>
                <input
                  type="text"
                  name="nip"
                  value={formData.nip}
                  onChange={handleChange}
                  placeholder="NIP"
                  className="w-full p-4 border rounded-lg"
                />
              </div>

              {/** Input Alamat */}
              <div className="flex items-center">
                <label className="w-48 text-gray-700">Alamat</label>
                <input
                  type="text"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  placeholder="Alamat"
                  className="w-full p-4 border rounded-lg"
                />
              </div>

              {/** Input Nomor HP */}
              <div className="flex items-center">
                <label className="w-48 text-gray-700">Nomor HP</label>
                <input
                  type="text"
                  name="nomorHp"
                  value={formData.nomorHp}
                  onChange={handleChange}
                  placeholder="Nomor HP"
                  className="w-full p-4 border rounded-lg"
                />
              </div>

              {/** Input Tahun Diterima (dihapus kalender) */}
              <div className="flex items-center">
                <label className="w-48 text-gray-700">Tahun Diterima</label>
                <input
                  type="text"
                  name="tahunDiterima"
                  value={formData.tahunDiterima}
                  onChange={handleChange}
                  placeholder="Tahun Diterima"
                  className="w-full p-4 border rounded-lg"
                />
              </div>

              {/** Input Lama Kerja */}
              <div className="flex items-center">
                <label className="w-48 text-gray-700">Lama Kerja</label>
                <input
                  type="number"
                  name="lamaKerja"
                  value={formData.lamaKerja}
                  onChange={handleChange}
                  placeholder="Lama Kerja (Tahun)"
                  className="w-full p-4 border rounded-lg"
                />
              </div>
            </div>

            {/* Tombol Simpan & Batal */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/pageguru")}
                className="w-32 px-4 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="w-32 px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
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

export default TambahGuru;
