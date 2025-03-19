import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Search, Eye, X, FileText } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { API_STAFF } from "../utils/BaseUrl";
import { useNotification } from "../context/NotificationContext";
import Navbar from "../tampilan/Navbar";
import { jsPDF } from "jspdf";

const DaftarStaff = () => {
  const [staffData, setStaffData] = useState([]);
  const { sendNotification } = useNotification();
  const { addNotification } = useNotification();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_STAFF}/all`)
      .then((response) => response.json())
      .then((data) => setStaffData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (id) => navigate(`/edit-staff/${id}`);

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
              addNotification("Data staf berhasil dihapus", "warning");
              Swal.fire("Dihapus!", "Data staf telah dihapus.", "success");
            } else {
              Swal.fire("Gagal!", "Gagal menghapus data staf.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire(
              "Gagal!",
              "Terjadi kesalahan saat menghapus data.",
              "error"
            );
          });
      }
    });
  };

  const generatePDF = (staff) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Detail Staff", 105, 15, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.line(10, 20, 200, 20);

    doc.text(`Nama         : ${staff.nama}`, 10, 30);
    doc.text(`Alamat       : ${staff.alamat}`, 10, 40);
    doc.text(`No. Telepon  : ${staff.noTelepon}`, 10, 50);
    doc.text(`Lama Kerja   : ${staff.lamaKerja}`, 10, 60);

    doc.line(10, 70, 200, 70);
    doc.save(`Staff_${staff.nama}.pdf`);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 ml-48">
        <Navbar />
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar Staff</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={() => {
                navigate("/tambah-staff");
                sendNotification("Form tambah staf dibuka", "info");
              }}
            >
              Tambah Staff
            </button>
          </div>
          <div className="relative w-1/3 mb-4">
            <input
              type="text"
              placeholder="Cari staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-10 py-2 border border-black rounded-md focus:ring-1 focus:ring-gray-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="relative overflow-x-auto shadow-md">
            <table className="w-full text-sm text-left text-gray-700 border border-gray-400">
              <thead className="text-xs font-bold uppercase bg-gray-200 border-b border-gray-500">
                <tr>
                  {[
                    "No",
                    "Nama",
                    "Alamat",
                    "No. Telepon",
                    "Lama Kerja",
                    "Aksi",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 border-r border-gray-400 text-center"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staffData.length ? (
                  staffData.map((staff, index) => (
                    <tr
                      key={staff.id}
                      className="bg-white border-b border-gray-400 hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 border-r text-center">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 border-r text-center">
                        {staff.nama}
                      </td>
                      <td className="px-6 py-4 border-r text-center">
                        {staff.alamat}
                      </td>
                      <td className="px-6 py-4 border-r text-center">
                        {staff.noTelepon}
                      </td>
                      <td className="px-6 py-4 border-r text-center">
                        {staff.lamaKerja}
                      </td>
                      <td className="px-6 py-4 flex gap-2 justify-center">
                        <button
                          onClick={() => navigate(`/detail-staff/${staff.id}`)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(staff.id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(staff.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => generatePDF(staff)}
                          className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                        >
                          <FileText size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      Tidak ada data staff yang sesuai.
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

export default DaftarStaff;
