import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search, X } from "lucide-react";

const PageGuru = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pageguru, setPageGuru] = useState([
    {
      id: 1,
      nama: "Faiqah Nisa Azzahra",
      nip: "123456",
      alamat: "Pelem, Pulutan, Nagasari, Boyolali",
      nomorHp: "08123456789",
      tahunDiterima: "2020",
      lamaKerja: "3 Tahun",
    },
    {
      id: 2,
      nama: "Rodiyatul Khofifah",
      nip: "654321",
      alamat: "Karangasem, Sayung, Demak",
      nomorHp: "0816741276726",
      tahunDiterima: "2010",
      lamaKerja: "14 Tahun",
    },
    {
      id: 3,
      nama: "Mihnatun Naja Fuadah",
      nip: "654321",
      alamat: "Tungu, Godong, Grobogan",
      nomorHp: "081442432552",
      tahunDiterima: "2018",
      lamaKerja: "5 Tahun",
    },
    {
      id: 4,
      nama: "Devi Mahya Kumila",
      nip: "654321",
      alamat: "Ginggang, Gubug, Grobogan",
      nomorHp: "087324673396",
      tahunDiterima: "2018",
      lamaKerja: "5 Tahun",
    },
    {
      id: 5,
      nama: "Eka Yuni Rahmawati",
      nip: "654321",
      alamat: "Gaji, Guntur, Demak",
      nomorHp: "0813784747643",
      tahunDiterima: "2018",
      lamaKerja: "2 Tahun",
    },
  ]);

  const handleDeletePageGuru = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data guru ini akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setPageGuru(pageguru.filter((guru) => guru.id !== id));
        Swal.fire("Dihapus!", "Data guru telah dihapus.", "success");
      }
    });
  };

  // Filter berdasarkan input pencarian
  const filteredGuru = pageguru.filter((guru) =>
    guru.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-6 ml-64">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar Guru</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              onClick={() => navigate("/tambahguru")}
            >
              Tambah Guru
            </button>
          </div>

          {/* Input Pencarian */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Cari berdasarkan nama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {/* Ikon kaca pembesar (search) */}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

            {/* Ikon silang untuk menghapus input */}
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-6 py-3">No</th>
                  <th className="px-6 py-3">Nama</th>
                  <th className="px-6 py-3">NIP</th>
                  <th className="px-6 py-3">Alamat</th>
                  <th className="px-6 py-3">Nomor HP</th>
                  <th className="px-6 py-3">Tahun Diterima</th>
                  <th className="px-6 py-3">Lama Kerja</th>
                  <th className="px-6 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuru.length > 0 ? (
                  filteredGuru.map((guru, index) => (
                    <tr key={guru.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{guru.nama}</td>
                      <td className="px-6 py-4">{guru.nip}</td>
                      <td className="px-6 py-4">{guru.alamat}</td>
                      <td className="px-6 py-4">{guru.nomorHp}</td>
                      <td className="px-6 py-4">{guru.tahunDiterima}</td>
                      <td className="px-6 py-4">{guru.lamaKerja}</td>
                      <td className="px-6 py-4 flex space-x-2">
                        <Link to={`/editguru/${guru.id}`}>
                          <button className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                            <Pencil size={18} />
                          </button>
                        </Link>

                        <button
                          className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                          onClick={() => handleDeletePageGuru(guru.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      Tidak ada data guru yang sesuai.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageGuru;
