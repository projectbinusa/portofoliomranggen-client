import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaLayerGroup,
  FaUsers,
  FaCalendarAlt,
  FaUserTie,
  FaShoppingCart,
  FaUser,
  FaHandHoldingHeart,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Navbar from "../tampilan/Navbar";

function DashboardCard({ icon, label, count, description, color, textColor, onClick }) {
  return (
    <div
      className={`flex flex-col items-center justify-center w-64 h-32 ${color} ${textColor} rounded-lg shadow-md p-3 cursor-pointer`}
      onClick={onClick}
    >
      <div className="text-4xl">{icon}</div>
      <h3 className="text-2xl font-bold">{count}</h3>
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-xs mt-1 text-center">{description}</p>
    </div>
  );
}

DashboardCard.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
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
    user: 0,
    donasi: 0,
  });

  useEffect(() => {
    const fetchDataCounts = async () => {
      try {
        const [
          guruRes,
          siswaRes,
          kategoriKelasRes,
          organisasiRes,
          kegiatanRes,
          staffRes,
          pesananRes,
          userRes,
          donasiRes,
        ] = await Promise.all([
          axios.get("http://localhost:4321/api/admin/guru/all"),
          axios.get("http://localhost:4321/api/siswa/all"),
          axios.get("http://localhost:4321/api/kelas/all"),
          axios.get("http://localhost:4321/api/organisasi/all"),
          axios.get("http://localhost:4321/api/kegiatan/all"),
          axios.get("http://localhost:4321/api/staff/all"),
          axios.get("http://localhost:4321/api/pesanan/all"),
          axios.get("http://localhost:4321/api/user/all"),
          axios.get("http://localhost:4321/api/donasi/all"),
        ]);

        setDataCounts({
          guru: guruRes.data.length,
          siswa: siswaRes.data.length,
          kategoriKelas: kategoriKelasRes.data.length,
          organisasi: organisasiRes.data.length,
          kegiatan: kegiatanRes.data.length,
          staff: staffRes.data.length,
          pesanan: pesananRes.data.length,
          user: userRes.data.length,
          donasi: donasiRes.data.length,
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

      <div className="flex flex-col flex-1">
        <Navbar />
        
        {/* Tambahkan margin-top agar card tidak tertutup navbar */}
        <div
          className={`p-6 mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3xl:grid-cols-4 gap-4 transition-all duration-300 ${
            isSidebarOpen ? "ml-56" : "ml-5"
          }`}
        >
          <DashboardCard icon={<FaChalkboardTeacher />} label="Guru" count={dataCounts.guru} description="Total jumlah guru aktif saat ini." color="bg-[#3674B5]" textColor="text-white" onClick={() => navigate("/guru")} />
          <DashboardCard icon={<FaUserGraduate />} label="Siswa" count={dataCounts.siswa} description="Total siswa yang terdaftar di sistem." color="bg-[#578FCA]" textColor="text-white" onClick={() => navigate("/siswa")} />
          <DashboardCard icon={<FaLayerGroup />} label="Kategori Kelas" count={dataCounts.kategoriKelas} description="Jumlah kategori kelas yang tersedia." color="bg-[#A1E3F9]" textColor="text-gray-900" onClick={() => navigate("/kategori-kelas")} />
          <DashboardCard icon={<FaUsers />} label="Organisasi" count={dataCounts.organisasi} description="Total organisasi sekolah yang terdaftar." color="bg-[#D1F8EF]" textColor="text-gray-900" onClick={() => navigate("/organisasi")} />
          <DashboardCard icon={<FaCalendarAlt />} label="Kegiatan Sekolah" count={dataCounts.kegiatan} description="Total kegiatan sekolah yang terdaftar." color="bg-[#3674B5]" textColor="text-white" onClick={() => navigate("/kegiatan-sekolah")} />
          <DashboardCard icon={<FaUserTie />} label="Staff" count={dataCounts.staff} description="Total jumlah staff yang bekerja di sekolah." color="bg-[#578FCA]" textColor="text-white" onClick={() => navigate("/staff")} />
          <DashboardCard icon={<FaShoppingCart />} label="Pesanan" count={dataCounts.pesanan} description="Total pesanan yang telah dibuat." color="bg-[#A1E3F9]" textColor="text-gray-900" onClick={() => navigate("/pesanan")} />
          <DashboardCard icon={<FaUser />} label="User" count={dataCounts.user} description="Total pengguna yang terdaftar." color="bg-[#D1F8EF]" textColor="text-gray-900" onClick={() => navigate("/user")} />
          <DashboardCard icon={<FaHandHoldingHeart />} label="Donasi" count={dataCounts.donasi} description="Total donasi yang telah terkumpul." color="bg-[#578FCA]" textColor="text-white" onClick={() => navigate("/donasi")} />
        </div>
      </div>
    </div>
  );
}

