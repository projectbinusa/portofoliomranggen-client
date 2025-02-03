import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { API_STAFF } from "../utils/BaseUrl";

const DaftarStaff = () => {
  const [staffData, setStaffData] = useState([]);
  const navigate = useNavigate();

  // Ambil data staff dari API
  useEffect(() => {
    fetch(`${API_STAFF}/all`)
      .then((response) => response.json())
      .then((data) => setStaffData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Fungsi navigasi untuk edit
  const handleEdit = (id) => {
    navigate(`/edit-staff/${id}`);
  };

  // Fungsi untuk menghapus data dengan konfirmasi
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

  // Fungsi untuk memformat tanggal agar hanya tampil dd-mm-yyyy
  const formatDateDisplay = (rawDate) => {
    if (!rawDate) return "-"; // Jika tanggal kosong, tampilkan "-"
    
    // Mengubah string tanggal ISO (yyyy-MM-dd) menjadi objek Date
    const dateObj = new Date(rawDate);
    
    // Cek apakah tanggal valid
    if (isNaN(dateObj.getTime())) {
      return "-"; // Jika tidak valid, tampilkan "-"
    }

    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    
    // Mengembalikan format dd-mm-yyyy
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 flex-1">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Daftar Staff</h1>
          <button
            onClick={() => navigate("/tambah-staff")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Tambah Staff
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">Alamat</th>
                <th className="px-6 py-3">No. Telepon</th>
                <th className="px-6 py-3">Awal Bekerja</th>
                <th className="px-6 py-3">Lama Kerja</th>
                <th className="px-6 py-3">Create Date</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {staffData.map((staff, index) => (
                <tr
                  key={staff.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium">{staff.nama}</td>
                  <td className="px-6 py-4">{staff.alamat}</td>
                  <td className="px-6 py-4">{staff.noTelepon}</td>
                  <td className="px-6 py-4">{formatDateDisplay(staff.awalBekerja)}</td>
                  <td className="px-6 py-4">{staff.lamaKerja}</td>
                  <td className="px-6 py-4">{formatDateDisplay(staff.createDate)}</td>
                  <td className="px-6 py-4 flex gap-3">
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
              {staffData.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center">
                    Tidak ada data staff.
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
