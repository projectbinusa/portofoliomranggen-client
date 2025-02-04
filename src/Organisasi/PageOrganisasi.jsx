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

        <div className="relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 border border-gray-300">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th className="px-6 py-3 border border-gray-300 text-center">No</th>
                <th className="px-6 py-3 border border-gray-300">Nama Organisasi</th>
                <th className="px-6 py-3 border border-gray-300">Lokasi</th>
                <th className="px-6 py-3 border border-gray-300">Email</th>
                <th className="px-6 py-3 border border-gray-300">Telepon</th>
                <th className="px-6 py-3 border border-gray-300 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {organisasiList.length > 0 ? (
                organisasiList.map((organisasi, index) => (
                  <tr key={index} className="bg-white border-b border-gray-300">
                    <td className="px-6 py-4 text-center border border-gray-300">{index + 1}</td>
                    <td className="px-6 py-4 border border-gray-300">{organisasi.namaOrganisasi}</td>
                    <td className="px-6 py-4 border border-gray-300">{organisasi.lokasi}</td>
                    <td className="px-6 py-4 border border-gray-300">{organisasi.email}</td>
                    <td className="px-6 py-4 border border-gray-300">{organisasi.telepon}</td>
                    <td className="px-6 py-4 flex justify-center gap-2 border border-gray-300">
                      <Link
                        to={`/edit-organisasi/${index}`}
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
