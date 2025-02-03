import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar"; // Pastikan path ke Sidebar sesuai

const EditGuru = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nama: "",
    nip: "",
    alamat: "",
    nomorHp: "",
    tahunDiterima: "",
    lamaKerja: "",
  });

  useEffect(() => {
    // Data contoh, nanti bisa diganti dengan fetch dari API
    const guruData = {
      id: 1,
      nama: "Faiqah Nisa Azzahra",
      nip: "123456",
      alamat: "Pelem, Pulutan, Nagasari, Boyolali",
      nomorHp: "08123456789",
      tahunDiterima: "2020",
      lamaKerja: "3 Tahun",
    };
    setFormData(guruData);
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nama || !formData.nip || !formData.alamat || !formData.nomorHp || !formData.tahunDiterima || !formData.lamaKerja) {
      Swal.fire("Error", "Semua kolom harus diisi!", "error");
      return;
    }

    Swal.fire("Sukses", "Data guru berhasil diubah!", "success");

    setTimeout(() => {
      navigate("/pageguru");
    }, 1000);
  };

  return (
    <div className="flex h-full bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Konten Form */}
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl ml-60 border border-gray-300">
          {/* Menambahkan border dan margin kiri untuk geser ke kanan */}
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Guru</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/** Form input dengan label di kiri dan input di kanan */}
            {Object.entries({
              nama: "Nama",
              nip: "NIP",
              alamat: "Alamat",
              nomorHp: "Nomor HP",
              tahunDiterima: "Tahun Diterima",
              lamaKerja: "Lama Kerja (Tahun)",
            }).map(([key, label]) => (
              <div key={key} className="flex items-center border-b border-gray-200 py-2">
                {/* Menambahkan border bawah pada tiap field */}
                <label className="w-48 text-gray-700">{label}</label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-[500px] p-2 border rounded-lg"
                />
              </div>
            ))}

            {/* Tombol Simpan & Batal */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/pageguru")}
                className="w-32 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="w-32 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
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

export default EditGuru;
