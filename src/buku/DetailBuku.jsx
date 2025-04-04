import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";
import { API_BUKU } from "../utils/BaseUrl";
import "font-awesome/css/font-awesome.min.css";

const DetailBuku = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [buku, setBuku] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_BUKU}/getById/${id}`)
      .then((response) => {
        setBuku(response.data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire({ title: "Error", text: "Gagal memuat detail buku.", icon: "error" });
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-20">Memuat data buku...</div>;
  if (!buku) return <div className="text-center mt-20 text-red-500">Data buku tidak ditemukan.</div>;

  const fotoBuku = buku.fotoUrl?.trim() ? decodeURIComponent(buku.fotoUrl) : "/images/no-image.png";

  return (
    <div className="p-10 flex justify-center items-start h-screen overflow-hidden fixed inset-0 bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg border-4 border-gray-500 space-y-4 mt-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Detail Buku</h2>
        <div className="bg-gray-50 p-5 rounded-lg border-4 border-gray-400 shadow-sm space-y-3 text-left">
          <div className="relative flex justify-center mb-4">
            {/* Camera Icon Above the Image */}
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center pointer-events-none">
              <i className="fa fa-camera text-3xl text-white bg-gray-600 p-2 rounded-full opacity-75"></i>
            </div>
            <img
              src={fotoBuku}
              alt={`Foto ${buku.judulBuku}`}
              className="w-40 h-40 object-cover rounded-full border-4 border-gray-300 cursor-pointer"
              onClick={() => setShowModal(true)}
              onError={(e) => { e.target.src = "/images/no-image.png"; }}
            />
          </div>
          <p><i className="fa fa-book mr-2"></i><strong>Judul:</strong> {buku.judulBuku}</p>
          <p><i className="fa fa-building mr-2"></i><strong>Penerbit:</strong> {buku.penerbit}</p>
          <p><i className="fa fa-user mr-2"></i><strong>Pengarang:</strong> {buku.pengarang}</p>
          <p><i className="fa fa-calendar mr-2"></i><strong>Tahun Terbit:</strong> {buku.tahunTerbit}</p>
          <p><i className="fa fa-file-text mr-2"></i><strong>Jumlah Halaman:</strong> {buku.jumlahHalaman}</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition duration-200"
        >
          <ArrowLeft size={20} /> Kembali
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-2xl">
            <img
              src={fotoBuku}
              alt={`Foto ${buku.judulBuku}`}
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 w-full"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailBuku;
