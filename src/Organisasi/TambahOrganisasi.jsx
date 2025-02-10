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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-left">Tambah Organisasi</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(organisasi).map((field) => (
              <div key={field} className="flex flex-col items-start">
                <label className="text-gray-700 font-medium mb-1">
                  {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={organisasi[field]}
                  onChange={handleChange}
                  className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            ))}
            <div className="flex justify-between mt-6">
              <button type="button" className="text-gray-600 font-semibold hover:underline" onClick={() => navigate("/organisasi")}>
                Batal
              </button>
              <button type="submit" className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700 transition">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahOrganisasi;
