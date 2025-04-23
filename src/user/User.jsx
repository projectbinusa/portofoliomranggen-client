import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search, X, FileText } from "lucide-react";
import { useNotification } from "../context/NotificationContext";
import Navbar from "../tampilan/Navbar";
import { jsPDF } from "jspdf";

const API_USER = "http://localhost:4321/api/user";

const User = () => {
  const navigate = useNavigate();
  const { sendNotification, addNotification } = useNotification();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get(`${API_USER}/all`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("❌ Error fetching data:", error));
  };

  const handleDeleteUser = (id, username) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: `User "${username}" akan dihapus!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_USER}/delete/${id}`)
          .then(() => {
            fetchUsers();
            addNotification(`Admin menghapus user "${username}"`, "warning");
            Swal.fire("Dihapus!", `User "${username}" telah dihapus.`, "success");
          })
          .catch(() =>
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error")
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

  const filteredUsers = users.filter((user) =>
    Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Navbar />
      <div className="flex-1 p-6 ml-40">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar User</h2>
            <button
              onClick={() => {
                navigate("/tambah-user");
                sendNotification("Menambahkan user baru", "success");
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              <FaPlus size={16} />
            </button>
          </div>

          <div className="relative w-1/3 mb-4">
            <input
              type="text"
              placeholder="Cari berdasarkan semua data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2 border border-black rounded-md focus:ring-1 focus:ring-gray-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-400 w-5 h-5" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="relative overflow-x-auto shadow-md ml-1">
            <table className="w-full text-sm text-left text-gray-700 border border-gray-400">
              <thead className="text-xs font-bold uppercase bg-gray-200 border-b border-gray-500">
                <tr>
                  <th className="px-6 py-3 border-r text-center">No</th>
                  <th className="px-6 py-3 border-r text-center">Username</th>
                  <th className="px-6 py-3 border-r text-center">Email</th>
                  <th className="px-6 py-3 border-r text-center">Password</th>
                  <th className="px-6 py-3 border-r text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length ? (
                  filteredUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className="bg-white border-b border-gray-400 hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 border-r text-center">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 border-r text-center">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 border-r text-center">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 border-r text-center">
                        {user.password}
                      </td>
                      <td className="px-6 py-4 flex gap-2 justify-center">
                        <Link to={`/edit-user/${user.id}`}>
                          <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                            <Pencil size={18} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteUser(user.id, user.username)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => generateInvoice(user)}
                          className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600"
                        >
                          <FileText size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      Tidak ada data user yang sesuai.
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

export default User;
