import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  HiHome,
  HiUser,
  HiClipboardList,
  HiOfficeBuilding,
  HiAcademicCap,
  HiUsers,
  HiLogout,
  HiShoppingCart,
  HiCalendar,
  HiMenu,
  HiX,
} from "react-icons/hi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan keluar dari akun!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, keluar!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("authToken");
        navigate("/login", { replace: true });
      }
    });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen transition-all duration-300 transform bg-gradient-to-b from-green-500 to-green-700 text-white shadow-lg ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="relative flex items-center justify-center p-5 border-b border-green-400">
          <h1
            className={`text-2xl font-extrabold tracking-wider text-center transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Sidebar Menu
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -right-4 top-5 bg-green-700 p-2 rounded-full shadow-md hover:bg-green-600 focus:outline-none"
          >
            {isOpen ? (
              <HiX className="w-5 h-5" />
            ) : (
              <HiMenu className="w-5 h-5" />
            )}
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          <SidebarItem
            isOpen={isOpen}
            icon={<HiHome />}
            text="Dashboard"
            to="/home"
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<HiUser />}
            text="Guru"
            to="/guru"
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<HiClipboardList />}
            text="Kategori"
            to="/kategori-kelas"
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<HiOfficeBuilding />}
            text="Organisasi"
            to="/organisasi"
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<HiAcademicCap />}
            text="Siswa"
            to="/siswa"
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<HiUsers />}
            text="Staf"
            to="/staff"
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<HiShoppingCart />}
            text="Pesanan"
            to="/page-pesanan"
          />
          <SidebarItem
            isOpen={isOpen}
            icon={<HiCalendar />}
            text="Kegiatan"
            to="/kegiatan-sekolah"
          />
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 p-3 w-full text-left rounded-md hover:bg-green-600 transition"
            >
              <span className="text-xl">
                <HiLogout />
              </span>
              {isOpen && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </aside>

      {/* Placeholder untuk konten utama */}
      <div className="flex-1 p-10">
        {/* Konten halaman akan muncul di sini */}
      </div>
    </div>
  );
}

function SidebarItem({ icon, text, to, isOpen }) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center space-x-3 p-3 rounded-md hover:bg-green-600 transition"
      >
        <span className="text-xl">{icon}</span>
        {isOpen && <span>{text}</span>}
      </Link>
    </li>
  );
}
