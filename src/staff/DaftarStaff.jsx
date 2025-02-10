import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Search } from "lucide-react";
import {FaPlus} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { API_STAFF } from "../utils/BaseUrl";

const DaftarStaff = () => {
  const [staffData, setStaffData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_STAFF}/all`)
      .then((response) => response.json())
      .then((data) => setStaffData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-staff/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data ini akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_STAFF}/delete/${id}`, { method: "DELETE" })
          .then((response) => {
            if (response.ok) {
              setStaffData(staffData.filter((staff) => staff.id !== id));
              Swal.fire("Dihapus!", "Data staf telah dihapus.", "success");
            } else {
              Swal.fire("Gagal!", "Gagal menghapus data staf.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
          });
      }
    });
  };

  const formatDateDisplay = (rawDate) => {
    if (!rawDate) return "-";
    
    const dateObj = new Date(rawDate);
    
    if (isNaN(dateObj.getTime())) {
      return "-";
    }

    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    
    return `${day}-${month}-${year}`;
  };

  const filteredStaff = staffData.filter((staff) =>
    `${staff.nama} ${staff.alamat} ${staff.noTelepon}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 ml-48 pl-4">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-1/3">
            <Search className="absolute ml-3 text-gray-500 top-3 left-3" size={20} />
            <input
              type="text"
              placeholder="Cari staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-2 w-full px-3 py-2 pl-10 pr-4 text-sm border-2 border-gray-600 rounded-md 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
           onClick={() => navigate("/tambah-staff")}
           className="flex items-center gap-2 bg-green-500 text-white px-4 py-2
           rounded-md hover:bg-green-600 transition">
           <FaPlus size={16} />
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 border border-gray-500">
            <thead className="text-xs uppercase bg-gray-200 border-b-2 border-gray-500">
              <tr>
                <th className="px-6 py-3 border border-gray-500 text-center">No</th>
                <th className="px-6 py-3 border border-gray-500 text-center">Nama</th>
                <th className="px-6 py-3 border border-gray-500 text-center">Alamat</th>
                <th className="px-6 py-3 border border-gray-500 text-center">No. Telepon</th>
                <th className="px-6 py-3 border border-gray-500 text-center">Awal Bekerja</th>
                <th className="px-6 py-3 border border-gray-500 text-center">Lama Kerja</th>
                <th className="px-6 py-3 border border-gray-500 text-center">Create Date</th>
                <th className="px-6 py-3 border border-gray-500 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((staff, index) => (
                <tr key={staff.id} className="bg-white border-b border-gray-400 hover:bg-gray-100">
                  <td className="px-6 py-4 border border-gray-400 text-center">{index + 1}</td>
                  <td className="px-6 py-4 font-medium border border-gray-400">{staff.nama}</td>
                  <td className="px-6 py-4 border border-gray-400">{staff.alamat}</td>
                  <td className="px-6 py-4 border border-gray-400">{staff.noTelepon}</td>
                  <td className="px-6 py-4 border border-gray-400">{formatDateDisplay(staff.awalBekerja)}</td>
                  <td className="px-6 py-4 border border-gray-400">{staff.lamaKerja}</td>
                  <td className="px-6 py-4 border border-gray-400">{formatDateDisplay(staff.createDate)}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(staff.id)}
                      className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(staff.id)}
                      className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStaff.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center border border-gray-400">
                    Tidak ada data staff yang sesuai.
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

export default DaftarStaff;
