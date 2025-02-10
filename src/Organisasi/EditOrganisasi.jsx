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
          setOrganisasi(response.data);
        } else {
          Swal.fire({
            title: "Not Found",
            text: "Organisasi dengan ID tersebut tidak ditemukan.",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      } catch (error) {
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
          navigate("/organisasi");
        });
      } else {
        throw new Error("Gagal mengedit organisasi");
      }
    } catch (error) {
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
      <Sidebar />
      <div className="flex-1 p-10 ml-55 ">
        <div className="max-w-2xl mx-auto bg-white p-12 rounded-lg shadow-lg border border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Organisasi</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[ 
              { label: "Nama Organisasi", name: "namaOrganisasi", type: "text" },
              { label: "Lokasi", name: "lokasi", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Telepon", name: "telepon", type: "tel" },
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-base font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={organisasi[field.name]}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  required
                />
              </div>
            ))}
            <div className="flex justify-between space-x-4 pt-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                onClick={() => navigate("/organisasi")}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditOrganisasi;
