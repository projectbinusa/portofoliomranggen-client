import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { API_ORGANISASI } from "../utils/BaseUrl";

const TambahOrganisasi = () => {
  const [organisasi, setOrganisasi] = useState({
    namaOrganisasi: "",
    lokasi: "",
    email: "",
    telepon: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setOrganisasi({ ...organisasi, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(organisasi).some((val) => val.trim() === "")) {
      Swal.fire("Gagal!", "Semua field harus diisi.", "error");
      return;
    }

    try {
      const response = await fetch(`${API_ORGANISASI}/tambah`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(organisasi),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menambahkan organisasi");
      }

      Swal.fire("Sukses!", "Organisasi berhasil ditambahkan.", "success").then(() => {
        navigate("/organisasi");
      });
    } catch (error) {
      Swal.fire("Gagal!", `Terjadi kesalahan: ${error.message}`, "error");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 ml-40 mt-20">
        <div className="max-w-lg mx-auto bg-white p-12 rounded-md shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Tambah Organisasi</h1>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {Object.keys(organisasi).map((field) => (
                  <div key={field} className="text-left">
                    <label className="block text-base font-medium text-gray-700">
                      {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={organisasi[field]}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      required
                    />
                  </div>
                ))}
              </div>
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahOrganisasi;
