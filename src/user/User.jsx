import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2 } from "lucide-react";
import { useNotification } from "../context/NotificationContext";
import Navbar from "../tampilan/Navbar";

const API_USER = "http://localhost:4321/api/user";

const User = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    axios
      .get(`${API_USER}/all`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error("❌ Error fetching data:", error))
      .finally(() => setIsLoading(false));
  }, []);

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
            setUsers(users.filter((user) => user.id !== id));
            addNotification(`User "${username}" berhasil dihapus`, "warning");
            Swal.fire("Dihapus!", `User "${username}" telah dihapus.`, "success");
          })
          .catch(() =>
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error")
          );
      }
    });
  };

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

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
                addNotification("Menambahkan user baru", "success");
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
                    {["No", "Username", "Email", "Password", "Aksi"].map(
                      (header, index) => (
                        <th key={index} className="px-6 py-3 text-center">
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="bg-gray-100">
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user, index) => (
                      <tr key={user.id} className="hover:bg-gray-100">
                        <td className="px-6 py-3 text-center">
                          {indexOfFirstUser + index + 1}
                        </td>
                        <td className="px-6 py-3 text-center">{user.username}</td>
                        <td className="px-6 py-3 text-center">{user.email}</td>
                        <td className="px-6 py-3 text-center">{user.password}</td>
                        <td className="px-6 py-3 flex justify-center space-x-2">
                          <Link to={`/edit-user/${user.id}`}>
                            <button
                              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                              onClick={() =>
                                addNotification(`Mengedit user: ${user.username}`, "info")
                              }
                            >
                              <Pencil size={18} />
                            </button>
                          </Link>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            onClick={() => handleDeleteUser(user.id, user.username)}
                          >
                            <Trash2 className="w-4 h-4" />
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
          )}

          {users.length > usersPerPage && (
            <div className="flex justify-center items-center mt-4 space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-sm rounded-md ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Prev
              </button>
              <span className="text-gray-700">
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-sm rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
