import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_STAFF } from "../utils/BaseUrl";
import Swal from "sweetalert2";

const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const TambahStaff = () => {
  const [staff, setStaff] = useState({
    nama: "",
    alamat: "",
    noTelepon: "",
    awalBekerja: "",
    lamaKerja: "",
    createDate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!staff.nama || !staff.alamat || !staff.noTelepon || !staff.awalBekerja || !staff.lamaKerja || !staff.createDate) {
      Swal.fire({
        title: "Gagal!",
        text: "Semua field harus diisi.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const formattedCreateDate = staff.createDate.includes("T") ? staff.createDate : `${staff.createDate}T00:00:00`;
    const formattedAwalBekerja = staff.awalBekerja.includes("T") ? staff.awalBekerja : `${staff.awalBekerja}T00:00:00`;

    const staffDTO = {
      nama: toCamelCase(staff.nama),
      alamat: toCamelCase(staff.alamat),
      noTelepon: staff.noTelepon,
      awalBekerja: formattedAwalBekerja,
      lamaKerja: staff.lamaKerja,
      createDate: formattedCreateDate,
    };

    console.log("Payload yang dikirim:", staffDTO);

    try {
      const response = await fetch(`${API_STAFF}/tambah`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(staffDTO),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Response error:", errorData);
        throw new Error(`Error: ${errorData.message || "Gagal menambahkan staff"}`);
      }

      const data = await response.json();
      console.log("Data yang berhasil disimpan:", data);

      Swal.fire({
        title: "Sukses!",
        text: "Data staf berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/staff");
      });
    } catch (error) {
      console.error("Error:", error.message);
      Swal.fire({
        title: "Gagal!",
        text: `Terjadi kesalahan: ${error.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="flex-1 p-8 ml-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tambah Staff</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[{ label: "Nama", name: "nama", type: "text" },
          { label: "Alamat", name: "alamat", type: "text" },
          { label: "Nomor Telepon", name: "noTelepon", type: "text" },
          { label: "Awal Bekerja", name: "awalBekerja", type: "date" },
          { label: "Lama Kerja (Tahun)", name: "lamaKerja", type: "text" },
          { label: "Tanggal Dibuat", name: "createDate", type: "date" }].map((field) => (
          <div key={field.name} className="flex items-center gap-4">
            <label className="w-40 text-gray-700 font-medium text-left">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={staff[field.name]}
              onChange={handleChange}
              className="flex-1 border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <div className="flex justify-end gap-4 mt-6">
          <button type="button" className="text-black font-semibold hover:underline" onClick={() => navigate("/staff")}>
            Batal
          </button>
          <button type="submit" className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700 transition">
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahStaff;
