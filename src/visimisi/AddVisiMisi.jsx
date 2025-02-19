import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_VISIMISI } from "../utils/BaseUrl"; // Pastikan URL benar

const TambahVisiMisi = () => {
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.add("overflow-hidden");
    document.body.classList.add("overflow-hidden");
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { 
        visi, 
        misi,
        adminId: 0 // Pastikan adminId dikirim sesuai kebutuhan backend
    };

    try {
        const response = await fetch(`${API_VISIMISI}/tambah`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        let result;
        try {
            result = await response.json(); // Coba parse JSON
        } catch (jsonError) {
            console.error("Response bukan JSON. Periksa backend.");
            throw new Error("Response bukan JSON. Cek log backend.");
        }

        if (response.ok) {
            Swal.fire({
                title: "Visi dan Misi Ditambahkan!",
                text: "Visi dan misi berhasil ditambahkan.",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                navigate("/visi-misi"); // Navigasi ulang ke halaman Visi Misi
                window.location.reload(); // Paksa refresh halaman untuk update data
            });
            console.log("Visi dan Misi Ditambahkan:", result);
        } else {
            throw new Error(`Gagal menambahkan visi dan misi. Status: ${response.status} - ${result.error || "Unknown Error"}`);
        }
    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
            confirmButtonText: "OK",
        });
    }
};




  return (
    <div className="fixed inset-0 flex justify-center items-center p-10 bg-white">
      <div className="w-full max-w-lg bg-white p-6 md:p-12 rounded-md shadow-2xl">
        <form onSubmit={handleSubmit} className="overflow-hidden">
          <div className="space-y-6">
            <h1 className="text-xl font-semibold text-center">Tambah Visi dan Misi</h1>

            {/* Input Visi */}
            <div>
              <label htmlFor="visi" className="block text-base font-medium text-gray-700">
                Visi
              </label>
              <textarea
                id="visi"
                name="visi"
                value={visi}
                onChange={(e) => setVisi(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Masukkan visi"
                rows="3"
                required
              ></textarea>
            </div>

            {/* Input Misi */}
            <div>
              <label htmlFor="misi" className="block text-base font-medium text-gray-700">
                Misi
              </label>
              <textarea
                id="misi"
                name="misi"
                value={misi}
                onChange={(e) => setMisi(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Masukkan misi"
                rows="5"
                required
              ></textarea>
            </div>

            {/* Tombol Simpan */}
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Simpan Visi dan Misi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahVisiMisi;
