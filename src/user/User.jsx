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
  const { sendNotification, addNotification } = useNotification();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetching users on component mount
  useEffect(() => {
    axios
      .get(`${API_USER}/all`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("❌ Error fetching data:", error))
      .finally(() => setIsLoading(false));
  }, []);

  // Handle user deletion
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
            addNotification(
              `Admin telah menghapus data User "${username}"`,
              "warning"
            );
            Swal.fire(
              "Dihapus!",
              `User "${username}" telah dihapus.`,
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

  // Generate PDF invoice for user
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
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64"> {/* Add a margin to the left to offset the sidebar */}
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6 mt-5">
            <div>
              <nav className="text-sm text-gray-500">
                <a className="hover:underline" href="/dashboard">
                  Home
                </a>{" "}
                /{" "}
                <a className="hover:underline" href="/user">
                  User
                </a>
              </nav>
              <h1 className="text-2xl font-bold text-gray-800 mt-1">User</h1>
            </div>

            {/* Search and Add Button */}
            <div className="flex items-center space-x-4">
              <input
                className="px-4 py-2 border rounded-md text-sm"
                placeholder="Search 100 records..."
                type="text"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md"  onClick={() => {
                 navigate("/tambah-user");
                 sendNotification("Menambahkan user baru", "success");
               }}>
                + 
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                <tr>
                  <th className="py-3 px-4 text-center">No</th>
                  <th className="py-3 px-4 text-center">Username</th>
                  <th className="py-3 px-4 text-center">Email</th>
                  <th className="py-3 px-4 text-center">Password</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {users.map((customer) => (
                  <tr key={customer.id}>
                    <td className="py-3 px-4">{customer.id}</td>
                        <td className="py-3 px-4 text-center">{customer.username}</td>
                    <td className="py-3 px-4 text-center">
                     {customer.email}
                    </td>
                    <td className="py-3 px-4 text-center">
                     {customer.password}
                    </td>
                    <td className="py-3 px-4 flex space-x-2">
                    <Link to={`/edit-user/${customer.id}`}>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                          <Pencil size={18} />
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        onClick={() =>
                          handleDeleteUser(customer.id, customer.username)
                        }
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600"
                        onClick={() => generateInvoice(customer)}
                      >
                        <FileText size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

};

export default User;
