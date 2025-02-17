import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";
import { API_ORGANISASI } from "../utils/BaseUrl";
import "font-awesome/css/font-awesome.min.css";

const DetailOrganisasi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [organisasi, setOrganisasi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_ORGANISASI}/getById/${id}`)
      .then((response) => {
        setOrganisasi(response.data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire({ title: "Error", text: "Gagal memuat detail organisasi.", icon: "error" });
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-20">Memuat data organisasi...</div>;
  if (!organisasi) return <div className="text-center mt-20 text-red-500">Data organisasi tidak ditemukan.</div>;

  return (
    <div className="p-10 flex justify-center items-start">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg border-4 border-gray-500 space-y-4 mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Detail Organisasi</h2>
        <div className="bg-gray-50 p-5 rounded-lg border-4 border-gray-400 shadow-sm space-y-3 text-left">
          <p><i className="fa fa-building mr-2"></i><strong>Nama Organisasi:</strong> {organisasi.namaOrganisasi}</p>
          <p><i className="fa fa-map-marker mr-2"></i><strong>Lokasi:</strong> {organisasi.lokasi}</p>
          <p><i className="fa fa-envelope mr-2"></i><strong>Email:</strong> {organisasi.email}</p>
          <p><i className="fa fa-phone mr-2"></i><strong>Telepon:</strong> {organisasi.telepon}</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition duration-200"
        >
          <ArrowLeft size={20} /> Kembali
        </button>
      </div>
    </div>
  );
};

export default DetailOrganisasi;
