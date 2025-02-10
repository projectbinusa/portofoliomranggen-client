import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types"; // Import PropTypes
import { FaChalkboardTeacher, FaUserGraduate, FaLayerGroup, FaUsers, FaCalendarAlt, FaUserTie, FaShoppingCart } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

function DashboardCard({ icon, label, count, description, color, onClick }) {
  return (
    <div className={`flex flex-col w-64 h-32 ${color} rounded-lg shadow-md text-white p-4 cursor-pointer`} onClick={onClick}>
      <div className="flex items-center">
        <div className="text-4xl mr-3">{icon}</div>
        <div>
          <p className="text-sm">{label}</p>
          <h3 className="text-xl font-bold">{count}</h3>
        </div>
      </div>
      <p className="text-xs mt-2 text-white">{description}</p>
    </div>
  );
}

// Menambahkan validasi untuk props
DashboardCard.propTypes = {
  icon: PropTypes.node.isRequired,  // Untuk komponen React seperti icon
  label: PropTypes.string.isRequired,  // Label adalah string
  count: PropTypes.number.isRequired,  // Count adalah number
  description: PropTypes.string.isRequired,  // Deskripsi adalah string
  color: PropTypes.string.isRequired,  // Color adalah string
  onClick: PropTypes.func.isRequired,  // onClick adalah fungsi
};

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [dataCounts, setDataCounts] = useState({
    guru: 0,
    siswa: 0,
    kategoriKelas: 0,
    organisasi: 0,
    kegiatan: 0,
    staff: 0,
    pesanan: 0,
  });

  useEffect(() => {
    const fetchDataCounts = async () => {
      try {
        const [guruRes, siswaRes, kategoriKelasRes, organisasiRes, kegiatanRes, staffRes, pesananRes] = await Promise.all([
          axios.get("http://localhost:4321/api/admin/guru/all"),
          axios.get("http://localhost:4321/api/siswa/all"),
          axios.get("http://localhost:4321/api/kelas/all"),
          axios.get("http://localhost:4321/api/organisasi/all"),
          axios.get("http://localhost:4321/api/kegiatan/all"),
          axios.get("http://localhost:4321/api/staff/all"),
          axios.get("http://localhost:4321/api/pesanan/all"),
        ]);

        setDataCounts({
          guru: guruRes.data.length,
          siswa: siswaRes.data.length,
          kategoriKelas: kategoriKelasRes.data.length,
          organisasi: organisasiRes.data.length,
          kegiatan: kegiatanRes.data.length,
          staff: staffRes.data.length,
          pesanan: pesananRes.data.length,
        });
      } catch (error) {
        console.error("Error fetching data counts:", error);
      }
    };

    fetchDataCounts();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-5"}`}>

        <DashboardCard icon={<FaChalkboardTeacher />} label="Guru" count={dataCounts.guru} description="Total jumlah guru aktif saat ini." color="bg-blue-500" onClick={() => navigate("/guru")} />
        <DashboardCard icon={<FaUserGraduate />} label="Siswa" count={dataCounts.siswa} description="Total siswa yang terdaftar di sistem." color="bg-green-500" onClick={() => navigate("/siswa")} />
        <DashboardCard icon={<FaLayerGroup />} label="Kategori Kelas" count={dataCounts.kategoriKelas} description="Jumlah kategori kelas yang tersedia." color="bg-orange-500" onClick={() => navigate("/kategori-kelas")} />
        <DashboardCard icon={<FaUsers />} label="Organisasi" count={dataCounts.organisasi} description="Total organisasi sekolah yang terdaftar." color="bg-purple-500" onClick={() => navigate("/organisasi")} />
        <DashboardCard icon={<FaCalendarAlt />} label="Kegiatan Sekolah" count={dataCounts.kegiatan} description="Total kegiatan sekolah yang terdaftar." color="bg-yellow-500" onClick={() => navigate("/kegiatan-sekolah")} />
        <DashboardCard icon={<FaUserTie />} label="Staff" count={dataCounts.staff} description="Total jumlah staff yang bekerja di sekolah." color="bg-teal-500" onClick={() => navigate("/staff")} />
        <DashboardCard icon={<FaShoppingCart />} label="Pesanan" count={dataCounts.pesanan} description="Total pesanan yang telah dibuat." color="bg-red-500" onClick={() => navigate("/page-pesanan")} />
      </div>
    </div>
  );
}
