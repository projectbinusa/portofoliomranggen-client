import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { API_ORGANISASI } from "../utils/BaseUrl";
import { useParams, useNavigate } from "react-router-dom";

const EditOrganisasi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [organisasi, setOrganisasi] = useState({
    namaOrganisasi: "",
    lokasi: "",
    email: "",
    telepon: "",
  });

  useEffect(() => {
    const fetchOrganisasi = async () => {
      try {
        const response = await axios.get(`${API_ORGANISASI}/getById/${id}`);
        if (response.status === 200) {
          setOrganisasi(response.data);
        } else {
          Swal.fire(
            "Not Found",
            "Organisasi dengan ID tersebut tidak ditemukan.",
            "error"
          );
        }
      } catch (error) {
        Swal.fire(
          "Error",
          "Terjadi kesalahan saat mengambil data organisasi.",
          "error"
        );
      }
    };

    if (id) fetchOrganisasi();
  }, [id]);

  const handleChange = (e) => {
    setOrganisasi({ ...organisasi, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_ORGANISASI}/editById/${id}`,
        organisasi
      );
      if (response.status === 200) {
        Swal.fire(
          "Sukses!",
          "Data organisasi berhasil diperbarui.",
          "success"
        ).then(() => navigate("/organisasi"));
      } else {
        throw new Error("Gagal mengedit organisasi");
      }
    } catch (error) {
      Swal.fire(
        "Gagal!",
        "Terjadi kesalahan saat mengedit data organisasi.",
        "error"
      );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Edit Organisasi</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                label: "Nama Organisasi",
                name: "namaOrganisasi",
                type: "text",
              },
              { label: "Lokasi", name: "lokasi", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Telepon", name: "telepon", type: "tel" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="text-gray-700 text-sm font-medium text-left">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={organisasi[field.name]}
                  onChange={handleChange}
                  placeholder={`Masukkan ${field.label}`}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
            <div className="flex justify-between space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/organisasi")}
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

export default EditOrganisasi;
