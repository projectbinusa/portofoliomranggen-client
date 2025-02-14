import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";
import { API_GURU } from "../utils/BaseUrl";
import "font-awesome/css/font-awesome.min.css"; 

const DetailGuru = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guru, setGuru] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_GURU}/getById/${id}`)
      .then((response) => {
        setGuru(response.data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire({ title: "Error", text: "Gagal memuat detail guru.", icon: "error" });
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-20">Memuat data guru...</div>;
  if (!guru) return <div className="text-center mt-20 text-red-500">Data guru tidak ditemukan.</div>;

  return (
    <div className="p-10 flex justify-center items-start">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg border-4 border-gray-500 space-y-4 mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Detail Guru</h2>
        <div className="bg-gray-50 p-5 rounded-lg border-4 border-gray-400 shadow-sm space-y-3 text-left">
          <p><i className="fa fa-user mr-2"></i><strong>Nama:</strong> {guru.namaGuru}</p>
          <p><i className="fa fa-id-card mr-2"></i><strong>NIP:</strong> {guru.nip}</p>
          <p><i className="fa fa-map-marker mr-2"></i><strong>Alamat:</strong> {guru.alamat}</p>
          <p><i className="fa fa-phone mr-2"></i><strong>Nomor HP:</strong> {guru.nomerHp}</p>
          <p><i className="fa fa-calendar mr-2"></i><strong>Tahun Diterima:</strong> {guru.tahunDiterima}</p>
          <p><i className="fa fa-briefcase mr-2"></i><strong>Lama Kerja:</strong> {guru.lamaKerja} tahun</p>
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

export default DetailGuru;
