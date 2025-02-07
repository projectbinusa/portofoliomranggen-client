import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { API_ORGANISASI } from "../utils/BaseUrl";
import { useParams, useNavigate } from "react-router-dom";

const EditOrganisasi = () => {
  const { id } = useParams(); // Get organization ID from URL
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
          setOrganisasi(response.data); // Set form with existing organization data
        } else {
          Swal.fire({
            title: "Not Found",
            text: "Organisasi dengan ID tersebut tidak ditemukan.",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      } catch (error) {
        console.error("Error fetching organization data:", error);
        Swal.fire({
          title: "Error",
          text: "Terjadi kesalahan saat mengambil data organisasi.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    };

    if (id) {
      fetchOrganisasi();
    }
  }, [id]);

  const handleChange = (e) => {
    setOrganisasi({ ...organisasi, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${API_ORGANISASI}/editById/${id}`, organisasi);
      if (response.status === 200) {
        Swal.fire({
          title: "Sukses!",
          text: "Data organisasi berhasil diperbarui.",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/organisasi"); // Redirect to organization list page
        });
      } else {
        throw new Error("Gagal mengedit organisasi");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Gagal!",
        text: "Terjadi kesalahan saat mengedit data organisasi.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="flex">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="flex-1 p-8 ml-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Organisasi</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Nama Organisasi", name: "namaOrganisasi", type: "text" },
            { label: "Lokasi", name: "lokasi", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Telepon", name: "telepon", type: "tel" },
          ].map((field) => (
            <div key={field.name} className="flex items-center gap-4">
              <label className="w-1/5 text-gray-700 font-medium">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={organisasi[field.name]}
                onChange={handleChange}
                className="w-4/5 border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="text-black font-semibold hover:underline"
              onClick={() => navigate("/organisasi")}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrganisasi;
