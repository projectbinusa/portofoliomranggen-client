
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { API_ORGANISASI } from "../utils/BaseUrl";

const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const TambahOrganisasi = () => {
  const [organisasi, setOrganisasi] = useState({
    namaOrganisasi: "",
    lokasi: "",
    email: "",
    telepon: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOrganisasi({ ...organisasi, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\d{10,15}$/.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (Object.values(organisasi).some((val) => val.trim() === "")) {
      Swal.fire("Gagal!", "Semua field harus diisi.", "error");
      return;
    }
    
    if (!validateEmail(organisasi.email)) {
      Swal.fire("Gagal!", "Format email tidak valid.", "error");
      return;
    }

    if (!validatePhone(organisasi.telepon)) {
      Swal.fire("Gagal!", "Nomor telepon harus berupa angka 10-15 digit.", "error");
      return;
    }
    
    setLoading(true);

    const formattedData = {
      ...organisasi,
      namaOrganisasi: toCamelCase(organisasi.namaOrganisasi),
      lokasi: toCamelCase(organisasi.lokasi),
    };

    try {
      const response = await fetch(`${API_ORGANISASI}/tambah`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan organisasi. Silakan coba lagi.");
      }

      Swal.fire("Sukses!", "Organisasi berhasil ditambahkan.", "success").then(() => {
        navigate("/organisasi");
      });
    } catch (error) {
      Swal.fire("Gagal!", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 ml-40 mt-20">
        <div className="max-w-lg mx-auto bg-white p-12 rounded-md shadow-md transition-transform transform hover:scale-105">
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
                      type={field === "email" ? "email" : field === "telepon" ? "tel" : "text"}
                      name={field}
                      value={organisasi[field]}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all duration-200 ease-in-out transform focus:scale-105"
                      required
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between space-x-4 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-200 ease-in-out transform hover:scale-105"
                  onClick={() => navigate("/organisasi")}
                  disabled={loading}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2 rounded-lg shadow-sm font-medium text-white ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ease-in-out transform hover:scale-105`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Menyimpan...
                    </div>
                  ) : (
                    "Simpan"
                  )}
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