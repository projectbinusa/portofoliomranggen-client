import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_STAFF } from "../utils/BaseUrl";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useNotification } from "../context/NotificationContext"; // 🔔 Import Notifikasi

const EditStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // 🔔 Pakai notifikasi
  const [staff, setStaff] = useState({
    nama: "",
    alamat: "",
    noTelepon: "",
    awalBekerja: "",
    lamaKerja: "",
    createDate: "",
  });

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(`${API_STAFF}/getById/${id}`);
        if (response.status === 200) {
          const data = response.data;

          setStaff({
            ...data,
            awalBekerja:
              data.awalBekerja && !isNaN(new Date(data.awalBekerja))
                ? new Date(data.awalBekerja).toISOString().split("T")[0]
                : "",
            createDate:
              data.createDate && !isNaN(new Date(data.createDate))
                ? new Date(data.createDate).toISOString().split("T")[0]
                : "",
          });
        }
      } catch (error) {
        console.error("Error fetching staff data:", error);
        Swal.fire("Error", "Gagal mengambil data staff", "error");
      }
    };

    if (id) {
      fetchStaff();
    }
  }, [id]);

  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input sebelum mengirim ke server
    if (!staff.nama || !staff.alamat || !staff.noTelepon) {
      Swal.fire("Peringatan", "Harap isi semua kolom!", "warning");
      return;
    }

    try {
      const response = await axios.put(`${API_STAFF}/editById/${id}`, staff);
      if (response.status === 200) {
        Swal.fire("Sukses", "Data staf berhasil diperbarui!", "success");
        addNotification(`Data staf ${staff.nama} diperbarui`, "info"); // 🔔 Notifikasi update staf
        setTimeout(() => navigate("/staff"), 1000);
      }
    } catch (error) {
      console.error("Error updating staff data:", error);
      Swal.fire("Error", "Gagal memperbarui data staf", "error");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Edit Staff</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(staff)
              .filter((key) => key !== "id")
              .map((key) => (
                <div key={key} className="flex flex-col">
                  <label className="text-gray-700 text-sm font-medium text-left capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <input
                    type={
                      key === "lamaKerja"
                        ? "number"
                        : key.includes("Date")
                        ? "date"
                        : "text"
                    }
                    name={key}
                    value={staff[key] || ""}
                    onChange={handleChange}
                    placeholder={`Masukkan ${key
                      .replace(/([A-Z])/g, " $1")
                      .trim()}`}
                    className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={() => navigate("/staff")}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStaff;
