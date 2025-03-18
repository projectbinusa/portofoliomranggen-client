import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, FileText } from "lucide-react";
import { useNotification } from "../context/NotificationContext";
import Navbar from "../tampilan/Navbar";
import { jsPDF } from "jspdf";

const API_USER = "http://localhost:4321/api/user";

const User = () => {
  const navigate = useNavigate();
  const { sendNotification } = useNotification();
  const { addNotification } = useNotification();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_USER}/all`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("❌ Error fetching data:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDeleteUser = (id, username) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: `User \"${username}\" akan dihapus!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_USER}/delete/${id}`)
          .then(() => {
            setUsers(users.filter((user) => user.id !== id));
            addNotification(
              `Admin telah menghapus data User \"${username}\"`,
              "warning"
            );
            Swal.fire(
              "Dihapus!",
              `User \"${username}\" telah dihapus.`,
              "success"
            );
          })
          .catch(() =>
            Swal.fire(
              "Gagal!",
              "Terjadi kesalahan saat menghapus data.",
              "error"
            )
          );
      }
    });
  };

  const generateInvoice = (user) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Invoice User", 105, 15, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.line(10, 20, 200, 20);

    doc.text(`Username : ${user.username}`, 10, 30);
    doc.text(`Email    : ${user.email}`, 10, 40);

    doc.line(10, 50, 200, 50);
    doc.save(`Invoice_${user.username}.pdf`);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Navbar />
      <div className="flex-1 p-6 ml-40">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-4 mt-6">
            <h2 className="text-2xl font-bold text-gray-700">Daftar User</h2>
            <button
              className="p-3 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-2 transition tombol-tambah"
              onClick={() => {
                navigate("/tambah-user");
                sendNotification("Menambahkan user baru", "success");
              }}
            >
              <FaPlus size={16} />
            </button>
          </div>
          {isLoading ? (
            <p className="text-center py-4">Loading data...</p>
          ) : (
            <div className="relative overflow-x-auto shadow-md">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs uppercase bg-gray-200 text-gray-700">
                  <tr>
                    {["No", "Username", "Email", "Aksi"].map(
                      (header, index) => (
                        <th key={index} className="px-6 py-3 text-center">
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="bg-gray-100">
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={user.id} className="hover:bg-gray-100">
                        <td className="px-6 py-3 text-center">{index + 1}</td>
                        <td className="px-6 py-3 text-center">
                          {user.username}
                        </td>
                        <td className="px-6 py-3 text-center">{user.email}</td>
                        <td className="px-6 py-3 flex justify-center space-x-2">
                          <Link to={`/edit-user/${user.id}`}>
                            <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                              <Pencil size={18} />
                            </button>
                          </Link>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            onClick={() =>
                              handleDeleteUser(user.id, user.username)
                            }
                          >
                            <Trash2 size={18} />
                          </button>
                          <button
                            className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600"
                            onClick={() => generateInvoice(user)}
                          >
                            <FileText size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-4 text-gray-500"
                      >
                        Tidak ada data user yang sesuai.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
