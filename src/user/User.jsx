import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Pencil, Trash2, Search, X } from "lucide-react";

const API_USER = "http://localhost:4321/api/user";

const User = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    axios
      .get(`${API_USER}/all`)
      .then((response) => {
        console.log("Data dari API:", response.data); // Debugging
        setUsers(response.data || []); // Pastikan selalu array
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleDeleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data user ini akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_USER}/delete/${id}`);
        setUsers(users.filter((user) => user.id !== id));
        Swal.fire("Dihapus!", "Data user telah dihapus.", "success");
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire("Error", "Gagal menghapus data.", "error");
      }
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toString().includes(searchTerm) ||
    user.password.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hitung indeks user yang akan ditampilkan
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="flex h-screen">
      {console.log("Users state:", users)} {/* Debugging */}
      <Sidebar />
      <div className="flex-1 p-6 ml-40">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700">Daftar User</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={() => navigate("/tambah-user")}
            >
              Tambah User
            </button>
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Cari user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2 border rounded-md"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {isLoading ? (
            <p className="text-center py-4">Loading data...</p>
          ) : (
            <div className="relative overflow-x-auto shadow-md border border-gray-300 rounded-lg">
              <table className="w-full text-sm text-left text-gray-700 border-collapse">
                <thead className="text-xs uppercase bg-gray-200 text-gray-700">
                  <tr>
                    {["No", "Username", "Email", "Password", "Aksi"].map((header, index) => (
                      <th key={index} className="px-6 py-3 text-center border border-gray-300">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-gray-100">
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user, index) => (
                      <tr key={user.id} className="hover:bg-gray-100">
                        <td className="px-6 py-3 text-center border border-gray-300">
                          {indexOfFirstUser + index + 1}
                        </td>
                        <td className="px-6 py-3 text-center border border-gray-300">
                          {user.username}
                        </td>
                        <td className="px-6 py-3 text-center border border-gray-300">
                          {user.email}
                        </td>
                        <td className="px-6 py-3 text-center border border-gray-300">
                          {user.password}
                        </td>
                        <td className="px-6 py-3 flex justify-center space-x-2 border border-gray-300">
                          <Link to={`/edit-user/${user.id}`}>
                            <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                              <Pencil size={18} />
                            </button>
                          </Link>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-500 border border-gray-300">
                        Tidak ada data user yang sesuai.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
            >
              Previous
            </button>

            <span className="text-gray-700">
              Halaman {currentPage} dari {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
