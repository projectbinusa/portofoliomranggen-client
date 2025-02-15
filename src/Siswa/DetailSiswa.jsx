import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { ArrowLeft } from "lucide-react";
import { API_SISWA } from "../utils/BaseUrl";
import "font-awesome/css/font-awesome.min.css";


const DetailSiswa = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [siswa, setSiswa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_SISWA}/getById/${id}`)
      .then((response) => {
        setSiswa(response.data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire({ title: "Error", text: "Gagal memuat detail siswa.", icon: "error" });
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-20">Memuat data siswa...</div>;
  if (!siswa) return <div className="text-center mt-20 text-red-500">Data siswa tidak ditemukan.</div>;

  return (
    <div className="p-10 flex justify-center items-start">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg border-4 border-gray-500 space-y-4 mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Detail Siswa</h2>
        <div className="bg-gray-50 p-5 rounded-lg border-4 border-gray-400 shadow-sm space-y-3 text-left">
          <p><i className="fa fa-user mr-2"></i><strong>Nama:</strong> {siswa.nama}</p>
          <p><i className="fa fa-id-card mr-2"></i><strong>NISN:</strong> {siswa.nisn}</p>
          <p><i className="fa fa-map-marker mr-2"></i><strong>Alamat:</strong> {siswa.alamat}</p>
          <p><i className="fa fa-users mr-2"></i><strong>Nama Orang Tua:</strong> {siswa.namaOrangtua}</p>
          <p><i className="fa fa-phone mr-2"></i><strong>No HP Orang Tua:</strong> {siswa.nomerHpOrangtua}</p>
          <p><i className="fa fa-phone mr-2"></i><strong>No HP Siswa:</strong> {siswa.nomerHp}</p>
          <p><i className="fa fa-calendar mr-2"></i><strong>Tanggal Lahir:</strong> {siswa.tanggalLahir}</p>
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

export default DetailSiswa;
