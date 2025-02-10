import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaChalkboardTeacher, FaUserGraduate, FaLayerGroup, FaUsers, FaCalendarAlt, FaUserTie, FaShoppingCart } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [dataCounts, setDataCounts] = useState({ guru: 0, siswa: 0, kategoriKelas: 0, organisasi: 0, kegiatan: 0, staff: 0, pesanan: 0 });

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
      <div className={`flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <DashboardCard icon={<FaChalkboardTeacher />} label="Guru" count={dataCounts.guru} color="bg-blue-500" onClick={() => navigate("/guru")} />
        <DashboardCard icon={<FaUserGraduate />} label="Siswa" count={dataCounts.siswa} color="bg-green-500" onClick={() => navigate("/siswa")} />
        <DashboardCard icon={<FaLayerGroup />} label="Kategori Kelas" count={dataCounts.kategoriKelas} color="bg-orange-500" onClick={() => navigate("/kategori-kelas")} />
        <DashboardCard icon={<FaUsers />} label="Organisasi" count={dataCounts.organisasi} color="bg-purple-500" onClick={() => navigate("/organisasi")} />
        <DashboardCard icon={<FaCalendarAlt />} label="Kegiatan Sekolah" count={dataCounts.kegiatan} color="bg-yellow-500" onClick={() => navigate("/kegiatan-sekolah")} />
        <DashboardCard icon={<FaUserTie />} label="Staff" count={dataCounts.staff} color="bg-teal-500" onClick={() => navigate("/staff")} />
        <DashboardCard icon={<FaShoppingCart />} label="Pesanan" count={dataCounts.pesanan} color="bg-red-500" onClick={() => navigate("/page-pesanan")} />
      </div>
    </div>
  );
}

function DashboardCard({ icon, label, count, color, onClick }) {
  return (
    <div className={`flex flex-row items-center w-64 h-24 ${color} rounded-lg shadow-md text-white p-4 cursor-pointer`} onClick={onClick}>
      <div className="text-4xl mr-3">{icon}</div>
      <div>
        <p className="text-sm">{label}</p>
        <h3 className="text-xl font-bold">{count}</h3>
      </div>
    </div>
  );
}
