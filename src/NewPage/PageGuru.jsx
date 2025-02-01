import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PageGuru = () => {
  const navigate = useNavigate();
  const [pageguru, setPageGuru] = useState([
    {
      id: 1,
      nama: "John Doe",
      nip: "123456",
      alamat: "Jl. Merdeka No. 1",
      nomorHp: "08123456789",
      tahunDiterima: "2015",
      lamaKerja: "8 Tahun",
    },
    {
      id: 2,
      nama: "Jane Smith",
      nip: "654321",
      alamat: "Jl. Sudirman No. 2",
      nomorHp: "08198765432",
      tahunDiterima: "2018",
      lamaKerja: "5 Tahun",
    },
  ]);

  const handleDeletePageGuru = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this employee?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setPageGuru(pageguru.filter((pageguru) => pageguru.id !== id));
        Swal.fire("Deleted!", "The employee has been deleted.", "success");
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Daftar Pegawai</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate("/tambah")}>
          + Tambah
        </button>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">NIP</th>
              <th className="px-6 py-3">Alamat</th>
              <th className="px-6 py-3">Nomor Hp</th>
              <th className="px-6 py-3">Tahun Diterima</th>
              <th className="px-6 py-3">Lama Kerja</th>
              <th className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pageguru.map((guru, index) => (
              <tr key={guru.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{guru.nama}</td>
                <td className="px-6 py-4">{guru.nip}</td>
                <td className="px-6 py-4">{guru.alamat}</td>
                <td className="px-6 py-4">{guru.nomorHp}</td>
                <td className="px-6 py-4">{guru.tahunDiterima}</td>
                <td className="px-6 py-4">{guru.lamaKerja}</td>
                <td className="px-6 py-4 flex space-x-2">
                <Link to={`/edit/${guru.id}`}>
                  <button className="bg-green-500 text-white px-4 py-2 rounded">Edit</button>
                </Link>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDeletePageGuru(guru.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PageGuru;
