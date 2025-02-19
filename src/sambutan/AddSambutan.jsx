import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_SAMBUTAN } from "../utils/BaseUrl";

const TambahSambutan = () => {
  const [sambutan, setSambutan] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { sambutan };

    try {
      const response = await fetch(`${API_SAMBUTAN}/tambah`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();

        Swal.fire({
          title: "Sambutan Ditambahkan!",
          text: `Sambutan berhasil ditambahkan.`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/sambutan");
        });

        console.log("Sambutan Ditambahkan:", result);
      } else {
        throw new Error("Gagal menambahkan sambutan.");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat menambahkan sambutan.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-white p-6 md:p-12 rounded-md shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <h1 className="text-xl font-semibold text-center">Tambah Sambutan</h1>
            <div>
              <label htmlFor="sambutan" className="block text-base font-medium text-gray-700">
                Sambutan
              </label>
              <textarea
                id="sambutan"
                name="sambutan"
                value={sambutan}
                onChange={(e) => setSambutan(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Masukkan sambutan"
                rows="5"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Simpan Sambutan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahSambutan;
