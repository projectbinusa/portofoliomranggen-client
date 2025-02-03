import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2 } from "lucide-react";

const PageOrganisasi = () => {
  const [organisasiList, setOrganisasiList] = useState([
    {
      namaOrganisasi: "Organisasi A",
      lokasi: "Lokasi A",
      email: "emailA@example.com",
      telepon: "081234567890",
    },
    {
      namaOrganisasi: "Organisasi B",
      lokasi: "Lokasi B",
      email: "emailB@example.com",
      telepon: "081298765432",
    },
  ]);

  const handleHapus = (index) => {
    // Implementasikan fungsi untuk menghapus data organisasi
    const updatedList = organisasiList.filter((_, i) => i !== index);
    setOrganisasiList(updatedList);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 ml-64 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Daftar Organisasi</h1>
          <Link
            to="/tambah-organisasi"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            + Tambah
          </Link>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-separate border-spacing-0.5">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Nama Organisasi</th>
                <th className="px-6 py-3">Lokasi</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Telepon</th>
                <th className="px-6 py-3">Aksi</th> 
              </tr>
            </thead>
            <tbody>
              {organisasiList.length > 0 ? (
                organisasiList.map((organisasi, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b-2 border-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{organisasi.namaOrganisasi}</td>
                    <td className="px-6 py-4">{organisasi.lokasi}</td>
                    <td className="px-6 py-4">{organisasi.email}</td>
                    <td className="px-6 py-4">{organisasi.telepon}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <Link
                        to={{
                          pathname: `/edit-organisasi`,
                          state: { organisasi, index }, // Mengirim data organisasi dan index
                        }}
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                      >
                        <Pencil size={20} />
                      </Link>
                      <button
                        onClick={() => handleHapus(index)}
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    Data organisasi tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PageOrganisasi;
