import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { API_DONASI } from "../utils/BaseUrl";

const EditDonasi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const idAdmin = localStorage.getItem("adminId") || "";
  const [formData, setFormData] = useState({
    namaDonasi: "",
    namaDonatur: "",
    jumlahDonasi: "",
    fotoUrl: "",
    deskripsi: "",
  });
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    const fetchDonasi = async () => {
      try {
        const response = await fetch(`${API_DONASI}/getById/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error("Donasi tidak ditemukan");
        setFormData(data);
      } catch (error) {
        Swal.fire("Error", error.message, "error");
        navigate("/donasi");
      }
    };
    fetchDonasi();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => String(value || "").trim() === "")) {
      Swal.fire("Error", "Semua kolom harus diisi!", "error");
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("donasi", JSON.stringify(formData));
      if (foto) {
        formDataToSend.append("foto", foto);
      }

      const response = await fetch(`${API_DONASI}/editById/${id}/${idAdmin}`, {
        method: "PUT",
        body: formDataToSend,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Gagal memperbarui data donasi");

      Swal.fire("Sukses", "Donasi berhasil diperbarui!", "success");
      setTimeout(() => navigate("/donasi"), 1000);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-left">Edit Donasi</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["namaDonasi", "namaDonatur", "jumlahDonasi", "deskripsi"].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="w-1/3 text-gray-700 text-sm font-medium text-left capitalize">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type={field === "jumlahDonasi" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Masukkan ${field.replace(/([A-Z])/g, " $1").trim()}`}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            
            <div className="flex flex-col">
              <label className="w-1/3 text-gray-700 text-sm font-medium text-left">Foto</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="p-2 border rounded-lg"
              />
              {formData.fotoUrl && (
                <div className="mt-2">
                  <img src={formData.fotoUrl} alt="Foto Donasi" className="w-32 h-32 object-cover rounded-md" />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={() => navigate("/edit-donasi")}
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

export default EditDonasi;
