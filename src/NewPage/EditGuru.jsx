import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditGuru = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL params
  const [formData, setFormData] = useState({
    nama: "",
    nip: "",
    alamat: "",
    nomorHp: "",
    tahunDiterima: "",
    lamaKerja: "",
  });

  // Simulate fetching data for the guru by ID
  useEffect(() => {
    // Fetch the guru data by id (replace this with an actual API call if needed)
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

    // Check if all fields are filled
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

    // Logic to update guru would go here, such as sending data to API or updating state

    Swal.fire("Sukses", "Data guru berhasil diubah!", "success");

    // Redirect to the PageGuru after a short delay
    setTimeout(() => {
      navigate("/pageguru"); // Navigates to PageGuru ("/guru")
    }, 1000); // Delay navigation by 1 second
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Guru</h2>
        <form onSubmit={handleSubmit}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Nama</td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Nama"
                    className="w-full p-2 border rounded-lg"
                  />
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">NIP</td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    name="nip"
                    value={formData.nip}
                    onChange={handleChange}
                    placeholder="NIP"
                    className="w-full p-2 border rounded-lg"
                  />
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Alamat</td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    placeholder="Alamat"
                    className="w-full p-2 border rounded-lg"
                  />
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Nomor HP</td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    name="nomorHp"
                    value={formData.nomorHp}
                    onChange={handleChange}
                    placeholder="Nomor HP"
                    className="w-full p-2 border rounded-lg"
                  />
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Tahun Diterima</td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    name="tahunDiterima"
                    value={formData.tahunDiterima}
                    onChange={handleChange}
                    placeholder="Tahun Diterima"
                    className="w-full p-2 border rounded-lg"
                  />
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Lama Kerja</td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    name="lamaKerja"
                    value={formData.lamaKerja}
                    onChange={handleChange}
                    placeholder="Lama Kerja"
                    className="w-full p-2 border rounded-lg"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex space-x-4 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => navigate("/pageguru")}
              className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGuru;
