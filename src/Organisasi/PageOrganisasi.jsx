import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import { API_ORGANISASI } from "../utils/BaseUrl";

const PageOrganisasi = () => {
  const [organisasiList, setOrganisasiList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Retrieve adminId from localStorage
  const idAdmin = JSON.parse(localStorage.getItem("adminId"));

  // Fetch organizations on component mount
  useEffect(() => {
    const fetchOrganisasi = async () => {
      try {
        const response = await axios.get(`${API_ORGANISASI}/all`);
        if (response.status === 200) {
          setOrganisasiList(response.data);
        } else {
          Swal.fire({
            title: "Error",
            text: "Gagal mengambil data organisasi.",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Terjadi kesalahan saat mengambil data organisasi.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    };

    fetchOrganisasi();
  }, []);

  // Handle delete organization
  const handleHapus = async (id) => {
    try {
      const response = await axios.delete(`${API_ORGANISASI}/delete/${id}`);
      if (response.status === 204) {
        Swal.fire({
          title: "Sukses",
          text: "Organisasi berhasil dihapus.",
          icon: "success",
          confirmButtonText: "Ok",
        });
        setOrganisasiList(organisasiList.filter((org) => org.id !== id));
      } else {
        throw new Error("Gagal menghapus organisasi");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat menghapus organisasi.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  // Filter organisasi berdasarkan pencarian
  const filteredOrganisasi = organisasiList.filter((organisasi) =>
    organisasi.namaOrganisasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    organisasi.lokasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    organisasi.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 ml-40 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Daftar Organisasi</h1>
          <Link
            to="/tambah-organisasi"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Tambah
          </Link>
        </div>

        {/* Input Search */}
        <div className="relative mb-4 w-1/3">
          <input
            type="text"
            placeholder="Cari organisasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 pl-10 pr-4 text-sm border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-3 text-gray-500" size={14} />
        </div>

        <div className="relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 border border-gray-300">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th className="px-6 py-3 border border-gray-300 text-center">No</th>
                <th className="px-6 py-3 border border-gray-300 text-center">Nama Organisasi</th>
                <th className="px-6 py-3 border border-gray-300 text-center">Lokasi</th>
                <th className="px-6 py-3 border border-gray-300 text-center">Email</th>
                <th className="px-6 py-3 border border-gray-300 text-center">Telepon</th>
                <th className="px-6 py-3 border border-gray-300 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrganisasi.length > 0 ? (
                filteredOrganisasi.map((organisasi, index) => (
                  <tr key={organisasi.id} className="bg-white border-b border-gray-300">
                    <td className="px-6 py-4 text-center border border-gray-300">{index + 1}</td>
                    <td className="px-6 py-4 border border-gray-300">{organisasi.namaOrganisasi}</td>
                    <td className="px-6 py-4 border border-gray-300">{organisasi.lokasi}</td>
                    <td className="px-6 py-4 border border-gray-300">{organisasi.email}</td>
                    <td className="px-6 py-4 border border-gray-300">{organisasi.telepon}</td>
                    <td className="px-6 py-4 flex justify-center gap-2 border border-gray-300">
                      <Link
                        to={`/edit-organisasi/${organisasi.id}`}
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                      >
                        <Pencil size={20} />
                      </Link>
                      <button
                        onClick={() => handleHapus(organisasi.id)}
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