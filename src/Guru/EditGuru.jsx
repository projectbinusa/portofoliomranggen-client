import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { API_GURU } from "../utils/BaseUrl";

const EditGuru = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const idAdmin = localStorage.getItem("adminId") || "";
  const [formData, setFormData] = useState({
    namaGuru: "",
    nip: "",
    alamat: "",
    nomerHp: "",
    tahunDiterima: "",
    lamaKerja: "",
  });

  useEffect(() => {
    const fetchGuru = async () => {
      try {
        const response = await fetch(`${API_GURU}/getById/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error("Guru tidak ditemukan");
        delete data.idAdmin; // Hapus idAdmin dari data yang dimasukkan ke state
        setFormData(data);
      } catch (error) {
        Swal.fire("Error", error.message, "error");
        navigate("/guru");
      }
    };
    fetchGuru();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => !value.trim())) {
      Swal.fire("Error", "Semua kolom harus diisi!", "error");
      return;
    }

    try {
      const response = await fetch(`${API_GURU}/edit/${id}/${idAdmin}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tahunDiterima: parseInt(formData.tahunDiterima, 10),
          lamaKerja: parseInt(formData.lamaKerja, 10),
          idAdmin, // Tetap dikirim ke backend, tapi tidak ditampilkan di form
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Gagal memperbarui data guru");

      Swal.fire("Sukses", "Guru berhasil diperbarui!", "success");
      setTimeout(() => navigate("/guru"), 1000);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Edit Data Guru</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["namaGuru", "nip", "alamat", "nomerHp", "tahunDiterima", "lamaKerja"].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="w-1/3 text-gray-700 text-sm font-medium text-left capitalize">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={["tahunDiterima", "lamaKerja"].includes(field) ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Masukkan ${field.replace(/([A-Z])/g, " $1").trim()}`}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={() => navigate("/guru")}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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

export default EditGuru;
